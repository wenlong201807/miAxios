var utils = require('../utils');

// 此方法传入一个对象，返回还是同一个对象，此间做了一些额外处理$ajax.get()
// 灵感: 兼容操作，数据类型判断之类的，都可以这么扩展
module.exports = function mergeConfig(config1, config2) {
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'data'];

  function getMergedValue(target, source) {
      // TODO 源码有多种数据类型判断，这里省略了
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys; // TODO 还有一些其他的合并操作，暂时忽略
  var otherKeys = Object.keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });
  utils.forEach(otherKeys, mergeDeepProperties);
  console.log('实例方法重组:', config);
  return config;
};
