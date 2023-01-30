
## 响应式系统的作用与实现

v2.0

```js
let activeEffect = null;
let effect = (fn)=>{
	activeEffect = fn;
	fn();
}
let bucket = new WeakMap();
const obj = new Proxy(data,{
	get(target,key){
		track(target,key);
		return target[key];
	},
	set(target,key,val){
		target[key]=val;
		trigger(target,key);
	}
})

function track(target,key){
	if(!activeEffect) return ;
	let depsMap = bucket.get(target);
	if(depsMap === null) bucket.set(target,(depsMap = new Map()));
	let effects = depsMap.get(key);
	if(!effects) depsMap.set(key,(effects = new Set()));
	effects.add(activeEffect);
}

function trigget(target,key){
	const depsMap = bucket.get(target);
	if(!depsMap) return ;
	const effects = depsMap.get(key);
	effects && effects.forEach(fn => fn());
}
```

v3.0


## 非原始值的响应式方案

`Reflect` 是一个全局对象, 使用`.get()`等方法和`Proxy`中的拦截方法完全等同

但是对于这种情况:
```ts
const obj = {
	foo: 1,
	get value(){
		return this.foo;
	}
};
const p = new Proxy(obj,{
	get(target, key){
		track(target,key);
		return target[key];//这里获得的是源对象obj而不是代理对象
	},
})
//->修改为
const p = new Proxy(obj,{
	get(target, key, receiver){
		track(target, key);
		return Reflect.get(target, key, receiver);//这样就能获取到代理对象再访问对应属性了
	}
})
```

