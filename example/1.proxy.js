// 副作用函数
// function effect() {
//   console.log(obj.text);
//   document.body.innerHTML = obj.text;
// }

let activeEffect;

function effect(fn) {
  activeEffect = fn;
  fn();
}
// 原始数据
const data = {
  text: "test",
};
// 存储副作用函数的桶
const bucket = new Set();

// 对原始数据代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数存储到桶中
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },

  // 拦截设置操作
  set(target, key, newVal) {
    target[key] = newVal;
    // 把副作用函数从"桶"中取出并执行
    bucket.forEach((fn) => fn());
    return true;
  },
});

// effect();
// 改进版
effect(() => {
  console.log("effect fn");
  document.body.innerText = obj.text;
});
// 修改响应式数据

// setTimeout(() => {
//   obj.text = "text1";
// }, 5000);

// 设置一个不存在的属性
setTimeout(() => {
  obj.set = "man";
}, 5000);
