const unicodeRegExp =
	/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const dynamicArgAttribute =
	/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const attribute =
	/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
export function parser(template: string) {
	// parseHTML(template);
}
function parseHTML(html: string) {
	let last, lastTag;
	let index = 0;
	while (html) {
		last = html;
		if (!lastTag) {
			let textEnd = html.indexOf("<");
			if (textEnd === 0) {
				// End tag:
				const endTagMatch = html.match(endTag);
				if (endTagMatch) {
					const curIndex = index;
					// advance(endTagMatch[0].length)
					// parseEndTag(endTagMatch[1], curIndex, index)
					continue;
				}
				// Start tag:
				const startTagMatch = parseStartTag();
				if (startTagMatch) {
					handleStartTag(startTagMatch);
					continue;
				}
			}
		}
	}
	// 解析开始标签
	function parseStartTag(): matchPorps | undefined {
		// html ==> `<div id='root'></div>`
		// start ==> ['<div','div',index:0,input:'<div id='root'></div>',groups:undefined]
		const start = html.match(startTagOpen);
		if (start) {
			const match: any = {
				tagName: start[1],
				attrs: [],
				start: index,
			};
			advance(start[0].length);
			let end, attr: any;
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
	function advance(n: number) {
		index += n;
		html = html.substring(n);
	}
}
function handleStartTag(match: matchPorps) {}
