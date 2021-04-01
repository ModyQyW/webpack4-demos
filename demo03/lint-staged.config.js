module.exports = {
  '*.json': 'prettier --write',
  '*.{md,markdown}': 'markdownlint --fix && lint-md --fix',
  '*.{js,jsx,ts,tsx,vue}': 'eslint --fix',
  '*.{css,less,sass,scss,vue}': 'stylelint --fix',
};
