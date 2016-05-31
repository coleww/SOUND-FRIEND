var ac = new (AudioContext || webkitAudioContext)()
var instruments = require('./utils/buildInstruments')(ac)
var seq = require('./songs/paths')(instruments)
require('./utils/performSong')(seq, instruments.mainVolume)
