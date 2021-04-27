module.exports = {
  "stories": [
    // Stories inside component folders
    "../design-system/components/**/*.stories.tsx",
    // Other stories
    "../design-system/stories/**/*.stories.mdx",
    "../design-system/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "themeprovider-storybook/register"
    //'@storybook/preset-scss',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Make whatever fine-grained changes you need

    config.module.rules.push({
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    });

    //config.resolve.fallback.crypto = false

    // Return the altered config
    return config;
  },

  rules: [
    // Apply loader

  ],
}