var sparklyPlease = require('sparkle-motion')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var sparkle = sparklyPlease(ac)
  sparkle.update({attack: 0.7151, decay: 0.15, sustain: 0.41, release: 0.1611}, ac.currentTime)
  return {
    play: function (data, key) {

      if (data > 7) data = 7
      if (data < -7) data = -7
      sparkle.update({freq: int2freq(data, key)}, ac.currentTime)
      sparkle.start(ac.currentTime)
    },
    connect: function (destination) {
      sparkle.connect(destination)
      return this
    }
  }
}
