var midiOut = require('../midi')
var config = require('./config')
var seq = require('spiderbite')(config)
var int2freq = require('int2freq')
seq.bind(false, function (data) {
  midiOut.playDrum(data)
}, require('./kick'))

seq.bind(false, function (data) {
  midiOut.playDrum(data)
}, require('./hat'))

seq.bind(false, function (data) {
  midiOut.playDrum(data)
}, require('./snare'))

seq.bind(true, function (data, section) {
  midiOut.playSynth(data, 60000 / config.bpm, config.key)
}, require('./bass'))

seq.setStructure([[0, 0, 1], [1, 1, 0]])

seq.start()

// G# 6 -1
// C# 2 -5
// a 0 7 -7
// F# 5 -2
// E 4  -3
// b 1 -6
// d 3 -4



