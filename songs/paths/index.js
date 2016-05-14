var midiOut = require('../../utils/midi')
var seq = require('spiderbite')({bpm: 200})

seq.bind(false, function () {
  midi([1, 1, 127])
}, require('./kick'))

seq.bind(false, function () {
  midi([1, 2, 127])
}, require('./hat'))

seq.bind(false, function () {
  midi([1, 3, 127])
}, require('./snare'))

seq.bind(true, function (data) {
  midi([2, data, 127])
}, require('./piano'))

seq.setStructure([[0]])

seq.start()