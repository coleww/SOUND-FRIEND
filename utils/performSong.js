module.exports = function (seq, mainVolume) {
  var Recorder = require('./recorder')
  // TODO: use browserify trick to inline the worker here (if that is even possible due to liblamemp3 >_<)
  var worker = new Worker('./recorderWorkerMP3.js')
  var cassetteDeck = new Recorder(mainVolume, {}, worker)

  // START
  cassetteDeck.record()
  seq.start()

  // STAHP
  seq.onEnd = function () {
    cassetteDeck.stop()
    cassetteDeck.exportAudio(function (b) {
      console.log("gotcha")
      Recorder.forceDownload(b, 'THE_NAME_OF_THE_SONG.mp3')
      // um, it could now jump to the next song in the album/set i guess?
    })
  }
}
