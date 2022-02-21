/**
 * 
 * @param {*} executor 
 * 通过一个变量
 * 将数据，函数传递到promise之外，并且在其他函数中在调用
 * 多次切换函数的执行流程
 * 
 * executor 是业务代码中定义的函数如下:
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  }),

  executor === function executor(c) { cancel = c; }
  c === function cancel(message){}
 */
// 此为构造函数
function CancelToken(executor) { // executor 是业务代码中定义的函数
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  executor(function cancel(message) {
    // console.log('executor 回调 -> CancelToken---点了中断操作')
    resolvePromise('用户点击的时候执行 -> resolvePromise'); // 用户点击的时候执行 -> resolve(): 业务代码中对应的捕获的错误信息
  });
}

module.exports = CancelToken;
