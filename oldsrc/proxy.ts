const sharedPropertyDefinition: {
	enumerable: boolean;
	configurable: boolean;
	get?: any;
	set?: any;
} = {
	enumerable: true,
	configurable: true,
};
export function proxy(target: any, sourceKey: string, key: string) {
	sharedPropertyDefinition.get = function proxyGetter() {
		console.log("get", key);
		return target[sourceKey][key];
	};
	sharedPropertyDefinition.set = function proxySetter(val: any) {
		console.log("set", key, val);
		target[sourceKey][key] = val;
	};
	Object.defineProperty(target, key, sharedPropertyDefinition);
}
