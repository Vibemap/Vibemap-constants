const path = require('path');

module.exports = {
  "stories": [
    // Stories inside component folders
    "../design-system/components/**/*.stories.@(js|jsx|ts|tsx)",
    // Other stories
    "../design-system/stories/**/*.stories.mdx",
    "../design-system/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "themeprovider-storybook/register",
    //'@storybook/preset-scss',
  ],
  typescript: {
    check: false,
    checkOptions: {}
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Make whatever fine-grained changes you need

    // Enable react-native-web
    config.resolve.alias = {
      'react-native$': 'react-native-web',
      'vibemap-constants': path.resolve(__dirname, '../'),
      '@vibemap/shared.card': path.resolve(__dirname, '../design-system/components/card'),
      '@vibemap/shared.heading': path.resolve(__dirname, '../design-system/components/heading')
    };

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