import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

function makeExportConfig(
  componentDirectoryName,
  desiredOutputDirectoryName,
  sourcemap = false
) {
  return {
    input: `./components/${componentDirectoryName}/index.tsx`,
    output: [
      {
        file: `../dist/components/${desiredOutputDirectoryName}/index.js`,
        format: "cjs",
        exports: "named",
        sourcemap,
      },
    ],
    external: [
      "chroma-js", // HACK: shouldn't really be in `external`, but it's not really used
      "fuse.js", // HACK: shouldn't really be in `external`, but it's not really used
      "react",
      "semantic-ui-react",
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
        extensions: [".css", ".scss"],
      }),
      // terser({
        // compress: {
          // drop_console: true,
        // },
      // }),
    ],
  };
}

export default [
  makeExportConfig("authDialog", "auth-dialog"),
  makeExportConfig("animatedGradient", "animated-gradient"),
  makeExportConfig("marker/pulse", "marker/pulse"),
  makeExportConfig("vibeCheck/energySlider", "vibe-check/energy-slider"),
];
