var snoop = require('../')
var test = require('tape')
var path = require('path')
var fs = require('fs')

test('snoops bundle', run('simple-bundle.js', []))
test('snoops minified', run('simple-bundle-min.js', []))

test('snoops bundle', run('multiple-bundle.js', ['defined']))
test('snoops minified', run('multiple-bundle-min.js', ['defined']))

test('snoops bundle', run('svg.js', [ 'abs-svg-path', 'adaptive-bezier-curve', 'normalize-svg-path', 'svg-path-contours', 'vec2-copy' ]))

//https://mattdesl.github.io/ink
test('snoops bundle', run('ink.js', require('./fixtures/ink-expected')))
test('snoops minified bundle', run('ink.min.js', require('./fixtures/ink-expected')))

//https://mattdesl.github.io/xmas
test('snoops bundle', run('xmas.js', require('./fixtures/xmas-expected')))
test('snoops minified bundle', run('xmas.min.js', require('./fixtures/xmas-expected')))


function run(file, expected, opt, msg) {
  file = path.resolve(__dirname, 'fixtures', file)
  return function(t) {
    t.plan(1)
    fs.readFile(file, function(err, data) {
      if (err) return t.fail(err)
      snoop(data, opt||{}, function(err, results) {
        if (err) return t.fail(err)
        t.deepEqual(results, expected, msg)
      })
    })
  }
}