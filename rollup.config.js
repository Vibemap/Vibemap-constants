import json from '@rollup/plugin-json';

export default {
  input: [
    'constants/constants.js',
    'utils/auth.js',
    'utils/helpers.js',
    'utils/map.js',
    'utils/nlp.js',
    'utils/vibes.js',
    'utils/wordpress.js',
  ],
  output: [
    {
      dir: 'dist',
      format: 'cjs'
    }
  ],
  plugins: [json()]
};