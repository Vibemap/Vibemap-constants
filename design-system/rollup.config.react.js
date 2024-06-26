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
  const globals = {
    react: 'React',
    'react-dom': '_ReactDOM',
    'semantic-ui-react': 'semanticUIReact',
  }

  return {
    input: `./components/${componentDirectoryName}/index.tsx`,
    output: [
      {
        exports: 'auto',
        file: `../dist/components/${desiredOutputDirectoryName}/index.js`,
        format: "cjs",
        name: outputName,
        sourcemap,
        globals,
      },
      {
        exports: 'auto',
        file: `../dist/components/${desiredOutputDirectoryName}/index.esm.js`,
        format: "esm",
        name: outputName,
        sourcemap,
        globals,
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
      "react-inlinesvg",
      "semantic-ui-react",
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({
        browser: true,
        preferBuiltins: true,
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
  //makeExportConfig("share", "share", "WebShare"),
  makeExportConfig("vibeCheck/energySlider", "vibe-check/energy-slider", "VibeCheckEnergySlider"),
  makeExportConfig("vibeCheck/intro", "vibe-check/intro", "VibeCheckIntro"),
  makeExportConfig("vibeCheck/wizard", "vibe-check/wizard", "VibeCheckWizard"),
];
