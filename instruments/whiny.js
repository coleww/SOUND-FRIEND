var whiny = require('a-whining-capitalist')
var int2freq = require('int2freq')
var randomADSR = require('../utils/randomADSR')
module.exports = function (ac) {
  var piano = whiny(ac)
  piano.update(randomADSR(), ac.currentTime)
  return {
    play: function (data, key) {
      piano.update({freq: int2freq(data , key)}, ac.currentTime)
      piano.start(ac.currentTime)
    },
    connect: function (destination) {
      piano.connect(destination)
      return this
    }
  }
}
