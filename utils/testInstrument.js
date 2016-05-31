var ac = new (AudioContext || webkitAudioContext)()
var instrument = require('./instruments/piano')(ac)
instrument.connect(ac.destination)

setInterval(() => {
  instrument.play(55 + ~~(Math.random() * 10), {tonic: 'A4', scale: 'major'})
}, 500)