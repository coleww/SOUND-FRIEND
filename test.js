var tap = require('tap')

var midiBand = require('./')

tap.test('does the thing', function (t) {
  t.plan(1)
  t.equal(midiBand('world'), 'hello world', 'does it')
})
