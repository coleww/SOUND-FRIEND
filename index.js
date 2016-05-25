var instruments = require('./utils/buildInstruments')()
var seq = require('./songs/paths')(instruments)
require('./utils/performSong')(seq, instruments.masterVolume)
