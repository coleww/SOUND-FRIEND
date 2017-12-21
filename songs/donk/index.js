var config = require('./config')
var sb = require('spiderbite')
// var midi = require('../../utils/midi-input');
var shuffle = require('shuffle-array')
// midi();

module.exports = function (instruments) {
  var seq = sb(config)


 var bassdata = shuffle(require('./data/bass')).map(function (section) {
  section.data = shuffle(section.data).map(function (dataBlock) {
    return shuffle(dataBlock)
  })
  return section
 })

  seq.bind(false, function (data, section) {
    instruments.bass.play(data, config.key)
  }, bassdata)


var peedata = shuffle(require('./data/piano')).map(function (section) {
  section.data = shuffle(section.data).map(function (dataBlock) {
    return shuffle(dataBlock)
  })
  // section.config.mod = shuffle([1, 4, 2, 3])[0]
  return section
})

  seq.bind(true, function (data, section) {
    instruments.piano.play(data, config.key)
  }, peedata)


var vodata = shuffle(require('./data/voice')).map(function (section) {
  section.data = shuffle(section.data).map(function (dataBlock) {
    return shuffle(dataBlock)
  })
  // section.config.mod = shuffle([1, 2, 3])[0]
  return section
})

  seq.bind(false, function (data, section) {
    instruments.whiny.play(data, config.key)
  }, vodata)


var guidata = shuffle(require('./data/guitar')).map(function (section) {
  section.data = shuffle(section.data).map(function (dataBlock) {
    return shuffle(dataBlock)
  })
  // section.config.mod = shuffle([1, 2, 3])[0]
  return section
})

  seq.bind(false, function (data, section) {
    instruments.warbass.play(data, config.key)
  }, guidata)


var strdata = shuffle(require('./data/strings')).map(function (section) {
  section.data = shuffle(section.data).map(function (dataBlock) {
    return shuffle(dataBlock)
  })
  return section
})

  seq.bind(false, function (data, section) {
    instruments.sparkle.play(data, config.key)
  }, strdata)

  seq.setStructure(shuffle([[0, 2, 1], [1, 3, 2], [2, 0, 3], [3, 1, 0]]))

  

  seq.onSectionStart = function (update) {
    if (update) {
      // the global current pattern thing is gonna change on the next section start yo!
      // we can figure out what that pattern will be thanks to the seq thing. object bro. buddy!
    } else {
      // just grooving.
    }
  }

  return seq
}


