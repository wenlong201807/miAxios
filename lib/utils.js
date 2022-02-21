var toString = Object.prototype.toString;

function extend(a, b, thisArg) {
  Object.keys(b).forEach((item) => {
    // TODO 缺少 function 类型判断
    a[item] = b[item];
    // console.log('extent--item:', item)
  });
}

function isArray(val) {
  return toString.call(val) === '[object Array]';
}

// 将get post delete 等 请求方式重新组合了一下
function forEach(obj, fn) {
    // debugger
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // TODO 对比源码 缺少了判断对象的操作

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i]);
    }
  } else {
    // TODO 对比源码 缺少: 不是数组时的情况处理
  }
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

module.exports = {
  extend: extend,
  forEach: forEach,
  isUndefined: isUndefined,
};
