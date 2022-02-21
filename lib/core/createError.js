var enhanceError = require('./enhanceError.simple');
module.exports = function createError(
  message,
  config,
  code,
  request,
  response
) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};
