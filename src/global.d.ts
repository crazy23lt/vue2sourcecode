declare abstract class Component {
	constructor(options?: Record<string, any>);
	static version: string;
	static $options?: Record<string, any>;
	$emit: (event: string) => void;
}
declare interface matchPorps {
	tagName: string;
}
