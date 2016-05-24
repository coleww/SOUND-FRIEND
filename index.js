var ac = new (AudioContext || webkitAudioContext)()











var masterVolume = ac.createGain()
masterVolume.connect(ac.destination)

var instruments = require('./utils/buildInstruments')(ac, masterVolume)
var seq = require('./songs/paths')(instruments)

var Recorder = require('./utils/recorder')
// TODO: use browserify trick to inline the worker here (if that is even possible due to liblamemp3 >_<)
var worker = new Worker('./recorderWorkerMP3.js')
var cassetteDeck = new Recorder(masterVolume, {}, worker)

// START
cassetteDeck.record()
seq.start()

// STAHP
seq.onEnd = function () {
  cassetteDeck.stop()
  cassetteDeck.exportAudio(function (b) {
    console.log("gotcha")
    Recorder.forceDownload(b, 'THE_NAME_OF_THE_SONG.mp3')
  })
}
