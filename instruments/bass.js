var bubblesMoreBubblesPlease = require('bubble-bass')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var bass = bubblesMoreBubblesPlease(ac)
  bass.update({attack: 0.2991, decay: 0.35, sustain: 0.741, release: 0.8611}, ac.currentTime)
  return {
    play: function (data, key) {

      if (data > 9) data = 9
      if (data < -9) data = -9
      bass.update({freq: int2freq(data, key)}, ac.currentTime)
      bass.start(ac.currentTime)
    },
    connect: function (destination) {
      bass.connect(destination)
      return this
    }
  }
}
