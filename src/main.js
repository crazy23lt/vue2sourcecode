import { stateMixin, initState } from "./state";
import { mountComponent } from "./lifecycle";
import { compileToFunctions } from "./compiler";
function Vue(options) {
	this._init(options);
}
Vue.prototype._init = function (options) {
	const vm = this;
	//todo merge options
	vm.$options = options;
	initState(vm);
	if (vm.$options.el) {
		vm.$mount(vm.$options.el);
	}
};
Vue.prototype.$mount = function (el) {
	///1. 获取el节点元素
	el = el && document.querySelector(el);
	const options = this.$options;
	/// 判断 是否有 render 函数，没有render 根据 template 编译出render
	if (!options.render) {
		let template = options.template;
		// template 四种写法
		if (template) {
			if (typeof template === "string") {
				if (template.charAt(0) === "#") {
					const t = document.querySelector(template);
					template = t.innerHTML;
				}
			} else if (template.nodeType) {
				template = template.innerHTML;
			} else {
				return this;
			}
		} else if (el) {
			template = el.outerHTML;
		}
		if (template) {
			// const { render, staticRenderFns } = compileToFunctions(template, this);
			// options.render = render;
			// options.staticRenderFns = staticRenderFns;
		}
	}
	return mountComponent(this, el);
};
stateMixin(Vue);
export default Vue;
