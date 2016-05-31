var generateLine = require('../utils/tts')
var vocoder = require('vocoder')
// oh gosh this is a frigging nightmare huh

module.exports = function (line, ac, cb) {
  this.buffer = undefined
  var that = this
  generateLine(line, ac, function (buffer) {
    that.buffer = buffer
  })

  // ok so it needs to have some sort of instrument thing making noise to use as a carrier

  piano.update({attack: 0.1, decay: 0.05, sustain: 0.01, release: 0.01}, ac.currentTime)
  return {
    play: function (data, key) {
      // vocoder()
      piano.update({freq: int2freq(data, key)}, ac.currentTime)
      piano.play(ac.currentTime)
    },
    connect: function (destination) {
      piano.connect(destination)
      return this
    }
  }
}
