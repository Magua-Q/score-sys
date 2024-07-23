const map = new Map();
const weakMap = new WeakMap()(function () {
  const foo = {
    foo: 1,
  };
  const bar = {
    bar: 2,
  };

  map.set(foo, 1);

  weakMap.set(bar, 2);
})();
