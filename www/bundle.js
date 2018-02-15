(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var sb = require('spiderbite')
var shuffle = require('shuffle-array')
var makeCOnfig = require('./utils/randomKey')

var randomSequence = require('./utils/randomSequence')

function song (instruments) {
	var config = makeCOnfig()
	console.log(JSON.stringify(config, null, '\t'))
	var seq = sb(config)


	var bassdata = [randomSequence(8)].map(function (section) {
		section.data = shuffle(section.data).map(function (dataBlock) {
			return shuffle(dataBlock)
		})
		section.config.mod = shuffle([1, 2, 3, 4])[0]
		return section
	})

	seq.bind(false, function (data, section) {
	instruments.bass.play(data, config.key)
	}, bassdata)


	var peedata = [randomSequence(8)].map(function (section) {
		section.data = shuffle(section.data).map(function (dataBlock) {
			return shuffle(dataBlock)
		})
		section.config.mod = shuffle([1, 2, 3, 4])[0]
		return section
	})

	seq.bind(true, function (data, section) {
	instruments.piano.play(data, config.key)
	}, peedata)


	var vodata = [randomSequence(8)].map(function (section) {
		section.data = shuffle(section.data).map(function (dataBlock) {
			return shuffle(dataBlock)
		})
		section.config.mod = shuffle([1, 2, 3, 4])[0]
		return section
	})

	seq.bind(false, function (data, section) {
	instruments.whiny.play(data, config.key)
	}, vodata)


	var guidata = [randomSequence(8)].map(function (section) {
		section.data = shuffle(section.data).map(function (dataBlock) {
			return shuffle(dataBlock)
		})
		section.config.mod = shuffle([1, 2, 3, 4])[0]
		return section
	})

	seq.bind(false, function (data, section) {
	instruments.warbass.play(data, config.key)
	}, guidata)


	var strdata = [randomSequence(8)].map(function (section) {
		section.data = shuffle(section.data).map(function (dataBlock) {
			return shuffle(dataBlock)
		})

		section.config.mod = shuffle([1, 2, 3, 4])[0]
		return section
	})

	seq.bind(false, function (data, section) {
		instruments.sparkle.play(data, config.key)
	}, strdata)

	seq.setStructure([[0]])



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

























var ac = new (AudioContext || webkitAudioContext)()
var instruments = require('./utils/buildInstruments')(ac)
var seq = song(instruments)

seq.start()
},{"./utils/buildInstruments":17,"./utils/randomKey":19,"./utils/randomSequence":20,"shuffle-array":14,"spiderbite":21}],2:[function(require,module,exports){
var bubblesMoreBubblesPlease = require('bubble-bass')
var int2freq = require('int2freq')
var randomADSR = require('../utils/randomADSR')
module.exports = function (ac) {
  var bass = bubblesMoreBubblesPlease(ac)
  bass.update(randomADSR(), ac.currentTime)
  return {
    play: function (data, key) {

      if (data > 9) data = 9
      if (data < -9) data = -9
      bass.update({freq: int2freq(data, key)}, ac.currentTime)
      bass.start(ac.currentTime)
    },
    connect: function (destination) {
      bass.connect(destination)
      return this
    }
  }
}

},{"../utils/randomADSR":18,"bubble-bass":9,"int2freq":10}],3:[function(require,module,exports){
var getAPianoFromThePianoMan = require('pie-ano')
var int2freq = require('int2freq')
var randomADSR = require('../utils/randomADSR')
module.exports = function (ac) {
  var piano = getAPianoFromThePianoMan(ac)
  piano.update(randomADSR(), ac.currentTime)
  return {
    play: function (data, key) {
      if (data > 5) data = 5
      if (data < -5) data = -5
      piano.update({freq: int2freq(data, key)}, ac.currentTime)
      piano.start(ac.currentTime)
    },
    connect: function (destination) {
      piano.connect(destination)
      return this
    }
  }
}

},{"../utils/randomADSR":18,"int2freq":10,"pie-ano":13}],4:[function(require,module,exports){
var sparklyPlease = require('sparkle-motion')
var int2freq = require('int2freq')
var randomADSR = require('../utils/randomADSR')
module.exports = function (ac) {
  var sparkle = sparklyPlease(ac)
  sparkle.update(randomADSR(), ac.currentTime)
  return {
    play: function (data, key) {

      if (data > 7) data = 7
      if (data < -7) data = -7
      sparkle.update({freq: int2freq(data, key)}, ac.currentTime)
      sparkle.start(ac.currentTime)
    },
    connect: function (destination) {
      sparkle.connect(destination)
      return this
    }
  }
}

},{"../utils/randomADSR":18,"int2freq":10,"sparkle-motion":15}],5:[function(require,module,exports){
var bubblesMoreBubblesPlease = require('warlock-bass')
var int2freq = require('int2freq')
var randomADSR = require('../utils/randomADSR')
module.exports = function (ac) {
  var bass = bubblesMoreBubblesPlease(ac)
  bass.update(randomADSR(), ac.currentTime)
  return {
    play: function (data, key) {
      bass.update({freq: int2freq(data, key)}, ac.currentTime)
      bass.start(ac.currentTime)
    },
    connect: function (destination) {
      bass.connect(destination)
      return this
    }
  }
}

},{"../utils/randomADSR":18,"int2freq":10,"warlock-bass":16}],6:[function(require,module,exports){
var whiny = require('a-whining-capitalist')
var int2freq = require('int2freq')
var randomADSR = require('../utils/randomADSR')
module.exports = function (ac) {
  var piano = whiny(ac)
  piano.update(randomADSR(), ac.currentTime)
  return {
    play: function (data, key) {
      piano.update({freq: int2freq(data , key)}, ac.currentTime)
      piano.start(ac.currentTime)
    },
    connect: function (destination) {
      piano.connect(destination)
      return this
    }
  }
}

},{"../utils/randomADSR":18,"a-whining-capitalist":8,"int2freq":10}],7:[function(require,module,exports){
module.exports = function (gainNode, when, adsr) {
  gainNode.gain.exponentialRampToValueAtTime(adsr.peak, when + adsr.attack)
  gainNode.gain.exponentialRampToValueAtTime(adsr.mid, when + adsr.attack + adsr.decay)
  gainNode.gain.setValueAtTime(adsr.mid, when + adsr.sustain + adsr.attack + adsr.decay)
  gainNode.gain.exponentialRampToValueAtTime(adsr.end, when + adsr.sustain + adsr.attack + adsr.decay + adsr.release)
}

},{}],8:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var MIDIUtils = require('midiutils')
var adsr = require('a-d-s-r')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var oscillator1 = ac.createOscillator(ac)
  oscillator1.type = 'triangle'
  oscillator1.detune.value = Math.random()
  var oscillator2 = ac.createOscillator(ac)
  oscillator2.type = 'square'
  oscillator2.detune.value = Math.random()
  var oscillator3 = ac.createOscillator(ac)
  oscillator3.type = 'sawtooth'
  oscillator3.detune.value = Math.random()
  var oscillator4 = ac.createOscillator(ac)
  oscillator4.type = 'sine'
  oscillator4.detune.value = Math.random()

  var oscillator5 = ac.createOscillator(ac)
  oscillator5.type = 'sawtooth'
  oscillator5.detune.value = Math.random()
  var oscillator6 = ac.createOscillator(ac)
  oscillator6.type = 'triangle'
  oscillator6.detune.value = Math.random()

  var delayA = ac.createDelay(0.2322)
  var delayB = ac.createDelay(0.252752313103222)
  var delayC = ac.createDelay(0.27222)

  var filterA = ac.createBiquadFilter()
  filterA.Q.value = 12
  filterA.type = 'peaking'
  filterA.detune.value = Math.random()


  // that one distortion curve that everyone copy pastes from stack overflow anyways

  // make a distortion pedal! yay!
  var distortionA = ac.createWaveShaper()
  distortionA.curve = makeDistortionCurve(800)

  var filterB = ac.createBiquadFilter()
  filterB.Q.value = 12
  filterB.type = 'bandpass'
  filterB.detune.value = Math.random()

  // that one distortion curve that everyone copy pastes from stack overflow anyways

  // make a distortion pedal! yay!
  var distortionB = ac.createWaveShaper()
  distortionB.curve = makeDistortionCurve(100)

  var filterC = ac.createBiquadFilter()
  filterC.Q.value = 7
  filterC.type = 'lowpass'
  filterC.detune.value = Math.random()

  // that one distortion curve that everyone copy pastes from stack overflow anyways

  // make a distortion pedal! yay!
  var distortionC = ac.createWaveShaper()
  distortionC.curve = makeDistortionCurve(1000)



  var gainA = ac.createGain()
  gainA.gain.value = 0.333333333333333
  var gainB = ac.createGain()
  gainB.gain.value = 0.333333333333333
  var gainC = ac.createGain()
  gainC.gain.value = 0.333333333333333
  var gainZ = ac.createGain()
  gainZ.gain.value = 0.5



  var filterZ = ac.createBiquadFilter()
  filterZ.Q.value = 12
  filterZ.type = 'highshelf'
  filterZ.detune.value = Math.random()

  // that one distortion curve that everyone copy pastes from stack overflow anyways

  var delayZ = ac.createDelay(0.222)

  // make a distortion pedal! yay!
  var distortionZ = ac.createWaveShaper()
  distortionZ.curve = makeDistortionCurve(750)
  distortionZ.oversample = '4x'


  var volume = ac.createGain()
  volume.gain.setValueAtTime(0, ac.currentTime)

  //  START OF CHAIN (NOT MARKOV)

  oscillator1.connect(delayA)

  oscillator5.connect(filterA.frequency)
  oscillator5.connect(gainZ.gain)
  oscillator5.frequency.value = 0.133

  oscillator4.connect(delayB)
  oscillator6.connect(filterB.frequency)
  oscillator6.connect(gainC.gain)
  oscillator6.frequency.value = 0.273

  oscillator2.connect(delayC)
  oscillator3.connect(delayC)

  delayA.connect(filterA)
  delayB.connect(filterB)
  delayC.connect(filterC)

  filterA.connect(gainA)
  filterB.connect(gainB)
  filterC.connect(gainC)

  oscillator1.connect(gainA)
  oscillator5.connect(gainA)

  oscillator4.connect(gainB)
  oscillator6.connect(gainB)

  oscillator2.connect(gainC)
  oscillator3.connect(gainC)

  gainA.connect(distortionA)
  gainB.connect(distortionB)
  gainC.connect(distortionC)

  distortionC.connect(delayZ)
  delayZ.connect(filterZ)
  distortionC.connect(gainZ)
  filterZ.connect(gainZ)
  gainZ.connect(distortionZ)

  distortionA.connect(volume)
  distortionB.connect(volume)
  distortionZ.connect(volume)
  // END OF CHAIN

  audioNodes.oscillator1 = oscillator1
  audioNodes.oscillator2 = oscillator2
  audioNodes.oscillator3 = oscillator3
  audioNodes.oscillator4 = oscillator4
  audioNodes.oscillator5 = oscillator5
  audioNodes.oscillator6 = oscillator6
  audioNodes.delayA = delayA
  audioNodes.delayB = delayB
  audioNodes.delayC = delayC
  audioNodes.delayZ = delayZ
  audioNodes.gainA = gainA
  audioNodes.gainB = gainB
  audioNodes.gainC = gainC
  audioNodes.filterA = filterA
  audioNodes.filterB = filterB
  audioNodes.filterC = filterC
  audioNodes.filterZ = filterZ
  audioNodes.distortionA = distortionA
  audioNodes.distortionB = distortionB
  audioNodes.distortionC = distortionC
  audioNodes.distortionZ = distortionZ
  audioNodes.volume = volume
  audioNodes.settings = {
    attack: 0.01,
    decay: 0.05,
    sustain: 0.4,
    release: 0.1,
    peak: 0.3,
    mid: 0.1,
    end: 0.00000000000001 // lol idk wtf
  }

  // bzzzzz
  oscillator1.start(ac.currentTime)
  oscillator2.start(ac.currentTime)
  oscillator3.start(ac.currentTime)
  oscillator4.start(ac.currentTime)
  oscillator5.start(ac.currentTime)
  oscillator6.start(ac.currentTime)

  return {
    connect: function (input) {
      audioNodes.volume.connect(input)
    },
    start: function (when) {
      adsr(audioNodes.volume, when, audioNodes.settings)
    },
    stop: function (when) {
      console.log('SOMETIMES I DOUBT YR COMMITMENT 2 THE PARTY\np.s. yr oscillators are destroyed, make a new synth plz')
      oscillator1.stop(when)
      oscillator2.stop(when)
      oscillator3.stop(when)
      oscillator4.stop(when)
      oscillator5.stop(when)
      oscillator6.stop(when)
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, lfoL: , lfoR: , freq, attack: , decay: , sustain: , release: , peak: , mid:}
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v

          audioNodes.oscillator1.frequency.setValueAtTime(freq * 2.0, when)
          audioNodes.oscillator2.frequency.setValueAtTime(freq * 2.0, when)
          audioNodes.oscillator3.frequency.setValueAtTime(freq * 8.0, when)
          audioNodes.oscillator4.frequency.setValueAtTime(freq * 4.0, when)
          audioNodes.oscillator5.frequency.setValueAtTime(freq * 2.0, when)
          audioNodes.oscillator6.frequency.setValueAtTime(freq * 4.0, when)

          filterA.frequency.setValueAtTime(freq / (2 + Math.random()), when)
          filterB.frequency.setValueAtTime(freq * (2 + Math.random()), when)
          filterC.frequency.setValueAtTime(freq / (Math.random()), when)
          filterZ.frequency.setValueAtTime(freq * (1.5 + Math.random()), when)

        } else if (k == 'lfoL' || k == 'lfoR') {
          var node = k == 'lfoL' ? audioNodes.oscillator5 : audioNodes.oscillator6
          node.frequency.setValueAtTime(v, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":7,"make-distortion-curve":11,"midiutils":12}],9:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var MIDIUtils = require('midiutils')
var adsr = require('a-d-s-r')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var osc1 = ac.createOscillator()
  var osc2 = ac.createOscillator()
  osc1.type = 'square'
  osc2.type = 'square'

  // add some funk to that
  osc1.detune.setValueAtTime(-Math.random(), ac.currentTime)
  osc2.detune.setValueAtTime(Math.random(), ac.currentTime)

  var ldistortion = ac.createWaveShaper()
  ldistortion.curve = makeDistortionCurve(850 + ~~(Math.random() * 450))
  ldistortion.oversample = '4x'

  var rdistortion = ac.createWaveShaper()
  rdistortion.curve = makeDistortionCurve(850 + ~~(Math.random() * 450))
  rdistortion.oversample = '4x'

  var leftfilter = ac.createBiquadFilter()
  leftfilter.type = 'lowpass'
  leftfilter.Q.value = 15
  leftfilter.frequency.setValueAtTime(500, ac.currentTime)

  var rightfilter = ac.createBiquadFilter()
  rightfilter.type = 'lowpass'
  rightfilter.Q.value = 15
  rightfilter.frequency.setValueAtTime(500, ac.currentTime)

  var compressor = ac.createDynamicsCompressor()
  compressor.threshold.value = -50
  compressor.knee.value = 50
  compressor.ratio.value = 18
  compressor.reduction.value = -5
  compressor.attack.value = 0.05
  compressor.release.value = 0.05

  var pregain = ac.createGain()
  pregain.gain.setValueAtTime(0.7, ac.currentTime)
//
  var oscsine = ac.createOscillator()
  oscsine.type = 'sine'
  var delay = ac.createDelay(0.1)
  var sinedist = ac.createWaveShaper()
  sinedist.curve = makeDistortionCurve(1000)
  var delay2 = ac.createDelay(0.13)
  var sinegain = ac.createGain()
  sinegain.gain.setValueAtTime(0.25, ac.currentTime)
//
  var mainfilter = ac.createBiquadFilter()
  mainfilter.type = 'lowshelf'
  mainfilter.Q.value = 20
  mainfilter.frequency.setValueAtTime(500, ac.currentTime)

  var finaldist = ac.createWaveShaper()
  finaldist.curve = makeDistortionCurve(1000)
  finaldist.oversample = '4x'
  var delay2 = ac.createDelay(0.23)

  var maingain = ac.createGain()
  maingain.gain.setValueAtTime(0, ac.currentTime)



//
  osc1.connect(ldistortion)
  ldistortion.connect(leftfilter)
  leftfilter.connect(compressor)
//
  osc2.connect(rdistortion)
  rdistortion.connect(rightfilter)
  rightfilter.connect(compressor)
//
  compressor.connect(pregain)
//
  oscsine.connect(delay)
  delay.connect(sinedist)
  oscsine.connect(sinedist)
  sinedist.connect(delay2)
  delay2.connect(sinegain)
  sinedist.connect(sinegain)
//
  pregain.connect(mainfilter)
  sinegain.connect(mainfilter)
  mainfilter.connect(maingain)

  audioNodes.osc1 = osc1
  audioNodes.osc2 = osc2
  audioNodes.oscsine = oscsine
  audioNodes.ldistortion = ldistortion
  audioNodes.rdistortion = rdistortion
  audioNodes.leftfilter = leftfilter
  audioNodes.rightfilter = rightfilter
  audioNodes.mainfilter = mainfilter
  audioNodes.maingain = maingain
  audioNodes.pregain = pregain
  audioNodes.sinegain = sinegain
  audioNodes.delay = delay
  audioNodes.delay2 = delay2
  audioNodes.sinedist = sinedist
  audioNodes.compressor = compressor

  // gosh i wish there was an audioNode that just did this...
  audioNodes.settings = {
    attack: 0.1,
    decay: 0.05,
    sustain: 0.3,
    release: 0.1,
    peak: 0.5,
    mid: 0.3,
    end: 0.0000000001,
    detune: 1,
    chord: false // TODO: build chords instead of playing huge notes as an option?
  }

  return {
    connect: function (input) {
      // // this function should call `connect` on yr output nodes with `input` as the arg
      audioNodes.maingain.connect(input)

      // just let them buzz forever, deal with "notes" via adsr tricks
      audioNodes.osc1.start(ac.currentTime)
      audioNodes.osc2.start(ac.currentTime)
      audioNodes.oscsine.start(ac.currentTime)
    },
    start: function (when) {
      adsr(audioNodes.maingain, when, audioNodes.settings)
    },
    stop: function (when) {
      audioNodes.osc1.stop(when)
      audioNodes.osc2.stop(when)
      audioNodes.oscsine.stop(when)
      console.log('whyd u let the bass go? gotta catch a new one now!!!!')
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, attack: , decay: , sustain: , release: }
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v
          audioNodes.leftfilter.frequency.linearRampToValueAtTime(freq + (freq / (2 + Math.random())), when + Math.random())
          audioNodes.rightfilter.frequency.linearRampToValueAtTime(freq + (freq / (2 + Math.random())), when + Math.random())
          audioNodes.mainfilter.frequency.linearRampToValueAtTime(freq - (freq / (1.5 + Math.random())), when + Math.random())

          audioNodes.osc1.frequency.setValueAtTime(freq / 4.0, when)
          audioNodes.osc2.frequency.setValueAtTime(freq / 4.0, when)
          audioNodes.oscsine.frequency.setValueAtTime(freq / 4.0, when)
          // add some funk to that
          audioNodes.osc1.detune.setValueAtTime(audioNodes.settings.detune * -Math.random(), when)
          audioNodes.osc2.detune.setValueAtTime(audioNodes.settings.detune * Math.random(), when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":7,"make-distortion-curve":11,"midiutils":12}],10:[function(require,module,exports){
var scales = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2],
  pentMaj: [2, 2, 3, 2, 3],
  pentMin: [3, 2, 2, 3, 2],
  blues: [3, 2, 1, 1, 3, 2]
}

var str2freq = {
  'A0': 27.5000, 'A#0': 29.1352, 'B0': 30.8677, 'C1': 32.7032, 'C#1': 34.6478,
  'D1': 36.7081, 'D#1': 38.8909, 'E1': 41.2034, 'F1': 43.6535, 'F#1': 46.2493,
  'G1': 48.9994, 'G#1': 51.9131, 'A1': 55.0000, 'A#1': 58.2705, 'B1': 61.7354,
  'C2': 65.4064, 'C#2': 69.2957, 'D2': 73.4162, 'D#2': 77.7817, 'E2': 82.4069,
  'F2': 87.3071, 'F#2': 92.4986, 'G2': 97.9989, 'G#2': 103.826, 'A2': 110.000,
  'A#2': 116.541, 'B2': 123.471, 'C3': 130.813, 'C#3': 138.591, 'D3': 146.832,
  'D#3': 155.563, 'E3': 164.814, 'F3': 174.614, 'F#3': 184.997, 'G3': 195.998,
  'G#3': 207.652, 'A3': 220.000, 'A#3': 233.082, 'B3': 246.942, 'C4': 261.626,
  'C#4': 277.183, 'D4': 293.665, 'D#4': 311.127, 'E4': 329.628, 'F4': 349.228,
  'F#4': 369.994, 'G4': 391.995, 'G#4': 415.305, 'A4': 440.000, 'A#4': 466.164,
  'B4': 493.883, 'C5': 523.251, 'C#5': 554.365, 'D5': 587.330, 'D#5': 622.254,
  'E5': 659.255, 'F5': 698.456, 'F#5': 739.989, 'G5': 783.991, 'G#5': 830.609,
  'A5': 880.000, 'A#5': 932.328, 'B5': 987.767, 'C6': 1046.50, 'C#6': 1108.73,
  'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98,
  'G6': 1567.98, 'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53,
  'C7': 2093.00, 'C#7': 2217.46, 'D7': 2349.32, 'D#7': 2489.02, 'E7': 2637.02,
  'F7': 2793.83, 'F#7': 2959.96, 'G7': 3135.96, 'G#7': 3322.44, 'A7': 3520.00,
  'A#7': 3729.31, 'B7': 3951.07, 'C8': 4186.01
}

var notes = Object.keys(str2freq)

function int2freq(intNote, options){
  var index, scale;
  if((index = notes.indexOf(options.tonic)) === -1) throw 'what is up with that tonic?'
  if(!(scale = scales[options.scale])) throw 'what is up with that scale?'
  while (Math.abs(intNote) > scale.length) scale = scale.concat(scale)
  if(intNote >= 0) for (var i = 0; i < intNote; index += scale[i], i+= 1 ){}
  else for (var j = -1; j >= intNote; index -= scale[scale.length + j], j-= 1){}
  return str2freq[notes[index]]
}

module.exports = int2freq
module.exports.scales = Object.keys(scales)
module.exports.notes = Object.keys(notes)
},{}],11:[function(require,module,exports){
module.exports = function(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}

},{}],12:[function(require,module,exports){
(function() {

	var noteMap = {};
	var noteNumberMap = [];
	var notes = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];


	for(var i = 0; i < 127; i++) {

		var index = i,
			key = notes[index % 12],
			octave = ((index / 12) | 0) - 1; // MIDI scale starts at octave = -1

		if(key.length === 1) {
			key = key + '-';
		}

		key += octave;

		noteMap[key] = i;
		noteNumberMap[i] = key;

	}


	function getBaseLog(value, base) {
		return Math.log(value) / Math.log(base);
	}


	var MIDIUtils = {

		noteNameToNoteNumber: function(name) {
			return noteMap[name];
		},

		noteNumberToFrequency: function(note) {
			return 440.0 * Math.pow(2, (note - 69.0) / 12.0);
		},

		noteNumberToName: function(note) {
			return noteNumberMap[note];
		},

		frequencyToNoteNumber: function(f) {
			return Math.round(12.0 * getBaseLog(f / 440.0, 2) + 69);
		}

	};


	// Make it compatible for require.js/AMD loader(s)
	if(typeof define === 'function' && define.amd) {
		define(function() { return MIDIUtils; });
	} else if(typeof module !== 'undefined' && module.exports) {
		// And for npm/node.js
		module.exports = MIDIUtils;
	} else {
		this.MIDIUtils = MIDIUtils;
	}


}).call(this);


},{}],13:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var MIDIUtils = require('midiutils')
var adsr = require('a-d-s-r')

// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var osc1 = ac.createOscillator()
  var osc2 = ac.createOscillator()
  var osc3 = ac.createOscillator()
  var oscnoise = ac.createOscillator()
  osc1.type = 'triangle'
  osc2.type = 'triangle'
  osc3.type = 'sine'
  oscnoise.type = 'sawtooth'

  // are these tooooo small?
  osc1.detune.value = 0.75 * ((Math.random() * 2) - 1)
  osc2.detune.value = 0.75 * ((Math.random() * 2) - 1)
  osc3.detune.value = 0.3 * ((Math.random() * 2) - 1)

  var leftfilter = ac.createBiquadFilter()
  leftfilter.type = 'lowpass'
  leftfilter.Q.value = 7
  leftfilter.detune.value = 0.75 * ((Math.random() * 2) - 1)
  leftfilter.frequency.setValueAtTime(500, ac.currentTime)

  var rightfilter = ac.createBiquadFilter()
  rightfilter.type = 'lowpass'
  rightfilter.Q.value = 7
  rightfilter.detune.value = 0.75 * ((Math.random() * 2) - 1)
  rightfilter.frequency.setValueAtTime(500, ac.currentTime)


  var noisegain = ac.createGain()
  noisegain.gain.setValueAtTime(0, ac.currentTime)

  var delay = ac.createDelay(0.35)

  var compressor = ac.createDynamicsCompressor()
  compressor.threshold.value = -30
  compressor.knee.value = 33
  compressor.ratio.value = 9
  compressor.reduction.value = -10
  compressor.attack.value = 0.15
  compressor.release.value = 0.35

  var gain = ac.createGain()
  gain.gain.setValueAtTime(0, ac.currentTime)


  var distortion = ac.createWaveShaper()
  distortion.curve = makeDistortionCurve(75)

  var mainfilter = ac.createBiquadFilter()
  mainfilter.type = 'lowpass'
  mainfilter.frequency.setValueAtTime(500, ac.currentTime)

  oscnoise.connect(noisegain)
  osc1.connect(leftfilter)
  osc2.connect(rightfilter)
  leftfilter.connect(compressor)
  rightfilter.connect(compressor)
  osc3.connect(compressor)
  noisegain.connect(delay)
  noisegain.connect(distortion)
  delay.connect(compressor)
  compressor.connect(gain)
  gain.connect(distortion)
  distortion.connect(mainfilter)

  // gotta be a better way to do this... oh well
  audioNodes.oscnoise = oscnoise
  audioNodes.noisegain = noisegain
  audioNodes.osc1 = osc1
  audioNodes.osc2 = osc2
  audioNodes.osc3 = osc3
  audioNodes.leftfilter = leftfilter
  audioNodes.rightfilter = rightfilter
  audioNodes.mainfilter = mainfilter
  audioNodes.gain = gain
  audioNodes.delay = delay
  audioNodes.distortion = distortion
  audioNodes.compressor = compressor

  // gosh i wish there was an audioNode that just did this...
  audioNodes.settings = {
    attack: 0.1,
    decay: 0.05,
    sustain: 0.3,
    release: 0.1,
    peak: 0.5,
    mid: 0.3,
    end: 0.000001
  }
    // just let them buzz forever, deal with "notes" via adsr tricks
  audioNodes.oscnoise.start(ac.currentTime)
  audioNodes.osc1.start(ac.currentTime)
  audioNodes.osc2.start(ac.currentTime)
  audioNodes.osc3.start(ac.currentTime)
  return {
    connect: function (input) {
      // // this function should call `connect` on yr output nodes with `input` as the arg
      audioNodes.mainfilter.connect(input)
    },
    start: function (when) {
      // console.log('start', audioNodes.settings)

      adsr(audioNodes.gain, when, audioNodes.settings)
      // console.log('one')
      var cloned = JSON.parse(JSON.stringify(audioNodes.settings))
      cloned.peak /= 2.0
      cloned.mid /= 2.0
      // console.log('didit', cloned)
      adsr(audioNodes.noisegain, when, cloned)
    },
    stop: function (when) {
      audioNodes.oscnoise.stop(when)
      audioNodes.osc1.stop(when)
      audioNodes.osc2.stop(when)
      audioNodes.osc3.stop(when)
      console.log('whyd u push the piano off the building? not it is broken, forever. gotta make a new one!')
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, attack: , decay: , sustain: , release: }
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v
          audioNodes.leftfilter.frequency.setValueAtTime(freq + (Math.random() * (freq / 2.5)), when)
          audioNodes.rightfilter.frequency.setValueAtTime(freq + (Math.random() * (freq / 2.5)), when)
          audioNodes.mainfilter.frequency.setValueAtTime(freq + (Math.random() * (freq / 3.5)), when)
          audioNodes.oscnoise.frequency.setValueAtTime(freq, when)
          audioNodes.osc1.frequency.setValueAtTime(freq, when)
          audioNodes.osc2.frequency.setValueAtTime(freq, when)
          audioNodes.osc3.frequency.setValueAtTime(freq / 2.0, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":7,"make-distortion-curve":11,"midiutils":12}],14:[function(require,module,exports){
'use strict';

/**
 * Randomize the order of the elements in a given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Boolean} [options.copy] - Sets if should return a shuffled copy of the given array. By default it's a falsy value.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Array}
 */
function shuffle(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle expect an array as parameter.');
  }

  options = options || {};

  var collection = arr,
      len = arr.length,
      rng = options.rng || Math.random,
      random,
      temp;

  if (options.copy === true) {
    collection = arr.slice();
  }

  while (len) {
    random = Math.floor(rng() * len);
    len -= 1;
    temp = collection[len];
    collection[len] = collection[random];
    collection[random] = temp;
  }

  return collection;
};

/**
 * Pick one or more random elements from the given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Number} [options.picks] - Specifies how many random elements you want to pick. By default it picks 1.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Object}
 */
shuffle.pick = function(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle.pick() expect an array as parameter.');
  }

  options = options || {};

  var rng = options.rng || Math.random,
      picks = options.picks || 1;

  if (typeof picks === 'number' && picks !== 1) {
    var len = arr.length,
        collection = arr.slice(),
        random = [],
        index;

    while (picks && len) {
      index = Math.floor(rng() * len);
      random.push(collection[index]);
      collection.splice(index, 1);
      len -= 1;
      picks -= 1;
    }

    return random;
  }

  return arr[Math.floor(rng() * arr.length)];
};

/**
 * Expose
 */
module.exports = shuffle;

},{}],15:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var MIDIUtils = require('midiutils')
var adsr = require('a-d-s-r')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var oscillator1 = ac.createOscillator(ac)
  oscillator1.type = 'triangle'
  oscillator1.detune.value = Math.random()
  var oscillator2 = ac.createOscillator(ac)
  oscillator2.type = 'triangle'
  oscillator2.detune.value = Math.random()
  var oscillator3 = ac.createOscillator(ac)
  oscillator3.type = 'sawtooth'
  oscillator3.detune.value = Math.random()
  var oscillator4 = ac.createOscillator(ac)
  oscillator4.type = 'triangle'
  oscillator4.detune.value = Math.random()

  var oscillator5 = ac.createOscillator(ac)
  oscillator5.type = 'sine'
  oscillator5.detune.value = Math.random()
  var oscillator6 = ac.createOscillator(ac)
  oscillator6.type = 'sine'
  oscillator6.detune.value = Math.random()


  var delayA = ac.createDelay(0.01322)

  var delayB = ac.createDelay(0.0152752313103222)


  var delayC = ac.createDelay(0.017222)

var filterA = ac.createBiquadFilter()
filterA.Q.value = 12
filterA.type = 'highpass'
filterA.detune.value = Math.random()


// that one distortion curve that everyone copy pastes from stack overflow anyways

// make a distortion pedal! yay!
var distortionA = ac.createWaveShaper()
distortionA.curve = makeDistortionCurve(100)

var filterB = ac.createBiquadFilter()
filterB.Q.value = 12
filterB.type = 'highpass'
filterB.detune.value = Math.random()

// that one distortion curve that everyone copy pastes from stack overflow anyways

// make a distortion pedal! yay!
var distortionB = ac.createWaveShaper()
distortionB.curve = makeDistortionCurve(100)

var filterC = ac.createBiquadFilter()
filterC.Q.value = 7
filterC.type = 'lowpass'
filterC.detune.value = Math.random()

// that one distortion curve that everyone copy pastes from stack overflow anyways

// make a distortion pedal! yay!
var distortionC = ac.createWaveShaper()
distortionC.curve = makeDistortionCurve(100)



var gainA = ac.createGain()
gainA.gain.value = 0.333333333333333
var gainB = ac.createGain()
gainB.gain.value = 0.333333333333333
var gainC = ac.createGain()
gainC.gain.value = 0.333333333333333
var gainZ = ac.createGain()
gainZ.gain.value = 0.5



var filterZ = ac.createBiquadFilter()
filterZ.Q.value = 12
filterZ.type = 'highshelf'
filterZ.detune.value = Math.random()

// that one distortion curve that everyone copy pastes from stack overflow anyways

var delayZ = ac.createDelay(0.0122)

// make a distortion pedal! yay!
var distortionZ = ac.createWaveShaper()
distortionZ.curve = makeDistortionCurve(100)


  var volume = ac.createGain()
  volume.gain.setValueAtTime(0, ac.currentTime)

  //  START OF CHAIN (NOT MARKOV)

  oscillator1.connect(delayA)

  oscillator5.connect(filterA.frequency)
  oscillator5.connect(gainZ.gain)
  oscillator5.frequency.value = 0.133

  oscillator4.connect(delayB)
  oscillator6.connect(filterB.frequency)
  oscillator6.connect(gainC.gain)
  oscillator6.frequency.value = 0.273

  oscillator2.connect(delayC)
  oscillator3.connect(delayC)

  delayA.connect(filterA)
  delayB.connect(filterB)
  delayC.connect(filterC)

  filterA.connect(gainA)
  filterB.connect(gainB)
  filterC.connect(gainC)

  oscillator1.connect(gainA)
  oscillator5.connect(gainA)

  oscillator4.connect(gainB)
  oscillator6.connect(gainB)

  oscillator2.connect(gainC)
  oscillator3.connect(gainC)

  gainA.connect(distortionA)
  gainB.connect(distortionB)
  gainC.connect(distortionC)

  distortionC.connect(delayZ)
  delayZ.connect(filterZ)
  distortionC.connect(gainZ)
  filterZ.connect(gainZ)
  gainZ.connect(distortionZ)

  distortionA.connect(volume)
  distortionB.connect(volume)
  distortionZ.connect(volume)
  // END OF CHAIN

  audioNodes.oscillator1 = oscillator1
  audioNodes.oscillator2 = oscillator2
  audioNodes.oscillator3 = oscillator3
  audioNodes.oscillator4 = oscillator4
  audioNodes.oscillator5 = oscillator5
  audioNodes.oscillator6 = oscillator6
  audioNodes.delayA = delayA
  audioNodes.delayB = delayB
  audioNodes.delayC = delayC
  audioNodes.delayZ = delayZ
  audioNodes.gainA = gainA
  audioNodes.gainB = gainB
  audioNodes.gainC = gainC
  audioNodes.filterA = filterA
  audioNodes.filterB = filterB
  audioNodes.filterC = filterC
  audioNodes.filterZ = filterZ
  audioNodes.distortionA = distortionA
  audioNodes.distortionB = distortionB
  audioNodes.distortionC = distortionC
  audioNodes.distortionZ = distortionZ
  audioNodes.volume = volume
  audioNodes.settings = {
    attack: 0.01,
    decay: 0.05,
    sustain: 0.4,
    release: 0.1,
    peak: 0.3,
    mid: 0.1,
    end: 0.00000000000001 // lol idk wtf
  }

  // bzzzzz
  oscillator1.start(ac.currentTime)
  oscillator2.start(ac.currentTime)
  oscillator3.start(ac.currentTime)
  oscillator4.start(ac.currentTime)
  oscillator5.start(ac.currentTime)
  oscillator6.start(ac.currentTime)

  return {
    connect: function (input) {
      audioNodes.volume.connect(input)
    },
    start: function (when) {
      adsr(audioNodes.volume, when, audioNodes.settings)
    },
    stop: function (when) {
      console.log('SOMETIMES I DOUBT YR COMMITMENT 2 SPARKLE MOTION\np.s. yr oscillators are destroyed, make a new synth plz')
      oscillator1.stop(when)
      oscillator2.stop(when)
      oscillator3.stop(when)
      oscillator4.stop(when)
      oscillator5.stop(when)
      oscillator6.stop(when)
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, lfoL: , lfoR: , freq, attack: , decay: , sustain: , release: , peak: , mid:}
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v

          audioNodes.oscillator1.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator2.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator3.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator4.frequency.setValueAtTime(freq, when)

          filterA.frequency.setValueAtTime(freq / (2 + Math.random()), when)
          filterB.frequency.setValueAtTime(freq / (2 + Math.random()), when)
          filterC.frequency.setValueAtTime(freq / (Math.random()), when)
          filterZ.frequency.setValueAtTime(freq / (1.5 + Math.random()), when)

        } else if (k == 'lfoL' || k == 'lfoR') {
          var node = k == 'lfoL' ? audioNodes.oscillator5 : audioNodes.oscillator6
          node.frequency.setValueAtTime(v, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":7,"make-distortion-curve":11,"midiutils":12}],16:[function(require,module,exports){
var adsr = require('a-d-s-r')
var makeDistortionCurve = require('make-distortion-curve')

// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {
    one:  ac.createOscillator(),
    two:  ac.createOscillator(),
    three:  ac.createOscillator(),
    four:  ac.createOscillator(),
    lfo: ac.createOscillator(),
    filterlfogain: ac.createGain(),
    postfilterlfogain: ac.createGain(),
    pregain: ac.createGain(),
    postGain: ac.createGain(),
    filter: ac.createBiquadFilter(),
    delay: ac.createDelay(0.075),
    distortion: ac.createWaveShaper(),
    postFilter: ac.createBiquadFilter(),
    envelope: ac.createGain(),
    settings: {
      freq: 440,
      attack: 0.051,
      decay: 0.05,
      sustain: 0.21,
      release: 0.25,
      detune: 5,
      peak: 0.5,
      mid: 0.3,
      end: 0.000001
    }
  }

  audioNodes.one.type = 'square'
  audioNodes.two.type = 'sawtooth'
  audioNodes.three.type = 'sine'
  audioNodes.four.type = 'sawtooth'

  audioNodes.one.detune.setValueAtTime((((Math.random() * 2) - 1) * 1), ac.currentTime)
  audioNodes.two.detune.setValueAtTime((((Math.random() * 2) - 1) * 2), ac.currentTime)
  audioNodes.three.detune.setValueAtTime((((Math.random() * 2) - 1) * 3), ac.currentTime)
  audioNodes.four.detune.setValueAtTime((((Math.random() * 2) - 1) * 3), ac.currentTime)

  audioNodes.filter.type = 'lowpass'
  audioNodes.postFilter.type = 'peaking'

  audioNodes.filterlfogain.gain.value = 15050
  audioNodes.postfilterlfogain.gain.value = 10000

  audioNodes.lfo.connect(audioNodes.filterlfogain)
  audioNodes.lfo.connect(audioNodes.postfilterlfogain)
  audioNodes.filterlfogain.connect(audioNodes.filter.frequency)
  audioNodes.postfilterlfogain.connect(audioNodes.postFilter.frequency)

  audioNodes.distortion.curve = makeDistortionCurve(750)


  audioNodes.one.connect(audioNodes.pregain)
  audioNodes.two.connect(audioNodes.pregain)
  audioNodes.three.connect(audioNodes.pregain)
  audioNodes.four.connect(audioNodes.pregain)
  audioNodes.pregain.connect(audioNodes.filter)
  audioNodes.filter.connect(audioNodes.delay)
  audioNodes.delay.connect(audioNodes.postGain)
  audioNodes.filter.connect(audioNodes.distortion)
  audioNodes.distortion.connect(audioNodes.postGain)
  audioNodes.postGain.connect(audioNodes.postFilter)
  audioNodes.postFilter.connect(audioNodes.envelope)


  audioNodes.pregain.gain.setValueAtTime(1.0 / 3.0, ac.currentTime)
  audioNodes.postGain.gain.setValueAtTime(0.5, ac.currentTime)
  audioNodes.envelope.gain.setValueAtTime(0, ac.currentTime)
  audioNodes.lfo.frequency.setValueAtTime(1, ac.currentTime)

  audioNodes.one.start(ac.currentTime)
  audioNodes.two.start(ac.currentTime)
  audioNodes.three.start(ac.currentTime)
  audioNodes.four.start(ac.currentTime)
  audioNodes.lfo.start(ac.currentTime)

  return {
    connect: function (input) {
      audioNodes.envelope.connect(input)
    },
    start: function (when) {
      // //this function should call `start(when)` on yr source nodes. Probably oscillators/samplers i guess, and any LFO too!
      adsr(audioNodes.envelope, when, audioNodes.settings)
    },
    stop: function (when) {
      audioNodes.one.stop(when)
      audioNodes.two.stop(when)
      audioNodes.three.stop(when)
    },
    update: function (opts, when) {
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v
          audioNodes.one.frequency.setValueAtTime(freq / 4.0, when)
          audioNodes.two.frequency.setValueAtTime(freq / 2.0, when)
          audioNodes.three.frequency.setValueAtTime(freq / 8.0, when)
          audioNodes.four.frequency.setValueAtTime(freq / 4.0, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })

    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":7,"make-distortion-curve":11}],17:[function(require,module,exports){
module.exports = function (ac) {
  // TODO: probably put a light global reverb here as well, yeah
  var mainVolume = ac.createGain()
  mainVolume.connect(ac.destination)
  return {
    ac: ac,
    mainVolume: mainVolume,
    // reverb: reverb,
    bass: require('../instruments/bass')(ac).connect(mainVolume),
    piano: require('../instruments/piano')(ac).connect(mainVolume),
    warbass: require('../instruments/warbass')(ac).connect(mainVolume),
    whiny: require('../instruments/whiny')(ac).connect(mainVolume),
    sparkle: require('../instruments/sparkle')(ac).connect(mainVolume),
    // etc. etc. etc. forever
  }
}
},{"../instruments/bass":2,"../instruments/piano":3,"../instruments/sparkle":4,"../instruments/warbass":5,"../instruments/whiny":6}],18:[function(require,module,exports){
module.exports = function () {
	return {
		attack: Math.random(),
		decay: Math.random(),
		sustain: Math.random(),
		release: Math.random()
	}

}

// {attack: 0.2751, decay: 0.14315, sustain: 0.1431, release: 0.1421}
},{}],19:[function(require,module,exports){
module.exports = function () {
	return {
		bpm: ~~(Math.random() * 350) + 50,
		key: {
			tonic: pick(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A#', 'C#', 'D#', 'F#', 'G#']) + (~~(Math.random() * 3) + 2),
			scale: pick(['pentMin', 'pentMaj', 'blues', 'minor', 'major'])
		},
		advanceMod: 1
	}
}

// {
//   "bpm": 260,
//   "key": {
//     "tonic": "E2",
//     "scale": "pentMin"
//   },
//   "advanceMod": 1
// }

function pick (arr) {
  return arr[~~(Math.random() * arr.length)]
}
},{}],20:[function(require,module,exports){
module.exports = function (length) {

	return {
		data: [
			makeData(length),
			makeData(length),
			makeData(length)
		],
		probs: [
			makeProbs(length),
			makeProbs(length),
			makeProbs(length)
		],
		nexts: makeNexts(3),



		config: {
			mod: ~~(Math.random() * 4)
		}
	}
}

// console.log(makeData(8))

function makeNexts(total) {
	var nexts = []
	for (var i = 0; i < total; i++) {
		nexts.push([i, ~~(Math.random() * total), ~~(Math.random() * total), ~~(Math.random() * total)])
	}
	return nexts
}

function makeProbs(num) {
	var probs = []
	for (var i = 0; i < num; i++) {
		probs.push(Math.random())
	}
	return probs
}

function makeData(num) {
	var data = []
	for (var i = 0; i < num; i++) {
		data.push(makeDatum())
	}
	return data
}

function makeDatum() {
	var datum = []
	var ellies = ~~(Math.random() * 4) + 1
	for (var i = 0; i < ellies; i++) {
		datum.push(getRandom())
	}
	return datum
}

function getRandom() {
	return ~~(Math.random() * 15) - 7
}
// console.log(getRandom())

  // {
  //   data: [
  //     [[2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7], [2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7]],
  //     [[-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5], [-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5]],
  //     [[-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2], [-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2]]
  //   ],
  //   probs: [
  //     [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
  //     [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
  //     [1, 0.5, 1, 0.75, 1, 0.5, 1, 0.5, 1, 0.75, 1, 0.75]
  //   ],
  //   nexts: [
  //     [0, 0, 1, 1, 2], [1, 1, 0, 0, 2], [2, 2, 2, 0, 1]
  //   ],
  //   config: {
  //     mod: 1
  //   }
  // },
},{}],21:[function(require,module,exports){
module.exports = function (args) {
  args = args || {}
  return {
    bpm: args.bpm || 120,
    advanceMod: args.advanceMod || 1,
    _interval: undefined,
    _counter: 0, // increments each loop
    _tick: 0, // increments each interval/beat
    _current: 0, // which section for each inst (verse, chorus, etc.)
    _nextCurrent: 0, // which section will be played next
    _instruments: [], // the instruments, lol
    _structure: undefined, // how to jump between the larger patterns
    onEnd: undefined, // called when the structure hits a `null`
    onSectionStart: undefined, // called when a pattern begins, passed a boolean that designates whether or not the section will update at the end of the current one
    comparator: function (random, prob) { // called to see if an instrument should be played, can be overwritten
      return random < prob
    },
    _roll: function (prob) {
      return this.comparator(Math.random(), prob)
    },
    start: function () {
      // make a list, check it twice,
      if (!this._instruments.length) throw new YouGotBitError('no data is bound')
      if (!this._structure) throw new YouGotBitError('no structure is bound')
      if (this._interval) throw new YouGotBitError('oops u tried to start another loop, way to go Steve Reich smdh')
      if (!this._instruments.some(instrument => instrument.lead)) throw new YouGotBitError('a lead instrument must be bound')

      // make the lead instrument be last, to simplify advancing the sequence later
      this._instruments.sort((a, b) => a.lead ? 1 : (b.lead ? -1 : 0))

      this._interval = setInterval(() => {

        this._instruments.forEach(instrument => {

          // grab the current section for this instrument (verse, chorus, etc.)
          var section = instrument.data[this._current]

          // if the section has a modulus value, see if this is it is on beat
          // i.e, mod 1: every beat, mod 2: every other beat
          // useful for creating breakdowns and bass drops
          var modulus = (section.config.mod || 1)
          var onItsBeat = this._tick % modulus === 0
          // also check if the instrument will play on the next turn, otherwise we will end patterns too soon
          var willPlayOnNextBeat = (this._tick + 1) % modulus === 0

          var willAdvanceOnNextBeat = (this._counter + 1) % this.advanceMod === 0

          if (instrument.lead && onItsBeat && section._tick === 0) {
            if (willAdvanceOnNextBeat) this._nextCurrent = pick(this._structure[this._current])
            if (this.onSectionStart) this.onSectionStart(this._current !== this._nextCurrent)
          }

          // if the section has a fill, and the pattern is gonna change next turn
          if (onItsBeat && section.fill && (this._current !== this._nextCurrent)) {
             // if the instrument is on it's beat, and wins the dice roll, play the fill
            if (onItsBeat && this._roll(section.fill.probs[section._tick])) {
              // play the FILLLLLLLLLL for that instrument, passing along a randomly chosen data  for that beat, along with the entire section object
              instrument.play(pick(section.fill.data[section._tick]), section)
            }
          // if the instrument is on it's beat, and wins the dice roll
          } else if (onItsBeat && this._roll(section.probs[section._current][section._tick])) {

            // play the instrument, passing along a randomly chosen data  for that beat, along with the entire section object
            instrument.play(pick(section.data[section._current][section._tick]), section)
          }

          // advance the counter for this section
          if (onItsBeat) section._tick++

          // if we are at the end of a section AND this instrument will play on the next beat
          if (section._tick === section.probs[section._current].length && willPlayOnNextBeat) {

            // reset the counter for this section
            section._tick = 0

            // pick a new pattern to play
            section._current = pick(section.nexts[section._current])

            // if the instrument is the lead
            if (instrument.lead) {
              this._counter++ // advance the loop counter

              // if we have played the loop some number of increments of the advanceModulus...
              if (this._counter % this.advanceMod === 0) {
                // ... pick a new section to play
                this._current = ~~this._nextCurrent
              }

              // if the new section is null or some other junk
              if (typeof this._current !== 'number') {
                alert('STOP')
                // the end of the song! erm, what to do here?
                // might want to be able to attach an onEnd callback thing
                // especially for mediaRecorder...
                this.stop()
                if (this.onEnd) this.onEnd()
              }
            }
          }
        })

        // advance the global counter
        this._tick++
      }, 60000.0 / this.bpm)
    },

    stop: function () {
      clearInterval(this._interval)
      this._interval = null
    },

    bind: function (lead, cb, data) {

      // if this instrument is labelled a "lead" but we already have a lead, that's a boo-boo
      if (lead && this._instruments.some(instrument => instrument.lead)) throw new YouGotBitError('a lead instrument is already bound')

      // check to see that every existing instrument in the sequencer...
      if (this._instruments.length) {

        // has the same number of larger patterns as the data being added...
        if (this._instruments.some(inst => inst.data.length !== data.length)) throw new YouGotBitError('data does not match existing data')
      }

      // if there is a structure bound, ...
      if (this._structure) {

        // ... check to see that it has as many patterns as there are in the bound data
        if (this._structure.length !== data.length) throw new YouGotBitError('data does not match existing structure')
      }

      // check that the data is valid, note/prob/next-wise
      var itIsGood = data.every((pattern) => {
        if (!(pattern.data.length === pattern.probs.length && pattern.data.length === pattern.nexts.length)) {
          throw new YouGotBitError('data/probs/nexts external mismatch')
        }
        if (pattern.nexts.some(i => i >= pattern.probs.length || i < 0)) {
          throw new YouGotBitError('nexts points to non-existent pattern')
        }
        return pattern.probs.every((loop, i) => {
          return loop.length === pattern.data[i].length
        })
      })

      if (!itIsGood) throw new YouGotBitError('data/probs internal mismatch')

      // add internal counter things to the bound data
      data = data.map(pattern => {
        pattern._current = 0
        pattern._tick = 0
        return pattern
      })

      // if we have made it this far, push forward!
      this._instruments.push({data: data, play: cb, lead: lead})
    },

    setStructure: function (data) {
      if (this._instruments.length) {
        if (this._instruments[0].data.length !== data.length) throw new YouGotBitError('structure does not match existing data')
      }
      this._structure = data
    }
  }
}

function pick (arr) {
  return arr[~~(Math.random() * arr.length)]
}

function YouGotBitError (msg) {
  this.name = 'YouGotBitError'
  this.message = msg
}

YouGotBitError.prototype = new Error()
YouGotBitError.prototype.constructor = YouGotBitError

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImluc3RydW1lbnRzL2Jhc3MuanMiLCJpbnN0cnVtZW50cy9waWFuby5qcyIsImluc3RydW1lbnRzL3NwYXJrbGUuanMiLCJpbnN0cnVtZW50cy93YXJiYXNzLmpzIiwiaW5zdHJ1bWVudHMvd2hpbnkuanMiLCJub2RlX21vZHVsZXMvYS1kLXMtci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hLXdoaW5pbmctY2FwaXRhbGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9idWJibGUtYmFzcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pbnQyZnJlcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tYWtlLWRpc3RvcnRpb24tY3VydmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWlkaXV0aWxzL3NyYy9NSURJVXRpbHMuanMiLCJub2RlX21vZHVsZXMvcGllLWFuby9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaHVmZmxlLWFycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrbGUtbW90aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3dhcmxvY2stYmFzcy9pbmRleC5qcyIsInV0aWxzL2J1aWxkSW5zdHJ1bWVudHMuanMiLCJ1dGlscy9yYW5kb21BRFNSLmpzIiwidXRpbHMvcmFuZG9tS2V5LmpzIiwidXRpbHMvcmFuZG9tU2VxdWVuY2UuanMiLCIuLi9zcGlkZXJiaXRlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHNiID0gcmVxdWlyZSgnc3BpZGVyYml0ZScpXG52YXIgc2h1ZmZsZSA9IHJlcXVpcmUoJ3NodWZmbGUtYXJyYXknKVxudmFyIG1ha2VDT25maWcgPSByZXF1aXJlKCcuL3V0aWxzL3JhbmRvbUtleScpXG5cbnZhciByYW5kb21TZXF1ZW5jZSA9IHJlcXVpcmUoJy4vdXRpbHMvcmFuZG9tU2VxdWVuY2UnKVxuXG5mdW5jdGlvbiBzb25nIChpbnN0cnVtZW50cykge1xuXHR2YXIgY29uZmlnID0gbWFrZUNPbmZpZygpXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNvbmZpZywgbnVsbCwgJ1xcdCcpKVxuXHR2YXIgc2VxID0gc2IoY29uZmlnKVxuXG5cblx0dmFyIGJhc3NkYXRhID0gW3JhbmRvbVNlcXVlbmNlKDgpXS5tYXAoZnVuY3Rpb24gKHNlY3Rpb24pIHtcblx0XHRzZWN0aW9uLmRhdGEgPSBzaHVmZmxlKHNlY3Rpb24uZGF0YSkubWFwKGZ1bmN0aW9uIChkYXRhQmxvY2spIHtcblx0XHRcdHJldHVybiBzaHVmZmxlKGRhdGFCbG9jaylcblx0XHR9KVxuXHRcdHNlY3Rpb24uY29uZmlnLm1vZCA9IHNodWZmbGUoWzEsIDIsIDMsIDRdKVswXVxuXHRcdHJldHVybiBzZWN0aW9uXG5cdH0pXG5cblx0c2VxLmJpbmQoZmFsc2UsIGZ1bmN0aW9uIChkYXRhLCBzZWN0aW9uKSB7XG5cdGluc3RydW1lbnRzLmJhc3MucGxheShkYXRhLCBjb25maWcua2V5KVxuXHR9LCBiYXNzZGF0YSlcblxuXG5cdHZhciBwZWVkYXRhID0gW3JhbmRvbVNlcXVlbmNlKDgpXS5tYXAoZnVuY3Rpb24gKHNlY3Rpb24pIHtcblx0XHRzZWN0aW9uLmRhdGEgPSBzaHVmZmxlKHNlY3Rpb24uZGF0YSkubWFwKGZ1bmN0aW9uIChkYXRhQmxvY2spIHtcblx0XHRcdHJldHVybiBzaHVmZmxlKGRhdGFCbG9jaylcblx0XHR9KVxuXHRcdHNlY3Rpb24uY29uZmlnLm1vZCA9IHNodWZmbGUoWzEsIDIsIDMsIDRdKVswXVxuXHRcdHJldHVybiBzZWN0aW9uXG5cdH0pXG5cblx0c2VxLmJpbmQodHJ1ZSwgZnVuY3Rpb24gKGRhdGEsIHNlY3Rpb24pIHtcblx0aW5zdHJ1bWVudHMucGlhbm8ucGxheShkYXRhLCBjb25maWcua2V5KVxuXHR9LCBwZWVkYXRhKVxuXG5cblx0dmFyIHZvZGF0YSA9IFtyYW5kb21TZXF1ZW5jZSg4KV0ubWFwKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG5cdFx0c2VjdGlvbi5kYXRhID0gc2h1ZmZsZShzZWN0aW9uLmRhdGEpLm1hcChmdW5jdGlvbiAoZGF0YUJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gc2h1ZmZsZShkYXRhQmxvY2spXG5cdFx0fSlcblx0XHRzZWN0aW9uLmNvbmZpZy5tb2QgPSBzaHVmZmxlKFsxLCAyLCAzLCA0XSlbMF1cblx0XHRyZXR1cm4gc2VjdGlvblxuXHR9KVxuXG5cdHNlcS5iaW5kKGZhbHNlLCBmdW5jdGlvbiAoZGF0YSwgc2VjdGlvbikge1xuXHRpbnN0cnVtZW50cy53aGlueS5wbGF5KGRhdGEsIGNvbmZpZy5rZXkpXG5cdH0sIHZvZGF0YSlcblxuXG5cdHZhciBndWlkYXRhID0gW3JhbmRvbVNlcXVlbmNlKDgpXS5tYXAoZnVuY3Rpb24gKHNlY3Rpb24pIHtcblx0XHRzZWN0aW9uLmRhdGEgPSBzaHVmZmxlKHNlY3Rpb24uZGF0YSkubWFwKGZ1bmN0aW9uIChkYXRhQmxvY2spIHtcblx0XHRcdHJldHVybiBzaHVmZmxlKGRhdGFCbG9jaylcblx0XHR9KVxuXHRcdHNlY3Rpb24uY29uZmlnLm1vZCA9IHNodWZmbGUoWzEsIDIsIDMsIDRdKVswXVxuXHRcdHJldHVybiBzZWN0aW9uXG5cdH0pXG5cblx0c2VxLmJpbmQoZmFsc2UsIGZ1bmN0aW9uIChkYXRhLCBzZWN0aW9uKSB7XG5cdGluc3RydW1lbnRzLndhcmJhc3MucGxheShkYXRhLCBjb25maWcua2V5KVxuXHR9LCBndWlkYXRhKVxuXG5cblx0dmFyIHN0cmRhdGEgPSBbcmFuZG9tU2VxdWVuY2UoOCldLm1hcChmdW5jdGlvbiAoc2VjdGlvbikge1xuXHRcdHNlY3Rpb24uZGF0YSA9IHNodWZmbGUoc2VjdGlvbi5kYXRhKS5tYXAoZnVuY3Rpb24gKGRhdGFCbG9jaykge1xuXHRcdFx0cmV0dXJuIHNodWZmbGUoZGF0YUJsb2NrKVxuXHRcdH0pXG5cblx0XHRzZWN0aW9uLmNvbmZpZy5tb2QgPSBzaHVmZmxlKFsxLCAyLCAzLCA0XSlbMF1cblx0XHRyZXR1cm4gc2VjdGlvblxuXHR9KVxuXG5cdHNlcS5iaW5kKGZhbHNlLCBmdW5jdGlvbiAoZGF0YSwgc2VjdGlvbikge1xuXHRcdGluc3RydW1lbnRzLnNwYXJrbGUucGxheShkYXRhLCBjb25maWcua2V5KVxuXHR9LCBzdHJkYXRhKVxuXG5cdHNlcS5zZXRTdHJ1Y3R1cmUoW1swXV0pXG5cblxuXG5cdHNlcS5vblNlY3Rpb25TdGFydCA9IGZ1bmN0aW9uICh1cGRhdGUpIHtcblx0XHRpZiAodXBkYXRlKSB7XG5cdFx0ICAvLyB0aGUgZ2xvYmFsIGN1cnJlbnQgcGF0dGVybiB0aGluZyBpcyBnb25uYSBjaGFuZ2Ugb24gdGhlIG5leHQgc2VjdGlvbiBzdGFydCB5byFcblx0XHQgIC8vIHdlIGNhbiBmaWd1cmUgb3V0IHdoYXQgdGhhdCBwYXR0ZXJuIHdpbGwgYmUgdGhhbmtzIHRvIHRoZSBzZXEgdGhpbmcuIG9iamVjdCBicm8uIGJ1ZGR5IVxuXHRcdH0gZWxzZSB7XG5cdFx0ICAvLyBqdXN0IGdyb292aW5nLlxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzZXFcbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIGFjID0gbmV3IChBdWRpb0NvbnRleHQgfHwgd2Via2l0QXVkaW9Db250ZXh0KSgpXG52YXIgaW5zdHJ1bWVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2J1aWxkSW5zdHJ1bWVudHMnKShhYylcbnZhciBzZXEgPSBzb25nKGluc3RydW1lbnRzKVxuXG5zZXEuc3RhcnQoKSIsInZhciBidWJibGVzTW9yZUJ1YmJsZXNQbGVhc2UgPSByZXF1aXJlKCdidWJibGUtYmFzcycpXG52YXIgaW50MmZyZXEgPSByZXF1aXJlKCdpbnQyZnJlcScpXG52YXIgcmFuZG9tQURTUiA9IHJlcXVpcmUoJy4uL3V0aWxzL3JhbmRvbUFEU1InKVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWMpIHtcbiAgdmFyIGJhc3MgPSBidWJibGVzTW9yZUJ1YmJsZXNQbGVhc2UoYWMpXG4gIGJhc3MudXBkYXRlKHJhbmRvbUFEU1IoKSwgYWMuY3VycmVudFRpbWUpXG4gIHJldHVybiB7XG4gICAgcGxheTogZnVuY3Rpb24gKGRhdGEsIGtleSkge1xuXG4gICAgICBpZiAoZGF0YSA+IDkpIGRhdGEgPSA5XG4gICAgICBpZiAoZGF0YSA8IC05KSBkYXRhID0gLTlcbiAgICAgIGJhc3MudXBkYXRlKHtmcmVxOiBpbnQyZnJlcShkYXRhLCBrZXkpfSwgYWMuY3VycmVudFRpbWUpXG4gICAgICBiYXNzLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICAgIH0sXG4gICAgY29ubmVjdDogZnVuY3Rpb24gKGRlc3RpbmF0aW9uKSB7XG4gICAgICBiYXNzLmNvbm5lY3QoZGVzdGluYXRpb24pXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfVxufVxuIiwidmFyIGdldEFQaWFub0Zyb21UaGVQaWFub01hbiA9IHJlcXVpcmUoJ3BpZS1hbm8nKVxudmFyIGludDJmcmVxID0gcmVxdWlyZSgnaW50MmZyZXEnKVxudmFyIHJhbmRvbUFEU1IgPSByZXF1aXJlKCcuLi91dGlscy9yYW5kb21BRFNSJylcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjKSB7XG4gIHZhciBwaWFubyA9IGdldEFQaWFub0Zyb21UaGVQaWFub01hbihhYylcbiAgcGlhbm8udXBkYXRlKHJhbmRvbUFEU1IoKSwgYWMuY3VycmVudFRpbWUpXG4gIHJldHVybiB7XG4gICAgcGxheTogZnVuY3Rpb24gKGRhdGEsIGtleSkge1xuICAgICAgaWYgKGRhdGEgPiA1KSBkYXRhID0gNVxuICAgICAgaWYgKGRhdGEgPCAtNSkgZGF0YSA9IC01XG4gICAgICBwaWFuby51cGRhdGUoe2ZyZXE6IGludDJmcmVxKGRhdGEsIGtleSl9LCBhYy5jdXJyZW50VGltZSlcbiAgICAgIHBpYW5vLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICAgIH0sXG4gICAgY29ubmVjdDogZnVuY3Rpb24gKGRlc3RpbmF0aW9uKSB7XG4gICAgICBwaWFuby5jb25uZWN0KGRlc3RpbmF0aW9uKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cbn1cbiIsInZhciBzcGFya2x5UGxlYXNlID0gcmVxdWlyZSgnc3BhcmtsZS1tb3Rpb24nKVxudmFyIGludDJmcmVxID0gcmVxdWlyZSgnaW50MmZyZXEnKVxudmFyIHJhbmRvbUFEU1IgPSByZXF1aXJlKCcuLi91dGlscy9yYW5kb21BRFNSJylcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjKSB7XG4gIHZhciBzcGFya2xlID0gc3BhcmtseVBsZWFzZShhYylcbiAgc3BhcmtsZS51cGRhdGUocmFuZG9tQURTUigpLCBhYy5jdXJyZW50VGltZSlcbiAgcmV0dXJuIHtcbiAgICBwbGF5OiBmdW5jdGlvbiAoZGF0YSwga2V5KSB7XG5cbiAgICAgIGlmIChkYXRhID4gNykgZGF0YSA9IDdcbiAgICAgIGlmIChkYXRhIDwgLTcpIGRhdGEgPSAtN1xuICAgICAgc3BhcmtsZS51cGRhdGUoe2ZyZXE6IGludDJmcmVxKGRhdGEsIGtleSl9LCBhYy5jdXJyZW50VGltZSlcbiAgICAgIHNwYXJrbGUuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gICAgfSxcbiAgICBjb25uZWN0OiBmdW5jdGlvbiAoZGVzdGluYXRpb24pIHtcbiAgICAgIHNwYXJrbGUuY29ubmVjdChkZXN0aW5hdGlvbilcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgYnViYmxlc01vcmVCdWJibGVzUGxlYXNlID0gcmVxdWlyZSgnd2FybG9jay1iYXNzJylcbnZhciBpbnQyZnJlcSA9IHJlcXVpcmUoJ2ludDJmcmVxJylcbnZhciByYW5kb21BRFNSID0gcmVxdWlyZSgnLi4vdXRpbHMvcmFuZG9tQURTUicpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhYykge1xuICB2YXIgYmFzcyA9IGJ1YmJsZXNNb3JlQnViYmxlc1BsZWFzZShhYylcbiAgYmFzcy51cGRhdGUocmFuZG9tQURTUigpLCBhYy5jdXJyZW50VGltZSlcbiAgcmV0dXJuIHtcbiAgICBwbGF5OiBmdW5jdGlvbiAoZGF0YSwga2V5KSB7XG4gICAgICBiYXNzLnVwZGF0ZSh7ZnJlcTogaW50MmZyZXEoZGF0YSwga2V5KX0sIGFjLmN1cnJlbnRUaW1lKVxuICAgICAgYmFzcy5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgICB9LFxuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChkZXN0aW5hdGlvbikge1xuICAgICAgYmFzcy5jb25uZWN0KGRlc3RpbmF0aW9uKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cbn1cbiIsInZhciB3aGlueSA9IHJlcXVpcmUoJ2Etd2hpbmluZy1jYXBpdGFsaXN0JylcbnZhciBpbnQyZnJlcSA9IHJlcXVpcmUoJ2ludDJmcmVxJylcbnZhciByYW5kb21BRFNSID0gcmVxdWlyZSgnLi4vdXRpbHMvcmFuZG9tQURTUicpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhYykge1xuICB2YXIgcGlhbm8gPSB3aGlueShhYylcbiAgcGlhbm8udXBkYXRlKHJhbmRvbUFEU1IoKSwgYWMuY3VycmVudFRpbWUpXG4gIHJldHVybiB7XG4gICAgcGxheTogZnVuY3Rpb24gKGRhdGEsIGtleSkge1xuICAgICAgcGlhbm8udXBkYXRlKHtmcmVxOiBpbnQyZnJlcShkYXRhICwga2V5KX0sIGFjLmN1cnJlbnRUaW1lKVxuICAgICAgcGlhbm8uc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gICAgfSxcbiAgICBjb25uZWN0OiBmdW5jdGlvbiAoZGVzdGluYXRpb24pIHtcbiAgICAgIHBpYW5vLmNvbm5lY3QoZGVzdGluYXRpb24pXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZ2Fpbk5vZGUsIHdoZW4sIGFkc3IpIHtcbiAgZ2Fpbk5vZGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGFkc3IucGVhaywgd2hlbiArIGFkc3IuYXR0YWNrKVxuICBnYWluTm9kZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoYWRzci5taWQsIHdoZW4gKyBhZHNyLmF0dGFjayArIGFkc3IuZGVjYXkpXG4gIGdhaW5Ob2RlLmdhaW4uc2V0VmFsdWVBdFRpbWUoYWRzci5taWQsIHdoZW4gKyBhZHNyLnN1c3RhaW4gKyBhZHNyLmF0dGFjayArIGFkc3IuZGVjYXkpXG4gIGdhaW5Ob2RlLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShhZHNyLmVuZCwgd2hlbiArIGFkc3Iuc3VzdGFpbiArIGFkc3IuYXR0YWNrICsgYWRzci5kZWNheSArIGFkc3IucmVsZWFzZSlcbn1cbiIsInZhciBtYWtlRGlzdG9ydGlvbkN1cnZlID0gcmVxdWlyZSgnbWFrZS1kaXN0b3J0aW9uLWN1cnZlJylcbnZhciBNSURJVXRpbHMgPSByZXF1aXJlKCdtaWRpdXRpbHMnKVxudmFyIGFkc3IgPSByZXF1aXJlKCdhLWQtcy1yJylcbi8vIHlyIGZ1bmN0aW9uIHNob3VsZCBhY2NlcHQgYW4gYXVkaW9Db250ZXh0LCBhbmQgb3B0aW9uYWwgcGFyYW1zL29wdHNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjLCBvcHRzKSB7XG4gIC8vIG1ha2Ugc29tZSBhdWRpb05vZGVzLCBjb25uZWN0IHRoZW0sIHN0b3JlIHRoZW0gb24gdGhlIG9iamVjdFxuICB2YXIgYXVkaW9Ob2RlcyA9IHt9XG5cbiAgdmFyIG9zY2lsbGF0b3IxID0gYWMuY3JlYXRlT3NjaWxsYXRvcihhYylcbiAgb3NjaWxsYXRvcjEudHlwZSA9ICd0cmlhbmdsZSdcbiAgb3NjaWxsYXRvcjEuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuICB2YXIgb3NjaWxsYXRvcjIgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKGFjKVxuICBvc2NpbGxhdG9yMi50eXBlID0gJ3NxdWFyZSdcbiAgb3NjaWxsYXRvcjIuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuICB2YXIgb3NjaWxsYXRvcjMgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKGFjKVxuICBvc2NpbGxhdG9yMy50eXBlID0gJ3Nhd3Rvb3RoJ1xuICBvc2NpbGxhdG9yMy5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG4gIHZhciBvc2NpbGxhdG9yNCA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoYWMpXG4gIG9zY2lsbGF0b3I0LnR5cGUgPSAnc2luZSdcbiAgb3NjaWxsYXRvcjQuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuXG4gIHZhciBvc2NpbGxhdG9yNSA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoYWMpXG4gIG9zY2lsbGF0b3I1LnR5cGUgPSAnc2F3dG9vdGgnXG4gIG9zY2lsbGF0b3I1LmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcbiAgdmFyIG9zY2lsbGF0b3I2ID0gYWMuY3JlYXRlT3NjaWxsYXRvcihhYylcbiAgb3NjaWxsYXRvcjYudHlwZSA9ICd0cmlhbmdsZSdcbiAgb3NjaWxsYXRvcjYuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuXG4gIHZhciBkZWxheUEgPSBhYy5jcmVhdGVEZWxheSgwLjIzMjIpXG4gIHZhciBkZWxheUIgPSBhYy5jcmVhdGVEZWxheSgwLjI1Mjc1MjMxMzEwMzIyMilcbiAgdmFyIGRlbGF5QyA9IGFjLmNyZWF0ZURlbGF5KDAuMjcyMjIpXG5cbiAgdmFyIGZpbHRlckEgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICBmaWx0ZXJBLlEudmFsdWUgPSAxMlxuICBmaWx0ZXJBLnR5cGUgPSAncGVha2luZydcbiAgZmlsdGVyQS5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cblxuICAvLyB0aGF0IG9uZSBkaXN0b3J0aW9uIGN1cnZlIHRoYXQgZXZlcnlvbmUgY29weSBwYXN0ZXMgZnJvbSBzdGFjayBvdmVyZmxvdyBhbnl3YXlzXG5cbiAgLy8gbWFrZSBhIGRpc3RvcnRpb24gcGVkYWwhIHlheSFcbiAgdmFyIGRpc3RvcnRpb25BID0gYWMuY3JlYXRlV2F2ZVNoYXBlcigpXG4gIGRpc3RvcnRpb25BLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSg4MDApXG5cbiAgdmFyIGZpbHRlckIgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICBmaWx0ZXJCLlEudmFsdWUgPSAxMlxuICBmaWx0ZXJCLnR5cGUgPSAnYmFuZHBhc3MnXG4gIGZpbHRlckIuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuXG4gIC8vIHRoYXQgb25lIGRpc3RvcnRpb24gY3VydmUgdGhhdCBldmVyeW9uZSBjb3B5IHBhc3RlcyBmcm9tIHN0YWNrIG92ZXJmbG93IGFueXdheXNcblxuICAvLyBtYWtlIGEgZGlzdG9ydGlvbiBwZWRhbCEgeWF5IVxuICB2YXIgZGlzdG9ydGlvbkIgPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbiAgZGlzdG9ydGlvbkIuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDEwMClcblxuICB2YXIgZmlsdGVyQyA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG4gIGZpbHRlckMuUS52YWx1ZSA9IDdcbiAgZmlsdGVyQy50eXBlID0gJ2xvd3Bhc3MnXG4gIGZpbHRlckMuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuXG4gIC8vIHRoYXQgb25lIGRpc3RvcnRpb24gY3VydmUgdGhhdCBldmVyeW9uZSBjb3B5IHBhc3RlcyBmcm9tIHN0YWNrIG92ZXJmbG93IGFueXdheXNcblxuICAvLyBtYWtlIGEgZGlzdG9ydGlvbiBwZWRhbCEgeWF5IVxuICB2YXIgZGlzdG9ydGlvbkMgPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbiAgZGlzdG9ydGlvbkMuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDEwMDApXG5cblxuXG4gIHZhciBnYWluQSA9IGFjLmNyZWF0ZUdhaW4oKVxuICBnYWluQS5nYWluLnZhbHVlID0gMC4zMzMzMzMzMzMzMzMzMzNcbiAgdmFyIGdhaW5CID0gYWMuY3JlYXRlR2FpbigpXG4gIGdhaW5CLmdhaW4udmFsdWUgPSAwLjMzMzMzMzMzMzMzMzMzM1xuICB2YXIgZ2FpbkMgPSBhYy5jcmVhdGVHYWluKClcbiAgZ2FpbkMuZ2Fpbi52YWx1ZSA9IDAuMzMzMzMzMzMzMzMzMzMzXG4gIHZhciBnYWluWiA9IGFjLmNyZWF0ZUdhaW4oKVxuICBnYWluWi5nYWluLnZhbHVlID0gMC41XG5cblxuXG4gIHZhciBmaWx0ZXJaID0gYWMuY3JlYXRlQmlxdWFkRmlsdGVyKClcbiAgZmlsdGVyWi5RLnZhbHVlID0gMTJcbiAgZmlsdGVyWi50eXBlID0gJ2hpZ2hzaGVsZidcbiAgZmlsdGVyWi5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cbiAgLy8gdGhhdCBvbmUgZGlzdG9ydGlvbiBjdXJ2ZSB0aGF0IGV2ZXJ5b25lIGNvcHkgcGFzdGVzIGZyb20gc3RhY2sgb3ZlcmZsb3cgYW55d2F5c1xuXG4gIHZhciBkZWxheVogPSBhYy5jcmVhdGVEZWxheSgwLjIyMilcblxuICAvLyBtYWtlIGEgZGlzdG9ydGlvbiBwZWRhbCEgeWF5IVxuICB2YXIgZGlzdG9ydGlvblogPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbiAgZGlzdG9ydGlvblouY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDc1MClcbiAgZGlzdG9ydGlvbloub3ZlcnNhbXBsZSA9ICc0eCdcblxuXG4gIHZhciB2b2x1bWUgPSBhYy5jcmVhdGVHYWluKClcbiAgdm9sdW1lLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCwgYWMuY3VycmVudFRpbWUpXG5cbiAgLy8gIFNUQVJUIE9GIENIQUlOIChOT1QgTUFSS09WKVxuXG4gIG9zY2lsbGF0b3IxLmNvbm5lY3QoZGVsYXlBKVxuXG4gIG9zY2lsbGF0b3I1LmNvbm5lY3QoZmlsdGVyQS5mcmVxdWVuY3kpXG4gIG9zY2lsbGF0b3I1LmNvbm5lY3QoZ2FpblouZ2FpbilcbiAgb3NjaWxsYXRvcjUuZnJlcXVlbmN5LnZhbHVlID0gMC4xMzNcblxuICBvc2NpbGxhdG9yNC5jb25uZWN0KGRlbGF5QilcbiAgb3NjaWxsYXRvcjYuY29ubmVjdChmaWx0ZXJCLmZyZXF1ZW5jeSlcbiAgb3NjaWxsYXRvcjYuY29ubmVjdChnYWluQy5nYWluKVxuICBvc2NpbGxhdG9yNi5mcmVxdWVuY3kudmFsdWUgPSAwLjI3M1xuXG4gIG9zY2lsbGF0b3IyLmNvbm5lY3QoZGVsYXlDKVxuICBvc2NpbGxhdG9yMy5jb25uZWN0KGRlbGF5QylcblxuICBkZWxheUEuY29ubmVjdChmaWx0ZXJBKVxuICBkZWxheUIuY29ubmVjdChmaWx0ZXJCKVxuICBkZWxheUMuY29ubmVjdChmaWx0ZXJDKVxuXG4gIGZpbHRlckEuY29ubmVjdChnYWluQSlcbiAgZmlsdGVyQi5jb25uZWN0KGdhaW5CKVxuICBmaWx0ZXJDLmNvbm5lY3QoZ2FpbkMpXG5cbiAgb3NjaWxsYXRvcjEuY29ubmVjdChnYWluQSlcbiAgb3NjaWxsYXRvcjUuY29ubmVjdChnYWluQSlcblxuICBvc2NpbGxhdG9yNC5jb25uZWN0KGdhaW5CKVxuICBvc2NpbGxhdG9yNi5jb25uZWN0KGdhaW5CKVxuXG4gIG9zY2lsbGF0b3IyLmNvbm5lY3QoZ2FpbkMpXG4gIG9zY2lsbGF0b3IzLmNvbm5lY3QoZ2FpbkMpXG5cbiAgZ2FpbkEuY29ubmVjdChkaXN0b3J0aW9uQSlcbiAgZ2FpbkIuY29ubmVjdChkaXN0b3J0aW9uQilcbiAgZ2FpbkMuY29ubmVjdChkaXN0b3J0aW9uQylcblxuICBkaXN0b3J0aW9uQy5jb25uZWN0KGRlbGF5WilcbiAgZGVsYXlaLmNvbm5lY3QoZmlsdGVyWilcbiAgZGlzdG9ydGlvbkMuY29ubmVjdChnYWluWilcbiAgZmlsdGVyWi5jb25uZWN0KGdhaW5aKVxuICBnYWluWi5jb25uZWN0KGRpc3RvcnRpb25aKVxuXG4gIGRpc3RvcnRpb25BLmNvbm5lY3Qodm9sdW1lKVxuICBkaXN0b3J0aW9uQi5jb25uZWN0KHZvbHVtZSlcbiAgZGlzdG9ydGlvblouY29ubmVjdCh2b2x1bWUpXG4gIC8vIEVORCBPRiBDSEFJTlxuXG4gIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjEgPSBvc2NpbGxhdG9yMVxuICBhdWRpb05vZGVzLm9zY2lsbGF0b3IyID0gb3NjaWxsYXRvcjJcbiAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yMyA9IG9zY2lsbGF0b3IzXG4gIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjQgPSBvc2NpbGxhdG9yNFxuICBhdWRpb05vZGVzLm9zY2lsbGF0b3I1ID0gb3NjaWxsYXRvcjVcbiAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNiA9IG9zY2lsbGF0b3I2XG4gIGF1ZGlvTm9kZXMuZGVsYXlBID0gZGVsYXlBXG4gIGF1ZGlvTm9kZXMuZGVsYXlCID0gZGVsYXlCXG4gIGF1ZGlvTm9kZXMuZGVsYXlDID0gZGVsYXlDXG4gIGF1ZGlvTm9kZXMuZGVsYXlaID0gZGVsYXlaXG4gIGF1ZGlvTm9kZXMuZ2FpbkEgPSBnYWluQVxuICBhdWRpb05vZGVzLmdhaW5CID0gZ2FpbkJcbiAgYXVkaW9Ob2Rlcy5nYWluQyA9IGdhaW5DXG4gIGF1ZGlvTm9kZXMuZmlsdGVyQSA9IGZpbHRlckFcbiAgYXVkaW9Ob2Rlcy5maWx0ZXJCID0gZmlsdGVyQlxuICBhdWRpb05vZGVzLmZpbHRlckMgPSBmaWx0ZXJDXG4gIGF1ZGlvTm9kZXMuZmlsdGVyWiA9IGZpbHRlclpcbiAgYXVkaW9Ob2Rlcy5kaXN0b3J0aW9uQSA9IGRpc3RvcnRpb25BXG4gIGF1ZGlvTm9kZXMuZGlzdG9ydGlvbkIgPSBkaXN0b3J0aW9uQlxuICBhdWRpb05vZGVzLmRpc3RvcnRpb25DID0gZGlzdG9ydGlvbkNcbiAgYXVkaW9Ob2Rlcy5kaXN0b3J0aW9uWiA9IGRpc3RvcnRpb25aXG4gIGF1ZGlvTm9kZXMudm9sdW1lID0gdm9sdW1lXG4gIGF1ZGlvTm9kZXMuc2V0dGluZ3MgPSB7XG4gICAgYXR0YWNrOiAwLjAxLFxuICAgIGRlY2F5OiAwLjA1LFxuICAgIHN1c3RhaW46IDAuNCxcbiAgICByZWxlYXNlOiAwLjEsXG4gICAgcGVhazogMC4zLFxuICAgIG1pZDogMC4xLFxuICAgIGVuZDogMC4wMDAwMDAwMDAwMDAwMSAvLyBsb2wgaWRrIHd0ZlxuICB9XG5cbiAgLy8gYnp6enp6XG4gIG9zY2lsbGF0b3IxLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBvc2NpbGxhdG9yMi5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgb3NjaWxsYXRvcjMuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIG9zY2lsbGF0b3I0LnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBvc2NpbGxhdG9yNS5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgb3NjaWxsYXRvcjYuc3RhcnQoYWMuY3VycmVudFRpbWUpXG5cbiAgcmV0dXJuIHtcbiAgICBjb25uZWN0OiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIGF1ZGlvTm9kZXMudm9sdW1lLmNvbm5lY3QoaW5wdXQpXG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gKHdoZW4pIHtcbiAgICAgIGFkc3IoYXVkaW9Ob2Rlcy52b2x1bWUsIHdoZW4sIGF1ZGlvTm9kZXMuc2V0dGluZ3MpXG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAod2hlbikge1xuICAgICAgY29uc29sZS5sb2coJ1NPTUVUSU1FUyBJIERPVUJUIFlSIENPTU1JVE1FTlQgMiBUSEUgUEFSVFlcXG5wLnMuIHlyIG9zY2lsbGF0b3JzIGFyZSBkZXN0cm95ZWQsIG1ha2UgYSBuZXcgc3ludGggcGx6JylcbiAgICAgIG9zY2lsbGF0b3IxLnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3IyLnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3IzLnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3I0LnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3I1LnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3I2LnN0b3Aod2hlbilcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKG9wdHMsIHdoZW4pIHtcbiAgICAgIC8vIGF2YWlsYWJsZSBvcHRzOlxuICAgICAgLy8ge21pZGlOb3RlOiA2MiwgbGZvTDogLCBsZm9SOiAsIGZyZXEsIGF0dGFjazogLCBkZWNheTogLCBzdXN0YWluOiAsIHJlbGVhc2U6ICwgcGVhazogLCBtaWQ6fVxuICAgICAgT2JqZWN0LmtleXMob3B0cykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICB2YXIgdiA9IG9wdHNba11cbiAgICAgICAgaWYgKGsgPT0gJ21pZGlOb3RlJyB8fCBrID09ICdmcmVxJykge1xuICAgICAgICAgIHZhciBmcmVxID0gayA9PSAnbWlkaU5vdGUnID8gTUlESVV0aWxzLm5vdGVOdW1iZXJUb0ZyZXF1ZW5jeSh2KSA6IHZcblxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjEuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgKiAyLjAsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yMi5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAqIDIuMCwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zY2lsbGF0b3IzLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICogOC4wLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjQuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgKiA0LjAsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAqIDIuMCwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zY2lsbGF0b3I2LmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICogNC4wLCB3aGVuKVxuXG4gICAgICAgICAgZmlsdGVyQS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvICgyICsgTWF0aC5yYW5kb20oKSksIHdoZW4pXG4gICAgICAgICAgZmlsdGVyQi5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAqICgyICsgTWF0aC5yYW5kb20oKSksIHdoZW4pXG4gICAgICAgICAgZmlsdGVyQy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvIChNYXRoLnJhbmRvbSgpKSwgd2hlbilcbiAgICAgICAgICBmaWx0ZXJaLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICogKDEuNSArIE1hdGgucmFuZG9tKCkpLCB3aGVuKVxuXG4gICAgICAgIH0gZWxzZSBpZiAoayA9PSAnbGZvTCcgfHwgayA9PSAnbGZvUicpIHtcbiAgICAgICAgICB2YXIgbm9kZSA9IGsgPT0gJ2xmb0wnID8gYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNSA6IGF1ZGlvTm9kZXMub3NjaWxsYXRvcjZcbiAgICAgICAgICBub2RlLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSh2LCB3aGVuKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGp1c3QgYW4gQURTUiB2YWx1ZVxuICAgICAgICAgIGF1ZGlvTm9kZXMuc2V0dGluZ3Nba10gPSB2XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBub2RlczogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gcmV0dXJucyBhbiBvYmplY3Qgb2YgYHtzdHJpbmdLZXk6IGF1ZGlvTm9kZX1gIGZvciByYXcgbWFuaXB1bGF0aW9uXG4gICAgICByZXR1cm4gYXVkaW9Ob2Rlc1xuICAgIH1cbiAgfVxufSIsInZhciBtYWtlRGlzdG9ydGlvbkN1cnZlID0gcmVxdWlyZSgnbWFrZS1kaXN0b3J0aW9uLWN1cnZlJylcbnZhciBNSURJVXRpbHMgPSByZXF1aXJlKCdtaWRpdXRpbHMnKVxudmFyIGFkc3IgPSByZXF1aXJlKCdhLWQtcy1yJylcbi8vIHlyIGZ1bmN0aW9uIHNob3VsZCBhY2NlcHQgYW4gYXVkaW9Db250ZXh0LCBhbmQgb3B0aW9uYWwgcGFyYW1zL29wdHNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjLCBvcHRzKSB7XG4gIC8vIG1ha2Ugc29tZSBhdWRpb05vZGVzLCBjb25uZWN0IHRoZW0sIHN0b3JlIHRoZW0gb24gdGhlIG9iamVjdFxuICB2YXIgYXVkaW9Ob2RlcyA9IHt9XG5cbiAgdmFyIG9zYzEgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKClcbiAgdmFyIG9zYzIgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKClcbiAgb3NjMS50eXBlID0gJ3NxdWFyZSdcbiAgb3NjMi50eXBlID0gJ3NxdWFyZSdcblxuICAvLyBhZGQgc29tZSBmdW5rIHRvIHRoYXRcbiAgb3NjMS5kZXR1bmUuc2V0VmFsdWVBdFRpbWUoLU1hdGgucmFuZG9tKCksIGFjLmN1cnJlbnRUaW1lKVxuICBvc2MyLmRldHVuZS5zZXRWYWx1ZUF0VGltZShNYXRoLnJhbmRvbSgpLCBhYy5jdXJyZW50VGltZSlcblxuICB2YXIgbGRpc3RvcnRpb24gPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbiAgbGRpc3RvcnRpb24uY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDg1MCArIH5+KE1hdGgucmFuZG9tKCkgKiA0NTApKVxuICBsZGlzdG9ydGlvbi5vdmVyc2FtcGxlID0gJzR4J1xuXG4gIHZhciByZGlzdG9ydGlvbiA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuICByZGlzdG9ydGlvbi5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoODUwICsgfn4oTWF0aC5yYW5kb20oKSAqIDQ1MCkpXG4gIHJkaXN0b3J0aW9uLm92ZXJzYW1wbGUgPSAnNHgnXG5cbiAgdmFyIGxlZnRmaWx0ZXIgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICBsZWZ0ZmlsdGVyLnR5cGUgPSAnbG93cGFzcydcbiAgbGVmdGZpbHRlci5RLnZhbHVlID0gMTVcbiAgbGVmdGZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNTAwLCBhYy5jdXJyZW50VGltZSlcblxuICB2YXIgcmlnaHRmaWx0ZXIgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICByaWdodGZpbHRlci50eXBlID0gJ2xvd3Bhc3MnXG4gIHJpZ2h0ZmlsdGVyLlEudmFsdWUgPSAxNVxuICByaWdodGZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNTAwLCBhYy5jdXJyZW50VGltZSlcblxuICB2YXIgY29tcHJlc3NvciA9IGFjLmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpXG4gIGNvbXByZXNzb3IudGhyZXNob2xkLnZhbHVlID0gLTUwXG4gIGNvbXByZXNzb3Iua25lZS52YWx1ZSA9IDUwXG4gIGNvbXByZXNzb3IucmF0aW8udmFsdWUgPSAxOFxuICBjb21wcmVzc29yLnJlZHVjdGlvbi52YWx1ZSA9IC01XG4gIGNvbXByZXNzb3IuYXR0YWNrLnZhbHVlID0gMC4wNVxuICBjb21wcmVzc29yLnJlbGVhc2UudmFsdWUgPSAwLjA1XG5cbiAgdmFyIHByZWdhaW4gPSBhYy5jcmVhdGVHYWluKClcbiAgcHJlZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuNywgYWMuY3VycmVudFRpbWUpXG4vL1xuICB2YXIgb3Njc2luZSA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoKVxuICBvc2NzaW5lLnR5cGUgPSAnc2luZSdcbiAgdmFyIGRlbGF5ID0gYWMuY3JlYXRlRGVsYXkoMC4xKVxuICB2YXIgc2luZWRpc3QgPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbiAgc2luZWRpc3QuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDEwMDApXG4gIHZhciBkZWxheTIgPSBhYy5jcmVhdGVEZWxheSgwLjEzKVxuICB2YXIgc2luZWdhaW4gPSBhYy5jcmVhdGVHYWluKClcbiAgc2luZWdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjI1LCBhYy5jdXJyZW50VGltZSlcbi8vXG4gIHZhciBtYWluZmlsdGVyID0gYWMuY3JlYXRlQmlxdWFkRmlsdGVyKClcbiAgbWFpbmZpbHRlci50eXBlID0gJ2xvd3NoZWxmJ1xuICBtYWluZmlsdGVyLlEudmFsdWUgPSAyMFxuICBtYWluZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg1MDAsIGFjLmN1cnJlbnRUaW1lKVxuXG4gIHZhciBmaW5hbGRpc3QgPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbiAgZmluYWxkaXN0LmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSgxMDAwKVxuICBmaW5hbGRpc3Qub3ZlcnNhbXBsZSA9ICc0eCdcbiAgdmFyIGRlbGF5MiA9IGFjLmNyZWF0ZURlbGF5KDAuMjMpXG5cbiAgdmFyIG1haW5nYWluID0gYWMuY3JlYXRlR2FpbigpXG4gIG1haW5nYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCwgYWMuY3VycmVudFRpbWUpXG5cblxuXG4vL1xuICBvc2MxLmNvbm5lY3QobGRpc3RvcnRpb24pXG4gIGxkaXN0b3J0aW9uLmNvbm5lY3QobGVmdGZpbHRlcilcbiAgbGVmdGZpbHRlci5jb25uZWN0KGNvbXByZXNzb3IpXG4vL1xuICBvc2MyLmNvbm5lY3QocmRpc3RvcnRpb24pXG4gIHJkaXN0b3J0aW9uLmNvbm5lY3QocmlnaHRmaWx0ZXIpXG4gIHJpZ2h0ZmlsdGVyLmNvbm5lY3QoY29tcHJlc3Nvcilcbi8vXG4gIGNvbXByZXNzb3IuY29ubmVjdChwcmVnYWluKVxuLy9cbiAgb3Njc2luZS5jb25uZWN0KGRlbGF5KVxuICBkZWxheS5jb25uZWN0KHNpbmVkaXN0KVxuICBvc2NzaW5lLmNvbm5lY3Qoc2luZWRpc3QpXG4gIHNpbmVkaXN0LmNvbm5lY3QoZGVsYXkyKVxuICBkZWxheTIuY29ubmVjdChzaW5lZ2FpbilcbiAgc2luZWRpc3QuY29ubmVjdChzaW5lZ2Fpbilcbi8vXG4gIHByZWdhaW4uY29ubmVjdChtYWluZmlsdGVyKVxuICBzaW5lZ2Fpbi5jb25uZWN0KG1haW5maWx0ZXIpXG4gIG1haW5maWx0ZXIuY29ubmVjdChtYWluZ2FpbilcblxuICBhdWRpb05vZGVzLm9zYzEgPSBvc2MxXG4gIGF1ZGlvTm9kZXMub3NjMiA9IG9zYzJcbiAgYXVkaW9Ob2Rlcy5vc2NzaW5lID0gb3Njc2luZVxuICBhdWRpb05vZGVzLmxkaXN0b3J0aW9uID0gbGRpc3RvcnRpb25cbiAgYXVkaW9Ob2Rlcy5yZGlzdG9ydGlvbiA9IHJkaXN0b3J0aW9uXG4gIGF1ZGlvTm9kZXMubGVmdGZpbHRlciA9IGxlZnRmaWx0ZXJcbiAgYXVkaW9Ob2Rlcy5yaWdodGZpbHRlciA9IHJpZ2h0ZmlsdGVyXG4gIGF1ZGlvTm9kZXMubWFpbmZpbHRlciA9IG1haW5maWx0ZXJcbiAgYXVkaW9Ob2Rlcy5tYWluZ2FpbiA9IG1haW5nYWluXG4gIGF1ZGlvTm9kZXMucHJlZ2FpbiA9IHByZWdhaW5cbiAgYXVkaW9Ob2Rlcy5zaW5lZ2FpbiA9IHNpbmVnYWluXG4gIGF1ZGlvTm9kZXMuZGVsYXkgPSBkZWxheVxuICBhdWRpb05vZGVzLmRlbGF5MiA9IGRlbGF5MlxuICBhdWRpb05vZGVzLnNpbmVkaXN0ID0gc2luZWRpc3RcbiAgYXVkaW9Ob2Rlcy5jb21wcmVzc29yID0gY29tcHJlc3NvclxuXG4gIC8vIGdvc2ggaSB3aXNoIHRoZXJlIHdhcyBhbiBhdWRpb05vZGUgdGhhdCBqdXN0IGRpZCB0aGlzLi4uXG4gIGF1ZGlvTm9kZXMuc2V0dGluZ3MgPSB7XG4gICAgYXR0YWNrOiAwLjEsXG4gICAgZGVjYXk6IDAuMDUsXG4gICAgc3VzdGFpbjogMC4zLFxuICAgIHJlbGVhc2U6IDAuMSxcbiAgICBwZWFrOiAwLjUsXG4gICAgbWlkOiAwLjMsXG4gICAgZW5kOiAwLjAwMDAwMDAwMDEsXG4gICAgZGV0dW5lOiAxLFxuICAgIGNob3JkOiBmYWxzZSAvLyBUT0RPOiBidWlsZCBjaG9yZHMgaW5zdGVhZCBvZiBwbGF5aW5nIGh1Z2Ugbm90ZXMgYXMgYW4gb3B0aW9uP1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjb25uZWN0OiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIC8vIC8vIHRoaXMgZnVuY3Rpb24gc2hvdWxkIGNhbGwgYGNvbm5lY3RgIG9uIHlyIG91dHB1dCBub2RlcyB3aXRoIGBpbnB1dGAgYXMgdGhlIGFyZ1xuICAgICAgYXVkaW9Ob2Rlcy5tYWluZ2Fpbi5jb25uZWN0KGlucHV0KVxuXG4gICAgICAvLyBqdXN0IGxldCB0aGVtIGJ1enogZm9yZXZlciwgZGVhbCB3aXRoIFwibm90ZXNcIiB2aWEgYWRzciB0cmlja3NcbiAgICAgIGF1ZGlvTm9kZXMub3NjMS5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgICAgIGF1ZGlvTm9kZXMub3NjMi5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgICAgIGF1ZGlvTm9kZXMub3Njc2luZS5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgICB9LFxuICAgIHN0YXJ0OiBmdW5jdGlvbiAod2hlbikge1xuICAgICAgYWRzcihhdWRpb05vZGVzLm1haW5nYWluLCB3aGVuLCBhdWRpb05vZGVzLnNldHRpbmdzKVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKHdoZW4pIHtcbiAgICAgIGF1ZGlvTm9kZXMub3NjMS5zdG9wKHdoZW4pXG4gICAgICBhdWRpb05vZGVzLm9zYzIuc3RvcCh3aGVuKVxuICAgICAgYXVkaW9Ob2Rlcy5vc2NzaW5lLnN0b3Aod2hlbilcbiAgICAgIGNvbnNvbGUubG9nKCd3aHlkIHUgbGV0IHRoZSBiYXNzIGdvPyBnb3R0YSBjYXRjaCBhIG5ldyBvbmUgbm93ISEhIScpXG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChvcHRzLCB3aGVuKSB7XG4gICAgICAvLyBhdmFpbGFibGUgb3B0czpcbiAgICAgIC8vIHttaWRpTm90ZTogNjIsIGF0dGFjazogLCBkZWNheTogLCBzdXN0YWluOiAsIHJlbGVhc2U6IH1cbiAgICAgIE9iamVjdC5rZXlzKG9wdHMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgdmFyIHYgPSBvcHRzW2tdXG4gICAgICAgIGlmIChrID09ICdtaWRpTm90ZScgfHwgayA9PSAnZnJlcScpIHtcbiAgICAgICAgICB2YXIgZnJlcSA9IGsgPT0gJ21pZGlOb3RlJyA/IE1JRElVdGlscy5ub3RlTnVtYmVyVG9GcmVxdWVuY3kodikgOiB2XG4gICAgICAgICAgYXVkaW9Ob2Rlcy5sZWZ0ZmlsdGVyLmZyZXF1ZW5jeS5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZShmcmVxICsgKGZyZXEgLyAoMiArIE1hdGgucmFuZG9tKCkpKSwgd2hlbiArIE1hdGgucmFuZG9tKCkpXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5yaWdodGZpbHRlci5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoZnJlcSArIChmcmVxIC8gKDIgKyBNYXRoLnJhbmRvbSgpKSksIHdoZW4gKyBNYXRoLnJhbmRvbSgpKVxuICAgICAgICAgIGF1ZGlvTm9kZXMubWFpbmZpbHRlci5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoZnJlcSAtIChmcmVxIC8gKDEuNSArIE1hdGgucmFuZG9tKCkpKSwgd2hlbiArIE1hdGgucmFuZG9tKCkpXG5cbiAgICAgICAgICBhdWRpb05vZGVzLm9zYzEuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgLyA0LjAsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2MyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gNC4wLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMub3Njc2luZS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvIDQuMCwgd2hlbilcbiAgICAgICAgICAvLyBhZGQgc29tZSBmdW5rIHRvIHRoYXRcbiAgICAgICAgICBhdWRpb05vZGVzLm9zYzEuZGV0dW5lLnNldFZhbHVlQXRUaW1lKGF1ZGlvTm9kZXMuc2V0dGluZ3MuZGV0dW5lICogLU1hdGgucmFuZG9tKCksIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2MyLmRldHVuZS5zZXRWYWx1ZUF0VGltZShhdWRpb05vZGVzLnNldHRpbmdzLmRldHVuZSAqIE1hdGgucmFuZG9tKCksIHdoZW4pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8ganVzdCBhbiBBRFNSIHZhbHVlXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5zZXR0aW5nc1trXSA9IHZcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIG5vZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyByZXR1cm5zIGFuIG9iamVjdCBvZiBge3N0cmluZ0tleTogYXVkaW9Ob2RlfWAgZm9yIHJhdyBtYW5pcHVsYXRpb25cbiAgICAgIHJldHVybiBhdWRpb05vZGVzXG4gICAgfVxuICB9XG59IiwidmFyIHNjYWxlcyA9IHtcbiAgbWFqb3I6IFsyLCAyLCAxLCAyLCAyLCAyLCAxXSxcbiAgbWlub3I6IFsyLCAxLCAyLCAyLCAxLCAyLCAyXSxcbiAgcGVudE1hajogWzIsIDIsIDMsIDIsIDNdLFxuICBwZW50TWluOiBbMywgMiwgMiwgMywgMl0sXG4gIGJsdWVzOiBbMywgMiwgMSwgMSwgMywgMl1cbn1cblxudmFyIHN0cjJmcmVxID0ge1xuICAnQTAnOiAyNy41MDAwLCAnQSMwJzogMjkuMTM1MiwgJ0IwJzogMzAuODY3NywgJ0MxJzogMzIuNzAzMiwgJ0MjMSc6IDM0LjY0NzgsXG4gICdEMSc6IDM2LjcwODEsICdEIzEnOiAzOC44OTA5LCAnRTEnOiA0MS4yMDM0LCAnRjEnOiA0My42NTM1LCAnRiMxJzogNDYuMjQ5MyxcbiAgJ0cxJzogNDguOTk5NCwgJ0cjMSc6IDUxLjkxMzEsICdBMSc6IDU1LjAwMDAsICdBIzEnOiA1OC4yNzA1LCAnQjEnOiA2MS43MzU0LFxuICAnQzInOiA2NS40MDY0LCAnQyMyJzogNjkuMjk1NywgJ0QyJzogNzMuNDE2MiwgJ0QjMic6IDc3Ljc4MTcsICdFMic6IDgyLjQwNjksXG4gICdGMic6IDg3LjMwNzEsICdGIzInOiA5Mi40OTg2LCAnRzInOiA5Ny45OTg5LCAnRyMyJzogMTAzLjgyNiwgJ0EyJzogMTEwLjAwMCxcbiAgJ0EjMic6IDExNi41NDEsICdCMic6IDEyMy40NzEsICdDMyc6IDEzMC44MTMsICdDIzMnOiAxMzguNTkxLCAnRDMnOiAxNDYuODMyLFxuICAnRCMzJzogMTU1LjU2MywgJ0UzJzogMTY0LjgxNCwgJ0YzJzogMTc0LjYxNCwgJ0YjMyc6IDE4NC45OTcsICdHMyc6IDE5NS45OTgsXG4gICdHIzMnOiAyMDcuNjUyLCAnQTMnOiAyMjAuMDAwLCAnQSMzJzogMjMzLjA4MiwgJ0IzJzogMjQ2Ljk0MiwgJ0M0JzogMjYxLjYyNixcbiAgJ0MjNCc6IDI3Ny4xODMsICdENCc6IDI5My42NjUsICdEIzQnOiAzMTEuMTI3LCAnRTQnOiAzMjkuNjI4LCAnRjQnOiAzNDkuMjI4LFxuICAnRiM0JzogMzY5Ljk5NCwgJ0c0JzogMzkxLjk5NSwgJ0cjNCc6IDQxNS4zMDUsICdBNCc6IDQ0MC4wMDAsICdBIzQnOiA0NjYuMTY0LFxuICAnQjQnOiA0OTMuODgzLCAnQzUnOiA1MjMuMjUxLCAnQyM1JzogNTU0LjM2NSwgJ0Q1JzogNTg3LjMzMCwgJ0QjNSc6IDYyMi4yNTQsXG4gICdFNSc6IDY1OS4yNTUsICdGNSc6IDY5OC40NTYsICdGIzUnOiA3MzkuOTg5LCAnRzUnOiA3ODMuOTkxLCAnRyM1JzogODMwLjYwOSxcbiAgJ0E1JzogODgwLjAwMCwgJ0EjNSc6IDkzMi4zMjgsICdCNSc6IDk4Ny43NjcsICdDNic6IDEwNDYuNTAsICdDIzYnOiAxMTA4LjczLFxuICAnRDYnOiAxMTc0LjY2LCAnRCM2JzogMTI0NC41MSwgJ0U2JzogMTMxOC41MSwgJ0Y2JzogMTM5Ni45MSwgJ0YjNic6IDE0NzkuOTgsXG4gICdHNic6IDE1NjcuOTgsICdHIzYnOiAxNjYxLjIyLCAnQTYnOiAxNzYwLjAwLCAnQSM2JzogMTg2NC42NiwgJ0I2JzogMTk3NS41MyxcbiAgJ0M3JzogMjA5My4wMCwgJ0MjNyc6IDIyMTcuNDYsICdENyc6IDIzNDkuMzIsICdEIzcnOiAyNDg5LjAyLCAnRTcnOiAyNjM3LjAyLFxuICAnRjcnOiAyNzkzLjgzLCAnRiM3JzogMjk1OS45NiwgJ0c3JzogMzEzNS45NiwgJ0cjNyc6IDMzMjIuNDQsICdBNyc6IDM1MjAuMDAsXG4gICdBIzcnOiAzNzI5LjMxLCAnQjcnOiAzOTUxLjA3LCAnQzgnOiA0MTg2LjAxXG59XG5cbnZhciBub3RlcyA9IE9iamVjdC5rZXlzKHN0cjJmcmVxKVxuXG5mdW5jdGlvbiBpbnQyZnJlcShpbnROb3RlLCBvcHRpb25zKXtcbiAgdmFyIGluZGV4LCBzY2FsZTtcbiAgaWYoKGluZGV4ID0gbm90ZXMuaW5kZXhPZihvcHRpb25zLnRvbmljKSkgPT09IC0xKSB0aHJvdyAnd2hhdCBpcyB1cCB3aXRoIHRoYXQgdG9uaWM/J1xuICBpZighKHNjYWxlID0gc2NhbGVzW29wdGlvbnMuc2NhbGVdKSkgdGhyb3cgJ3doYXQgaXMgdXAgd2l0aCB0aGF0IHNjYWxlPydcbiAgd2hpbGUgKE1hdGguYWJzKGludE5vdGUpID4gc2NhbGUubGVuZ3RoKSBzY2FsZSA9IHNjYWxlLmNvbmNhdChzY2FsZSlcbiAgaWYoaW50Tm90ZSA+PSAwKSBmb3IgKHZhciBpID0gMDsgaSA8IGludE5vdGU7IGluZGV4ICs9IHNjYWxlW2ldLCBpKz0gMSApe31cbiAgZWxzZSBmb3IgKHZhciBqID0gLTE7IGogPj0gaW50Tm90ZTsgaW5kZXggLT0gc2NhbGVbc2NhbGUubGVuZ3RoICsgal0sIGotPSAxKXt9XG4gIHJldHVybiBzdHIyZnJlcVtub3Rlc1tpbmRleF1dXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW50MmZyZXFcbm1vZHVsZS5leHBvcnRzLnNjYWxlcyA9IE9iamVjdC5rZXlzKHNjYWxlcylcbm1vZHVsZS5leHBvcnRzLm5vdGVzID0gT2JqZWN0LmtleXMobm90ZXMpIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgdmFyIGsgPSB0eXBlb2YgYW1vdW50ID09PSAnbnVtYmVyJyA/IGFtb3VudCA6IDUwLFxuICAgIG5fc2FtcGxlcyA9IDQ0MTAwLFxuICAgIGN1cnZlID0gbmV3IEZsb2F0MzJBcnJheShuX3NhbXBsZXMpLFxuICAgIGRlZyA9IE1hdGguUEkgLyAxODAsXG4gICAgaSA9IDAsXG4gICAgeDtcbiAgZm9yICggOyBpIDwgbl9zYW1wbGVzOyArK2kgKSB7XG4gICAgeCA9IGkgKiAyIC8gbl9zYW1wbGVzIC0gMTtcbiAgICBjdXJ2ZVtpXSA9ICggMyArIGsgKSAqIHggKiAyMCAqIGRlZyAvICggTWF0aC5QSSArIGsgKiBNYXRoLmFicyh4KSApO1xuICB9XG4gIHJldHVybiBjdXJ2ZTtcbn1cbiIsIihmdW5jdGlvbigpIHtcblxuXHR2YXIgbm90ZU1hcCA9IHt9O1xuXHR2YXIgbm90ZU51bWJlck1hcCA9IFtdO1xuXHR2YXIgbm90ZXMgPSBbIFwiQ1wiLCBcIkMjXCIsIFwiRFwiLCBcIkQjXCIsIFwiRVwiLCBcIkZcIiwgXCJGI1wiLCBcIkdcIiwgXCJHI1wiLCBcIkFcIiwgXCJBI1wiLCBcIkJcIiBdO1xuXG5cblx0Zm9yKHZhciBpID0gMDsgaSA8IDEyNzsgaSsrKSB7XG5cblx0XHR2YXIgaW5kZXggPSBpLFxuXHRcdFx0a2V5ID0gbm90ZXNbaW5kZXggJSAxMl0sXG5cdFx0XHRvY3RhdmUgPSAoKGluZGV4IC8gMTIpIHwgMCkgLSAxOyAvLyBNSURJIHNjYWxlIHN0YXJ0cyBhdCBvY3RhdmUgPSAtMVxuXG5cdFx0aWYoa2V5Lmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0a2V5ID0ga2V5ICsgJy0nO1xuXHRcdH1cblxuXHRcdGtleSArPSBvY3RhdmU7XG5cblx0XHRub3RlTWFwW2tleV0gPSBpO1xuXHRcdG5vdGVOdW1iZXJNYXBbaV0gPSBrZXk7XG5cblx0fVxuXG5cblx0ZnVuY3Rpb24gZ2V0QmFzZUxvZyh2YWx1ZSwgYmFzZSkge1xuXHRcdHJldHVybiBNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLmxvZyhiYXNlKTtcblx0fVxuXG5cblx0dmFyIE1JRElVdGlscyA9IHtcblxuXHRcdG5vdGVOYW1lVG9Ob3RlTnVtYmVyOiBmdW5jdGlvbihuYW1lKSB7XG5cdFx0XHRyZXR1cm4gbm90ZU1hcFtuYW1lXTtcblx0XHR9LFxuXG5cdFx0bm90ZU51bWJlclRvRnJlcXVlbmN5OiBmdW5jdGlvbihub3RlKSB7XG5cdFx0XHRyZXR1cm4gNDQwLjAgKiBNYXRoLnBvdygyLCAobm90ZSAtIDY5LjApIC8gMTIuMCk7XG5cdFx0fSxcblxuXHRcdG5vdGVOdW1iZXJUb05hbWU6IGZ1bmN0aW9uKG5vdGUpIHtcblx0XHRcdHJldHVybiBub3RlTnVtYmVyTWFwW25vdGVdO1xuXHRcdH0sXG5cblx0XHRmcmVxdWVuY3lUb05vdGVOdW1iZXI6IGZ1bmN0aW9uKGYpIHtcblx0XHRcdHJldHVybiBNYXRoLnJvdW5kKDEyLjAgKiBnZXRCYXNlTG9nKGYgLyA0NDAuMCwgMikgKyA2OSk7XG5cdFx0fVxuXG5cdH07XG5cblxuXHQvLyBNYWtlIGl0IGNvbXBhdGlibGUgZm9yIHJlcXVpcmUuanMvQU1EIGxvYWRlcihzKVxuXHRpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBNSURJVXRpbHM7IH0pO1xuXHR9IGVsc2UgaWYodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHQvLyBBbmQgZm9yIG5wbS9ub2RlLmpzXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBNSURJVXRpbHM7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5NSURJVXRpbHMgPSBNSURJVXRpbHM7XG5cdH1cblxuXG59KS5jYWxsKHRoaXMpO1xuXG4iLCJ2YXIgbWFrZURpc3RvcnRpb25DdXJ2ZSA9IHJlcXVpcmUoJ21ha2UtZGlzdG9ydGlvbi1jdXJ2ZScpXG52YXIgTUlESVV0aWxzID0gcmVxdWlyZSgnbWlkaXV0aWxzJylcbnZhciBhZHNyID0gcmVxdWlyZSgnYS1kLXMtcicpXG5cbi8vIHlyIGZ1bmN0aW9uIHNob3VsZCBhY2NlcHQgYW4gYXVkaW9Db250ZXh0LCBhbmQgb3B0aW9uYWwgcGFyYW1zL29wdHNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjLCBvcHRzKSB7XG4gIC8vIG1ha2Ugc29tZSBhdWRpb05vZGVzLCBjb25uZWN0IHRoZW0sIHN0b3JlIHRoZW0gb24gdGhlIG9iamVjdFxuICB2YXIgYXVkaW9Ob2RlcyA9IHt9XG5cbiAgdmFyIG9zYzEgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKClcbiAgdmFyIG9zYzIgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKClcbiAgdmFyIG9zYzMgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKClcbiAgdmFyIG9zY25vaXNlID0gYWMuY3JlYXRlT3NjaWxsYXRvcigpXG4gIG9zYzEudHlwZSA9ICd0cmlhbmdsZSdcbiAgb3NjMi50eXBlID0gJ3RyaWFuZ2xlJ1xuICBvc2MzLnR5cGUgPSAnc2luZSdcbiAgb3Njbm9pc2UudHlwZSA9ICdzYXd0b290aCdcblxuICAvLyBhcmUgdGhlc2UgdG9vb29vIHNtYWxsP1xuICBvc2MxLmRldHVuZS52YWx1ZSA9IDAuNzUgKiAoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpXG4gIG9zYzIuZGV0dW5lLnZhbHVlID0gMC43NSAqICgoTWF0aC5yYW5kb20oKSAqIDIpIC0gMSlcbiAgb3NjMy5kZXR1bmUudmFsdWUgPSAwLjMgKiAoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpXG5cbiAgdmFyIGxlZnRmaWx0ZXIgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICBsZWZ0ZmlsdGVyLnR5cGUgPSAnbG93cGFzcydcbiAgbGVmdGZpbHRlci5RLnZhbHVlID0gN1xuICBsZWZ0ZmlsdGVyLmRldHVuZS52YWx1ZSA9IDAuNzUgKiAoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpXG4gIGxlZnRmaWx0ZXIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDUwMCwgYWMuY3VycmVudFRpbWUpXG5cbiAgdmFyIHJpZ2h0ZmlsdGVyID0gYWMuY3JlYXRlQmlxdWFkRmlsdGVyKClcbiAgcmlnaHRmaWx0ZXIudHlwZSA9ICdsb3dwYXNzJ1xuICByaWdodGZpbHRlci5RLnZhbHVlID0gN1xuICByaWdodGZpbHRlci5kZXR1bmUudmFsdWUgPSAwLjc1ICogKChNYXRoLnJhbmRvbSgpICogMikgLSAxKVxuICByaWdodGZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNTAwLCBhYy5jdXJyZW50VGltZSlcblxuXG4gIHZhciBub2lzZWdhaW4gPSBhYy5jcmVhdGVHYWluKClcbiAgbm9pc2VnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCwgYWMuY3VycmVudFRpbWUpXG5cbiAgdmFyIGRlbGF5ID0gYWMuY3JlYXRlRGVsYXkoMC4zNSlcblxuICB2YXIgY29tcHJlc3NvciA9IGFjLmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpXG4gIGNvbXByZXNzb3IudGhyZXNob2xkLnZhbHVlID0gLTMwXG4gIGNvbXByZXNzb3Iua25lZS52YWx1ZSA9IDMzXG4gIGNvbXByZXNzb3IucmF0aW8udmFsdWUgPSA5XG4gIGNvbXByZXNzb3IucmVkdWN0aW9uLnZhbHVlID0gLTEwXG4gIGNvbXByZXNzb3IuYXR0YWNrLnZhbHVlID0gMC4xNVxuICBjb21wcmVzc29yLnJlbGVhc2UudmFsdWUgPSAwLjM1XG5cbiAgdmFyIGdhaW4gPSBhYy5jcmVhdGVHYWluKClcbiAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAsIGFjLmN1cnJlbnRUaW1lKVxuXG5cbiAgdmFyIGRpc3RvcnRpb24gPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbiAgZGlzdG9ydGlvbi5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoNzUpXG5cbiAgdmFyIG1haW5maWx0ZXIgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICBtYWluZmlsdGVyLnR5cGUgPSAnbG93cGFzcydcbiAgbWFpbmZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNTAwLCBhYy5jdXJyZW50VGltZSlcblxuICBvc2Nub2lzZS5jb25uZWN0KG5vaXNlZ2FpbilcbiAgb3NjMS5jb25uZWN0KGxlZnRmaWx0ZXIpXG4gIG9zYzIuY29ubmVjdChyaWdodGZpbHRlcilcbiAgbGVmdGZpbHRlci5jb25uZWN0KGNvbXByZXNzb3IpXG4gIHJpZ2h0ZmlsdGVyLmNvbm5lY3QoY29tcHJlc3NvcilcbiAgb3NjMy5jb25uZWN0KGNvbXByZXNzb3IpXG4gIG5vaXNlZ2Fpbi5jb25uZWN0KGRlbGF5KVxuICBub2lzZWdhaW4uY29ubmVjdChkaXN0b3J0aW9uKVxuICBkZWxheS5jb25uZWN0KGNvbXByZXNzb3IpXG4gIGNvbXByZXNzb3IuY29ubmVjdChnYWluKVxuICBnYWluLmNvbm5lY3QoZGlzdG9ydGlvbilcbiAgZGlzdG9ydGlvbi5jb25uZWN0KG1haW5maWx0ZXIpXG5cbiAgLy8gZ290dGEgYmUgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuLi4gb2ggd2VsbFxuICBhdWRpb05vZGVzLm9zY25vaXNlID0gb3Njbm9pc2VcbiAgYXVkaW9Ob2Rlcy5ub2lzZWdhaW4gPSBub2lzZWdhaW5cbiAgYXVkaW9Ob2Rlcy5vc2MxID0gb3NjMVxuICBhdWRpb05vZGVzLm9zYzIgPSBvc2MyXG4gIGF1ZGlvTm9kZXMub3NjMyA9IG9zYzNcbiAgYXVkaW9Ob2Rlcy5sZWZ0ZmlsdGVyID0gbGVmdGZpbHRlclxuICBhdWRpb05vZGVzLnJpZ2h0ZmlsdGVyID0gcmlnaHRmaWx0ZXJcbiAgYXVkaW9Ob2Rlcy5tYWluZmlsdGVyID0gbWFpbmZpbHRlclxuICBhdWRpb05vZGVzLmdhaW4gPSBnYWluXG4gIGF1ZGlvTm9kZXMuZGVsYXkgPSBkZWxheVxuICBhdWRpb05vZGVzLmRpc3RvcnRpb24gPSBkaXN0b3J0aW9uXG4gIGF1ZGlvTm9kZXMuY29tcHJlc3NvciA9IGNvbXByZXNzb3JcblxuICAvLyBnb3NoIGkgd2lzaCB0aGVyZSB3YXMgYW4gYXVkaW9Ob2RlIHRoYXQganVzdCBkaWQgdGhpcy4uLlxuICBhdWRpb05vZGVzLnNldHRpbmdzID0ge1xuICAgIGF0dGFjazogMC4xLFxuICAgIGRlY2F5OiAwLjA1LFxuICAgIHN1c3RhaW46IDAuMyxcbiAgICByZWxlYXNlOiAwLjEsXG4gICAgcGVhazogMC41LFxuICAgIG1pZDogMC4zLFxuICAgIGVuZDogMC4wMDAwMDFcbiAgfVxuICAgIC8vIGp1c3QgbGV0IHRoZW0gYnV6eiBmb3JldmVyLCBkZWFsIHdpdGggXCJub3Rlc1wiIHZpYSBhZHNyIHRyaWNrc1xuICBhdWRpb05vZGVzLm9zY25vaXNlLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLm9zYzEuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIGF1ZGlvTm9kZXMub3NjMi5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgYXVkaW9Ob2Rlcy5vc2MzLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICByZXR1cm4ge1xuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgLy8gLy8gdGhpcyBmdW5jdGlvbiBzaG91bGQgY2FsbCBgY29ubmVjdGAgb24geXIgb3V0cHV0IG5vZGVzIHdpdGggYGlucHV0YCBhcyB0aGUgYXJnXG4gICAgICBhdWRpb05vZGVzLm1haW5maWx0ZXIuY29ubmVjdChpbnB1dClcbiAgICB9LFxuICAgIHN0YXJ0OiBmdW5jdGlvbiAod2hlbikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3N0YXJ0JywgYXVkaW9Ob2Rlcy5zZXR0aW5ncylcblxuICAgICAgYWRzcihhdWRpb05vZGVzLmdhaW4sIHdoZW4sIGF1ZGlvTm9kZXMuc2V0dGluZ3MpXG4gICAgICAvLyBjb25zb2xlLmxvZygnb25lJylcbiAgICAgIHZhciBjbG9uZWQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGF1ZGlvTm9kZXMuc2V0dGluZ3MpKVxuICAgICAgY2xvbmVkLnBlYWsgLz0gMi4wXG4gICAgICBjbG9uZWQubWlkIC89IDIuMFxuICAgICAgLy8gY29uc29sZS5sb2coJ2RpZGl0JywgY2xvbmVkKVxuICAgICAgYWRzcihhdWRpb05vZGVzLm5vaXNlZ2Fpbiwgd2hlbiwgY2xvbmVkKVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKHdoZW4pIHtcbiAgICAgIGF1ZGlvTm9kZXMub3Njbm9pc2Uuc3RvcCh3aGVuKVxuICAgICAgYXVkaW9Ob2Rlcy5vc2MxLnN0b3Aod2hlbilcbiAgICAgIGF1ZGlvTm9kZXMub3NjMi5zdG9wKHdoZW4pXG4gICAgICBhdWRpb05vZGVzLm9zYzMuc3RvcCh3aGVuKVxuICAgICAgY29uc29sZS5sb2coJ3doeWQgdSBwdXNoIHRoZSBwaWFubyBvZmYgdGhlIGJ1aWxkaW5nPyBub3QgaXQgaXMgYnJva2VuLCBmb3JldmVyLiBnb3R0YSBtYWtlIGEgbmV3IG9uZSEnKVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAob3B0cywgd2hlbikge1xuICAgICAgLy8gYXZhaWxhYmxlIG9wdHM6XG4gICAgICAvLyB7bWlkaU5vdGU6IDYyLCBhdHRhY2s6ICwgZGVjYXk6ICwgc3VzdGFpbjogLCByZWxlYXNlOiB9XG4gICAgICBPYmplY3Qua2V5cyhvcHRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHZhciB2ID0gb3B0c1trXVxuICAgICAgICBpZiAoayA9PSAnbWlkaU5vdGUnIHx8IGsgPT0gJ2ZyZXEnKSB7XG4gICAgICAgICAgdmFyIGZyZXEgPSBrID09ICdtaWRpTm90ZScgPyBNSURJVXRpbHMubm90ZU51bWJlclRvRnJlcXVlbmN5KHYpIDogdlxuICAgICAgICAgIGF1ZGlvTm9kZXMubGVmdGZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSArIChNYXRoLnJhbmRvbSgpICogKGZyZXEgLyAyLjUpKSwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLnJpZ2h0ZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICsgKE1hdGgucmFuZG9tKCkgKiAoZnJlcSAvIDIuNSkpLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMubWFpbmZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSArIChNYXRoLnJhbmRvbSgpICogKGZyZXEgLyAzLjUpKSwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zY25vaXNlLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjMS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zYzIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2MzLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gMi4wLCB3aGVuKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGp1c3QgYW4gQURTUiB2YWx1ZVxuICAgICAgICAgIGF1ZGlvTm9kZXMuc2V0dGluZ3Nba10gPSB2XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBub2RlczogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gcmV0dXJucyBhbiBvYmplY3Qgb2YgYHtzdHJpbmdLZXk6IGF1ZGlvTm9kZX1gIGZvciByYXcgbWFuaXB1bGF0aW9uXG4gICAgICByZXR1cm4gYXVkaW9Ob2Rlc1xuICAgIH1cbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSYW5kb21pemUgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiBhIGdpdmVuIGFycmF5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gVGhlIGdpdmVuIGFycmF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY29weV0gLSBTZXRzIGlmIHNob3VsZCByZXR1cm4gYSBzaHVmZmxlZCBjb3B5IG9mIHRoZSBnaXZlbiBhcnJheS4gQnkgZGVmYXVsdCBpdCdzIGEgZmFsc3kgdmFsdWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5ybmddIC0gU3BlY2lmaWVzIGEgY3VzdG9tIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLlxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiBzaHVmZmxlKGFyciwgb3B0aW9ucykge1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaHVmZmxlIGV4cGVjdCBhbiBhcnJheSBhcyBwYXJhbWV0ZXIuJyk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgY29sbGVjdGlvbiA9IGFycixcbiAgICAgIGxlbiA9IGFyci5sZW5ndGgsXG4gICAgICBybmcgPSBvcHRpb25zLnJuZyB8fCBNYXRoLnJhbmRvbSxcbiAgICAgIHJhbmRvbSxcbiAgICAgIHRlbXA7XG5cbiAgaWYgKG9wdGlvbnMuY29weSA9PT0gdHJ1ZSkge1xuICAgIGNvbGxlY3Rpb24gPSBhcnIuc2xpY2UoKTtcbiAgfVxuXG4gIHdoaWxlIChsZW4pIHtcbiAgICByYW5kb20gPSBNYXRoLmZsb29yKHJuZygpICogbGVuKTtcbiAgICBsZW4gLT0gMTtcbiAgICB0ZW1wID0gY29sbGVjdGlvbltsZW5dO1xuICAgIGNvbGxlY3Rpb25bbGVuXSA9IGNvbGxlY3Rpb25bcmFuZG9tXTtcbiAgICBjb2xsZWN0aW9uW3JhbmRvbV0gPSB0ZW1wO1xuICB9XG5cbiAgcmV0dXJuIGNvbGxlY3Rpb247XG59O1xuXG4vKipcbiAqIFBpY2sgb25lIG9yIG1vcmUgcmFuZG9tIGVsZW1lbnRzIGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gVGhlIGdpdmVuIGFycmF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5waWNrc10gLSBTcGVjaWZpZXMgaG93IG1hbnkgcmFuZG9tIGVsZW1lbnRzIHlvdSB3YW50IHRvIHBpY2suIEJ5IGRlZmF1bHQgaXQgcGlja3MgMS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnJuZ10gLSBTcGVjaWZpZXMgYSBjdXN0b20gcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5zaHVmZmxlLnBpY2sgPSBmdW5jdGlvbihhcnIsIG9wdGlvbnMpIHtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2h1ZmZsZS5waWNrKCkgZXhwZWN0IGFuIGFycmF5IGFzIHBhcmFtZXRlci4nKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmcgPSBvcHRpb25zLnJuZyB8fCBNYXRoLnJhbmRvbSxcbiAgICAgIHBpY2tzID0gb3B0aW9ucy5waWNrcyB8fCAxO1xuXG4gIGlmICh0eXBlb2YgcGlja3MgPT09ICdudW1iZXInICYmIHBpY2tzICE9PSAxKSB7XG4gICAgdmFyIGxlbiA9IGFyci5sZW5ndGgsXG4gICAgICAgIGNvbGxlY3Rpb24gPSBhcnIuc2xpY2UoKSxcbiAgICAgICAgcmFuZG9tID0gW10sXG4gICAgICAgIGluZGV4O1xuXG4gICAgd2hpbGUgKHBpY2tzICYmIGxlbikge1xuICAgICAgaW5kZXggPSBNYXRoLmZsb29yKHJuZygpICogbGVuKTtcbiAgICAgIHJhbmRvbS5wdXNoKGNvbGxlY3Rpb25baW5kZXhdKTtcbiAgICAgIGNvbGxlY3Rpb24uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGxlbiAtPSAxO1xuICAgICAgcGlja3MgLT0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFuZG9tO1xuICB9XG5cbiAgcmV0dXJuIGFycltNYXRoLmZsb29yKHJuZygpICogYXJyLmxlbmd0aCldO1xufTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBzaHVmZmxlO1xuIiwidmFyIG1ha2VEaXN0b3J0aW9uQ3VydmUgPSByZXF1aXJlKCdtYWtlLWRpc3RvcnRpb24tY3VydmUnKVxudmFyIE1JRElVdGlscyA9IHJlcXVpcmUoJ21pZGl1dGlscycpXG52YXIgYWRzciA9IHJlcXVpcmUoJ2EtZC1zLXInKVxuLy8geXIgZnVuY3Rpb24gc2hvdWxkIGFjY2VwdCBhbiBhdWRpb0NvbnRleHQsIGFuZCBvcHRpb25hbCBwYXJhbXMvb3B0c1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWMsIG9wdHMpIHtcbiAgLy8gbWFrZSBzb21lIGF1ZGlvTm9kZXMsIGNvbm5lY3QgdGhlbSwgc3RvcmUgdGhlbSBvbiB0aGUgb2JqZWN0XG4gIHZhciBhdWRpb05vZGVzID0ge31cblxuICB2YXIgb3NjaWxsYXRvcjEgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKGFjKVxuICBvc2NpbGxhdG9yMS50eXBlID0gJ3RyaWFuZ2xlJ1xuICBvc2NpbGxhdG9yMS5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG4gIHZhciBvc2NpbGxhdG9yMiA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoYWMpXG4gIG9zY2lsbGF0b3IyLnR5cGUgPSAndHJpYW5nbGUnXG4gIG9zY2lsbGF0b3IyLmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcbiAgdmFyIG9zY2lsbGF0b3IzID0gYWMuY3JlYXRlT3NjaWxsYXRvcihhYylcbiAgb3NjaWxsYXRvcjMudHlwZSA9ICdzYXd0b290aCdcbiAgb3NjaWxsYXRvcjMuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuICB2YXIgb3NjaWxsYXRvcjQgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKGFjKVxuICBvc2NpbGxhdG9yNC50eXBlID0gJ3RyaWFuZ2xlJ1xuICBvc2NpbGxhdG9yNC5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cbiAgdmFyIG9zY2lsbGF0b3I1ID0gYWMuY3JlYXRlT3NjaWxsYXRvcihhYylcbiAgb3NjaWxsYXRvcjUudHlwZSA9ICdzaW5lJ1xuICBvc2NpbGxhdG9yNS5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG4gIHZhciBvc2NpbGxhdG9yNiA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoYWMpXG4gIG9zY2lsbGF0b3I2LnR5cGUgPSAnc2luZSdcbiAgb3NjaWxsYXRvcjYuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuXG5cbiAgdmFyIGRlbGF5QSA9IGFjLmNyZWF0ZURlbGF5KDAuMDEzMjIpXG5cbiAgdmFyIGRlbGF5QiA9IGFjLmNyZWF0ZURlbGF5KDAuMDE1Mjc1MjMxMzEwMzIyMilcblxuXG4gIHZhciBkZWxheUMgPSBhYy5jcmVhdGVEZWxheSgwLjAxNzIyMilcblxudmFyIGZpbHRlckEgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuZmlsdGVyQS5RLnZhbHVlID0gMTJcbmZpbHRlckEudHlwZSA9ICdoaWdocGFzcydcbmZpbHRlckEuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuXG5cbi8vIHRoYXQgb25lIGRpc3RvcnRpb24gY3VydmUgdGhhdCBldmVyeW9uZSBjb3B5IHBhc3RlcyBmcm9tIHN0YWNrIG92ZXJmbG93IGFueXdheXNcblxuLy8gbWFrZSBhIGRpc3RvcnRpb24gcGVkYWwhIHlheSFcbnZhciBkaXN0b3J0aW9uQSA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuZGlzdG9ydGlvbkEuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDEwMClcblxudmFyIGZpbHRlckIgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuZmlsdGVyQi5RLnZhbHVlID0gMTJcbmZpbHRlckIudHlwZSA9ICdoaWdocGFzcydcbmZpbHRlckIuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuXG4vLyB0aGF0IG9uZSBkaXN0b3J0aW9uIGN1cnZlIHRoYXQgZXZlcnlvbmUgY29weSBwYXN0ZXMgZnJvbSBzdGFjayBvdmVyZmxvdyBhbnl3YXlzXG5cbi8vIG1ha2UgYSBkaXN0b3J0aW9uIHBlZGFsISB5YXkhXG52YXIgZGlzdG9ydGlvbkIgPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbmRpc3RvcnRpb25CLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSgxMDApXG5cbnZhciBmaWx0ZXJDID0gYWMuY3JlYXRlQmlxdWFkRmlsdGVyKClcbmZpbHRlckMuUS52YWx1ZSA9IDdcbmZpbHRlckMudHlwZSA9ICdsb3dwYXNzJ1xuZmlsdGVyQy5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cbi8vIHRoYXQgb25lIGRpc3RvcnRpb24gY3VydmUgdGhhdCBldmVyeW9uZSBjb3B5IHBhc3RlcyBmcm9tIHN0YWNrIG92ZXJmbG93IGFueXdheXNcblxuLy8gbWFrZSBhIGRpc3RvcnRpb24gcGVkYWwhIHlheSFcbnZhciBkaXN0b3J0aW9uQyA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuZGlzdG9ydGlvbkMuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDEwMClcblxuXG5cbnZhciBnYWluQSA9IGFjLmNyZWF0ZUdhaW4oKVxuZ2FpbkEuZ2Fpbi52YWx1ZSA9IDAuMzMzMzMzMzMzMzMzMzMzXG52YXIgZ2FpbkIgPSBhYy5jcmVhdGVHYWluKClcbmdhaW5CLmdhaW4udmFsdWUgPSAwLjMzMzMzMzMzMzMzMzMzM1xudmFyIGdhaW5DID0gYWMuY3JlYXRlR2FpbigpXG5nYWluQy5nYWluLnZhbHVlID0gMC4zMzMzMzMzMzMzMzMzMzNcbnZhciBnYWluWiA9IGFjLmNyZWF0ZUdhaW4oKVxuZ2FpblouZ2Fpbi52YWx1ZSA9IDAuNVxuXG5cblxudmFyIGZpbHRlclogPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuZmlsdGVyWi5RLnZhbHVlID0gMTJcbmZpbHRlcloudHlwZSA9ICdoaWdoc2hlbGYnXG5maWx0ZXJaLmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcblxuLy8gdGhhdCBvbmUgZGlzdG9ydGlvbiBjdXJ2ZSB0aGF0IGV2ZXJ5b25lIGNvcHkgcGFzdGVzIGZyb20gc3RhY2sgb3ZlcmZsb3cgYW55d2F5c1xuXG52YXIgZGVsYXlaID0gYWMuY3JlYXRlRGVsYXkoMC4wMTIyKVxuXG4vLyBtYWtlIGEgZGlzdG9ydGlvbiBwZWRhbCEgeWF5IVxudmFyIGRpc3RvcnRpb25aID0gYWMuY3JlYXRlV2F2ZVNoYXBlcigpXG5kaXN0b3J0aW9uWi5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoMTAwKVxuXG5cbiAgdmFyIHZvbHVtZSA9IGFjLmNyZWF0ZUdhaW4oKVxuICB2b2x1bWUuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCBhYy5jdXJyZW50VGltZSlcblxuICAvLyAgU1RBUlQgT0YgQ0hBSU4gKE5PVCBNQVJLT1YpXG5cbiAgb3NjaWxsYXRvcjEuY29ubmVjdChkZWxheUEpXG5cbiAgb3NjaWxsYXRvcjUuY29ubmVjdChmaWx0ZXJBLmZyZXF1ZW5jeSlcbiAgb3NjaWxsYXRvcjUuY29ubmVjdChnYWluWi5nYWluKVxuICBvc2NpbGxhdG9yNS5mcmVxdWVuY3kudmFsdWUgPSAwLjEzM1xuXG4gIG9zY2lsbGF0b3I0LmNvbm5lY3QoZGVsYXlCKVxuICBvc2NpbGxhdG9yNi5jb25uZWN0KGZpbHRlckIuZnJlcXVlbmN5KVxuICBvc2NpbGxhdG9yNi5jb25uZWN0KGdhaW5DLmdhaW4pXG4gIG9zY2lsbGF0b3I2LmZyZXF1ZW5jeS52YWx1ZSA9IDAuMjczXG5cbiAgb3NjaWxsYXRvcjIuY29ubmVjdChkZWxheUMpXG4gIG9zY2lsbGF0b3IzLmNvbm5lY3QoZGVsYXlDKVxuXG4gIGRlbGF5QS5jb25uZWN0KGZpbHRlckEpXG4gIGRlbGF5Qi5jb25uZWN0KGZpbHRlckIpXG4gIGRlbGF5Qy5jb25uZWN0KGZpbHRlckMpXG5cbiAgZmlsdGVyQS5jb25uZWN0KGdhaW5BKVxuICBmaWx0ZXJCLmNvbm5lY3QoZ2FpbkIpXG4gIGZpbHRlckMuY29ubmVjdChnYWluQylcblxuICBvc2NpbGxhdG9yMS5jb25uZWN0KGdhaW5BKVxuICBvc2NpbGxhdG9yNS5jb25uZWN0KGdhaW5BKVxuXG4gIG9zY2lsbGF0b3I0LmNvbm5lY3QoZ2FpbkIpXG4gIG9zY2lsbGF0b3I2LmNvbm5lY3QoZ2FpbkIpXG5cbiAgb3NjaWxsYXRvcjIuY29ubmVjdChnYWluQylcbiAgb3NjaWxsYXRvcjMuY29ubmVjdChnYWluQylcblxuICBnYWluQS5jb25uZWN0KGRpc3RvcnRpb25BKVxuICBnYWluQi5jb25uZWN0KGRpc3RvcnRpb25CKVxuICBnYWluQy5jb25uZWN0KGRpc3RvcnRpb25DKVxuXG4gIGRpc3RvcnRpb25DLmNvbm5lY3QoZGVsYXlaKVxuICBkZWxheVouY29ubmVjdChmaWx0ZXJaKVxuICBkaXN0b3J0aW9uQy5jb25uZWN0KGdhaW5aKVxuICBmaWx0ZXJaLmNvbm5lY3QoZ2FpblopXG4gIGdhaW5aLmNvbm5lY3QoZGlzdG9ydGlvblopXG5cbiAgZGlzdG9ydGlvbkEuY29ubmVjdCh2b2x1bWUpXG4gIGRpc3RvcnRpb25CLmNvbm5lY3Qodm9sdW1lKVxuICBkaXN0b3J0aW9uWi5jb25uZWN0KHZvbHVtZSlcbiAgLy8gRU5EIE9GIENIQUlOXG5cbiAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yMSA9IG9zY2lsbGF0b3IxXG4gIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjIgPSBvc2NpbGxhdG9yMlxuICBhdWRpb05vZGVzLm9zY2lsbGF0b3IzID0gb3NjaWxsYXRvcjNcbiAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNCA9IG9zY2lsbGF0b3I0XG4gIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjUgPSBvc2NpbGxhdG9yNVxuICBhdWRpb05vZGVzLm9zY2lsbGF0b3I2ID0gb3NjaWxsYXRvcjZcbiAgYXVkaW9Ob2Rlcy5kZWxheUEgPSBkZWxheUFcbiAgYXVkaW9Ob2Rlcy5kZWxheUIgPSBkZWxheUJcbiAgYXVkaW9Ob2Rlcy5kZWxheUMgPSBkZWxheUNcbiAgYXVkaW9Ob2Rlcy5kZWxheVogPSBkZWxheVpcbiAgYXVkaW9Ob2Rlcy5nYWluQSA9IGdhaW5BXG4gIGF1ZGlvTm9kZXMuZ2FpbkIgPSBnYWluQlxuICBhdWRpb05vZGVzLmdhaW5DID0gZ2FpbkNcbiAgYXVkaW9Ob2Rlcy5maWx0ZXJBID0gZmlsdGVyQVxuICBhdWRpb05vZGVzLmZpbHRlckIgPSBmaWx0ZXJCXG4gIGF1ZGlvTm9kZXMuZmlsdGVyQyA9IGZpbHRlckNcbiAgYXVkaW9Ob2Rlcy5maWx0ZXJaID0gZmlsdGVyWlxuICBhdWRpb05vZGVzLmRpc3RvcnRpb25BID0gZGlzdG9ydGlvbkFcbiAgYXVkaW9Ob2Rlcy5kaXN0b3J0aW9uQiA9IGRpc3RvcnRpb25CXG4gIGF1ZGlvTm9kZXMuZGlzdG9ydGlvbkMgPSBkaXN0b3J0aW9uQ1xuICBhdWRpb05vZGVzLmRpc3RvcnRpb25aID0gZGlzdG9ydGlvblpcbiAgYXVkaW9Ob2Rlcy52b2x1bWUgPSB2b2x1bWVcbiAgYXVkaW9Ob2Rlcy5zZXR0aW5ncyA9IHtcbiAgICBhdHRhY2s6IDAuMDEsXG4gICAgZGVjYXk6IDAuMDUsXG4gICAgc3VzdGFpbjogMC40LFxuICAgIHJlbGVhc2U6IDAuMSxcbiAgICBwZWFrOiAwLjMsXG4gICAgbWlkOiAwLjEsXG4gICAgZW5kOiAwLjAwMDAwMDAwMDAwMDAxIC8vIGxvbCBpZGsgd3RmXG4gIH1cblxuICAvLyBienp6enpcbiAgb3NjaWxsYXRvcjEuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIG9zY2lsbGF0b3IyLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBvc2NpbGxhdG9yMy5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgb3NjaWxsYXRvcjQuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIG9zY2lsbGF0b3I1LnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBvc2NpbGxhdG9yNi5zdGFydChhYy5jdXJyZW50VGltZSlcblxuICByZXR1cm4ge1xuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgYXVkaW9Ob2Rlcy52b2x1bWUuY29ubmVjdChpbnB1dClcbiAgICB9LFxuICAgIHN0YXJ0OiBmdW5jdGlvbiAod2hlbikge1xuICAgICAgYWRzcihhdWRpb05vZGVzLnZvbHVtZSwgd2hlbiwgYXVkaW9Ob2Rlcy5zZXR0aW5ncylcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uICh3aGVuKSB7XG4gICAgICBjb25zb2xlLmxvZygnU09NRVRJTUVTIEkgRE9VQlQgWVIgQ09NTUlUTUVOVCAyIFNQQVJLTEUgTU9USU9OXFxucC5zLiB5ciBvc2NpbGxhdG9ycyBhcmUgZGVzdHJveWVkLCBtYWtlIGEgbmV3IHN5bnRoIHBseicpXG4gICAgICBvc2NpbGxhdG9yMS5zdG9wKHdoZW4pXG4gICAgICBvc2NpbGxhdG9yMi5zdG9wKHdoZW4pXG4gICAgICBvc2NpbGxhdG9yMy5zdG9wKHdoZW4pXG4gICAgICBvc2NpbGxhdG9yNC5zdG9wKHdoZW4pXG4gICAgICBvc2NpbGxhdG9yNS5zdG9wKHdoZW4pXG4gICAgICBvc2NpbGxhdG9yNi5zdG9wKHdoZW4pXG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChvcHRzLCB3aGVuKSB7XG4gICAgICAvLyBhdmFpbGFibGUgb3B0czpcbiAgICAgIC8vIHttaWRpTm90ZTogNjIsIGxmb0w6ICwgbGZvUjogLCBmcmVxLCBhdHRhY2s6ICwgZGVjYXk6ICwgc3VzdGFpbjogLCByZWxlYXNlOiAsIHBlYWs6ICwgbWlkOn1cbiAgICAgIE9iamVjdC5rZXlzKG9wdHMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgdmFyIHYgPSBvcHRzW2tdXG4gICAgICAgIGlmIChrID09ICdtaWRpTm90ZScgfHwgayA9PSAnZnJlcScpIHtcbiAgICAgICAgICB2YXIgZnJlcSA9IGsgPT0gJ21pZGlOb3RlJyA/IE1JRElVdGlscy5ub3RlTnVtYmVyVG9GcmVxdWVuY3kodikgOiB2XG5cbiAgICAgICAgICBhdWRpb05vZGVzLm9zY2lsbGF0b3IxLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yMy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zY2lsbGF0b3I0LmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxLCB3aGVuKVxuXG4gICAgICAgICAgZmlsdGVyQS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvICgyICsgTWF0aC5yYW5kb20oKSksIHdoZW4pXG4gICAgICAgICAgZmlsdGVyQi5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvICgyICsgTWF0aC5yYW5kb20oKSksIHdoZW4pXG4gICAgICAgICAgZmlsdGVyQy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvIChNYXRoLnJhbmRvbSgpKSwgd2hlbilcbiAgICAgICAgICBmaWx0ZXJaLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gKDEuNSArIE1hdGgucmFuZG9tKCkpLCB3aGVuKVxuXG4gICAgICAgIH0gZWxzZSBpZiAoayA9PSAnbGZvTCcgfHwgayA9PSAnbGZvUicpIHtcbiAgICAgICAgICB2YXIgbm9kZSA9IGsgPT0gJ2xmb0wnID8gYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNSA6IGF1ZGlvTm9kZXMub3NjaWxsYXRvcjZcbiAgICAgICAgICBub2RlLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSh2LCB3aGVuKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGp1c3QgYW4gQURTUiB2YWx1ZVxuICAgICAgICAgIGF1ZGlvTm9kZXMuc2V0dGluZ3Nba10gPSB2XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBub2RlczogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gcmV0dXJucyBhbiBvYmplY3Qgb2YgYHtzdHJpbmdLZXk6IGF1ZGlvTm9kZX1gIGZvciByYXcgbWFuaXB1bGF0aW9uXG4gICAgICByZXR1cm4gYXVkaW9Ob2Rlc1xuICAgIH1cbiAgfVxufSIsInZhciBhZHNyID0gcmVxdWlyZSgnYS1kLXMtcicpXG52YXIgbWFrZURpc3RvcnRpb25DdXJ2ZSA9IHJlcXVpcmUoJ21ha2UtZGlzdG9ydGlvbi1jdXJ2ZScpXG5cbi8vIHlyIGZ1bmN0aW9uIHNob3VsZCBhY2NlcHQgYW4gYXVkaW9Db250ZXh0LCBhbmQgb3B0aW9uYWwgcGFyYW1zL29wdHNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjLCBvcHRzKSB7XG4gIC8vIG1ha2Ugc29tZSBhdWRpb05vZGVzLCBjb25uZWN0IHRoZW0sIHN0b3JlIHRoZW0gb24gdGhlIG9iamVjdFxuICB2YXIgYXVkaW9Ob2RlcyA9IHtcbiAgICBvbmU6ICBhYy5jcmVhdGVPc2NpbGxhdG9yKCksXG4gICAgdHdvOiAgYWMuY3JlYXRlT3NjaWxsYXRvcigpLFxuICAgIHRocmVlOiAgYWMuY3JlYXRlT3NjaWxsYXRvcigpLFxuICAgIGZvdXI6ICBhYy5jcmVhdGVPc2NpbGxhdG9yKCksXG4gICAgbGZvOiBhYy5jcmVhdGVPc2NpbGxhdG9yKCksXG4gICAgZmlsdGVybGZvZ2FpbjogYWMuY3JlYXRlR2FpbigpLFxuICAgIHBvc3RmaWx0ZXJsZm9nYWluOiBhYy5jcmVhdGVHYWluKCksXG4gICAgcHJlZ2FpbjogYWMuY3JlYXRlR2FpbigpLFxuICAgIHBvc3RHYWluOiBhYy5jcmVhdGVHYWluKCksXG4gICAgZmlsdGVyOiBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKSxcbiAgICBkZWxheTogYWMuY3JlYXRlRGVsYXkoMC4wNzUpLFxuICAgIGRpc3RvcnRpb246IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKSxcbiAgICBwb3N0RmlsdGVyOiBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKSxcbiAgICBlbnZlbG9wZTogYWMuY3JlYXRlR2FpbigpLFxuICAgIHNldHRpbmdzOiB7XG4gICAgICBmcmVxOiA0NDAsXG4gICAgICBhdHRhY2s6IDAuMDUxLFxuICAgICAgZGVjYXk6IDAuMDUsXG4gICAgICBzdXN0YWluOiAwLjIxLFxuICAgICAgcmVsZWFzZTogMC4yNSxcbiAgICAgIGRldHVuZTogNSxcbiAgICAgIHBlYWs6IDAuNSxcbiAgICAgIG1pZDogMC4zLFxuICAgICAgZW5kOiAwLjAwMDAwMVxuICAgIH1cbiAgfVxuXG4gIGF1ZGlvTm9kZXMub25lLnR5cGUgPSAnc3F1YXJlJ1xuICBhdWRpb05vZGVzLnR3by50eXBlID0gJ3Nhd3Rvb3RoJ1xuICBhdWRpb05vZGVzLnRocmVlLnR5cGUgPSAnc2luZSdcbiAgYXVkaW9Ob2Rlcy5mb3VyLnR5cGUgPSAnc2F3dG9vdGgnXG5cbiAgYXVkaW9Ob2Rlcy5vbmUuZGV0dW5lLnNldFZhbHVlQXRUaW1lKCgoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpICogMSksIGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLnR3by5kZXR1bmUuc2V0VmFsdWVBdFRpbWUoKCgoTWF0aC5yYW5kb20oKSAqIDIpIC0gMSkgKiAyKSwgYWMuY3VycmVudFRpbWUpXG4gIGF1ZGlvTm9kZXMudGhyZWUuZGV0dW5lLnNldFZhbHVlQXRUaW1lKCgoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpICogMyksIGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLmZvdXIuZGV0dW5lLnNldFZhbHVlQXRUaW1lKCgoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpICogMyksIGFjLmN1cnJlbnRUaW1lKVxuXG4gIGF1ZGlvTm9kZXMuZmlsdGVyLnR5cGUgPSAnbG93cGFzcydcbiAgYXVkaW9Ob2Rlcy5wb3N0RmlsdGVyLnR5cGUgPSAncGVha2luZydcblxuICBhdWRpb05vZGVzLmZpbHRlcmxmb2dhaW4uZ2Fpbi52YWx1ZSA9IDE1MDUwXG4gIGF1ZGlvTm9kZXMucG9zdGZpbHRlcmxmb2dhaW4uZ2Fpbi52YWx1ZSA9IDEwMDAwXG5cbiAgYXVkaW9Ob2Rlcy5sZm8uY29ubmVjdChhdWRpb05vZGVzLmZpbHRlcmxmb2dhaW4pXG4gIGF1ZGlvTm9kZXMubGZvLmNvbm5lY3QoYXVkaW9Ob2Rlcy5wb3N0ZmlsdGVybGZvZ2FpbilcbiAgYXVkaW9Ob2Rlcy5maWx0ZXJsZm9nYWluLmNvbm5lY3QoYXVkaW9Ob2Rlcy5maWx0ZXIuZnJlcXVlbmN5KVxuICBhdWRpb05vZGVzLnBvc3RmaWx0ZXJsZm9nYWluLmNvbm5lY3QoYXVkaW9Ob2Rlcy5wb3N0RmlsdGVyLmZyZXF1ZW5jeSlcblxuICBhdWRpb05vZGVzLmRpc3RvcnRpb24uY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDc1MClcblxuXG4gIGF1ZGlvTm9kZXMub25lLmNvbm5lY3QoYXVkaW9Ob2Rlcy5wcmVnYWluKVxuICBhdWRpb05vZGVzLnR3by5jb25uZWN0KGF1ZGlvTm9kZXMucHJlZ2FpbilcbiAgYXVkaW9Ob2Rlcy50aHJlZS5jb25uZWN0KGF1ZGlvTm9kZXMucHJlZ2FpbilcbiAgYXVkaW9Ob2Rlcy5mb3VyLmNvbm5lY3QoYXVkaW9Ob2Rlcy5wcmVnYWluKVxuICBhdWRpb05vZGVzLnByZWdhaW4uY29ubmVjdChhdWRpb05vZGVzLmZpbHRlcilcbiAgYXVkaW9Ob2Rlcy5maWx0ZXIuY29ubmVjdChhdWRpb05vZGVzLmRlbGF5KVxuICBhdWRpb05vZGVzLmRlbGF5LmNvbm5lY3QoYXVkaW9Ob2Rlcy5wb3N0R2FpbilcbiAgYXVkaW9Ob2Rlcy5maWx0ZXIuY29ubmVjdChhdWRpb05vZGVzLmRpc3RvcnRpb24pXG4gIGF1ZGlvTm9kZXMuZGlzdG9ydGlvbi5jb25uZWN0KGF1ZGlvTm9kZXMucG9zdEdhaW4pXG4gIGF1ZGlvTm9kZXMucG9zdEdhaW4uY29ubmVjdChhdWRpb05vZGVzLnBvc3RGaWx0ZXIpXG4gIGF1ZGlvTm9kZXMucG9zdEZpbHRlci5jb25uZWN0KGF1ZGlvTm9kZXMuZW52ZWxvcGUpXG5cblxuICBhdWRpb05vZGVzLnByZWdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgxLjAgLyAzLjAsIGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLnBvc3RHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC41LCBhYy5jdXJyZW50VGltZSlcbiAgYXVkaW9Ob2Rlcy5lbnZlbG9wZS5nYWluLnNldFZhbHVlQXRUaW1lKDAsIGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLmxmby5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMSwgYWMuY3VycmVudFRpbWUpXG5cbiAgYXVkaW9Ob2Rlcy5vbmUuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIGF1ZGlvTm9kZXMudHdvLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLnRocmVlLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLmZvdXIuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIGF1ZGlvTm9kZXMubGZvLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuXG4gIHJldHVybiB7XG4gICAgY29ubmVjdDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICBhdWRpb05vZGVzLmVudmVsb3BlLmNvbm5lY3QoaW5wdXQpXG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gKHdoZW4pIHtcbiAgICAgIC8vIC8vdGhpcyBmdW5jdGlvbiBzaG91bGQgY2FsbCBgc3RhcnQod2hlbilgIG9uIHlyIHNvdXJjZSBub2Rlcy4gUHJvYmFibHkgb3NjaWxsYXRvcnMvc2FtcGxlcnMgaSBndWVzcywgYW5kIGFueSBMRk8gdG9vIVxuICAgICAgYWRzcihhdWRpb05vZGVzLmVudmVsb3BlLCB3aGVuLCBhdWRpb05vZGVzLnNldHRpbmdzKVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKHdoZW4pIHtcbiAgICAgIGF1ZGlvTm9kZXMub25lLnN0b3Aod2hlbilcbiAgICAgIGF1ZGlvTm9kZXMudHdvLnN0b3Aod2hlbilcbiAgICAgIGF1ZGlvTm9kZXMudGhyZWUuc3RvcCh3aGVuKVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAob3B0cywgd2hlbikge1xuICAgICAgT2JqZWN0LmtleXMob3B0cykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICB2YXIgdiA9IG9wdHNba11cbiAgICAgICAgaWYgKGsgPT0gJ21pZGlOb3RlJyB8fCBrID09ICdmcmVxJykge1xuICAgICAgICAgIHZhciBmcmVxID0gayA9PSAnbWlkaU5vdGUnID8gTUlESVV0aWxzLm5vdGVOdW1iZXJUb0ZyZXF1ZW5jeSh2KSA6IHZcbiAgICAgICAgICBhdWRpb05vZGVzLm9uZS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvIDQuMCwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLnR3by5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvIDIuMCwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLnRocmVlLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gOC4wLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMuZm91ci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvIDQuMCwgd2hlbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBqdXN0IGFuIEFEU1IgdmFsdWVcbiAgICAgICAgICBhdWRpb05vZGVzLnNldHRpbmdzW2tdID0gdlxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgfSxcbiAgICBub2RlczogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gcmV0dXJucyBhbiBvYmplY3Qgb2YgYHtzdHJpbmdLZXk6IGF1ZGlvTm9kZX1gIGZvciByYXcgbWFuaXB1bGF0aW9uXG4gICAgICByZXR1cm4gYXVkaW9Ob2Rlc1xuICAgIH1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjKSB7XG4gIC8vIFRPRE86IHByb2JhYmx5IHB1dCBhIGxpZ2h0IGdsb2JhbCByZXZlcmIgaGVyZSBhcyB3ZWxsLCB5ZWFoXG4gIHZhciBtYWluVm9sdW1lID0gYWMuY3JlYXRlR2FpbigpXG4gIG1haW5Wb2x1bWUuY29ubmVjdChhYy5kZXN0aW5hdGlvbilcbiAgcmV0dXJuIHtcbiAgICBhYzogYWMsXG4gICAgbWFpblZvbHVtZTogbWFpblZvbHVtZSxcbiAgICAvLyByZXZlcmI6IHJldmVyYixcbiAgICBiYXNzOiByZXF1aXJlKCcuLi9pbnN0cnVtZW50cy9iYXNzJykoYWMpLmNvbm5lY3QobWFpblZvbHVtZSksXG4gICAgcGlhbm86IHJlcXVpcmUoJy4uL2luc3RydW1lbnRzL3BpYW5vJykoYWMpLmNvbm5lY3QobWFpblZvbHVtZSksXG4gICAgd2FyYmFzczogcmVxdWlyZSgnLi4vaW5zdHJ1bWVudHMvd2FyYmFzcycpKGFjKS5jb25uZWN0KG1haW5Wb2x1bWUpLFxuICAgIHdoaW55OiByZXF1aXJlKCcuLi9pbnN0cnVtZW50cy93aGlueScpKGFjKS5jb25uZWN0KG1haW5Wb2x1bWUpLFxuICAgIHNwYXJrbGU6IHJlcXVpcmUoJy4uL2luc3RydW1lbnRzL3NwYXJrbGUnKShhYykuY29ubmVjdChtYWluVm9sdW1lKSxcbiAgICAvLyBldGMuIGV0Yy4gZXRjLiBmb3JldmVyXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcblx0XHRhdHRhY2s6IE1hdGgucmFuZG9tKCksXG5cdFx0ZGVjYXk6IE1hdGgucmFuZG9tKCksXG5cdFx0c3VzdGFpbjogTWF0aC5yYW5kb20oKSxcblx0XHRyZWxlYXNlOiBNYXRoLnJhbmRvbSgpXG5cdH1cblxufVxuXG4vLyB7YXR0YWNrOiAwLjI3NTEsIGRlY2F5OiAwLjE0MzE1LCBzdXN0YWluOiAwLjE0MzEsIHJlbGVhc2U6IDAuMTQyMX0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcblx0XHRicG06IH5+KE1hdGgucmFuZG9tKCkgKiAzNTApICsgNTAsXG5cdFx0a2V5OiB7XG5cdFx0XHR0b25pYzogcGljayhbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnQSMnLCAnQyMnLCAnRCMnLCAnRiMnLCAnRyMnXSkgKyAofn4oTWF0aC5yYW5kb20oKSAqIDMpICsgMiksXG5cdFx0XHRzY2FsZTogcGljayhbJ3BlbnRNaW4nLCAncGVudE1haicsICdibHVlcycsICdtaW5vcicsICdtYWpvciddKVxuXHRcdH0sXG5cdFx0YWR2YW5jZU1vZDogMVxuXHR9XG59XG5cbi8vIHtcbi8vICAgXCJicG1cIjogMjYwLFxuLy8gICBcImtleVwiOiB7XG4vLyAgICAgXCJ0b25pY1wiOiBcIkUyXCIsXG4vLyAgICAgXCJzY2FsZVwiOiBcInBlbnRNaW5cIlxuLy8gICB9LFxuLy8gICBcImFkdmFuY2VNb2RcIjogMVxuLy8gfVxuXG5mdW5jdGlvbiBwaWNrIChhcnIpIHtcbiAgcmV0dXJuIGFyclt+fihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG5cblx0cmV0dXJuIHtcblx0XHRkYXRhOiBbXG5cdFx0XHRtYWtlRGF0YShsZW5ndGgpLFxuXHRcdFx0bWFrZURhdGEobGVuZ3RoKSxcblx0XHRcdG1ha2VEYXRhKGxlbmd0aClcblx0XHRdLFxuXHRcdHByb2JzOiBbXG5cdFx0XHRtYWtlUHJvYnMobGVuZ3RoKSxcblx0XHRcdG1ha2VQcm9icyhsZW5ndGgpLFxuXHRcdFx0bWFrZVByb2JzKGxlbmd0aClcblx0XHRdLFxuXHRcdG5leHRzOiBtYWtlTmV4dHMoMyksXG5cblxuXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHRtb2Q6IH5+KE1hdGgucmFuZG9tKCkgKiA0KVxuXHRcdH1cblx0fVxufVxuXG4vLyBjb25zb2xlLmxvZyhtYWtlRGF0YSg4KSlcblxuZnVuY3Rpb24gbWFrZU5leHRzKHRvdGFsKSB7XG5cdHZhciBuZXh0cyA9IFtdXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKykge1xuXHRcdG5leHRzLnB1c2goW2ksIH5+KE1hdGgucmFuZG9tKCkgKiB0b3RhbCksIH5+KE1hdGgucmFuZG9tKCkgKiB0b3RhbCksIH5+KE1hdGgucmFuZG9tKCkgKiB0b3RhbCldKVxuXHR9XG5cdHJldHVybiBuZXh0c1xufVxuXG5mdW5jdGlvbiBtYWtlUHJvYnMobnVtKSB7XG5cdHZhciBwcm9icyA9IFtdXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcblx0XHRwcm9icy5wdXNoKE1hdGgucmFuZG9tKCkpXG5cdH1cblx0cmV0dXJuIHByb2JzXG59XG5cbmZ1bmN0aW9uIG1ha2VEYXRhKG51bSkge1xuXHR2YXIgZGF0YSA9IFtdXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcblx0XHRkYXRhLnB1c2gobWFrZURhdHVtKCkpXG5cdH1cblx0cmV0dXJuIGRhdGFcbn1cblxuZnVuY3Rpb24gbWFrZURhdHVtKCkge1xuXHR2YXIgZGF0dW0gPSBbXVxuXHR2YXIgZWxsaWVzID0gfn4oTWF0aC5yYW5kb20oKSAqIDQpICsgMVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVsbGllczsgaSsrKSB7XG5cdFx0ZGF0dW0ucHVzaChnZXRSYW5kb20oKSlcblx0fVxuXHRyZXR1cm4gZGF0dW1cbn1cblxuZnVuY3Rpb24gZ2V0UmFuZG9tKCkge1xuXHRyZXR1cm4gfn4oTWF0aC5yYW5kb20oKSAqIDE1KSAtIDdcbn1cbi8vIGNvbnNvbGUubG9nKGdldFJhbmRvbSgpKVxuXG4gIC8vIHtcbiAgLy8gICBkYXRhOiBbXG4gIC8vICAgICBbWzIsIDAsIC03XSwgWzRdLCBbMiwgMCwgN10sIFs2XSwgWzRdLCBbMiwgMCwgLTddLCBbMiwgMCwgLTddLCBbNF0sIFsyLCAwLCA3XSwgWzZdLCBbNF0sIFsyLCAwLCAtN11dLFxuICAvLyAgICAgW1stMiwgLTMsIDVdLCBbNF0sIFstMiwgLTMsIC05XSwgWzZdLCBbNF0sIFstMiwgLTMsIDVdLCBbLTIsIC0zLCA1XSwgWzRdLCBbLTIsIC0zLCAtOV0sIFs2XSwgWzRdLCBbLTIsIC0zLCA1XV0sXG4gIC8vICAgICBbWy0zLCAyLCAwLCAtMl0sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdLCBbNiwgMTNdLCBbNCwgMTFdLCBbLTMsIDIsIDAsIC0yXSwgWy0zLCAyLCAwLCAtMl0sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdLCBbNiwgMTNdLCBbNCwgMTFdLCBbLTMsIDIsIDAsIC0yXV1cbiAgLy8gICBdLFxuICAvLyAgIHByb2JzOiBbXG4gIC8vICAgICBbMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41LCAxLCAwLjI1LCAxLCAwLjc1LCAwLjc1LCAwLjVdLFxuICAvLyAgICAgWzEsIDAuMjUsIDEsIDAuNzUsIDAuNzUsIDAuNSwgMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41XSxcbiAgLy8gICAgIFsxLCAwLjUsIDEsIDAuNzUsIDEsIDAuNSwgMSwgMC41LCAxLCAwLjc1LCAxLCAwLjc1XVxuICAvLyAgIF0sXG4gIC8vICAgbmV4dHM6IFtcbiAgLy8gICAgIFswLCAwLCAxLCAxLCAyXSwgWzEsIDEsIDAsIDAsIDJdLCBbMiwgMiwgMiwgMCwgMV1cbiAgLy8gICBdLFxuICAvLyAgIGNvbmZpZzoge1xuICAvLyAgICAgbW9kOiAxXG4gIC8vICAgfVxuICAvLyB9LCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgYXJncyA9IGFyZ3MgfHwge31cbiAgcmV0dXJuIHtcbiAgICBicG06IGFyZ3MuYnBtIHx8IDEyMCxcbiAgICBhZHZhbmNlTW9kOiBhcmdzLmFkdmFuY2VNb2QgfHwgMSxcbiAgICBfaW50ZXJ2YWw6IHVuZGVmaW5lZCxcbiAgICBfY291bnRlcjogMCwgLy8gaW5jcmVtZW50cyBlYWNoIGxvb3BcbiAgICBfdGljazogMCwgLy8gaW5jcmVtZW50cyBlYWNoIGludGVydmFsL2JlYXRcbiAgICBfY3VycmVudDogMCwgLy8gd2hpY2ggc2VjdGlvbiBmb3IgZWFjaCBpbnN0ICh2ZXJzZSwgY2hvcnVzLCBldGMuKVxuICAgIF9uZXh0Q3VycmVudDogMCwgLy8gd2hpY2ggc2VjdGlvbiB3aWxsIGJlIHBsYXllZCBuZXh0XG4gICAgX2luc3RydW1lbnRzOiBbXSwgLy8gdGhlIGluc3RydW1lbnRzLCBsb2xcbiAgICBfc3RydWN0dXJlOiB1bmRlZmluZWQsIC8vIGhvdyB0byBqdW1wIGJldHdlZW4gdGhlIGxhcmdlciBwYXR0ZXJuc1xuICAgIG9uRW5kOiB1bmRlZmluZWQsIC8vIGNhbGxlZCB3aGVuIHRoZSBzdHJ1Y3R1cmUgaGl0cyBhIGBudWxsYFxuICAgIG9uU2VjdGlvblN0YXJ0OiB1bmRlZmluZWQsIC8vIGNhbGxlZCB3aGVuIGEgcGF0dGVybiBiZWdpbnMsIHBhc3NlZCBhIGJvb2xlYW4gdGhhdCBkZXNpZ25hdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBzZWN0aW9uIHdpbGwgdXBkYXRlIGF0IHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgb25lXG4gICAgY29tcGFyYXRvcjogZnVuY3Rpb24gKHJhbmRvbSwgcHJvYikgeyAvLyBjYWxsZWQgdG8gc2VlIGlmIGFuIGluc3RydW1lbnQgc2hvdWxkIGJlIHBsYXllZCwgY2FuIGJlIG92ZXJ3cml0dGVuXG4gICAgICByZXR1cm4gcmFuZG9tIDwgcHJvYlxuICAgIH0sXG4gICAgX3JvbGw6IGZ1bmN0aW9uIChwcm9iKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJhdG9yKE1hdGgucmFuZG9tKCksIHByb2IpXG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gbWFrZSBhIGxpc3QsIGNoZWNrIGl0IHR3aWNlLFxuICAgICAgaWYgKCF0aGlzLl9pbnN0cnVtZW50cy5sZW5ndGgpIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignbm8gZGF0YSBpcyBib3VuZCcpXG4gICAgICBpZiAoIXRoaXMuX3N0cnVjdHVyZSkgdGhyb3cgbmV3IFlvdUdvdEJpdEVycm9yKCdubyBzdHJ1Y3R1cmUgaXMgYm91bmQnKVxuICAgICAgaWYgKHRoaXMuX2ludGVydmFsKSB0aHJvdyBuZXcgWW91R290Qml0RXJyb3IoJ29vcHMgdSB0cmllZCB0byBzdGFydCBhbm90aGVyIGxvb3AsIHdheSB0byBnbyBTdGV2ZSBSZWljaCBzbWRoJylcbiAgICAgIGlmICghdGhpcy5faW5zdHJ1bWVudHMuc29tZShpbnN0cnVtZW50ID0+IGluc3RydW1lbnQubGVhZCkpIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignYSBsZWFkIGluc3RydW1lbnQgbXVzdCBiZSBib3VuZCcpXG5cbiAgICAgIC8vIG1ha2UgdGhlIGxlYWQgaW5zdHJ1bWVudCBiZSBsYXN0LCB0byBzaW1wbGlmeSBhZHZhbmNpbmcgdGhlIHNlcXVlbmNlIGxhdGVyXG4gICAgICB0aGlzLl9pbnN0cnVtZW50cy5zb3J0KChhLCBiKSA9PiBhLmxlYWQgPyAxIDogKGIubGVhZCA/IC0xIDogMCkpXG5cbiAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMuX2luc3RydW1lbnRzLmZvckVhY2goaW5zdHJ1bWVudCA9PiB7XG5cbiAgICAgICAgICAvLyBncmFiIHRoZSBjdXJyZW50IHNlY3Rpb24gZm9yIHRoaXMgaW5zdHJ1bWVudCAodmVyc2UsIGNob3J1cywgZXRjLilcbiAgICAgICAgICB2YXIgc2VjdGlvbiA9IGluc3RydW1lbnQuZGF0YVt0aGlzLl9jdXJyZW50XVxuXG4gICAgICAgICAgLy8gaWYgdGhlIHNlY3Rpb24gaGFzIGEgbW9kdWx1cyB2YWx1ZSwgc2VlIGlmIHRoaXMgaXMgaXQgaXMgb24gYmVhdFxuICAgICAgICAgIC8vIGkuZSwgbW9kIDE6IGV2ZXJ5IGJlYXQsIG1vZCAyOiBldmVyeSBvdGhlciBiZWF0XG4gICAgICAgICAgLy8gdXNlZnVsIGZvciBjcmVhdGluZyBicmVha2Rvd25zIGFuZCBiYXNzIGRyb3BzXG4gICAgICAgICAgdmFyIG1vZHVsdXMgPSAoc2VjdGlvbi5jb25maWcubW9kIHx8IDEpXG4gICAgICAgICAgdmFyIG9uSXRzQmVhdCA9IHRoaXMuX3RpY2sgJSBtb2R1bHVzID09PSAwXG4gICAgICAgICAgLy8gYWxzbyBjaGVjayBpZiB0aGUgaW5zdHJ1bWVudCB3aWxsIHBsYXkgb24gdGhlIG5leHQgdHVybiwgb3RoZXJ3aXNlIHdlIHdpbGwgZW5kIHBhdHRlcm5zIHRvbyBzb29uXG4gICAgICAgICAgdmFyIHdpbGxQbGF5T25OZXh0QmVhdCA9ICh0aGlzLl90aWNrICsgMSkgJSBtb2R1bHVzID09PSAwXG5cbiAgICAgICAgICB2YXIgd2lsbEFkdmFuY2VPbk5leHRCZWF0ID0gKHRoaXMuX2NvdW50ZXIgKyAxKSAlIHRoaXMuYWR2YW5jZU1vZCA9PT0gMFxuXG4gICAgICAgICAgaWYgKGluc3RydW1lbnQubGVhZCAmJiBvbkl0c0JlYXQgJiYgc2VjdGlvbi5fdGljayA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHdpbGxBZHZhbmNlT25OZXh0QmVhdCkgdGhpcy5fbmV4dEN1cnJlbnQgPSBwaWNrKHRoaXMuX3N0cnVjdHVyZVt0aGlzLl9jdXJyZW50XSlcbiAgICAgICAgICAgIGlmICh0aGlzLm9uU2VjdGlvblN0YXJ0KSB0aGlzLm9uU2VjdGlvblN0YXJ0KHRoaXMuX2N1cnJlbnQgIT09IHRoaXMuX25leHRDdXJyZW50KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGlmIHRoZSBzZWN0aW9uIGhhcyBhIGZpbGwsIGFuZCB0aGUgcGF0dGVybiBpcyBnb25uYSBjaGFuZ2UgbmV4dCB0dXJuXG4gICAgICAgICAgaWYgKG9uSXRzQmVhdCAmJiBzZWN0aW9uLmZpbGwgJiYgKHRoaXMuX2N1cnJlbnQgIT09IHRoaXMuX25leHRDdXJyZW50KSkge1xuICAgICAgICAgICAgIC8vIGlmIHRoZSBpbnN0cnVtZW50IGlzIG9uIGl0J3MgYmVhdCwgYW5kIHdpbnMgdGhlIGRpY2Ugcm9sbCwgcGxheSB0aGUgZmlsbFxuICAgICAgICAgICAgaWYgKG9uSXRzQmVhdCAmJiB0aGlzLl9yb2xsKHNlY3Rpb24uZmlsbC5wcm9ic1tzZWN0aW9uLl90aWNrXSkpIHtcbiAgICAgICAgICAgICAgLy8gcGxheSB0aGUgRklMTExMTExMTExMIGZvciB0aGF0IGluc3RydW1lbnQsIHBhc3NpbmcgYWxvbmcgYSByYW5kb21seSBjaG9zZW4gZGF0YSAgZm9yIHRoYXQgYmVhdCwgYWxvbmcgd2l0aCB0aGUgZW50aXJlIHNlY3Rpb24gb2JqZWN0XG4gICAgICAgICAgICAgIGluc3RydW1lbnQucGxheShwaWNrKHNlY3Rpb24uZmlsbC5kYXRhW3NlY3Rpb24uX3RpY2tdKSwgc2VjdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiB0aGUgaW5zdHJ1bWVudCBpcyBvbiBpdCdzIGJlYXQsIGFuZCB3aW5zIHRoZSBkaWNlIHJvbGxcbiAgICAgICAgICB9IGVsc2UgaWYgKG9uSXRzQmVhdCAmJiB0aGlzLl9yb2xsKHNlY3Rpb24ucHJvYnNbc2VjdGlvbi5fY3VycmVudF1bc2VjdGlvbi5fdGlja10pKSB7XG5cbiAgICAgICAgICAgIC8vIHBsYXkgdGhlIGluc3RydW1lbnQsIHBhc3NpbmcgYWxvbmcgYSByYW5kb21seSBjaG9zZW4gZGF0YSAgZm9yIHRoYXQgYmVhdCwgYWxvbmcgd2l0aCB0aGUgZW50aXJlIHNlY3Rpb24gb2JqZWN0XG4gICAgICAgICAgICBpbnN0cnVtZW50LnBsYXkocGljayhzZWN0aW9uLmRhdGFbc2VjdGlvbi5fY3VycmVudF1bc2VjdGlvbi5fdGlja10pLCBzZWN0aW9uKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGFkdmFuY2UgdGhlIGNvdW50ZXIgZm9yIHRoaXMgc2VjdGlvblxuICAgICAgICAgIGlmIChvbkl0c0JlYXQpIHNlY3Rpb24uX3RpY2srK1xuXG4gICAgICAgICAgLy8gaWYgd2UgYXJlIGF0IHRoZSBlbmQgb2YgYSBzZWN0aW9uIEFORCB0aGlzIGluc3RydW1lbnQgd2lsbCBwbGF5IG9uIHRoZSBuZXh0IGJlYXRcbiAgICAgICAgICBpZiAoc2VjdGlvbi5fdGljayA9PT0gc2VjdGlvbi5wcm9ic1tzZWN0aW9uLl9jdXJyZW50XS5sZW5ndGggJiYgd2lsbFBsYXlPbk5leHRCZWF0KSB7XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBjb3VudGVyIGZvciB0aGlzIHNlY3Rpb25cbiAgICAgICAgICAgIHNlY3Rpb24uX3RpY2sgPSAwXG5cbiAgICAgICAgICAgIC8vIHBpY2sgYSBuZXcgcGF0dGVybiB0byBwbGF5XG4gICAgICAgICAgICBzZWN0aW9uLl9jdXJyZW50ID0gcGljayhzZWN0aW9uLm5leHRzW3NlY3Rpb24uX2N1cnJlbnRdKVxuXG4gICAgICAgICAgICAvLyBpZiB0aGUgaW5zdHJ1bWVudCBpcyB0aGUgbGVhZFxuICAgICAgICAgICAgaWYgKGluc3RydW1lbnQubGVhZCkge1xuICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyKysgLy8gYWR2YW5jZSB0aGUgbG9vcCBjb3VudGVyXG5cbiAgICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSBwbGF5ZWQgdGhlIGxvb3Agc29tZSBudW1iZXIgb2YgaW5jcmVtZW50cyBvZiB0aGUgYWR2YW5jZU1vZHVsdXMuLi5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvdW50ZXIgJSB0aGlzLmFkdmFuY2VNb2QgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyAuLi4gcGljayBhIG5ldyBzZWN0aW9uIHRvIHBsYXlcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50ID0gfn50aGlzLl9uZXh0Q3VycmVudFxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gaWYgdGhlIG5ldyBzZWN0aW9uIGlzIG51bGwgb3Igc29tZSBvdGhlciBqdW5rXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY3VycmVudCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnU1RPUCcpXG4gICAgICAgICAgICAgICAgLy8gdGhlIGVuZCBvZiB0aGUgc29uZyEgZXJtLCB3aGF0IHRvIGRvIGhlcmU/XG4gICAgICAgICAgICAgICAgLy8gbWlnaHQgd2FudCB0byBiZSBhYmxlIHRvIGF0dGFjaCBhbiBvbkVuZCBjYWxsYmFjayB0aGluZ1xuICAgICAgICAgICAgICAgIC8vIGVzcGVjaWFsbHkgZm9yIG1lZGlhUmVjb3JkZXIuLi5cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9uRW5kKSB0aGlzLm9uRW5kKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAvLyBhZHZhbmNlIHRoZSBnbG9iYWwgY291bnRlclxuICAgICAgICB0aGlzLl90aWNrKytcbiAgICAgIH0sIDYwMDAwLjAgLyB0aGlzLmJwbSlcbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbClcbiAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbFxuICAgIH0sXG5cbiAgICBiaW5kOiBmdW5jdGlvbiAobGVhZCwgY2IsIGRhdGEpIHtcblxuICAgICAgLy8gaWYgdGhpcyBpbnN0cnVtZW50IGlzIGxhYmVsbGVkIGEgXCJsZWFkXCIgYnV0IHdlIGFscmVhZHkgaGF2ZSBhIGxlYWQsIHRoYXQncyBhIGJvby1ib29cbiAgICAgIGlmIChsZWFkICYmIHRoaXMuX2luc3RydW1lbnRzLnNvbWUoaW5zdHJ1bWVudCA9PiBpbnN0cnVtZW50LmxlYWQpKSB0aHJvdyBuZXcgWW91R290Qml0RXJyb3IoJ2EgbGVhZCBpbnN0cnVtZW50IGlzIGFscmVhZHkgYm91bmQnKVxuXG4gICAgICAvLyBjaGVjayB0byBzZWUgdGhhdCBldmVyeSBleGlzdGluZyBpbnN0cnVtZW50IGluIHRoZSBzZXF1ZW5jZXIuLi5cbiAgICAgIGlmICh0aGlzLl9pbnN0cnVtZW50cy5sZW5ndGgpIHtcblxuICAgICAgICAvLyBoYXMgdGhlIHNhbWUgbnVtYmVyIG9mIGxhcmdlciBwYXR0ZXJucyBhcyB0aGUgZGF0YSBiZWluZyBhZGRlZC4uLlxuICAgICAgICBpZiAodGhpcy5faW5zdHJ1bWVudHMuc29tZShpbnN0ID0+IGluc3QuZGF0YS5sZW5ndGggIT09IGRhdGEubGVuZ3RoKSkgdGhyb3cgbmV3IFlvdUdvdEJpdEVycm9yKCdkYXRhIGRvZXMgbm90IG1hdGNoIGV4aXN0aW5nIGRhdGEnKVxuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBhIHN0cnVjdHVyZSBib3VuZCwgLi4uXG4gICAgICBpZiAodGhpcy5fc3RydWN0dXJlKSB7XG5cbiAgICAgICAgLy8gLi4uIGNoZWNrIHRvIHNlZSB0aGF0IGl0IGhhcyBhcyBtYW55IHBhdHRlcm5zIGFzIHRoZXJlIGFyZSBpbiB0aGUgYm91bmQgZGF0YVxuICAgICAgICBpZiAodGhpcy5fc3RydWN0dXJlLmxlbmd0aCAhPT0gZGF0YS5sZW5ndGgpIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignZGF0YSBkb2VzIG5vdCBtYXRjaCBleGlzdGluZyBzdHJ1Y3R1cmUnKVxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayB0aGF0IHRoZSBkYXRhIGlzIHZhbGlkLCBub3RlL3Byb2IvbmV4dC13aXNlXG4gICAgICB2YXIgaXRJc0dvb2QgPSBkYXRhLmV2ZXJ5KChwYXR0ZXJuKSA9PiB7XG4gICAgICAgIGlmICghKHBhdHRlcm4uZGF0YS5sZW5ndGggPT09IHBhdHRlcm4ucHJvYnMubGVuZ3RoICYmIHBhdHRlcm4uZGF0YS5sZW5ndGggPT09IHBhdHRlcm4ubmV4dHMubGVuZ3RoKSkge1xuICAgICAgICAgIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignZGF0YS9wcm9icy9uZXh0cyBleHRlcm5hbCBtaXNtYXRjaCcpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdHRlcm4ubmV4dHMuc29tZShpID0+IGkgPj0gcGF0dGVybi5wcm9icy5sZW5ndGggfHwgaSA8IDApKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFlvdUdvdEJpdEVycm9yKCduZXh0cyBwb2ludHMgdG8gbm9uLWV4aXN0ZW50IHBhdHRlcm4nKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXR0ZXJuLnByb2JzLmV2ZXJ5KChsb29wLCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGxvb3AubGVuZ3RoID09PSBwYXR0ZXJuLmRhdGFbaV0ubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBpZiAoIWl0SXNHb29kKSB0aHJvdyBuZXcgWW91R290Qml0RXJyb3IoJ2RhdGEvcHJvYnMgaW50ZXJuYWwgbWlzbWF0Y2gnKVxuXG4gICAgICAvLyBhZGQgaW50ZXJuYWwgY291bnRlciB0aGluZ3MgdG8gdGhlIGJvdW5kIGRhdGFcbiAgICAgIGRhdGEgPSBkYXRhLm1hcChwYXR0ZXJuID0+IHtcbiAgICAgICAgcGF0dGVybi5fY3VycmVudCA9IDBcbiAgICAgICAgcGF0dGVybi5fdGljayA9IDBcbiAgICAgICAgcmV0dXJuIHBhdHRlcm5cbiAgICAgIH0pXG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgbWFkZSBpdCB0aGlzIGZhciwgcHVzaCBmb3J3YXJkIVxuICAgICAgdGhpcy5faW5zdHJ1bWVudHMucHVzaCh7ZGF0YTogZGF0YSwgcGxheTogY2IsIGxlYWQ6IGxlYWR9KVxuICAgIH0sXG5cbiAgICBzZXRTdHJ1Y3R1cmU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZiAodGhpcy5faW5zdHJ1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbnN0cnVtZW50c1swXS5kYXRhLmxlbmd0aCAhPT0gZGF0YS5sZW5ndGgpIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignc3RydWN0dXJlIGRvZXMgbm90IG1hdGNoIGV4aXN0aW5nIGRhdGEnKVxuICAgICAgfVxuICAgICAgdGhpcy5fc3RydWN0dXJlID0gZGF0YVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwaWNrIChhcnIpIHtcbiAgcmV0dXJuIGFyclt+fihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldXG59XG5cbmZ1bmN0aW9uIFlvdUdvdEJpdEVycm9yIChtc2cpIHtcbiAgdGhpcy5uYW1lID0gJ1lvdUdvdEJpdEVycm9yJ1xuICB0aGlzLm1lc3NhZ2UgPSBtc2dcbn1cblxuWW91R290Qml0RXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKClcbllvdUdvdEJpdEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFlvdUdvdEJpdEVycm9yXG4iXX0=
