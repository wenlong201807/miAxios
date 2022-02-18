var createError = require('./createError')
module.exports = function settle(resolve, reject, response) {
    if(response.status === 200) {
        resolve(response)
    }else {
        reject(createError(
            'Request failed with status code ' + response.status,
            response.config,
            null,
            response.request,
            response
        ))
    }
}
