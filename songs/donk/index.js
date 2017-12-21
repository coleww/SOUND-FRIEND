var config = require('./config')
var sb = require('spiderbite')

module.exports = function (instruments) {
  var seq = sb(config)
  // seq.bind(false, function (data) {
  //   instruments.kick.play(data)
  // }, require('./data/kick'))

  // seq.bind(false, function (data) {
  //   instruments.hat.play(data)
  // }, require('./data/hat'))

  // seq.bind(false, function (data) {
  //   instruments.snare.play(data)
  // }, require('./data/snare'))

  seq.bind(false, function (data, section) {
    instruments.bass.play(data, config.key)
  }, require('./data/bass'))

  seq.bind(true, function (data, section) {
    instruments.piano.play(data, config.key)
  }, require('./data/piano'))

  seq.bind(false, function (data, section) {
    instruments.pluck.play(data, config.key)
  }, require('./data/voice'))

  // seq.bind(false, function (data, section) {
  //   instruments.piano.play(data, config.key)
  // }, require('./data/guitar'))

  //   seq.bind(false, function (data, section) {
  //   instruments.piano.play(data, config.key)
  // }, require('./data/strings'))

  seq.setStructure([[0, 0, 1], [1, 1, 2], [2, 2, 3], [3, 3, 0]])

  

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



