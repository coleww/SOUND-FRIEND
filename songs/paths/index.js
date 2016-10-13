var config = require('./config')
var sb = require('spiderbite')
var midi = require('../../midi')
var gtg = require('guitar-tab-generator')
module.exports = function () {
  var seq = sb(config)
  seq.bind(true, function (data) {
    midi.playDrum(0)
  }, require('./data/kick'))

  // seq.bind(false, function (data) {
  //   midi.playDrum(1)
  // }, require('./data/hat'))

  // seq.bind(false, function (data) {
  //   midi.playDrum(2)
  // }, require('./data/snare'))

  // seq.bind(false, function (data, section) {
  //   midi.playPiano(data, config.key)
  // }, require('./data/piano'))

  // seq.bind(true, function (data, section) {
  //   midi.playSynth(data, 500, config.key)
  // }, require('./data/bass'))

  seq.setStructure([[1,0,0], [0,1,1]])
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



