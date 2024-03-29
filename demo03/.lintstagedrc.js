module.exports = {
  '*.json': 'prettier --write',
  '*.{css,less,scss,vue}': 'stylelint --fix',
  '*.{js,jsx,ts,tsx,vue}': 'eslint --fix',
  '*.{md,markdown}': 'markdownlint --fix',
};
