#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))

var snoop = require('../')
require('get-stdin')(function(data) {
  if (data.length === 0) 
    return usage(1)

  snoop(data, function(err, deps) {
    if (err) {
      console.error("ERR: Could not parse browserify bundle")
      process.exit(1)
    }
    var out
    if (argv.pretty || argv.p) {
      out = require('archy')({
        label: 'dependencies ['+deps.length+']',
        nodes: deps
      })
    } else 
      out = JSON.stringify(deps)
    console.log(out)
  })
})

function usage(code) {
  console.log("Usage:\n  snoop-bundle-deps [opts] < bundle.js")
  process.exit(code||0)
}