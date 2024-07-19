export function observe(value: any): Observer | void {
	return new Observer(value);
}
class Observer {
	constructor(public value: any) {
		const keys = Object.keys(value);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			defineReactive(value, key);
		}
	}
}
function defineReactive(obj: object, key: string) {
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function reactiveGetter() {},
		set: function reactiveSetter(newVal) {},
	});
}
