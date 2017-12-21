var getAPianoFromThePianoMan = require('pie-ano')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var piano = getAPianoFromThePianoMan(ac)
  piano.update({attack: 0.51, decay: 0.315, sustain: 0.431, release: 0.421}, ac.currentTime)
  return {
    play: function (data, key) {
      piano.update({freq: int2freq(data + 24, key)}, ac.currentTime)
      piano.start(ac.currentTime)
    },
    connect: function (destination) {
      piano.connect(destination)
      return this
    }
  }
}
