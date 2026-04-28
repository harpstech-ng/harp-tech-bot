const { Octokit } = require("@octokit/rest");

module.exports = {
  GH_OWNER: 'harpstech-ng',
  
  isValidRepoName: (name) => {
    return /^[a-z0-9-]{2,60}$/.test(name);
  },
  
  deployStaticSite: async (sitename, html, description = "Harp Tech Site") => {
    try {
      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      
      // Create repo
      await octokit.repos.createInOrg({
        org: 'harpstech-ng',
        name: sitename,
        description: description,
        private: false,
        auto_init: true
      });
      
      // Create index.html
      await octokit.repos.createOrUpdateFileContents({
        owner: 'harpstech-ng',
        repo: sitename,
        path: 'index.html',
        message: 'Deploy Harp Tech site',
        content: Buffer.from(html).toString('base64')
      });
      
      // Enable GitHub Pages
      await octokit.repos.createPagesSite({
        owner: 'harpstech-ng',
        repo: sitename,
        source: { branch: 'main', path: '/' }
      });
      
      return {
        ok: true,
        siteUrl: `https://harpstech-ng.github.io/${sitename}`,
        repoUrl: `https://github.com/harpstech-ng/${sitename}`
      };
      
    } catch (error) {
      if (error.status === 422) {
        return { ok: false, reason: 'repo_exists', message: 'Sitename already taken' };
      }
      return { ok: false, message: error.message };
    }
  }
};
