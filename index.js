// require('./songs/paths')


// var midiOut = require('./utils/midi')



var midi = require('midi');
var help = require('midi-help');
// var stream1 = midi.createWriteStream();
// stream1.write([176, 22, 1])
// // Set up a new output.
var output = new midi.output();

// Count the available output ports.
console.log(output.getPortCount())

// Get the name of a specified output port.
console.log(output.getPortName(0))

// Open the first available output port.
output.openPort(0)

// Send a MIDI message.

// output.sendMessage([176,50,127]);

setInterval(function () {
  output.sendMessage(help.noteOn(60 + [0, 2, 3, 5, 7][~~(Math.random() * 5)], 127))
  output.sendMessage(help.noteOn(96 + [0, 2, 3, 5, 7][~~(Math.random() * 5)], 127, 1))
}, 500)

// Close the port when
 // done.