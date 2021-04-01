import json from '@rollup/plugin-json';
 
export default {
  input: [
    'constants/constants.js',
    'utils/helpers.js', 
    'utils/auth.js', 
    'utils/wordpress.js', 
  ],
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [json()]
};