import { compileToFunctions } from "compiler/index";
import { isFunction } from "src/utils";
import { proxy } from "src/proxy";
import { observe } from "observer/index";
class VueInit {
	static version = "1.0.0";
	public $options?: Record<string, any>;
	protected data?: Record<string, any>;
	protected initState(): void {
		if (this.$options?.props) {
			this.initProps(this.$options?.props);
		}
		if (this.$options?.data) {
			this.initData(this.$options?.data);
		}
		if (this.$options?.methods) {
			this.initMethods(this.$options?.methods);
		}
		if (this.$options?.watch) {
			this.initMethods(this.$options?.watch);
		}
		if (this.$options?.computed) {
			this.initMethods(this.$options?.computed);
		}
	}
	private initProps(propsOptions: Object): void {
		console.dir({ propsOptions });
	}
	private initData(dataOptions: Object): void {
		const data = isFunction(dataOptions)
			? dataOptions.call(this)
			: dataOptions || {};
		this.data = data;
		const keys = Object.keys(data);
		let i = keys.length;
		while (i--) {
			const key = keys[i];
			proxy(this, `data`, key);
		}
		observe(data);
	}
	private initMethods(methods: Object): void {}
	private initComputed(computed: Object): void {}
	private initWatch(watch: Object): void {}
}
export default class Vue extends VueInit {
	constructor(options?: Record<string, any>) {
		super();
		this.init(options);
	}

	private init(options?: Record<string, any>): void {
		const vm = this;
		// todo mergeOptions Fn
		vm.$options = options;
		this.initState();
		if (vm.$options?.el) {
			this.$mount(vm.$options.el);
		}
	}
	private $mount(el: string | Element) {
		const _el = query(el);
		let template: string = "";
		if (!this.$options?.render) {
			if (this.$options?.template) {
			} else {
				template = getOuterHTML(_el);
			}
		}
		if (template) {
			compileToFunctions(template, this);
		}
		return mountComponent(this, _el);
	}
	private _update() {
		console.dir(`_update`);
	}
	private $forceUpdate() {
		console.dir(`$forceUpdate`);
	}
	private $destroy() {
		console.dir(`$destroy`);
	}
	public $emit() {}
}
/**
 * 查询元素节点
 * @param el 元素id属性
 * @returns 元素节点
 */
const query: (el: string | Element) => Element = (el) => {
	if (typeof el === "string") {
		const selected = document.querySelector(el);
		if (!selected) {
			return document.createElement("div");
		}
		return selected;
	} else {
		return el;
	}
};
const mountComponent = (vm: Component, el: Element) => {};
const callHook: (vm: Component, hook: string) => void = (vm, hook) => {
	vm.$emit("hook:" + hook);
};
const getOuterHTML: (el: Element) => string = (el) => el.outerHTML;
