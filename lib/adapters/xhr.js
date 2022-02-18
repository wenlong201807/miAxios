var settle = require('../core/settle');

/**
 *
 * @param {*} config
 * @returns Promise 对象
 *
 * 包含浏览器发请求的XMLHttpRequest 经典四步骤
 * 1 request = new XMLHttpRequest()
 * 2 request.open()
 * 3 request.onreadystatechange = fn
 * 4 request.send()
 */
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    resolve('接口返回内容的地方，gsd xhrAdapter')
    // var requestData = config.data;
    // var request = new XMLHttpRequest();
    // function onloadend() {
    //   if (!request) {
    //     return;
    //   }
    //   var response = {
    //     data: request.response,
    //     status: request.status,
    //     statusText: request.statusText,
    //     headers: null,
    //     config: config,
    //     request: request,
    //   };
    //   settle(resolve, reject, response);
    //   request = null;
    // }
    // request.open(config.method.toUpperCase(), config.url, true);
    // request.onreadystatechange = function handleLoad() {
    //   if (!request || request.readyState !== XMLHttpRequest.DONE) {
    //     return;
    //   }
    //   setTimeout(onloadend);
    // };
    // if (config.cancelToken) {
    //   config.cancelToken.promise.then(function onCanceled(cancel) {
    //     if (!request) {
    //       return;
    //     }

    //     request.abort();
    //     reject(cancel);
    //     request = null;
    //   });
    // }
    // request.send(requestData);
  });
};
