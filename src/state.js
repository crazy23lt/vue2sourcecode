import { observe } from "./observe";
function proxy(target, sourceKey, key) {
	Object.defineProperty(target, key, {
		enumerable: true,
		configurable: true,
		get: function proxyGetter() {
			return this[sourceKey][key];
		},
		set: function proxySetter(val) {
			this[sourceKey][key] = val;
		},
	});
}
/**
 * 初始化 data、props、methods、computed、watch
 */
export function initState(vm) {
	const opts = vm.$options;
	if (opts.props) initProps(vm, opts.props);
	if (opts.data) initData(vm);
}
function initProps(vm, propsOptions) {
	const props = (vm._props = {});
	for (const key in propsOptions) {
		// props 计算出默认值 进行  defineReactive 劫持操作
		// defineReactive(props, key, value, undefined, true);
		if (!(key in vm)) {
			proxy(vm, `_props`, key);
		}
	}
}
function initData(vm) {
	let data = vm.$options.data;
	// data 有对象和函数两种写法
	data = vm._data = typeof data === "function" ? data.call(vm, vm) : data || {};
	observe(data);
}
/**
 * 定义 原型方法 $data、$props、$set、$del、$watch
 */
export function stateMixin(Vue) {}
