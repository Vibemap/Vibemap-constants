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
  outputName,
  sourcemap = false
) {
  return {
    input: `./components/${componentDirectoryName}/index.tsx`,
    output: [
      {
        file: `../dist/components/${desiredOutputDirectoryName}/index.js`,
        format: "umd",
        name: outputName,
        sourcemap,
      },
      {
        file: `../dist/components/${desiredOutputDirectoryName}/index.cjs.js`,
        format: "cjs",
        sourcemap,
      },
      {
        file: `../dist/components/${desiredOutputDirectoryName}/index.esm.js`,
        format: "esm",
        sourcemap,
      },
    ],
    external: [
      "chroma-js",
      "fuse.js",
      "fs",
      "net",
      "os",
      "react",
      "react-dom",
      "semantic-ui-react",
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      postcss({
        extensions: [".css", ".scss"],
      }),
      terser({
        compress: {
          drop_console: true,
        },
      }),
    ],
  };
}

export default [
  makeExportConfig("authDialog", "auth-dialog", "AuthDialog"),
  makeExportConfig("animatedGradient", "animated-gradient", "AnimatedGradient"),
  makeExportConfig("marker/pulse", "marker/pulse", "MarkerPulse"),
  makeExportConfig("vibeCheck/energySlider", "vibe-check/energy-slider", "VibeCheckEnergySlider"),
  makeExportConfig("vibeCheck/intro", "vibe-check/intro", "VibeCheckIntro"),
  makeExportConfig("vibeCheck/wizard", "vibe-check/wizard", "VibeCheckWizard"),
];
