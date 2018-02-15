var sparklyPlease = require('sparkle-motion')
var int2freq = require('int2freq')
var randomADSR = require('../utils/randomADSR')
module.exports = function (ac) {
  var sparkle = sparklyPlease(ac)
  sparkle.update(randomADSR(), ac.currentTime)
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
