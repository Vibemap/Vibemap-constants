import graphql from '@rollup/plugin-graphql';
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
    'utils/web.js',
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
    graphql(),
    json(),
    //uglify() // TODO: Make this a cmd arg
  ],
  sourceMap: 'inline'
};