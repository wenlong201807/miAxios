'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      // 大小写的写法都可以，我在这里统一处理为大驼峰写法，并且删除非大驼峰的写法
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
