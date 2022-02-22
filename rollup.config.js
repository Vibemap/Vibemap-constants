import json from '@rollup/plugin-json';
import { uglify } from "rollup-plugin-uglify";


export default {
  input: [
    'constants/constants.js',
    'utils/auth.js',
    'utils/helpers.js',
    'utils/map.js',
    'utils/map.heatmap.js',
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
  plugins: [
    json(),
    uglify()
  ]
};