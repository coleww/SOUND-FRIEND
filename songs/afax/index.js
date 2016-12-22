var config = require('./config')
var sb = require('spiderbite')
var midi = require('../../midi')
var gtg = require('guitar-tab-generator')
module.exports = function () {
  var seq = sb(config)
  seq.bind(false, function (data) {
    midi.playDrum(data)
  }, require('./data/kick'))

  seq.bind(false, function (data) {
    midi.playDrum(data)
  }, require('./data/hat'))

  seq.bind(false, function (data) {
    midi.playDrum(data)
  }, require('./data/snare'))

  seq.bind(true, function (data, section) {
    midi.playPiano(data, 150, config.key)
  }, require('./data/piano'))

  seq.bind(false, function (data, section) {
    midi.playSynth(data, 250, config.key)
  }, require('./data/bass'))

  seq.setStructure([[0, 0, 0, 1], [1, 1, 1, 0, 0, 2], [2, 2, 2, 2, 0]])
  var tonic = config.key.tonic.match(/\D/)[0]
  console.log(gtg(tonic, config.key.scale))

  return seq
}



// G# 6 -1
// C# 2 -5
// a 0 7 -7
// F# 5 -2
// E 4  -3
// b 1 -6
// d 3 -4



