import json from '@rollup/plugin-json';
 
export default {
  input: [
    'constants/constants.js',
    'utils/helpers.js', 
  ],
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [json()]
};