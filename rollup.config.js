const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { default: typescript } = require("@rollup/plugin-typescript");
const { terser } = require("rollup-plugin-terser");

const baseCompile = { dir: "lib", sourcemap: true };
// amd 异步模块加载 适用于 requireJS 模块加载器
const amdCompile = {
	format: "amd",
	entryFileNames: "[name].amd.js",
};
const cjsCompile = {
	format: "cjs",
	entryFileNames: "[name].cjs.js",
};
const esmCompile = {
	format: "esm",
	entryFileNames: "[name].esm.js",
};
const umdCompile = {
	format: "umd",
	entryFileNames: "[name].umd.js",
	name: "Vue",
	// plugins: [terser()],
};

module.exports = [
	{
		input: "./src/main.js",
		output: [
			// Object.assign(baseCompile, amdCompile),
			// Object.assign(baseCompile, cjsCompile),
			// Object.assign(baseCompile, esmCompile),
			Object.assign(baseCompile, umdCompile),
		],
		// plugins: [resolve(), commonjs(), typescript({ module: "ESNext" })],
		plugins: [resolve(), commonjs()],
		external: [],
		cache: [],
	},
];
