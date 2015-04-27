var filter = require('filter-npm-modules')
var cache = require('all-the-package-names')
var assign = require('object-assign')
var unpack = require('@mattdesl/browser-unpack')

module.exports = function(src, opt, callback) {
  if (typeof opt === 'function') {
    callback = opt
    opt = {}
  }
  if (typeof callback !== 'function')
    throw new TypeError('expected a function for callback')
  
  var rows = unpack(src)
  if (!rows) {
    return process.nextTick(function() {
      callback(new Error('could not unpack bundle'))
    })
  }

  var deps = rows.reduce(function(prev, row) {
    return prev.concat(Object.keys(row.deps))
  }, []).filter(Boolean)

  opt = assign({}, { cache: cache }, opt)
  filter(deps, opt, function(results) {
    callback(null, results)
  })
}