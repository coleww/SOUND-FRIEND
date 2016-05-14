// var midi = require('web-midi')
// var config = require('../config')
// var outStream

// if (config.midi) {
//   // how to get name of midi device automagically? presuming 1 output?
//   outStream = midi.openOutput("midi_out")
// } else {
//   outStream = {
//     write: function (data) {
//       console.log(data)
//     }
//   }
// }

// module.exports = function (data) {
//   // [channel, note, velocity]
//   outStream.write(data)
// }


if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    console.log('MIDI Access Object', midiAccess.outputs);
}

function onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}