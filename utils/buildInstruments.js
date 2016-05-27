var int2freq = require('int2freq')

// TODO:
// OH HEY this file should prbly just delegate to functions in /instruments
//



module.exports = function () {
  var ac = new (AudioContext || webkitAudioContext)()
  var mainVolume = ac.createGain()
  mainVolume.connect(mainVolume)
  var instruments = {}

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


  var kick = require('touch-down-dance')(ac)
  // .update({defaults: defaults?})
  kick.connect(mainVolume)
  var hat = require('really-hi-hat')(ac)
  // .update({defaults: defaults?})
  hat.connect(mainVolume)
  var snare = require('dj-snazzy-snare')(ac)
  // .update({defaults: defaults?})
  snare.connect(mainVolume)


  var piano = require('pie-ano')(ac)
  piano.update({attack: 0.1, decay: 0.05, sustain: 0.01, release: 0.01}, ac.currentTime)
  piano.connect(mainVolume)

  // should be able to pass along data to do different stuff. yeah.
  // perhaps for drums that means like, decay or smth. idk
  // yeck
  instruments.kick = function (data) {
    kick.start(ac.currentTime)
  }
  instruments.hat = function (data) {
    hat.start(ac.currentTime)
  }
  instruments.snare = function (data) {
    snare.start(ac.currentTime)
  }

  instruments.bass = function (data, key) {
    piano.update({freq: int2freq(data, key)}, ac.currentTime)
    piano.start(ac.currentTime)
  }



  instruments.ac = ac
  instruments.mainVolume = mainVolume









  // TODO: return the audio nodes as well so that the sequencer can fiddle?
  // OR: just return the FX/relevant nodes somehow?



  return instruments

}