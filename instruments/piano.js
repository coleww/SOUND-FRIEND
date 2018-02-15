var getAPianoFromThePianoMan = require('pie-ano')
var int2freq = require('int2freq')
var randomADSR = require('../utils/randomADSR')
module.exports = function (ac) {
  var piano = getAPianoFromThePianoMan(ac)
  piano.update(randomADSR(), ac.currentTime)
  return {
    play: function (data, key) {
      // if (data > 5) data = 5
      // if (data < -5) data = -5
      piano.update({freq: int2freq(data, key)}, ac.currentTime)
      piano.start(ac.currentTime)
    },
    connect: function (destination) {
      piano.connect(destination)
      return this
    }
  }
}
