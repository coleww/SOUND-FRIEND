var ac = new (AudioContext || webkitAudioContext)()
var instruments = require('./utils/buildInstruments')(ac)
var seq = require('./songs/donk')(instruments)
seq.start()
// require('./utils/performSong')(seq, instruments.masterVolume)

// the funniest possible thing rn is probably to just make an infinite donk generator