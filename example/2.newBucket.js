const data = {
  ok: true,
  text: "test",
};

const bucket = new WeakMap();
let activeEffect;
const obj = new Proxy(data, {
  get(target, key) {
    // 将副作用函数activeEffect添加到存储副作用函数的桶中
    track(target, key);
    return target[key];
  },

  set(target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
});
// 封装track函数
function track(target, key) {
  if (!activeEffect) return target[key];
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  // 将激活的副作用函数添加到桶中
  deps.add(activeEffect);
}
// 封装trigger函数
function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  // 根据key取得所有副作用函数effects
  const effects = depsMap.get(key);
  // 执行副作用函数
  effects && effects.forEach((fn) => fn());
}

function effect(fn) {
  //   activeEffect = fn;
  fn();
}

effect(function effectFn() {
  document.body.innerText = obj.ok ? obj.text : "not";
});
