module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;
  error.toJSON = {}; // 简化处理，应该是fn 返回对象的
  console.dir(error);// 可以查看完整信息
  return error;
};
