// require('./songs/paths')

var Recorder = require('./recorder')
var worker = new Worker('./recorderWorkerMP3.js')


this.recorder = new Recorder(MASTERVOLUMENODE, {}, worker)

this.recorder.record()



this.recorder.stop()
this.recorder.exportAudio(function (b) {
  console.log("GOT A WAV")

  Recorder.forceDownload(b, "BLZRS--3_Things--" + fileName + '.mp3')
})