import { parser } from "compiler/parser";

export function compile(template: string) {
	const compiled = baseCompile(template.trim());
}
function baseCompile(template: string) {
	const ast = parser(template.trim());
}
