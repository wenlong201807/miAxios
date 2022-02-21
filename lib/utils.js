var toString = Object.prototype.toString;

function extend(a, b, thisArg) {
  Object.keys(b).forEach((item) => {
    // TODO 缺少 function 类型判断
    a[item] = b[item];
    // console.log('extent--item:', item)
  });
}
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

// 将get post delete 等 请求方式重新组合了一下
function forEach(obj, fn) {
  // fn === function assingValue(){}
  // debugger
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // TODO 对比源码 缺少了判断对象的操作
  if (typeof obj !== 'object') {
    // obj = number string boolean
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i]);
    }
  } else {
    // console.log('forEach-- 不是数组的时候', obj)
    // 默认post头数据类型
    // { Content-Type: "application/x-www-form-urlencoded" }
    // TODO 对比源码 缺少: 不是数组时的情况处理
    // iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key);
      }
    }
  }
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

function merge(/* obj1, obj2, obj3 */) {
  var result = {};

  function assingValue(val, key) {
    result[key] = val;
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    // console.log('----merge:', i);
    forEach(arguments[i], assingValue);
  }
  //   console.log('merge-result: ', result);
  return result;
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

module.exports = {
  extend: extend,
  forEach: forEach,
  isUndefined: isUndefined,
  merge: merge,
  isURLSearchParams: isURLSearchParams,
  isObject: isObject,
  trim: trim,
  isString: isString,
  isNumber: isNumber,
  isPlainObject:isPlainObject,
};
