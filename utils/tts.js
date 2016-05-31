var meSpeak = require("mespeak")
meSpeak.loadConfig(require("mespeak/src/mespeak_config.json"))
meSpeak.loadVoice(require("mespeak/voices/en/en-us.json"))

// right now this will take a line, generate a wav, decode it, attach it to a buffer, and return it

module.exports = function (line, ac, cb) {
  var stream = meSpeak.speak(line, {rawdata: "default"})
  ac.decodeAudioData(stream, function (audioData) {
    var source = ac.createBufferSource()
    source.buffer = audioData
    cb(source)

  })
}