require.config({
	baseUrl: "../lib",
	paths: {
		vue: "main.amd",
	},
});
require(["vue"], function (vue) {
	console.log(vue);
	const instance = new vue({ name: "liut" });
	console.log(instance);
});
