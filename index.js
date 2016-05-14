// require('./songs/paths')


var midiOut = require('./utils/midi')


midiOut.playSynth(69)
midiOut.playDrum(0)

var ds = [0, 2, 1, 2]
var ss = [0, 0, 5, 7]
var d = 0
var s = 0
setInterval(function () {
  midiOut.playDrum(ds[d++ % 4])

  midiOut.playDrum(4)
  // midiOut.playSynth(ss[s++ % 4], 500)
}, 250)

setInterval(function () {
  // midiOut.playDrum(ds[d++ % 4])
  midiOut.playSynth(ss[s++ % 4], 750)
}, 1000)