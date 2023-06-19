import graphql from '@rollup/plugin-graphql';
import json from '@rollup/plugin-json';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { uglify } from "rollup-plugin-uglify";


// NOTE to run in debug mode, run with this arg:
// yarn build-helpers --config-debug

const args = require('yargs').argv;
const debug = args.configDebug
console.log(`shouldUglify `, false);

const shouldUglify = !debug

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
      format: 'cjs',
      sourcemap: true,
    }
  ],
  plugins: [
    graphql(),
    json(),
    sourceMaps(),
    shouldUglify && uglify()
  ],
  sourceMap: 'inline'
};