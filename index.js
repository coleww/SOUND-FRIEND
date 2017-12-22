// UPDATE THIS TO CHANGE SONG
var song = require('./songs/donk')


var ac = new (AudioContext || webkitAudioContext)()
var instruments = require('./utils/buildInstruments')(ac)
var seq = song(instruments)

seq.start()