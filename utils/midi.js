var midi = require('midi')
var help = require('midi-help')
var freq2midi = require('midiutils').frequencyToNoteNumber
var int2freq = require('int2freq')
var output = new midi.output()
console.log(output.getPortCount())
console.log(output.getPortName(0))
output.openPort(0)

module.exports = {
  playSynth: function (data, length, key) {
    var note = freq2midi(int2freq(data, key))
    output.sendMessage(help.noteOn(note, 127))
    setTimeout(function () {
      output.sendMessage(help.noteOff(note, 127))
    }, length)
  },
  playDrum: function (data) {
    output.sendMessage(help.noteOn(96 + data, 127, 1))
  },
  playPiano: function (data, length, key) {
    var note = freq2midi(int2freq(data, key))
    output.sendMessage(help.noteOn(note, 127))
    setTimeout(function () {
      output.sendMessage(help.noteOff(note, 127, ??????))
    }, length)
  },
}