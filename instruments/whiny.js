var whiny = require('a-whining-capitalist')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var piano = whiny(ac)
  piano.update({attack: 0.17251, decay: 0.14315, sustain: 0.4431, release: 0.001421}, ac.currentTime)
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
