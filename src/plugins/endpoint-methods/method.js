const deepmerge = require('../../utils/deepmerge.js')

const validate = require('./validate.js')

const endpointMethod = (
  apiClient,
  endpointDefaults,
  endpointParamsSpecs,
  options = {},
  callback
) => {
  let endpointOptions = deepmerge(endpointDefaults, options)

  let promise = Promise.resolve(endpointOptions)
    .then(endpointOptions => validate(endpointParamsSpecs, endpointOptions))
    .then(apiClient.request)

  if (callback) {
    promise
      .then(response => {
        callback(null, response)
      })
      .catch(callback)
    return
  }

  return promise
}

module.exports = endpointMethod
