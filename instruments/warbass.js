var bubblesMoreBubblesPlease = require('warlock-bass')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var bass = bubblesMoreBubblesPlease(ac)
  bass.update({attack: 0.751, decay: 0.5, sustain: 0.41, release: 0.611}, ac.currentTime)
  return {
    play: function (data, key) {
      bass.update({freq: int2freq(data, key)}, ac.currentTime)
      bass.start(ac.currentTime)
    },
    connect: function (destination) {
      bass.connect(destination)
      return this
    }
  }
}
