module.exports = {  
  "stories": [
    "../design-system/stories/**/*.stories.mdx",
    "../design-system/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-scss',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    
    //config.resolve.fallback.crypto = false

    // Make whatever fine-grained changes you need
    /*
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader', 'css-loader', 'sass-loader', 
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              './node_modules/vibemap-constants/design-system/build/scss/_variables.scss',
              './design-system/styles/index.scss', 
              './design-system/styles/mixins.scss',
            ]              
          },
        },
      ],
    });
    */
    
    // Return the altered config
    return config;
  },
  
  rules: [
    // Apply loader
    
  ],
}