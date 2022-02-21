var createError = require('./createError');

/**
 * 
 * @param {*} resolve 
 * @param {*} reject 
 * @param {*} response 
 * 此处需要校验的
 */
module.exports = function settle(resolve, reject, response) {
  // post 请求需要 去掉状态码201的情况
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
  // if (response.status === 200) {
    resolve(response);
  } else {
    reject(
      createError(
        'Request failed with status code ' + response.status,
        response.config,
        null,
        response.request,
        response
      )
    );
  }
};
