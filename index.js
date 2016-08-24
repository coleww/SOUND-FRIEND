// UPDATE THIS TO CHANGE SONG
var song = require('./songs/donk')


var ac = new (AudioContext || webkitAudioContext)()
var instruments = require('./utils/buildInstruments')(ac)
var seq = song(instruments)

// pass false to play out/forever. pass true to set up a recorder thing.
require('./utils/performSong')(seq, instruments.mainVolume, false)