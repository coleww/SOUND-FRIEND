var getAPianoFromThePianoMan = require('pie-ano')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var piano = getAPianoFromThePianoMan(ac)
  piano.update({attack: 0.151, decay: 0.15, sustain: 0.31, release: 0.21}, ac.currentTime)
  return {
    play: function (data, key) {
      piano.update({freq: int2freq(data, key)}, ac.currentTime)
      piano.start(ac.currentTime)
    },
    connect: function (destination) {
      piano.connect(destination)
      return this
    }
  }
}
