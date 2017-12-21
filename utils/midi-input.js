var midi = require('web-midi')
var stream = midi('MPK mini', {})


// var stream = midi.openInput('nanoPAD PAD', {})
// var out = midi.openOutput('nanoPAD CTRL', {})
var handlers

// out.write([144, 44, 127])

module.exports = function () {
  handlers// = _handlers
  // handlers.stream = stream
  stream.on('data', function(data){

    console.log('midi', data, data[1], handlers)
    // [type, key, value]
    // 144: noteOn, 128: noteOff, 176: knobChange
    // handlers[data[1]](data)
  })

  return {
    stream: stream,
    update: function (_handlers) {
      handlers = _handlers
      handlers.stream = stream
    }
  }
}