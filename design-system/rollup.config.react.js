import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./components/authDialog/index.tsx",
    output: [
      {
        file: "../dist/components/auth-dialog/index.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    external: [
      'chroma-js', // XXX: shouldn't really be here, but it's not really used
      'fuse.js', // XXX: shouldn't really be here, but it's not really used
      'react',
      'semantic-ui-react'
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      postcss({
          extensions: ['.css', '.scss']
      }),
      terser({
        compress: {
          drop_console: true,
        },
      }),
    ]
  },
];
