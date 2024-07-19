export function compileToFunctions(template) {
	const ast = parse(template.trim());
}
function createASTElement(tag, attrs, parent) {}
function parse(template) {
	const stack = [];
	let root;
	let currentParent;
	parseHTML(template, {
		start: (tag, attrs, unary, start, end) => {
			console.log({ tag, attrs, unary, start, end });
			const element = createASTElement(tag, attrs, currentParent);
			if (!root) {
				root = element;
			}
			if (!unary) {
				currentParent = element;
				stack.push(element);
			} else {
				// 自闭合标签
				closeElement(element);
			}
		},
	});
}
const unaryTags = [
	"area",
	"base",
	"br",
	"col",
	"embed",
	"frame",
	"hr",
	"img",
	"input",
	"isindex",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr",
];
const unicodeRegExp =
	/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

const attribute =
	/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const dynamicArgAttribute =
	/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;

const qnameCapture = `((?:${ncname}\\:)?${ncname})`;

const startTagOpen = new RegExp(`^<${qnameCapture}`);

const startTagClose = /^\s*(\/?)>/;

const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

function parseHTML(html, options) {
	const stack = [];
	let index = 0;
	let last, lastTag;
	while (html) {
		last = html;
		if (!lastTag) {
			let textEnd = html.indexOf("<");
			if (textEnd === 0) {
				// handle start tag
				const startTagMatch = parseStartTag();
				if (startTagMatch) {
					handleStartTag(startTagMatch);
					continue;
				}
				// handle end tag
				const endTagMatch = html.match(endTag);
				if (endTagMatch) {
					const curIndex = index;
					advance(endTagMatch[0].length);
					parseEndTag(endTagMatch[1], curIndex, index);
					continue;
				}
			}
		}
	}
	function advance(n) {
		index += n;
		html = html.substring(n);
	}
	function parseStartTag() {
		const start = html.match(startTagOpen);
		if (start) {
			const match = {
				tagName: start[1],
				attrs: [],
				start: index,
			};
			// 切除匹配到的 开始标签 <div
			advance(start[0].length);
			let end, attr;
			while (
				!(end = html.match(startTagClose)) &&
				(attr = html.match(dynamicArgAttribute) || html.match(attribute))
			) {
				attr.start = index;
				advance(attr[0].length);
				attr.end = index;
				match.attrs.push(attr);
			}
			if (end) {
				match.unarySlash = end[1];
				advance(end[0].length);
				match.end = index;
				return match;
			}
		}
	}
	function handleStartTag(match) {
		const tagName = match.tagName;
		const unarySlash = match.unarySlash;
		const unary = unaryTags.includes(tagName) || !!unarySlash;
		const l = match.attrs.length;
		const attrs = new Array(l);
		for (let i = 0; i < l; i++) {
			const args = match.attrs[i];
			const value = args[3] || args[4] || args[5] || "";
			attrs[i] = { name: args[1], value: value };
		}
		if (!unary) {
			stack.push({
				tag: tagName,
				lowerCasedTag: tagName.toLowerCase(),
				attrs: attrs,
				start: match.start,
				end: match.end,
			});
			lastTag = tagName;
		}
		if (options.start) {
			options.start(tagName, attrs, unary, match.start, match.end);
		}
	}
	function parseEndTag() {}
}
