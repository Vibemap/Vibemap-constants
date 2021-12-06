import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel'
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: [
      'constants/constants.js',
      'utils/auth.js',
      'utils/helpers.js',
      'utils/map.js',
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
  },
  {
    input: 'utils/search/index.js',
    output: {
      dir: 'dist/search',
      format: 'cjs',
    },
    external: [
      "chroma-js", // HACK: shouldn't really be in `external`, but it's not really used
      "fuse.js", // HACK: shouldn't really be in `external`, but it's not really used
      "react",
      "semantic-ui-react",
    ],
    plugins: [
      json(),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react']
      }),
      terser({
        compress: {
          drop_console: true,
        },
      }),
    ]
  }
];
