module.exports = {
  GH_OWNER: 'your-github-username',
  isValidRepoName: () => false,
  deployStaticSite: async () => ({ ok: false, message: 'Disabled' }),
};
