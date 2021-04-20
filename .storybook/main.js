const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  "stories": [
    "../design-system/stories/**/*.stories.mdx",
    "../design-system/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ],
}