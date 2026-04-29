const { Octokit } = require("@octokit/rest");
const fs = require('fs');

function getGHOwners() {
  const config = JSON.parse(fs.readFileSync('./web_config.json', 'utf-8'));
  return config.github_username || 'harpstech-ng';
}

module.exports = {
  GH_OWNER: getGHOwners(),
  
  isValidRepoName: (name) => {
    return /^[a-z0-9-]{2,60}$/.test(name);
  },
  
  deployStaticSite: async (sitename, html, description = "Harp Tech Site") => {
    try {
      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      const owner = getGHOwners();
      
      // 1. Create repo - works for personal OR org
      try {
        await octokit.repos.createForAuthenticatedUser({
          name: sitename,
          description: description,
          private: false,
          auto_init: true
        });
      } catch (err) {
        if (err.status === 422) {
          return { ok: false, reason: 'repo_exists', message: 'Sitename already taken. Try another name' };
        }
        throw err;
      }
      
      // 2. Wait 2sec for repo to initialize
      await new Promise(r => setTimeout(r, 2000));
      
      // 3. Create index.html
      await octokit.repos.createOrUpdateFileContents({
        owner: owner,
        repo: sitename,
        path: 'index.html',
        message: 'Deploy Harp Tech site',
        content: Buffer.from(html).toString('base64'),
        branch: 'main'
      });
      
      // 4. Enable GitHub Pages
      await octokit.repos.createPagesSite({
        owner: owner,
        repo: sitename,
        source: { branch: 'main', path: '/' }
      });
      
      return {
        ok: true,
        siteUrl: `https://${owner}.github.io/${sitename}`,
        repoUrl: `https://github.com/${owner}/${sitename}`
      };
      
    } catch (error) {
      console.error('GitHub Deploy Error:', error);
      if (error.status === 401) {
        return { ok: false, message: 'Invalid GitHub Token. Check GITHUB_TOKEN in .env' };
      }
      if (error.status === 403) {
        return { ok: false, message: 'Token missing permissions. Enable "repo" + "workflow" scopes' };
      }
      if (error.status === 409) {
        return { ok: false, message: 'GitHub Pages already enabled for this repo' };
      }
      return { ok: false, message: error.message || 'Deploy failed' };
    }
  }
};
