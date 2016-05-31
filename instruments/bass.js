var bass = require('bubble-bass')(ac)
var int2freq = require('int2freq')
module.exports = function (ac) {
  bass.update({attack: 0.1, decay: 0.05, sustain: 0.01, release: 0.01}, ac.currentTime)
  return {
    play: function (data, key) {
      bass.update({freq: int2freq(data, key)}, ac.currentTime)
      bass.play(ac.currentTime)
    },
    connect: function (destination) {
      bass.connect(destination)
      return this
    }
  }
}
