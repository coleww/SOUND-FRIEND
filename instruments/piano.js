var getAPianoFromThePianoMan = require('pie-ano')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var piano = getAPianoFromThePianoMan(ac)
  piano.update({attack: 0.2751, decay: 0.14315, sustain: 0.1431, release: 0.1421}, ac.currentTime)
  return {
    play: function (data, key) {
      if (data > 5) data = 5
      if (data < -5) data = -5
      piano.update({freq: int2freq(data, key)}, ac.currentTime)
      piano.start(ac.currentTime)
    },
    connect: function (destination) {
      piano.connect(destination)
      return this
    }
  }
}
