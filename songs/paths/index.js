var BPM = 200
var midiOut = require('../../utils/midi')
var seq = require('spiderbite')({bpm: BPM})
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

seq.bind(true, function (data) {
  midiOut.playSynth(data, 60000 / BPM)
}, require('./bass'))

seq.setStructure([[0]])

seq.start()

// G# 6 -1
// C# 2 -5
// a 0 7 -7
// F# 5 -2
// E 4  -3
// b 1 -6
// d 3 -4