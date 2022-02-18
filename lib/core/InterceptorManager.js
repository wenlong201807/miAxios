function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function use(fulfilled, rejected) { // TODO 还有第三个参数
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
  });
};

module.exports = InterceptorManager;
