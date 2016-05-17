var config = require('./config')
var seq = require('spiderbite')(config)
var int2freq = require('int2freq')
var midiOut, ac

if (config.midi) {
  midiOut = require('../midi')
} else {
  ac = new AudioContext() // err, add the webkit whatever or junk?
  var kick = require('touch-down-dance')(ac)
  var hat = require('really-hi-hat')(ac)
  var snare = require('dj-snazzy-snare')(ac)
  var piano = require('pie-ano')(ac)
  // var tuna = new Tuna(ac)
  // var overdrive = new tuna.Overdrive({
  //   outputGain: 0.5,         //0 to 1+
  //   drive: 0.7,              //0 to 1
  //   curveAmount: 1,          //0 to 1
  //   algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
  //   bypass: 0
  // })
  // var phaser = new tuna.Phaser({
  //   rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
  //   depth: 0.3,                    //0 to 1
  //   feedback: 0.2,                 //0 to 1+
  //   stereoPhase: 30,               //0 to 180
  //   baseModulationFrequency: 700,  //500 to 1500
  //   bypass: 0
  // })






}

seq.bind(false, function (data) {
  if (config.midi) {
    midiOut.playDrum(data)
  } else {

  }
}, require('./kick'))

seq.bind(false, function (data) {
  if (config.midi) {
    midiOut.playDrum(data)
  } else {

  }
}, require('./hat'))

seq.bind(false, function (data) {
  if (config.midi) {
    midiOut.playDrum(data)
  } else {

  }
}, require('./snare'))

seq.bind(true, function (data, section) {
  if (config.midi) {
    midiOut.playSynth(data, 60000 / config.bpm, config.key)
  } else {

  }
}, require('./bass'))

seq.setStructure([[0, 0, 1], [1, 1, 0]])

seq.start()

seq.onEnd(function () {
  // do the mp3 recordy thingy
})

// G# 6 -1
// C# 2 -5
// a 0 7 -7
// F# 5 -2
// E 4  -3
// b 1 -6
// d 3 -4



