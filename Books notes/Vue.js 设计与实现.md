
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