//'snoop-bundle-dependencies' WIP
var snoop = require('../')

require('request').get({
  uri: 'http://mattdesl.github.io/ink/bundle.js'
}, function(err, resp, body) {
  snoop(body, { mangled: true }, function(deps) {
    deps.forEach(function(name) {
      console.log(name)
    })
  })
})