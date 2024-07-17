const resolve = require("@rollup/plugin-node-resolve");
const { default: typescript } = require("@rollup/plugin-typescript");
module.exports = [
  {
    input: "./src/main.ts",
    output: [
      {
        dir: "lib",
        format: "cjs",
        entryFileNames: "[name].cjs.js",
        sourcemap: false,
      },
    ],
    plugins: [resolve(), commonjs(), typescript({ module: "ESNext" })],
  },
];
