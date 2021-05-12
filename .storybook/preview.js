import { withThemesProvider } from "themeprovider-storybook";


const sassFile = '/design-system/styles/index.scss';

import styles from '/design-system/styles/index.scss'

const sassTheme = require('sass-extract-loader?{"plugins": [{ plugin: "sass-extract-js", options: { camelCase: false } }]}!/design-system/styles/index.scss');

console.log('Sass Theme: ', sassTheme)

// Options:
const themes = [
  {
    name: 'Theme1',
    backgroundColor: '#fff' // Optional, it's used for setting dynamic background color on storybook
  },
  {
    name: 'Theme2',
    backgroundColor: '#000'// Optional, it's used for setting dynamic background color on storybook
  }
]

console.log('Themes in storybook decorator ', themes)

// Decoractor wraps all components with the theme.
// We cna also import a customer theme provider or one style-components
export const decorators = [withThemesProvider(themes)];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

