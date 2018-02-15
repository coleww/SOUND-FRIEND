var bubblesMoreBubblesPlease = require('bubble-bass')
var int2freq = require('int2freq')
var randomADSR = require('../utils/randomADSR')
module.exports = function (ac) {
  var bass = bubblesMoreBubblesPlease(ac)
  bass.update(randomADSR(), ac.currentTime)
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
