var config = require('./config')
var sb = require('spiderbite')


module.exports = function (instruments) {
  var seq = sb(config)
  seq.bind(false, function (data) {
    midi.playDrum(0)
  }, require('./data/kick'))

  seq.bind(false, function (data) {
    midi.playDrum(1)
  }, require('./data/hat'))

  seq.bind(false, function (data) {
    midi.playDrum(2)
  }, require('./data/snare'))

  // seq.bind(false, function (data, section) {
  //   midi.playPiano(data, config.key)
  // }, require('./data/piano'))

  seq.bind(true, function (data, section) {
    midi.playSynth(data, 500, config.key)
  }, require('./data/bass'))


  seq.setStructure([[1,0,0], [0,1,1]])

  // might have to do the voice updating here? hrmm, if you always generate the node for the next line ahead of time....
  // heck, just always call the first bar an "intro"///
  seq.onSectionStart = function (update) {
    if (update) {
      // the global current pattern thing is gonna change on the next section start yo!
      // we can figure out what that pattern will be thanks to the seq thing. object bro. buddy!
    } else {
      // just grooving.
    }
    // instruments.voice.vocode(instruments.mainVolume)
  }

  return seq
}



// G# 6 -1
// C# 2 -5
// a 0 7 -7
// F# 5 -2
// E 4  -3
// b 1 -6
// d 3 -4



