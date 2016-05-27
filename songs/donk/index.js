var config = require('./config')
var sb = require('spiderbite')

module.exports = function (instruments) {
  var seq = sb(config)
  seq.bind(false, function (data) {
    instruments.kick()
  }, require('./data/kick'))

  seq.bind(false, function (data) {
    instruments.hat()
  }, require('./data/chh'))

  seq.bind(false, function (data) {
    instruments.snare()
  }, require('./data/snare'))

  seq.bind(true, function (data, section) {
    instruments.bass(data, config.key)
  }, require('./data/bass'))

  seq.setStructure([[1], [ null]])

  seq.onSectionStart = function (update) {
    if (update) {
      // the global current pattern thing is gonna change on the next section start yo!
      // we can figure out what that pattern will be thanks to the seq thing. object bro. buddy!
    } else {
      // just grooving.
    }
  }

  return seq
}



// G# 6 -1
// C# 2 -5
// a 0 7 -7
// F# 5 -2
// E 4  -3
// b 1 -6
// d 3 -4



