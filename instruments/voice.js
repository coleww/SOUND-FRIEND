var vocoder = require('@coleww/vocoder')
var getAPianoFromThePianoMan = require('pie-ano')
var int2freq = require('int2freq')
var generateLine = require('../utils/tts')

module.exports = function (ac) {
  this.buffer = undefined

  var piano = getAPianoFromThePianoMan(ac)
  piano.update({attack: 0.1, decay: 0.05, sustain: 0.01, release: 0.01}, ac.currentTime)
  return {
    currentBuffer: undefined,
    nextBuffer: undefined,
    play: function (data, key) {
      // this just updates the vocode-y instrument friend
      piano.update({freq: int2freq(data, key)}, ac.currentTime)
      piano.start(ac.currentTime)
    },
    connect: function (destination) {
      // do nothing here, this piano just goes to the vocoder, which we must connect manually each time, for reasons
      return this
    },
    vocode: function (destination) {
      var that = this
      this.currentBuffer = this.nextBuffer
      this.nextBuffer = undefined
      if (this.currentBuffer) {
        vocoder(ac, piano, this.currentBuffer, destination).start(ac.currentTime)
      }
      var line = "HOLY SHIT IT WORKS WOW VOCODer RUNNING IN A WEB BROWSER"
      generateLine(line, ac, function (buffer) {
        that.nextBuffer = buffer
      })
    }
  }
}
