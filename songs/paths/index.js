var config = require('./config')
var sb = require('spiderbite')

module.exports = function (instruments) {
  var seq = sb(config)
  seq.bind(false, function (data) {
    instruments.kick()
  }, require('./kick'))

  seq.bind(false, function (data) {
    instruments.hat()
  }, require('./hat'))

  seq.bind(false, function (data) {
    instruments.snare()
  }, require('./snare'))

  seq.bind(true, function (data, section) {
    instruments.bass(data, config.key)
  }, require('./bass'))

  seq.setStructure([[1], [ null]])

  return seq
}



// G# 6 -1
// C# 2 -5
// a 0 7 -7
// F# 5 -2
// E 4  -3
// b 1 -6
// d 3 -4



