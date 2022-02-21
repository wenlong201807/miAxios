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
    // resolve('接口返回内容的地方，gsd xhrAdapter')
    var requestData = config.data;
    // console.log('xhrAdapter: config.data -> ', requestData) // post参数无误
    var request = new XMLHttpRequest();
    function onloadend() {
      if (!request) {
        return;
      }
      // 返回页面的数据格式内容
      var response = {
        data: JSON.parse(request.response),
        status: request.status,
        statusText: request.statusText,
        headers: null,
        config: config,
        request: request,
      };
      settle(resolve, reject, response); // 对请求成功与失败的情况进行处理
      request = null; // 清空实例对象
    }
    request.open(config.method.toUpperCase(), config.url, true);
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      // 如果成功了，那么就下一次返回，宏任务队列
      setTimeout(onloadend);
    };

    // 撤销请求的处理
    if (config.cancelToken) {
      // .then 对应执行resovle的结果
        config.cancelToken.promise.then(function onCanceled(cancel) {
          console.log('点了中断操作')
        if (!request) {
          return;
        }

        request.abort(); // 请求中断的核心
        reject(cancel); // 返回页面数据自然也是不正确的一类
        request = null;
      });
    }

    request.send(requestData);
  });
};
