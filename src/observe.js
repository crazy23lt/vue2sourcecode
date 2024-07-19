function hasOwn(obj, key) {
	const hasOwnProperty = Object.prototype.hasOwnProperty;
	return hasOwnProperty.call(obj, key);
}

export function observe(value) {
	if (value && hasOwn(value, "__ob__") && value instanceof Observer) {
		return value.__ob__;
	}
	if (typeof value === "object" && value !== null) {
		return new Observer(value);
	}
}

function Observer(value) {
	Object.defineProperty(value, "__ob__", {
		value: this,
		enumerable: false,
		writable: true,
		configurable: true,
	});
	if (Array.isArray(value)) {
	} else {
		const keys = Object.keys(value);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			defineReactive(value, key);
		}
	}
}
export function defineReactive(obj, key) {
	const val = obj[key];
	observe(val);
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function reactiveGetter() {
			return val;
		},
		set: function reactiveSetter(newVal) {
			if (newVal === val) return;
			val = newVal;
			observe(newVal);
		},
	});
}
