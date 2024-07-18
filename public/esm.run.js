import Vue from "../lib/main.esm.js";
const options = { el: "#root", data: () => ({ name: "liut" }) };
const vm = new Vue(options);
console.dir(vm);
window.vm = vm;
