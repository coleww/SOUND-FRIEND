(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// UPDATE THIS TO CHANGE SONG
var song = require('./songs/donk')


var ac = new (AudioContext || webkitAudioContext)()
var instruments = require('./utils/buildInstruments')(ac)
var seq = song(instruments)

seq.start()
},{"./songs/donk":24,"./utils/buildInstruments":25}],2:[function(require,module,exports){
var bubblesMoreBubblesPlease = require('bubble-bass')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var bass = bubblesMoreBubblesPlease(ac)
  bass.update({attack: 0.2991, decay: 0.35, sustain: 0.741, release: 0.8611}, ac.currentTime)
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

},{"bubble-bass":9,"int2freq":10}],3:[function(require,module,exports){
var getAPianoFromThePianoMan = require('pie-ano')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var piano = getAPianoFromThePianoMan(ac)
  piano.update({attack: 0.2751, decay: 0.14315, sustain: 0.1431, release: 0.1421}, ac.currentTime)
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

},{"int2freq":10,"pie-ano":13}],4:[function(require,module,exports){
var sparklyPlease = require('sparkle-motion')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var sparkle = sparklyPlease(ac)
  sparkle.update({attack: 0.27151, decay: 0.15, sustain: 0.41, release: 0.1611}, ac.currentTime)
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

},{"int2freq":10,"sparkle-motion":15}],5:[function(require,module,exports){
var bubblesMoreBubblesPlease = require('warlock-bass')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var bass = bubblesMoreBubblesPlease(ac)
  bass.update({attack: 0.1751, decay: 0.5, sustain: 0.41, release: 0.611}, ac.currentTime)
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

},{"int2freq":10,"warlock-bass":17}],6:[function(require,module,exports){
var whiny = require('a-whining-capitalist')
var int2freq = require('int2freq')
module.exports = function (ac) {
  var piano = whiny(ac)
  piano.update({attack: 0.17251, decay: 0.14315, sustain: 0.4431, release: 0.001421}, ac.currentTime)
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

},{"a-whining-capitalist":8,"int2freq":10}],7:[function(require,module,exports){
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
    bpmToMillis: function () {
      return 60000.0 / this.bpm
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
                this._current = this._nextCurrent
              }

              // if the new section is null or some other junk
              if (typeof this._current !== 'number') {
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
      }, this.bpmToMillis())
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

},{}],17:[function(require,module,exports){
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
},{"a-d-s-r":7,"make-distortion-curve":11}],18:[function(require,module,exports){
module.exports={
  "bpm": 600,
  "key": {
    "tonic": "D4",
    "scale": "pentMin"
  },
  "advanceMod": 1
}
},{}],19:[function(require,module,exports){
module.exports=[
  {
    data: [
      [[2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7], [2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7]],
      [[-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5], [-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5]],
      [[-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2], [-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2]]
    ],
    probs: [
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 1, 0.5, 1, 0.5, 1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0, 0, 1, 1, 2], [1, 1, 0, 0, 2], [2, 2, 2, 0, 1]
    ],
    config: {
      mod: 1
    }
  },
  {
    data: [
      [[-2, 2], [-2, 2], [0], [-2, 2],[-2, 2], [0], [0], [-2, 2], [0, 4], [0, 4], [0], [0, 4],[0, 4],[0],[0], [0, 4]],
      [[-3, 1], [-3, 1], [0], [-3, 1],[-3, 1], [0], [0], [-3, 1], [1, 5], [1, 5], [0], [1, 5],[1, 5],[0],[0], [1, 5]],
      [[-3, 1, -2, 2, 4, 5], [-3, 1, 1, 5, -6], [0], [-3, 1, -2, 2, -5, 5],[-3, 1, 1, 5, -2, -6],[0],[0], [-3, 1, 4, -6], [1, 5, 0, 4], [1, 5, -6, 2], [0], [1, 5, 0, 4],[1, 5],[0],[0], [1, 5, 0, 4]]
    ],
    probs: [
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1, 1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1]
    ],
    nexts: [
      [1], [0, 0, 2], [2, 2, 0]
    ],
    config: {
      mod: 1
    }
  },
  {
    data: [
      [[2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7], [2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7]],
      [[-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5], [-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5]],
      [[-3, 2, 0, -2], [4, 2], [-3, 2, 0, -2], [6, 2], [4, 2], [-3, 2, 0, -2], [-3, 2, 0, -2], [4, 2], [-3, 2, 0, -2], [6, 2], [4, 2], [-3, 2, 0, -2]]
    ],
    probs: [
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 1, 0.5, 1, 0.5, 1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0, 0, 1, 1, 2], [1, 1, 0, 0, 2], [2, 2, 2, 0, 1]
    ],
    config: {
      mod: 8
    }
  },
  {
    data: [
      [[-2, 2], [-2, 2], [0], [-2, 2],[-2, 2], [0], [0], [-2, 2], [0, 4], [0, 4], [0], [0, 4],[0, 4],[0],[0], [0, 4]],
      [[-3, 1], [-3, 1], [0], [-3, 1],[-3, 1], [0], [0], [-3, 1], [1, 5], [1, 5], [0], [1, 5],[1, 5],[0],[0], [1, 5]],
      [[-3, 1, -2, 2, 4, 5], [-3, 1, 1, 5, -6], [0], [-3, 1, -2, 2, -5, 5],[-3, 1, 1, 5, -2, -6],[0],[0], [-3, 1, 4, -6], [1, 5, 0, 4], [1, 5, -6, 2], [0], [1, 5, 0, 4],[1, 5],[0],[0], [1, 5, 0, 4]]
    ],
    probs: [
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1, 1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1]
    ],
    nexts: [
      [1], [0, 0, 2], [2, 2, 0]
    ],
    config: {
      mod: 8
    }
  }
]

},{}],20:[function(require,module,exports){
module.exports=[
  {
    data: [
      [[2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7], [2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7]],
      [[-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5], [-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5]],
      [[-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2], [-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2]]
    ],
    probs: [
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 1, 0.5, 1, 0.5, 1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0, 0, 1, 1, 2], [1, 1, 0, 0, 2], [2, 2, 2, 0, 1]
    ],
    config: {
      mod: 1
    }
  },
  {
    data: [
      [[-2, 2], [-2, 2], [0], [-2, 2],[-2, 2], [0], [0], [-2, 2], [0, 4], [0, 4], [0], [0, 4],[0, 4],[0],[0], [0, 4]],
      [[-3, 1], [-3, 1], [0], [-3, 1],[-3, 1], [0], [0], [-3, 1], [1, 5], [1, 5], [0], [1, 5],[1, 5],[0],[0], [1, 5]],
      [[-3, 1, -2, 2, 4, 5], [-3, 1, 1, 5, -6], [0], [-3, 1, -2, 2, -5, 5],[-3, 1, 1, 5, -2, -6],[0],[0], [-3, 1, 4, -6], [1, 5, 0, 4], [1, 5, -6, 2], [0], [1, 5, 0, 4],[1, 5],[0],[0], [1, 5, 0, 4]]
    ],
    probs: [
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1, 1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1]
    ],
    nexts: [
      [1], [0, 0, 2], [2, 2, 0]
    ],
    config: {
      mod: 1
    }
  },
  {
    data: [
      [[2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7], [2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7]],
      [[-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5], [-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5]],
      [[-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2], [-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2]]
    ],
    probs: [
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 1, 0.5, 1, 0.5, 1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0, 0, 1, 1, 2], [1, 1, 0, 0, 2], [2, 2, 2, 0, 1]
    ],
    config: {
      mod: 1
    }
  },
  {
    data: [
      [[-2, 2], [-2, 2], [0], [-2, 2],[-2, 2], [0], [0], [-2, 2], [0, 4], [0, 4], [0], [0, 4],[0, 4],[0],[0], [0, 4]],
      [[-3, 1], [-3, 1], [0], [-3, 1],[-3, 1], [0], [0], [-3, 1], [1, 5], [1, 5], [0], [1, 5],[1, 5],[0],[0], [1, 5]],
      [[-3, 1, -2, 2, 4, 5], [-3, 1, 1, 5, -6], [0], [-3, 1, -2, 2, -5, 5],[-3, 1, 1, 5, -2, -6],[0],[0], [-3, 1, 4, -6], [1, 5, 0, 4], [1, 5, -6, 2], [0], [1, 5, 0, 4],[1, 5],[0],[0], [1, 5, 0, 4]]
    ],
    probs: [
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1, 1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1]
    ],
    nexts: [
      [1], [0, 0, 2], [2, 2, 0]
    ],
    config: {
      mod: 1
    }
  }
]

},{}],21:[function(require,module,exports){
module.exports=[
  {
    data: [
      [[2, 0.3, -7], [4], [2, 0.3, 7], [6], [4], [2, 0.3, -7], [2, 0.3, -7], [4], [2, 0.3, 7], [6], [4], [2, 0.3, -7]],
      [[-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5], [-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5]],
      [[-3, 2, 0.3, -2], [4, 11], [-3, 2, 0.3, -2], [6, 13], [4, 11], [-3, 2, 0.3, -2], [-3, 2, 0.3, -2], [4, 11], [-3, 2, 0.3, -2], [6, 13], [4, 11], [-3, 2, 0.3, -2]]
    ],
    probs: [
      [1, 0.5, 1, 0.75, 0.75, 0.5, 1, 0.5, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 0.75, 0.5, 1, 0.5, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 1, 0.5, 1, 0.5, 1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0.3, 0.3, 1, 1, 2], [1, 1, 0.3, 0, 2], [2, 2, 2, 0, 1]
    ],
    config: {
      mod: 1
    }
  },
  {
    data: [
      [[-2, 2], [-2, 2], [0], [-2, 2],[-2, 2], [0], [0], [-2, 2], [0, 4], [0, 4], [0], [0, 4],[0, 4],[0],[0], [0, 4]],
      [[-3, 1], [-3, 1], [0], [-3, 1],[-3, 1], [0], [0], [-3, 1], [1, 5], [1, 5], [0], [1, 5],[1, 5],[0],[0], [1, 5]],
      [[-3, 1, -2, 2, 4, 5], [-3, 1, 1, 5, -6], [0], [-3, 1, -2, 2, -5, 5],[-3, 1, 1, 5, -2, -6],[0],[0], [-3, 1, 4, -6], [1, 5, 0, 4], [1, 5, -6, 2], [0], [1, 5, 0, 4],[1, 5],[0],[0], [1, 5, 0, 4]]
    ],
    probs: [
      [1, 0.85, 0, 1, 0.65, 0.3, 0.3, 1, 1, 0.85, 0.3, 1, 0.65, 0.3, 0.3, 1],
      [1, 0.85, 0.3, 1, 0.65, 0.3, 0.3, 1, 1, 0.85, 0.3, 1, 0.65, 0.3, 0.3, 1],
      [1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1, 1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1]
    ],
    nexts: [
      [1], [0.3, 0.3, 2], [2, 2, 0]
    ],
    config: {
      mod: 2
    }
  },
  {
    data: [
      [[2, 0.3, -7], [4], [2, 0.3, 7], [6], [4], [2, 0.3, -7], [2, 0.3, -7], [4], [2, 0.3, 7], [6], [4], [2, 0.3, -7]],
      [[-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5], [-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5]],
      [[-3, 2, 0.3, -2], [4, 2], [-3, 2, 0.3, -2], [6, 2], [4, 2], [-3, 2, 0.3, -2], [-3, 2, 0.3, -2], [4, 2], [-3, 2, 0.3, -2], [6, 2], [4, 2], [-3, 2, 0.3, -2]]
    ],
    probs: [
      [1, 0.5, 1, 0.75, 0.75, 0.5, 1, 0.5, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 0.75, 0.5, 1, 0.5, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 1, 0.5, 1, 0.5, 1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0.3, 0.3, 1, 1, 2], [1, 1, 0.3, 0.3, 2], [2, 2, 2, 0.3, 1]
    ],
    config: {
      mod: 1
    }
  },
  {
    data: [
      [[-2, 2], [-2, 2], [0], [-2, 2],[-2, 2], [0], [0], [-2, 2], [0.3, 4], [0.3, 4], [0], [0.3, 4],[0.3, 4],[0],[0], [0.3, 4]],
      [[-3, 1], [-3, 1], [0], [-3, 1],[-3, 1], [0], [0], [-3, 1], [1, 5], [1, 5], [0], [1, 5],[1, 5],[0],[0], [1, 5]],
      [[-3, 1, -2, 2, 4, 5], [-3, 1, 1, 5, -6], [0], [-3, 1, -2, 2, -5, 5],[-3, 1, 1, 5, -2, -6],[0],[0], [-3, 1, 4, -6], [1, 5, 0.3, 4], [1, 5, -6, 2], [0], [1, 5, 0.3, 4],[1, 5],[0],[0], [1, 5, 0.3, 4]]
    ],
    probs: [
      [1, 0.85, 0.3, 1, 0.65, 0.3, 0.3, 1, 1, 0.85, 0.3, 1, 0.65, 0.3, 0.3, 1],
      [1, 0.85, 0.3, 1, 0.65, 0.3, 0.3, 1, 1, 0.85, 0.3, 1, 0.65, 0.3, 0.3, 1],
      [1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1, 1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1]
    ],
    nexts: [
      [1], [0.3, 0.3, 2], [2, 2, 0]
    ],
    config: {
      mod: 2
    }
  }
]

},{}],22:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],23:[function(require,module,exports){
module.exports=[
  {
    data: [
      [[2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7], [2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7]],
      [[-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5], [-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5]],
      [[-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2], [-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2]]
    ],
    probs: [
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 1, 0.5, 1, 0.5, 1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0, 0, 1, 1, 2], [1, 1, 0, 0, 2], [2, 2, 2, 0, 1]
    ],
    config: {
      mod: 1
    }
  },
  {
    data: [
      [[-2, 2], [-2, 2], [0], [-2, 2],[-2, 2], [0], [0], [-2, 2], [0, 4], [0, 4], [0], [0, 4],[0, 4],[0],[0], [0, 4]],
      [[-3, 1], [-3, 1], [0], [-3, 1],[-3, 1], [0], [0], [-3, 1], [1, 5], [1, 5], [0], [1, 5],[1, 5],[0],[0], [1, 5]],
      [[-3, 1, -2, 2, 4, 5], [-3, 1, 1, 5, -6], [0], [-3, 1, -2, 2, -5, 5],[-3, 1, 1, 5, -2, -6],[0],[0], [-3, 1, 4, -6], [1, 5, 0, 4], [1, 5, -6, 2], [0], [1, 5, 0, 4],[1, 5],[0],[0], [1, 5, 0, 4]]
    ],
    probs: [
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1, 1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1]
    ],
    nexts: [
      [1], [0, 0, 2], [2, 2, 0]
    ],
    config: {
      mod: 1
    }
  }, 
  {
    data: [
      [[2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7], [2, 0, -7], [4], [2, 0, 7], [6], [4], [2, 0, -7]],
      [[-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5], [-2, -3, 5], [4], [-2, -3, -9], [6], [4], [-2, -3, 5]],
      [[-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2], [-3, 2, 0, -2], [4, 11], [-3, 2, 0, -2], [6, 13], [4, 11], [-3, 2, 0, -2]]
    ],
    probs: [
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.25, 1, 0.75, 0.75, 0.5, 1, 0.25, 1, 0.75, 0.75, 0.5],
      [1, 0.5, 1, 0.75, 1, 0.5, 1, 0.5, 1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0, 0, 1, 1, 2], [1, 1, 0, 0, 2], [2, 2, 2, 0, 1]
    ],
    config: {
      mod: 1
    }
  },
  {
    data: [
      [[-2, 2], [-2, 2], [0], [-2, 2],[-2, 2], [0], [0], [-2, 2], [0, 4], [0, 4], [0], [0, 4],[0, 4],[0],[0], [0, 4]],
      [[-3, 1], [-3, 1], [0], [-3, 1],[-3, 1], [0], [0], [-3, 1], [1, 5], [1, 5], [0], [1, 5],[1, 5],[0],[0], [1, 5]],
      [[-3, 1, -2, 2, 4, 5], [-3, 1, 1, 5, -6], [0], [-3, 1, -2, 2, -5, 5],[-3, 1, 1, 5, -2, -6],[0],[0], [-3, 1, 4, -6], [1, 5, 0, 4], [1, 5, -6, 2], [0], [1, 5, 0, 4],[1, 5],[0],[0], [1, 5, 0, 4]]
    ],
    probs: [
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.85, 0, 1, 0.65, 0, 0, 1, 1, 0.85, 0, 1, 0.65, 0, 0, 1],
      [1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1, 1, 0.95, 0.5, 1, 0.95, 0.5, 0.5, 1]
    ],
    nexts: [
      [1], [0, 0, 2], [2, 2, 0]
    ],
    config: {
      mod: 1
    }
  }
]

},{}],24:[function(require,module,exports){
var config = require('./config')
var sb = require('spiderbite')
// var midi = require('../../utils/midi-input');
var shuffle = require('shuffle-array')
// midi();
config.key.tonic = shuffle(['A', 'C', 'D', 'F', 'G', 'B', 'E', 'C#', 'F#', 'D#', 'A#', 'G#'])[0] + '2'
config.key.scale = shuffle(['major', 'minor', 'pentMaj', 'pentMin', 'blues'])[0]
config.bpm = ~~(Math.random() * 500) + 150

module.exports = function (instruments) {
  var seq = sb(config)


 var bassdata = (require('./data/bass')).map(function (section) {
  section.data = shuffle(section.data).map(function (dataBlock) {
    return shuffle(dataBlock)
  })
  return section
 })

  seq.bind(false, function (data, section) {
    instruments.bass.play(data, config.key)
  }, bassdata)


var peedata = (require('./data/piano')).map(function (section) {
  section.data = shuffle(section.data).map(function (dataBlock) {
    return shuffle(dataBlock)
  })
  section.config.mod = shuffle([1, 4, 2, 3])[0]
  return section
})

  seq.bind(true, function (data, section) {
    instruments.piano.play(data, config.key)
  }, peedata)


var vodata = (require('./data/voice')).map(function (section) {
  section.data = shuffle(section.data).map(function (dataBlock) {
    return shuffle(dataBlock)
  })
  section.config.mod = shuffle([1, 2, 3])[0]
  return section
})

  seq.bind(false, function (data, section) {
    instruments.whiny.play(data, config.key)
  }, vodata)


var guidata = (require('./data/guitar')).map(function (section) {
  section.data = shuffle(section.data).map(function (dataBlock) {
    return shuffle(dataBlock)
  })
  section.config.mod = shuffle([1, 2, 3])[0]
  return section
})

  seq.bind(false, function (data, section) {
    instruments.warbass.play(data, config.key)
  }, guidata)


var strdata = (require('./data/strings')).map(function (section) {
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



},{"./config":18,"./data/bass":19,"./data/guitar":20,"./data/piano":21,"./data/strings":22,"./data/voice":23,"shuffle-array":14,"spiderbite":16}],25:[function(require,module,exports){
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
},{"../instruments/bass":2,"../instruments/piano":3,"../instruments/sparkle":4,"../instruments/warbass":5,"../instruments/whiny":6}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImluc3RydW1lbnRzL2Jhc3MuanMiLCJpbnN0cnVtZW50cy9waWFuby5qcyIsImluc3RydW1lbnRzL3NwYXJrbGUuanMiLCJpbnN0cnVtZW50cy93YXJiYXNzLmpzIiwiaW5zdHJ1bWVudHMvd2hpbnkuanMiLCJub2RlX21vZHVsZXMvYS1kLXMtci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hLXdoaW5pbmctY2FwaXRhbGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9idWJibGUtYmFzcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pbnQyZnJlcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tYWtlLWRpc3RvcnRpb24tY3VydmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWlkaXV0aWxzL3NyYy9NSURJVXRpbHMuanMiLCJub2RlX21vZHVsZXMvcGllLWFuby9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaHVmZmxlLWFycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrbGUtbW90aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NwaWRlcmJpdGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2FybG9jay1iYXNzL2luZGV4LmpzIiwic29uZ3MvZG9uay9jb25maWcuanNvbiIsInNvbmdzL2RvbmsvZGF0YS9iYXNzLmpzb24iLCJzb25ncy9kb25rL2RhdGEvZ3VpdGFyLmpzb24iLCJzb25ncy9kb25rL2RhdGEvcGlhbm8uanNvbiIsInNvbmdzL2RvbmsvZGF0YS92b2ljZS5qc29uIiwic29uZ3MvZG9uay9pbmRleC5qcyIsInV0aWxzL2J1aWxkSW5zdHJ1bWVudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBVUERBVEUgVEhJUyBUTyBDSEFOR0UgU09OR1xudmFyIHNvbmcgPSByZXF1aXJlKCcuL3NvbmdzL2RvbmsnKVxuXG5cbnZhciBhYyA9IG5ldyAoQXVkaW9Db250ZXh0IHx8IHdlYmtpdEF1ZGlvQ29udGV4dCkoKVxudmFyIGluc3RydW1lbnRzID0gcmVxdWlyZSgnLi91dGlscy9idWlsZEluc3RydW1lbnRzJykoYWMpXG52YXIgc2VxID0gc29uZyhpbnN0cnVtZW50cylcblxuc2VxLnN0YXJ0KCkiLCJ2YXIgYnViYmxlc01vcmVCdWJibGVzUGxlYXNlID0gcmVxdWlyZSgnYnViYmxlLWJhc3MnKVxudmFyIGludDJmcmVxID0gcmVxdWlyZSgnaW50MmZyZXEnKVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWMpIHtcbiAgdmFyIGJhc3MgPSBidWJibGVzTW9yZUJ1YmJsZXNQbGVhc2UoYWMpXG4gIGJhc3MudXBkYXRlKHthdHRhY2s6IDAuMjk5MSwgZGVjYXk6IDAuMzUsIHN1c3RhaW46IDAuNzQxLCByZWxlYXNlOiAwLjg2MTF9LCBhYy5jdXJyZW50VGltZSlcbiAgcmV0dXJuIHtcbiAgICBwbGF5OiBmdW5jdGlvbiAoZGF0YSwga2V5KSB7XG5cbiAgICAgIGlmIChkYXRhID4gOSkgZGF0YSA9IDlcbiAgICAgIGlmIChkYXRhIDwgLTkpIGRhdGEgPSAtOVxuICAgICAgYmFzcy51cGRhdGUoe2ZyZXE6IGludDJmcmVxKGRhdGEsIGtleSl9LCBhYy5jdXJyZW50VGltZSlcbiAgICAgIGJhc3Muc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gICAgfSxcbiAgICBjb25uZWN0OiBmdW5jdGlvbiAoZGVzdGluYXRpb24pIHtcbiAgICAgIGJhc3MuY29ubmVjdChkZXN0aW5hdGlvbilcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgZ2V0QVBpYW5vRnJvbVRoZVBpYW5vTWFuID0gcmVxdWlyZSgncGllLWFubycpXG52YXIgaW50MmZyZXEgPSByZXF1aXJlKCdpbnQyZnJlcScpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhYykge1xuICB2YXIgcGlhbm8gPSBnZXRBUGlhbm9Gcm9tVGhlUGlhbm9NYW4oYWMpXG4gIHBpYW5vLnVwZGF0ZSh7YXR0YWNrOiAwLjI3NTEsIGRlY2F5OiAwLjE0MzE1LCBzdXN0YWluOiAwLjE0MzEsIHJlbGVhc2U6IDAuMTQyMX0sIGFjLmN1cnJlbnRUaW1lKVxuICByZXR1cm4ge1xuICAgIHBsYXk6IGZ1bmN0aW9uIChkYXRhLCBrZXkpIHtcbiAgICAgIGlmIChkYXRhID4gNSkgZGF0YSA9IDVcbiAgICAgIGlmIChkYXRhIDwgLTUpIGRhdGEgPSAtNVxuICAgICAgcGlhbm8udXBkYXRlKHtmcmVxOiBpbnQyZnJlcShkYXRhLCBrZXkpfSwgYWMuY3VycmVudFRpbWUpXG4gICAgICBwaWFuby5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgICB9LFxuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChkZXN0aW5hdGlvbikge1xuICAgICAgcGlhbm8uY29ubmVjdChkZXN0aW5hdGlvbilcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgc3BhcmtseVBsZWFzZSA9IHJlcXVpcmUoJ3NwYXJrbGUtbW90aW9uJylcbnZhciBpbnQyZnJlcSA9IHJlcXVpcmUoJ2ludDJmcmVxJylcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjKSB7XG4gIHZhciBzcGFya2xlID0gc3BhcmtseVBsZWFzZShhYylcbiAgc3BhcmtsZS51cGRhdGUoe2F0dGFjazogMC4yNzE1MSwgZGVjYXk6IDAuMTUsIHN1c3RhaW46IDAuNDEsIHJlbGVhc2U6IDAuMTYxMX0sIGFjLmN1cnJlbnRUaW1lKVxuICByZXR1cm4ge1xuICAgIHBsYXk6IGZ1bmN0aW9uIChkYXRhLCBrZXkpIHtcblxuICAgICAgaWYgKGRhdGEgPiA3KSBkYXRhID0gN1xuICAgICAgaWYgKGRhdGEgPCAtNykgZGF0YSA9IC03XG4gICAgICBzcGFya2xlLnVwZGF0ZSh7ZnJlcTogaW50MmZyZXEoZGF0YSwga2V5KX0sIGFjLmN1cnJlbnRUaW1lKVxuICAgICAgc3BhcmtsZS5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgICB9LFxuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChkZXN0aW5hdGlvbikge1xuICAgICAgc3BhcmtsZS5jb25uZWN0KGRlc3RpbmF0aW9uKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cbn1cbiIsInZhciBidWJibGVzTW9yZUJ1YmJsZXNQbGVhc2UgPSByZXF1aXJlKCd3YXJsb2NrLWJhc3MnKVxudmFyIGludDJmcmVxID0gcmVxdWlyZSgnaW50MmZyZXEnKVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWMpIHtcbiAgdmFyIGJhc3MgPSBidWJibGVzTW9yZUJ1YmJsZXNQbGVhc2UoYWMpXG4gIGJhc3MudXBkYXRlKHthdHRhY2s6IDAuMTc1MSwgZGVjYXk6IDAuNSwgc3VzdGFpbjogMC40MSwgcmVsZWFzZTogMC42MTF9LCBhYy5jdXJyZW50VGltZSlcbiAgcmV0dXJuIHtcbiAgICBwbGF5OiBmdW5jdGlvbiAoZGF0YSwga2V5KSB7XG4gICAgICBiYXNzLnVwZGF0ZSh7ZnJlcTogaW50MmZyZXEoZGF0YSwga2V5KX0sIGFjLmN1cnJlbnRUaW1lKVxuICAgICAgYmFzcy5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgICB9LFxuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChkZXN0aW5hdGlvbikge1xuICAgICAgYmFzcy5jb25uZWN0KGRlc3RpbmF0aW9uKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cbn1cbiIsInZhciB3aGlueSA9IHJlcXVpcmUoJ2Etd2hpbmluZy1jYXBpdGFsaXN0JylcbnZhciBpbnQyZnJlcSA9IHJlcXVpcmUoJ2ludDJmcmVxJylcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjKSB7XG4gIHZhciBwaWFubyA9IHdoaW55KGFjKVxuICBwaWFuby51cGRhdGUoe2F0dGFjazogMC4xNzI1MSwgZGVjYXk6IDAuMTQzMTUsIHN1c3RhaW46IDAuNDQzMSwgcmVsZWFzZTogMC4wMDE0MjF9LCBhYy5jdXJyZW50VGltZSlcbiAgcmV0dXJuIHtcbiAgICBwbGF5OiBmdW5jdGlvbiAoZGF0YSwga2V5KSB7XG4gICAgICBwaWFuby51cGRhdGUoe2ZyZXE6IGludDJmcmVxKGRhdGEgLCBrZXkpfSwgYWMuY3VycmVudFRpbWUpXG4gICAgICBwaWFuby5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgICB9LFxuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChkZXN0aW5hdGlvbikge1xuICAgICAgcGlhbm8uY29ubmVjdChkZXN0aW5hdGlvbilcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChnYWluTm9kZSwgd2hlbiwgYWRzcikge1xuICBnYWluTm9kZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoYWRzci5wZWFrLCB3aGVuICsgYWRzci5hdHRhY2spXG4gIGdhaW5Ob2RlLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShhZHNyLm1pZCwgd2hlbiArIGFkc3IuYXR0YWNrICsgYWRzci5kZWNheSlcbiAgZ2Fpbk5vZGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZShhZHNyLm1pZCwgd2hlbiArIGFkc3Iuc3VzdGFpbiArIGFkc3IuYXR0YWNrICsgYWRzci5kZWNheSlcbiAgZ2Fpbk5vZGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGFkc3IuZW5kLCB3aGVuICsgYWRzci5zdXN0YWluICsgYWRzci5hdHRhY2sgKyBhZHNyLmRlY2F5ICsgYWRzci5yZWxlYXNlKVxufVxuIiwidmFyIG1ha2VEaXN0b3J0aW9uQ3VydmUgPSByZXF1aXJlKCdtYWtlLWRpc3RvcnRpb24tY3VydmUnKVxudmFyIE1JRElVdGlscyA9IHJlcXVpcmUoJ21pZGl1dGlscycpXG52YXIgYWRzciA9IHJlcXVpcmUoJ2EtZC1zLXInKVxuLy8geXIgZnVuY3Rpb24gc2hvdWxkIGFjY2VwdCBhbiBhdWRpb0NvbnRleHQsIGFuZCBvcHRpb25hbCBwYXJhbXMvb3B0c1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWMsIG9wdHMpIHtcbiAgLy8gbWFrZSBzb21lIGF1ZGlvTm9kZXMsIGNvbm5lY3QgdGhlbSwgc3RvcmUgdGhlbSBvbiB0aGUgb2JqZWN0XG4gIHZhciBhdWRpb05vZGVzID0ge31cblxuICB2YXIgb3NjaWxsYXRvcjEgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKGFjKVxuICBvc2NpbGxhdG9yMS50eXBlID0gJ3RyaWFuZ2xlJ1xuICBvc2NpbGxhdG9yMS5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG4gIHZhciBvc2NpbGxhdG9yMiA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoYWMpXG4gIG9zY2lsbGF0b3IyLnR5cGUgPSAnc3F1YXJlJ1xuICBvc2NpbGxhdG9yMi5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG4gIHZhciBvc2NpbGxhdG9yMyA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoYWMpXG4gIG9zY2lsbGF0b3IzLnR5cGUgPSAnc2F3dG9vdGgnXG4gIG9zY2lsbGF0b3IzLmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcbiAgdmFyIG9zY2lsbGF0b3I0ID0gYWMuY3JlYXRlT3NjaWxsYXRvcihhYylcbiAgb3NjaWxsYXRvcjQudHlwZSA9ICdzaW5lJ1xuICBvc2NpbGxhdG9yNC5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cbiAgdmFyIG9zY2lsbGF0b3I1ID0gYWMuY3JlYXRlT3NjaWxsYXRvcihhYylcbiAgb3NjaWxsYXRvcjUudHlwZSA9ICdzYXd0b290aCdcbiAgb3NjaWxsYXRvcjUuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuICB2YXIgb3NjaWxsYXRvcjYgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKGFjKVxuICBvc2NpbGxhdG9yNi50eXBlID0gJ3RyaWFuZ2xlJ1xuICBvc2NpbGxhdG9yNi5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cbiAgdmFyIGRlbGF5QSA9IGFjLmNyZWF0ZURlbGF5KDAuMjMyMilcbiAgdmFyIGRlbGF5QiA9IGFjLmNyZWF0ZURlbGF5KDAuMjUyNzUyMzEzMTAzMjIyKVxuICB2YXIgZGVsYXlDID0gYWMuY3JlYXRlRGVsYXkoMC4yNzIyMilcblxuICB2YXIgZmlsdGVyQSA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG4gIGZpbHRlckEuUS52YWx1ZSA9IDEyXG4gIGZpbHRlckEudHlwZSA9ICdwZWFraW5nJ1xuICBmaWx0ZXJBLmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcblxuXG4gIC8vIHRoYXQgb25lIGRpc3RvcnRpb24gY3VydmUgdGhhdCBldmVyeW9uZSBjb3B5IHBhc3RlcyBmcm9tIHN0YWNrIG92ZXJmbG93IGFueXdheXNcblxuICAvLyBtYWtlIGEgZGlzdG9ydGlvbiBwZWRhbCEgeWF5IVxuICB2YXIgZGlzdG9ydGlvbkEgPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbiAgZGlzdG9ydGlvbkEuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDgwMClcblxuICB2YXIgZmlsdGVyQiA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG4gIGZpbHRlckIuUS52YWx1ZSA9IDEyXG4gIGZpbHRlckIudHlwZSA9ICdiYW5kcGFzcydcbiAgZmlsdGVyQi5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cbiAgLy8gdGhhdCBvbmUgZGlzdG9ydGlvbiBjdXJ2ZSB0aGF0IGV2ZXJ5b25lIGNvcHkgcGFzdGVzIGZyb20gc3RhY2sgb3ZlcmZsb3cgYW55d2F5c1xuXG4gIC8vIG1ha2UgYSBkaXN0b3J0aW9uIHBlZGFsISB5YXkhXG4gIHZhciBkaXN0b3J0aW9uQiA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuICBkaXN0b3J0aW9uQi5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoMTAwKVxuXG4gIHZhciBmaWx0ZXJDID0gYWMuY3JlYXRlQmlxdWFkRmlsdGVyKClcbiAgZmlsdGVyQy5RLnZhbHVlID0gN1xuICBmaWx0ZXJDLnR5cGUgPSAnbG93cGFzcydcbiAgZmlsdGVyQy5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cbiAgLy8gdGhhdCBvbmUgZGlzdG9ydGlvbiBjdXJ2ZSB0aGF0IGV2ZXJ5b25lIGNvcHkgcGFzdGVzIGZyb20gc3RhY2sgb3ZlcmZsb3cgYW55d2F5c1xuXG4gIC8vIG1ha2UgYSBkaXN0b3J0aW9uIHBlZGFsISB5YXkhXG4gIHZhciBkaXN0b3J0aW9uQyA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuICBkaXN0b3J0aW9uQy5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoMTAwMClcblxuXG5cbiAgdmFyIGdhaW5BID0gYWMuY3JlYXRlR2FpbigpXG4gIGdhaW5BLmdhaW4udmFsdWUgPSAwLjMzMzMzMzMzMzMzMzMzM1xuICB2YXIgZ2FpbkIgPSBhYy5jcmVhdGVHYWluKClcbiAgZ2FpbkIuZ2Fpbi52YWx1ZSA9IDAuMzMzMzMzMzMzMzMzMzMzXG4gIHZhciBnYWluQyA9IGFjLmNyZWF0ZUdhaW4oKVxuICBnYWluQy5nYWluLnZhbHVlID0gMC4zMzMzMzMzMzMzMzMzMzNcbiAgdmFyIGdhaW5aID0gYWMuY3JlYXRlR2FpbigpXG4gIGdhaW5aLmdhaW4udmFsdWUgPSAwLjVcblxuXG5cbiAgdmFyIGZpbHRlclogPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICBmaWx0ZXJaLlEudmFsdWUgPSAxMlxuICBmaWx0ZXJaLnR5cGUgPSAnaGlnaHNoZWxmJ1xuICBmaWx0ZXJaLmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcblxuICAvLyB0aGF0IG9uZSBkaXN0b3J0aW9uIGN1cnZlIHRoYXQgZXZlcnlvbmUgY29weSBwYXN0ZXMgZnJvbSBzdGFjayBvdmVyZmxvdyBhbnl3YXlzXG5cbiAgdmFyIGRlbGF5WiA9IGFjLmNyZWF0ZURlbGF5KDAuMjIyKVxuXG4gIC8vIG1ha2UgYSBkaXN0b3J0aW9uIHBlZGFsISB5YXkhXG4gIHZhciBkaXN0b3J0aW9uWiA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuICBkaXN0b3J0aW9uWi5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoNzUwKVxuICBkaXN0b3J0aW9uWi5vdmVyc2FtcGxlID0gJzR4J1xuXG5cbiAgdmFyIHZvbHVtZSA9IGFjLmNyZWF0ZUdhaW4oKVxuICB2b2x1bWUuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCBhYy5jdXJyZW50VGltZSlcblxuICAvLyAgU1RBUlQgT0YgQ0hBSU4gKE5PVCBNQVJLT1YpXG5cbiAgb3NjaWxsYXRvcjEuY29ubmVjdChkZWxheUEpXG5cbiAgb3NjaWxsYXRvcjUuY29ubmVjdChmaWx0ZXJBLmZyZXF1ZW5jeSlcbiAgb3NjaWxsYXRvcjUuY29ubmVjdChnYWluWi5nYWluKVxuICBvc2NpbGxhdG9yNS5mcmVxdWVuY3kudmFsdWUgPSAwLjEzM1xuXG4gIG9zY2lsbGF0b3I0LmNvbm5lY3QoZGVsYXlCKVxuICBvc2NpbGxhdG9yNi5jb25uZWN0KGZpbHRlckIuZnJlcXVlbmN5KVxuICBvc2NpbGxhdG9yNi5jb25uZWN0KGdhaW5DLmdhaW4pXG4gIG9zY2lsbGF0b3I2LmZyZXF1ZW5jeS52YWx1ZSA9IDAuMjczXG5cbiAgb3NjaWxsYXRvcjIuY29ubmVjdChkZWxheUMpXG4gIG9zY2lsbGF0b3IzLmNvbm5lY3QoZGVsYXlDKVxuXG4gIGRlbGF5QS5jb25uZWN0KGZpbHRlckEpXG4gIGRlbGF5Qi5jb25uZWN0KGZpbHRlckIpXG4gIGRlbGF5Qy5jb25uZWN0KGZpbHRlckMpXG5cbiAgZmlsdGVyQS5jb25uZWN0KGdhaW5BKVxuICBmaWx0ZXJCLmNvbm5lY3QoZ2FpbkIpXG4gIGZpbHRlckMuY29ubmVjdChnYWluQylcblxuICBvc2NpbGxhdG9yMS5jb25uZWN0KGdhaW5BKVxuICBvc2NpbGxhdG9yNS5jb25uZWN0KGdhaW5BKVxuXG4gIG9zY2lsbGF0b3I0LmNvbm5lY3QoZ2FpbkIpXG4gIG9zY2lsbGF0b3I2LmNvbm5lY3QoZ2FpbkIpXG5cbiAgb3NjaWxsYXRvcjIuY29ubmVjdChnYWluQylcbiAgb3NjaWxsYXRvcjMuY29ubmVjdChnYWluQylcblxuICBnYWluQS5jb25uZWN0KGRpc3RvcnRpb25BKVxuICBnYWluQi5jb25uZWN0KGRpc3RvcnRpb25CKVxuICBnYWluQy5jb25uZWN0KGRpc3RvcnRpb25DKVxuXG4gIGRpc3RvcnRpb25DLmNvbm5lY3QoZGVsYXlaKVxuICBkZWxheVouY29ubmVjdChmaWx0ZXJaKVxuICBkaXN0b3J0aW9uQy5jb25uZWN0KGdhaW5aKVxuICBmaWx0ZXJaLmNvbm5lY3QoZ2FpblopXG4gIGdhaW5aLmNvbm5lY3QoZGlzdG9ydGlvblopXG5cbiAgZGlzdG9ydGlvbkEuY29ubmVjdCh2b2x1bWUpXG4gIGRpc3RvcnRpb25CLmNvbm5lY3Qodm9sdW1lKVxuICBkaXN0b3J0aW9uWi5jb25uZWN0KHZvbHVtZSlcbiAgLy8gRU5EIE9GIENIQUlOXG5cbiAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yMSA9IG9zY2lsbGF0b3IxXG4gIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjIgPSBvc2NpbGxhdG9yMlxuICBhdWRpb05vZGVzLm9zY2lsbGF0b3IzID0gb3NjaWxsYXRvcjNcbiAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNCA9IG9zY2lsbGF0b3I0XG4gIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjUgPSBvc2NpbGxhdG9yNVxuICBhdWRpb05vZGVzLm9zY2lsbGF0b3I2ID0gb3NjaWxsYXRvcjZcbiAgYXVkaW9Ob2Rlcy5kZWxheUEgPSBkZWxheUFcbiAgYXVkaW9Ob2Rlcy5kZWxheUIgPSBkZWxheUJcbiAgYXVkaW9Ob2Rlcy5kZWxheUMgPSBkZWxheUNcbiAgYXVkaW9Ob2Rlcy5kZWxheVogPSBkZWxheVpcbiAgYXVkaW9Ob2Rlcy5nYWluQSA9IGdhaW5BXG4gIGF1ZGlvTm9kZXMuZ2FpbkIgPSBnYWluQlxuICBhdWRpb05vZGVzLmdhaW5DID0gZ2FpbkNcbiAgYXVkaW9Ob2Rlcy5maWx0ZXJBID0gZmlsdGVyQVxuICBhdWRpb05vZGVzLmZpbHRlckIgPSBmaWx0ZXJCXG4gIGF1ZGlvTm9kZXMuZmlsdGVyQyA9IGZpbHRlckNcbiAgYXVkaW9Ob2Rlcy5maWx0ZXJaID0gZmlsdGVyWlxuICBhdWRpb05vZGVzLmRpc3RvcnRpb25BID0gZGlzdG9ydGlvbkFcbiAgYXVkaW9Ob2Rlcy5kaXN0b3J0aW9uQiA9IGRpc3RvcnRpb25CXG4gIGF1ZGlvTm9kZXMuZGlzdG9ydGlvbkMgPSBkaXN0b3J0aW9uQ1xuICBhdWRpb05vZGVzLmRpc3RvcnRpb25aID0gZGlzdG9ydGlvblpcbiAgYXVkaW9Ob2Rlcy52b2x1bWUgPSB2b2x1bWVcbiAgYXVkaW9Ob2Rlcy5zZXR0aW5ncyA9IHtcbiAgICBhdHRhY2s6IDAuMDEsXG4gICAgZGVjYXk6IDAuMDUsXG4gICAgc3VzdGFpbjogMC40LFxuICAgIHJlbGVhc2U6IDAuMSxcbiAgICBwZWFrOiAwLjMsXG4gICAgbWlkOiAwLjEsXG4gICAgZW5kOiAwLjAwMDAwMDAwMDAwMDAxIC8vIGxvbCBpZGsgd3RmXG4gIH1cblxuICAvLyBienp6enpcbiAgb3NjaWxsYXRvcjEuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIG9zY2lsbGF0b3IyLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBvc2NpbGxhdG9yMy5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgb3NjaWxsYXRvcjQuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIG9zY2lsbGF0b3I1LnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBvc2NpbGxhdG9yNi5zdGFydChhYy5jdXJyZW50VGltZSlcblxuICByZXR1cm4ge1xuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgYXVkaW9Ob2Rlcy52b2x1bWUuY29ubmVjdChpbnB1dClcbiAgICB9LFxuICAgIHN0YXJ0OiBmdW5jdGlvbiAod2hlbikge1xuICAgICAgYWRzcihhdWRpb05vZGVzLnZvbHVtZSwgd2hlbiwgYXVkaW9Ob2Rlcy5zZXR0aW5ncylcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uICh3aGVuKSB7XG4gICAgICBjb25zb2xlLmxvZygnU09NRVRJTUVTIEkgRE9VQlQgWVIgQ09NTUlUTUVOVCAyIFRIRSBQQVJUWVxcbnAucy4geXIgb3NjaWxsYXRvcnMgYXJlIGRlc3Ryb3llZCwgbWFrZSBhIG5ldyBzeW50aCBwbHonKVxuICAgICAgb3NjaWxsYXRvcjEuc3RvcCh3aGVuKVxuICAgICAgb3NjaWxsYXRvcjIuc3RvcCh3aGVuKVxuICAgICAgb3NjaWxsYXRvcjMuc3RvcCh3aGVuKVxuICAgICAgb3NjaWxsYXRvcjQuc3RvcCh3aGVuKVxuICAgICAgb3NjaWxsYXRvcjUuc3RvcCh3aGVuKVxuICAgICAgb3NjaWxsYXRvcjYuc3RvcCh3aGVuKVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAob3B0cywgd2hlbikge1xuICAgICAgLy8gYXZhaWxhYmxlIG9wdHM6XG4gICAgICAvLyB7bWlkaU5vdGU6IDYyLCBsZm9MOiAsIGxmb1I6ICwgZnJlcSwgYXR0YWNrOiAsIGRlY2F5OiAsIHN1c3RhaW46ICwgcmVsZWFzZTogLCBwZWFrOiAsIG1pZDp9XG4gICAgICBPYmplY3Qua2V5cyhvcHRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHZhciB2ID0gb3B0c1trXVxuICAgICAgICBpZiAoayA9PSAnbWlkaU5vdGUnIHx8IGsgPT0gJ2ZyZXEnKSB7XG4gICAgICAgICAgdmFyIGZyZXEgPSBrID09ICdtaWRpTm90ZScgPyBNSURJVXRpbHMubm90ZU51bWJlclRvRnJlcXVlbmN5KHYpIDogdlxuXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yMS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAqIDIuMCwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zY2lsbGF0b3IyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICogMi4wLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjMuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgKiA4LjAsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNC5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAqIDQuMCwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zY2lsbGF0b3I1LmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICogMi4wLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjYuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgKiA0LjAsIHdoZW4pXG5cbiAgICAgICAgICBmaWx0ZXJBLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gKDIgKyBNYXRoLnJhbmRvbSgpKSwgd2hlbilcbiAgICAgICAgICBmaWx0ZXJCLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICogKDIgKyBNYXRoLnJhbmRvbSgpKSwgd2hlbilcbiAgICAgICAgICBmaWx0ZXJDLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gKE1hdGgucmFuZG9tKCkpLCB3aGVuKVxuICAgICAgICAgIGZpbHRlclouZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgKiAoMS41ICsgTWF0aC5yYW5kb20oKSksIHdoZW4pXG5cbiAgICAgICAgfSBlbHNlIGlmIChrID09ICdsZm9MJyB8fCBrID09ICdsZm9SJykge1xuICAgICAgICAgIHZhciBub2RlID0gayA9PSAnbGZvTCcgPyBhdWRpb05vZGVzLm9zY2lsbGF0b3I1IDogYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNlxuICAgICAgICAgIG5vZGUuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKHYsIHdoZW4pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8ganVzdCBhbiBBRFNSIHZhbHVlXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5zZXR0aW5nc1trXSA9IHZcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIG5vZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyByZXR1cm5zIGFuIG9iamVjdCBvZiBge3N0cmluZ0tleTogYXVkaW9Ob2RlfWAgZm9yIHJhdyBtYW5pcHVsYXRpb25cbiAgICAgIHJldHVybiBhdWRpb05vZGVzXG4gICAgfVxuICB9XG59IiwidmFyIG1ha2VEaXN0b3J0aW9uQ3VydmUgPSByZXF1aXJlKCdtYWtlLWRpc3RvcnRpb24tY3VydmUnKVxudmFyIE1JRElVdGlscyA9IHJlcXVpcmUoJ21pZGl1dGlscycpXG52YXIgYWRzciA9IHJlcXVpcmUoJ2EtZC1zLXInKVxuLy8geXIgZnVuY3Rpb24gc2hvdWxkIGFjY2VwdCBhbiBhdWRpb0NvbnRleHQsIGFuZCBvcHRpb25hbCBwYXJhbXMvb3B0c1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWMsIG9wdHMpIHtcbiAgLy8gbWFrZSBzb21lIGF1ZGlvTm9kZXMsIGNvbm5lY3QgdGhlbSwgc3RvcmUgdGhlbSBvbiB0aGUgb2JqZWN0XG4gIHZhciBhdWRpb05vZGVzID0ge31cblxuICB2YXIgb3NjMSA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoKVxuICB2YXIgb3NjMiA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoKVxuICBvc2MxLnR5cGUgPSAnc3F1YXJlJ1xuICBvc2MyLnR5cGUgPSAnc3F1YXJlJ1xuXG4gIC8vIGFkZCBzb21lIGZ1bmsgdG8gdGhhdFxuICBvc2MxLmRldHVuZS5zZXRWYWx1ZUF0VGltZSgtTWF0aC5yYW5kb20oKSwgYWMuY3VycmVudFRpbWUpXG4gIG9zYzIuZGV0dW5lLnNldFZhbHVlQXRUaW1lKE1hdGgucmFuZG9tKCksIGFjLmN1cnJlbnRUaW1lKVxuXG4gIHZhciBsZGlzdG9ydGlvbiA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuICBsZGlzdG9ydGlvbi5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoODUwICsgfn4oTWF0aC5yYW5kb20oKSAqIDQ1MCkpXG4gIGxkaXN0b3J0aW9uLm92ZXJzYW1wbGUgPSAnNHgnXG5cbiAgdmFyIHJkaXN0b3J0aW9uID0gYWMuY3JlYXRlV2F2ZVNoYXBlcigpXG4gIHJkaXN0b3J0aW9uLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSg4NTAgKyB+fihNYXRoLnJhbmRvbSgpICogNDUwKSlcbiAgcmRpc3RvcnRpb24ub3ZlcnNhbXBsZSA9ICc0eCdcblxuICB2YXIgbGVmdGZpbHRlciA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG4gIGxlZnRmaWx0ZXIudHlwZSA9ICdsb3dwYXNzJ1xuICBsZWZ0ZmlsdGVyLlEudmFsdWUgPSAxNVxuICBsZWZ0ZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg1MDAsIGFjLmN1cnJlbnRUaW1lKVxuXG4gIHZhciByaWdodGZpbHRlciA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG4gIHJpZ2h0ZmlsdGVyLnR5cGUgPSAnbG93cGFzcydcbiAgcmlnaHRmaWx0ZXIuUS52YWx1ZSA9IDE1XG4gIHJpZ2h0ZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg1MDAsIGFjLmN1cnJlbnRUaW1lKVxuXG4gIHZhciBjb21wcmVzc29yID0gYWMuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKClcbiAgY29tcHJlc3Nvci50aHJlc2hvbGQudmFsdWUgPSAtNTBcbiAgY29tcHJlc3Nvci5rbmVlLnZhbHVlID0gNTBcbiAgY29tcHJlc3Nvci5yYXRpby52YWx1ZSA9IDE4XG4gIGNvbXByZXNzb3IucmVkdWN0aW9uLnZhbHVlID0gLTVcbiAgY29tcHJlc3Nvci5hdHRhY2sudmFsdWUgPSAwLjA1XG4gIGNvbXByZXNzb3IucmVsZWFzZS52YWx1ZSA9IDAuMDVcblxuICB2YXIgcHJlZ2FpbiA9IGFjLmNyZWF0ZUdhaW4oKVxuICBwcmVnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC43LCBhYy5jdXJyZW50VGltZSlcbi8vXG4gIHZhciBvc2NzaW5lID0gYWMuY3JlYXRlT3NjaWxsYXRvcigpXG4gIG9zY3NpbmUudHlwZSA9ICdzaW5lJ1xuICB2YXIgZGVsYXkgPSBhYy5jcmVhdGVEZWxheSgwLjEpXG4gIHZhciBzaW5lZGlzdCA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuICBzaW5lZGlzdC5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoMTAwMClcbiAgdmFyIGRlbGF5MiA9IGFjLmNyZWF0ZURlbGF5KDAuMTMpXG4gIHZhciBzaW5lZ2FpbiA9IGFjLmNyZWF0ZUdhaW4oKVxuICBzaW5lZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMjUsIGFjLmN1cnJlbnRUaW1lKVxuLy9cbiAgdmFyIG1haW5maWx0ZXIgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICBtYWluZmlsdGVyLnR5cGUgPSAnbG93c2hlbGYnXG4gIG1haW5maWx0ZXIuUS52YWx1ZSA9IDIwXG4gIG1haW5maWx0ZXIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDUwMCwgYWMuY3VycmVudFRpbWUpXG5cbiAgdmFyIGZpbmFsZGlzdCA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuICBmaW5hbGRpc3QuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDEwMDApXG4gIGZpbmFsZGlzdC5vdmVyc2FtcGxlID0gJzR4J1xuICB2YXIgZGVsYXkyID0gYWMuY3JlYXRlRGVsYXkoMC4yMylcblxuICB2YXIgbWFpbmdhaW4gPSBhYy5jcmVhdGVHYWluKClcbiAgbWFpbmdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCBhYy5jdXJyZW50VGltZSlcblxuXG5cbi8vXG4gIG9zYzEuY29ubmVjdChsZGlzdG9ydGlvbilcbiAgbGRpc3RvcnRpb24uY29ubmVjdChsZWZ0ZmlsdGVyKVxuICBsZWZ0ZmlsdGVyLmNvbm5lY3QoY29tcHJlc3Nvcilcbi8vXG4gIG9zYzIuY29ubmVjdChyZGlzdG9ydGlvbilcbiAgcmRpc3RvcnRpb24uY29ubmVjdChyaWdodGZpbHRlcilcbiAgcmlnaHRmaWx0ZXIuY29ubmVjdChjb21wcmVzc29yKVxuLy9cbiAgY29tcHJlc3Nvci5jb25uZWN0KHByZWdhaW4pXG4vL1xuICBvc2NzaW5lLmNvbm5lY3QoZGVsYXkpXG4gIGRlbGF5LmNvbm5lY3Qoc2luZWRpc3QpXG4gIG9zY3NpbmUuY29ubmVjdChzaW5lZGlzdClcbiAgc2luZWRpc3QuY29ubmVjdChkZWxheTIpXG4gIGRlbGF5Mi5jb25uZWN0KHNpbmVnYWluKVxuICBzaW5lZGlzdC5jb25uZWN0KHNpbmVnYWluKVxuLy9cbiAgcHJlZ2Fpbi5jb25uZWN0KG1haW5maWx0ZXIpXG4gIHNpbmVnYWluLmNvbm5lY3QobWFpbmZpbHRlcilcbiAgbWFpbmZpbHRlci5jb25uZWN0KG1haW5nYWluKVxuXG4gIGF1ZGlvTm9kZXMub3NjMSA9IG9zYzFcbiAgYXVkaW9Ob2Rlcy5vc2MyID0gb3NjMlxuICBhdWRpb05vZGVzLm9zY3NpbmUgPSBvc2NzaW5lXG4gIGF1ZGlvTm9kZXMubGRpc3RvcnRpb24gPSBsZGlzdG9ydGlvblxuICBhdWRpb05vZGVzLnJkaXN0b3J0aW9uID0gcmRpc3RvcnRpb25cbiAgYXVkaW9Ob2Rlcy5sZWZ0ZmlsdGVyID0gbGVmdGZpbHRlclxuICBhdWRpb05vZGVzLnJpZ2h0ZmlsdGVyID0gcmlnaHRmaWx0ZXJcbiAgYXVkaW9Ob2Rlcy5tYWluZmlsdGVyID0gbWFpbmZpbHRlclxuICBhdWRpb05vZGVzLm1haW5nYWluID0gbWFpbmdhaW5cbiAgYXVkaW9Ob2Rlcy5wcmVnYWluID0gcHJlZ2FpblxuICBhdWRpb05vZGVzLnNpbmVnYWluID0gc2luZWdhaW5cbiAgYXVkaW9Ob2Rlcy5kZWxheSA9IGRlbGF5XG4gIGF1ZGlvTm9kZXMuZGVsYXkyID0gZGVsYXkyXG4gIGF1ZGlvTm9kZXMuc2luZWRpc3QgPSBzaW5lZGlzdFxuICBhdWRpb05vZGVzLmNvbXByZXNzb3IgPSBjb21wcmVzc29yXG5cbiAgLy8gZ29zaCBpIHdpc2ggdGhlcmUgd2FzIGFuIGF1ZGlvTm9kZSB0aGF0IGp1c3QgZGlkIHRoaXMuLi5cbiAgYXVkaW9Ob2Rlcy5zZXR0aW5ncyA9IHtcbiAgICBhdHRhY2s6IDAuMSxcbiAgICBkZWNheTogMC4wNSxcbiAgICBzdXN0YWluOiAwLjMsXG4gICAgcmVsZWFzZTogMC4xLFxuICAgIHBlYWs6IDAuNSxcbiAgICBtaWQ6IDAuMyxcbiAgICBlbmQ6IDAuMDAwMDAwMDAwMSxcbiAgICBkZXR1bmU6IDEsXG4gICAgY2hvcmQ6IGZhbHNlIC8vIFRPRE86IGJ1aWxkIGNob3JkcyBpbnN0ZWFkIG9mIHBsYXlpbmcgaHVnZSBub3RlcyBhcyBhbiBvcHRpb24/XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgLy8gLy8gdGhpcyBmdW5jdGlvbiBzaG91bGQgY2FsbCBgY29ubmVjdGAgb24geXIgb3V0cHV0IG5vZGVzIHdpdGggYGlucHV0YCBhcyB0aGUgYXJnXG4gICAgICBhdWRpb05vZGVzLm1haW5nYWluLmNvbm5lY3QoaW5wdXQpXG5cbiAgICAgIC8vIGp1c3QgbGV0IHRoZW0gYnV6eiBmb3JldmVyLCBkZWFsIHdpdGggXCJub3Rlc1wiIHZpYSBhZHNyIHRyaWNrc1xuICAgICAgYXVkaW9Ob2Rlcy5vc2MxLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICAgICAgYXVkaW9Ob2Rlcy5vc2MyLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICAgICAgYXVkaW9Ob2Rlcy5vc2NzaW5lLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICAgIH0sXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICh3aGVuKSB7XG4gICAgICBhZHNyKGF1ZGlvTm9kZXMubWFpbmdhaW4sIHdoZW4sIGF1ZGlvTm9kZXMuc2V0dGluZ3MpXG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAod2hlbikge1xuICAgICAgYXVkaW9Ob2Rlcy5vc2MxLnN0b3Aod2hlbilcbiAgICAgIGF1ZGlvTm9kZXMub3NjMi5zdG9wKHdoZW4pXG4gICAgICBhdWRpb05vZGVzLm9zY3NpbmUuc3RvcCh3aGVuKVxuICAgICAgY29uc29sZS5sb2coJ3doeWQgdSBsZXQgdGhlIGJhc3MgZ28/IGdvdHRhIGNhdGNoIGEgbmV3IG9uZSBub3chISEhJylcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKG9wdHMsIHdoZW4pIHtcbiAgICAgIC8vIGF2YWlsYWJsZSBvcHRzOlxuICAgICAgLy8ge21pZGlOb3RlOiA2MiwgYXR0YWNrOiAsIGRlY2F5OiAsIHN1c3RhaW46ICwgcmVsZWFzZTogfVxuICAgICAgT2JqZWN0LmtleXMob3B0cykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICB2YXIgdiA9IG9wdHNba11cbiAgICAgICAgaWYgKGsgPT0gJ21pZGlOb3RlJyB8fCBrID09ICdmcmVxJykge1xuICAgICAgICAgIHZhciBmcmVxID0gayA9PSAnbWlkaU5vdGUnID8gTUlESVV0aWxzLm5vdGVOdW1iZXJUb0ZyZXF1ZW5jeSh2KSA6IHZcbiAgICAgICAgICBhdWRpb05vZGVzLmxlZnRmaWx0ZXIuZnJlcXVlbmN5LmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKGZyZXEgKyAoZnJlcSAvICgyICsgTWF0aC5yYW5kb20oKSkpLCB3aGVuICsgTWF0aC5yYW5kb20oKSlcbiAgICAgICAgICBhdWRpb05vZGVzLnJpZ2h0ZmlsdGVyLmZyZXF1ZW5jeS5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZShmcmVxICsgKGZyZXEgLyAoMiArIE1hdGgucmFuZG9tKCkpKSwgd2hlbiArIE1hdGgucmFuZG9tKCkpXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5tYWluZmlsdGVyLmZyZXF1ZW5jeS5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZShmcmVxIC0gKGZyZXEgLyAoMS41ICsgTWF0aC5yYW5kb20oKSkpLCB3aGVuICsgTWF0aC5yYW5kb20oKSlcblxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjMS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvIDQuMCwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zYzIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgLyA0LjAsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2NzaW5lLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gNC4wLCB3aGVuKVxuICAgICAgICAgIC8vIGFkZCBzb21lIGZ1bmsgdG8gdGhhdFxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjMS5kZXR1bmUuc2V0VmFsdWVBdFRpbWUoYXVkaW9Ob2Rlcy5zZXR0aW5ncy5kZXR1bmUgKiAtTWF0aC5yYW5kb20oKSwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zYzIuZGV0dW5lLnNldFZhbHVlQXRUaW1lKGF1ZGlvTm9kZXMuc2V0dGluZ3MuZGV0dW5lICogTWF0aC5yYW5kb20oKSwgd2hlbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBqdXN0IGFuIEFEU1IgdmFsdWVcbiAgICAgICAgICBhdWRpb05vZGVzLnNldHRpbmdzW2tdID0gdlxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgbm9kZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHJldHVybnMgYW4gb2JqZWN0IG9mIGB7c3RyaW5nS2V5OiBhdWRpb05vZGV9YCBmb3IgcmF3IG1hbmlwdWxhdGlvblxuICAgICAgcmV0dXJuIGF1ZGlvTm9kZXNcbiAgICB9XG4gIH1cbn0iLCJ2YXIgc2NhbGVzID0ge1xuICBtYWpvcjogWzIsIDIsIDEsIDIsIDIsIDIsIDFdLFxuICBtaW5vcjogWzIsIDEsIDIsIDIsIDEsIDIsIDJdLFxuICBwZW50TWFqOiBbMiwgMiwgMywgMiwgM10sXG4gIHBlbnRNaW46IFszLCAyLCAyLCAzLCAyXSxcbiAgYmx1ZXM6IFszLCAyLCAxLCAxLCAzLCAyXVxufVxuXG52YXIgc3RyMmZyZXEgPSB7XG4gICdBMCc6IDI3LjUwMDAsICdBIzAnOiAyOS4xMzUyLCAnQjAnOiAzMC44Njc3LCAnQzEnOiAzMi43MDMyLCAnQyMxJzogMzQuNjQ3OCxcbiAgJ0QxJzogMzYuNzA4MSwgJ0QjMSc6IDM4Ljg5MDksICdFMSc6IDQxLjIwMzQsICdGMSc6IDQzLjY1MzUsICdGIzEnOiA0Ni4yNDkzLFxuICAnRzEnOiA0OC45OTk0LCAnRyMxJzogNTEuOTEzMSwgJ0ExJzogNTUuMDAwMCwgJ0EjMSc6IDU4LjI3MDUsICdCMSc6IDYxLjczNTQsXG4gICdDMic6IDY1LjQwNjQsICdDIzInOiA2OS4yOTU3LCAnRDInOiA3My40MTYyLCAnRCMyJzogNzcuNzgxNywgJ0UyJzogODIuNDA2OSxcbiAgJ0YyJzogODcuMzA3MSwgJ0YjMic6IDkyLjQ5ODYsICdHMic6IDk3Ljk5ODksICdHIzInOiAxMDMuODI2LCAnQTInOiAxMTAuMDAwLFxuICAnQSMyJzogMTE2LjU0MSwgJ0IyJzogMTIzLjQ3MSwgJ0MzJzogMTMwLjgxMywgJ0MjMyc6IDEzOC41OTEsICdEMyc6IDE0Ni44MzIsXG4gICdEIzMnOiAxNTUuNTYzLCAnRTMnOiAxNjQuODE0LCAnRjMnOiAxNzQuNjE0LCAnRiMzJzogMTg0Ljk5NywgJ0czJzogMTk1Ljk5OCxcbiAgJ0cjMyc6IDIwNy42NTIsICdBMyc6IDIyMC4wMDAsICdBIzMnOiAyMzMuMDgyLCAnQjMnOiAyNDYuOTQyLCAnQzQnOiAyNjEuNjI2LFxuICAnQyM0JzogMjc3LjE4MywgJ0Q0JzogMjkzLjY2NSwgJ0QjNCc6IDMxMS4xMjcsICdFNCc6IDMyOS42MjgsICdGNCc6IDM0OS4yMjgsXG4gICdGIzQnOiAzNjkuOTk0LCAnRzQnOiAzOTEuOTk1LCAnRyM0JzogNDE1LjMwNSwgJ0E0JzogNDQwLjAwMCwgJ0EjNCc6IDQ2Ni4xNjQsXG4gICdCNCc6IDQ5My44ODMsICdDNSc6IDUyMy4yNTEsICdDIzUnOiA1NTQuMzY1LCAnRDUnOiA1ODcuMzMwLCAnRCM1JzogNjIyLjI1NCxcbiAgJ0U1JzogNjU5LjI1NSwgJ0Y1JzogNjk4LjQ1NiwgJ0YjNSc6IDczOS45ODksICdHNSc6IDc4My45OTEsICdHIzUnOiA4MzAuNjA5LFxuICAnQTUnOiA4ODAuMDAwLCAnQSM1JzogOTMyLjMyOCwgJ0I1JzogOTg3Ljc2NywgJ0M2JzogMTA0Ni41MCwgJ0MjNic6IDExMDguNzMsXG4gICdENic6IDExNzQuNjYsICdEIzYnOiAxMjQ0LjUxLCAnRTYnOiAxMzE4LjUxLCAnRjYnOiAxMzk2LjkxLCAnRiM2JzogMTQ3OS45OCxcbiAgJ0c2JzogMTU2Ny45OCwgJ0cjNic6IDE2NjEuMjIsICdBNic6IDE3NjAuMDAsICdBIzYnOiAxODY0LjY2LCAnQjYnOiAxOTc1LjUzLFxuICAnQzcnOiAyMDkzLjAwLCAnQyM3JzogMjIxNy40NiwgJ0Q3JzogMjM0OS4zMiwgJ0QjNyc6IDI0ODkuMDIsICdFNyc6IDI2MzcuMDIsXG4gICdGNyc6IDI3OTMuODMsICdGIzcnOiAyOTU5Ljk2LCAnRzcnOiAzMTM1Ljk2LCAnRyM3JzogMzMyMi40NCwgJ0E3JzogMzUyMC4wMCxcbiAgJ0EjNyc6IDM3MjkuMzEsICdCNyc6IDM5NTEuMDcsICdDOCc6IDQxODYuMDFcbn1cblxudmFyIG5vdGVzID0gT2JqZWN0LmtleXMoc3RyMmZyZXEpXG5cbmZ1bmN0aW9uIGludDJmcmVxKGludE5vdGUsIG9wdGlvbnMpe1xuICB2YXIgaW5kZXgsIHNjYWxlO1xuICBpZigoaW5kZXggPSBub3Rlcy5pbmRleE9mKG9wdGlvbnMudG9uaWMpKSA9PT0gLTEpIHRocm93ICd3aGF0IGlzIHVwIHdpdGggdGhhdCB0b25pYz8nXG4gIGlmKCEoc2NhbGUgPSBzY2FsZXNbb3B0aW9ucy5zY2FsZV0pKSB0aHJvdyAnd2hhdCBpcyB1cCB3aXRoIHRoYXQgc2NhbGU/J1xuICB3aGlsZSAoTWF0aC5hYnMoaW50Tm90ZSkgPiBzY2FsZS5sZW5ndGgpIHNjYWxlID0gc2NhbGUuY29uY2F0KHNjYWxlKVxuICBpZihpbnROb3RlID49IDApIGZvciAodmFyIGkgPSAwOyBpIDwgaW50Tm90ZTsgaW5kZXggKz0gc2NhbGVbaV0sIGkrPSAxICl7fVxuICBlbHNlIGZvciAodmFyIGogPSAtMTsgaiA+PSBpbnROb3RlOyBpbmRleCAtPSBzY2FsZVtzY2FsZS5sZW5ndGggKyBqXSwgai09IDEpe31cbiAgcmV0dXJuIHN0cjJmcmVxW25vdGVzW2luZGV4XV1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnQyZnJlcVxubW9kdWxlLmV4cG9ydHMuc2NhbGVzID0gT2JqZWN0LmtleXMoc2NhbGVzKVxubW9kdWxlLmV4cG9ydHMubm90ZXMgPSBPYmplY3Qua2V5cyhub3RlcykiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFtb3VudCkge1xuICB2YXIgayA9IHR5cGVvZiBhbW91bnQgPT09ICdudW1iZXInID8gYW1vdW50IDogNTAsXG4gICAgbl9zYW1wbGVzID0gNDQxMDAsXG4gICAgY3VydmUgPSBuZXcgRmxvYXQzMkFycmF5KG5fc2FtcGxlcyksXG4gICAgZGVnID0gTWF0aC5QSSAvIDE4MCxcbiAgICBpID0gMCxcbiAgICB4O1xuICBmb3IgKCA7IGkgPCBuX3NhbXBsZXM7ICsraSApIHtcbiAgICB4ID0gaSAqIDIgLyBuX3NhbXBsZXMgLSAxO1xuICAgIGN1cnZlW2ldID0gKCAzICsgayApICogeCAqIDIwICogZGVnIC8gKCBNYXRoLlBJICsgayAqIE1hdGguYWJzKHgpICk7XG4gIH1cbiAgcmV0dXJuIGN1cnZlO1xufVxuIiwiKGZ1bmN0aW9uKCkge1xuXG5cdHZhciBub3RlTWFwID0ge307XG5cdHZhciBub3RlTnVtYmVyTWFwID0gW107XG5cdHZhciBub3RlcyA9IFsgXCJDXCIsIFwiQyNcIiwgXCJEXCIsIFwiRCNcIiwgXCJFXCIsIFwiRlwiLCBcIkYjXCIsIFwiR1wiLCBcIkcjXCIsIFwiQVwiLCBcIkEjXCIsIFwiQlwiIF07XG5cblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgMTI3OyBpKyspIHtcblxuXHRcdHZhciBpbmRleCA9IGksXG5cdFx0XHRrZXkgPSBub3Rlc1tpbmRleCAlIDEyXSxcblx0XHRcdG9jdGF2ZSA9ICgoaW5kZXggLyAxMikgfCAwKSAtIDE7IC8vIE1JREkgc2NhbGUgc3RhcnRzIGF0IG9jdGF2ZSA9IC0xXG5cblx0XHRpZihrZXkubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRrZXkgPSBrZXkgKyAnLSc7XG5cdFx0fVxuXG5cdFx0a2V5ICs9IG9jdGF2ZTtcblxuXHRcdG5vdGVNYXBba2V5XSA9IGk7XG5cdFx0bm90ZU51bWJlck1hcFtpXSA9IGtleTtcblxuXHR9XG5cblxuXHRmdW5jdGlvbiBnZXRCYXNlTG9nKHZhbHVlLCBiYXNlKSB7XG5cdFx0cmV0dXJuIE1hdGgubG9nKHZhbHVlKSAvIE1hdGgubG9nKGJhc2UpO1xuXHR9XG5cblxuXHR2YXIgTUlESVV0aWxzID0ge1xuXG5cdFx0bm90ZU5hbWVUb05vdGVOdW1iZXI6IGZ1bmN0aW9uKG5hbWUpIHtcblx0XHRcdHJldHVybiBub3RlTWFwW25hbWVdO1xuXHRcdH0sXG5cblx0XHRub3RlTnVtYmVyVG9GcmVxdWVuY3k6IGZ1bmN0aW9uKG5vdGUpIHtcblx0XHRcdHJldHVybiA0NDAuMCAqIE1hdGgucG93KDIsIChub3RlIC0gNjkuMCkgLyAxMi4wKTtcblx0XHR9LFxuXG5cdFx0bm90ZU51bWJlclRvTmFtZTogZnVuY3Rpb24obm90ZSkge1xuXHRcdFx0cmV0dXJuIG5vdGVOdW1iZXJNYXBbbm90ZV07XG5cdFx0fSxcblxuXHRcdGZyZXF1ZW5jeVRvTm90ZU51bWJlcjogZnVuY3Rpb24oZikge1xuXHRcdFx0cmV0dXJuIE1hdGgucm91bmQoMTIuMCAqIGdldEJhc2VMb2coZiAvIDQ0MC4wLCAyKSArIDY5KTtcblx0XHR9XG5cblx0fTtcblxuXG5cdC8vIE1ha2UgaXQgY29tcGF0aWJsZSBmb3IgcmVxdWlyZS5qcy9BTUQgbG9hZGVyKHMpXG5cdGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIE1JRElVdGlsczsgfSk7XG5cdH0gZWxzZSBpZih0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdC8vIEFuZCBmb3IgbnBtL25vZGUuanNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IE1JRElVdGlscztcblx0fSBlbHNlIHtcblx0XHR0aGlzLk1JRElVdGlscyA9IE1JRElVdGlscztcblx0fVxuXG5cbn0pLmNhbGwodGhpcyk7XG5cbiIsInZhciBtYWtlRGlzdG9ydGlvbkN1cnZlID0gcmVxdWlyZSgnbWFrZS1kaXN0b3J0aW9uLWN1cnZlJylcbnZhciBNSURJVXRpbHMgPSByZXF1aXJlKCdtaWRpdXRpbHMnKVxudmFyIGFkc3IgPSByZXF1aXJlKCdhLWQtcy1yJylcblxuLy8geXIgZnVuY3Rpb24gc2hvdWxkIGFjY2VwdCBhbiBhdWRpb0NvbnRleHQsIGFuZCBvcHRpb25hbCBwYXJhbXMvb3B0c1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWMsIG9wdHMpIHtcbiAgLy8gbWFrZSBzb21lIGF1ZGlvTm9kZXMsIGNvbm5lY3QgdGhlbSwgc3RvcmUgdGhlbSBvbiB0aGUgb2JqZWN0XG4gIHZhciBhdWRpb05vZGVzID0ge31cblxuICB2YXIgb3NjMSA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoKVxuICB2YXIgb3NjMiA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoKVxuICB2YXIgb3NjMyA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoKVxuICB2YXIgb3Njbm9pc2UgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKClcbiAgb3NjMS50eXBlID0gJ3RyaWFuZ2xlJ1xuICBvc2MyLnR5cGUgPSAndHJpYW5nbGUnXG4gIG9zYzMudHlwZSA9ICdzaW5lJ1xuICBvc2Nub2lzZS50eXBlID0gJ3Nhd3Rvb3RoJ1xuXG4gIC8vIGFyZSB0aGVzZSB0b29vb28gc21hbGw/XG4gIG9zYzEuZGV0dW5lLnZhbHVlID0gMC43NSAqICgoTWF0aC5yYW5kb20oKSAqIDIpIC0gMSlcbiAgb3NjMi5kZXR1bmUudmFsdWUgPSAwLjc1ICogKChNYXRoLnJhbmRvbSgpICogMikgLSAxKVxuICBvc2MzLmRldHVuZS52YWx1ZSA9IDAuMyAqICgoTWF0aC5yYW5kb20oKSAqIDIpIC0gMSlcblxuICB2YXIgbGVmdGZpbHRlciA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG4gIGxlZnRmaWx0ZXIudHlwZSA9ICdsb3dwYXNzJ1xuICBsZWZ0ZmlsdGVyLlEudmFsdWUgPSA3XG4gIGxlZnRmaWx0ZXIuZGV0dW5lLnZhbHVlID0gMC43NSAqICgoTWF0aC5yYW5kb20oKSAqIDIpIC0gMSlcbiAgbGVmdGZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNTAwLCBhYy5jdXJyZW50VGltZSlcblxuICB2YXIgcmlnaHRmaWx0ZXIgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICByaWdodGZpbHRlci50eXBlID0gJ2xvd3Bhc3MnXG4gIHJpZ2h0ZmlsdGVyLlEudmFsdWUgPSA3XG4gIHJpZ2h0ZmlsdGVyLmRldHVuZS52YWx1ZSA9IDAuNzUgKiAoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpXG4gIHJpZ2h0ZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg1MDAsIGFjLmN1cnJlbnRUaW1lKVxuXG5cbiAgdmFyIG5vaXNlZ2FpbiA9IGFjLmNyZWF0ZUdhaW4oKVxuICBub2lzZWdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCBhYy5jdXJyZW50VGltZSlcblxuICB2YXIgZGVsYXkgPSBhYy5jcmVhdGVEZWxheSgwLjM1KVxuXG4gIHZhciBjb21wcmVzc29yID0gYWMuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKClcbiAgY29tcHJlc3Nvci50aHJlc2hvbGQudmFsdWUgPSAtMzBcbiAgY29tcHJlc3Nvci5rbmVlLnZhbHVlID0gMzNcbiAgY29tcHJlc3Nvci5yYXRpby52YWx1ZSA9IDlcbiAgY29tcHJlc3Nvci5yZWR1Y3Rpb24udmFsdWUgPSAtMTBcbiAgY29tcHJlc3Nvci5hdHRhY2sudmFsdWUgPSAwLjE1XG4gIGNvbXByZXNzb3IucmVsZWFzZS52YWx1ZSA9IDAuMzVcblxuICB2YXIgZ2FpbiA9IGFjLmNyZWF0ZUdhaW4oKVxuICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCwgYWMuY3VycmVudFRpbWUpXG5cblxuICB2YXIgZGlzdG9ydGlvbiA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuICBkaXN0b3J0aW9uLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSg3NSlcblxuICB2YXIgbWFpbmZpbHRlciA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG4gIG1haW5maWx0ZXIudHlwZSA9ICdsb3dwYXNzJ1xuICBtYWluZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg1MDAsIGFjLmN1cnJlbnRUaW1lKVxuXG4gIG9zY25vaXNlLmNvbm5lY3Qobm9pc2VnYWluKVxuICBvc2MxLmNvbm5lY3QobGVmdGZpbHRlcilcbiAgb3NjMi5jb25uZWN0KHJpZ2h0ZmlsdGVyKVxuICBsZWZ0ZmlsdGVyLmNvbm5lY3QoY29tcHJlc3NvcilcbiAgcmlnaHRmaWx0ZXIuY29ubmVjdChjb21wcmVzc29yKVxuICBvc2MzLmNvbm5lY3QoY29tcHJlc3NvcilcbiAgbm9pc2VnYWluLmNvbm5lY3QoZGVsYXkpXG4gIG5vaXNlZ2Fpbi5jb25uZWN0KGRpc3RvcnRpb24pXG4gIGRlbGF5LmNvbm5lY3QoY29tcHJlc3NvcilcbiAgY29tcHJlc3Nvci5jb25uZWN0KGdhaW4pXG4gIGdhaW4uY29ubmVjdChkaXN0b3J0aW9uKVxuICBkaXN0b3J0aW9uLmNvbm5lY3QobWFpbmZpbHRlcilcblxuICAvLyBnb3R0YSBiZSBhIGJldHRlciB3YXkgdG8gZG8gdGhpcy4uLiBvaCB3ZWxsXG4gIGF1ZGlvTm9kZXMub3Njbm9pc2UgPSBvc2Nub2lzZVxuICBhdWRpb05vZGVzLm5vaXNlZ2FpbiA9IG5vaXNlZ2FpblxuICBhdWRpb05vZGVzLm9zYzEgPSBvc2MxXG4gIGF1ZGlvTm9kZXMub3NjMiA9IG9zYzJcbiAgYXVkaW9Ob2Rlcy5vc2MzID0gb3NjM1xuICBhdWRpb05vZGVzLmxlZnRmaWx0ZXIgPSBsZWZ0ZmlsdGVyXG4gIGF1ZGlvTm9kZXMucmlnaHRmaWx0ZXIgPSByaWdodGZpbHRlclxuICBhdWRpb05vZGVzLm1haW5maWx0ZXIgPSBtYWluZmlsdGVyXG4gIGF1ZGlvTm9kZXMuZ2FpbiA9IGdhaW5cbiAgYXVkaW9Ob2Rlcy5kZWxheSA9IGRlbGF5XG4gIGF1ZGlvTm9kZXMuZGlzdG9ydGlvbiA9IGRpc3RvcnRpb25cbiAgYXVkaW9Ob2Rlcy5jb21wcmVzc29yID0gY29tcHJlc3NvclxuXG4gIC8vIGdvc2ggaSB3aXNoIHRoZXJlIHdhcyBhbiBhdWRpb05vZGUgdGhhdCBqdXN0IGRpZCB0aGlzLi4uXG4gIGF1ZGlvTm9kZXMuc2V0dGluZ3MgPSB7XG4gICAgYXR0YWNrOiAwLjEsXG4gICAgZGVjYXk6IDAuMDUsXG4gICAgc3VzdGFpbjogMC4zLFxuICAgIHJlbGVhc2U6IDAuMSxcbiAgICBwZWFrOiAwLjUsXG4gICAgbWlkOiAwLjMsXG4gICAgZW5kOiAwLjAwMDAwMVxuICB9XG4gICAgLy8ganVzdCBsZXQgdGhlbSBidXp6IGZvcmV2ZXIsIGRlYWwgd2l0aCBcIm5vdGVzXCIgdmlhIGFkc3IgdHJpY2tzXG4gIGF1ZGlvTm9kZXMub3Njbm9pc2Uuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIGF1ZGlvTm9kZXMub3NjMS5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgYXVkaW9Ob2Rlcy5vc2MyLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLm9zYzMuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIHJldHVybiB7XG4gICAgY29ubmVjdDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAvLyAvLyB0aGlzIGZ1bmN0aW9uIHNob3VsZCBjYWxsIGBjb25uZWN0YCBvbiB5ciBvdXRwdXQgbm9kZXMgd2l0aCBgaW5wdXRgIGFzIHRoZSBhcmdcbiAgICAgIGF1ZGlvTm9kZXMubWFpbmZpbHRlci5jb25uZWN0KGlucHV0KVxuICAgIH0sXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICh3aGVuKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc3RhcnQnLCBhdWRpb05vZGVzLnNldHRpbmdzKVxuXG4gICAgICBhZHNyKGF1ZGlvTm9kZXMuZ2Fpbiwgd2hlbiwgYXVkaW9Ob2Rlcy5zZXR0aW5ncylcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdvbmUnKVxuICAgICAgdmFyIGNsb25lZCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXVkaW9Ob2Rlcy5zZXR0aW5ncykpXG4gICAgICBjbG9uZWQucGVhayAvPSAyLjBcbiAgICAgIGNsb25lZC5taWQgLz0gMi4wXG4gICAgICAvLyBjb25zb2xlLmxvZygnZGlkaXQnLCBjbG9uZWQpXG4gICAgICBhZHNyKGF1ZGlvTm9kZXMubm9pc2VnYWluLCB3aGVuLCBjbG9uZWQpXG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAod2hlbikge1xuICAgICAgYXVkaW9Ob2Rlcy5vc2Nub2lzZS5zdG9wKHdoZW4pXG4gICAgICBhdWRpb05vZGVzLm9zYzEuc3RvcCh3aGVuKVxuICAgICAgYXVkaW9Ob2Rlcy5vc2MyLnN0b3Aod2hlbilcbiAgICAgIGF1ZGlvTm9kZXMub3NjMy5zdG9wKHdoZW4pXG4gICAgICBjb25zb2xlLmxvZygnd2h5ZCB1IHB1c2ggdGhlIHBpYW5vIG9mZiB0aGUgYnVpbGRpbmc/IG5vdCBpdCBpcyBicm9rZW4sIGZvcmV2ZXIuIGdvdHRhIG1ha2UgYSBuZXcgb25lIScpXG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChvcHRzLCB3aGVuKSB7XG4gICAgICAvLyBhdmFpbGFibGUgb3B0czpcbiAgICAgIC8vIHttaWRpTm90ZTogNjIsIGF0dGFjazogLCBkZWNheTogLCBzdXN0YWluOiAsIHJlbGVhc2U6IH1cbiAgICAgIE9iamVjdC5rZXlzKG9wdHMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgdmFyIHYgPSBvcHRzW2tdXG4gICAgICAgIGlmIChrID09ICdtaWRpTm90ZScgfHwgayA9PSAnZnJlcScpIHtcbiAgICAgICAgICB2YXIgZnJlcSA9IGsgPT0gJ21pZGlOb3RlJyA/IE1JRElVdGlscy5ub3RlTnVtYmVyVG9GcmVxdWVuY3kodikgOiB2XG4gICAgICAgICAgYXVkaW9Ob2Rlcy5sZWZ0ZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICsgKE1hdGgucmFuZG9tKCkgKiAoZnJlcSAvIDIuNSkpLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMucmlnaHRmaWx0ZXIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgKyAoTWF0aC5yYW5kb20oKSAqIChmcmVxIC8gMi41KSksIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5tYWluZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICsgKE1hdGgucmFuZG9tKCkgKiAoZnJlcSAvIDMuNSkpLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMub3Njbm9pc2UuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2MxLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjMi5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zYzMuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgLyAyLjAsIHdoZW4pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8ganVzdCBhbiBBRFNSIHZhbHVlXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5zZXR0aW5nc1trXSA9IHZcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIG5vZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyByZXR1cm5zIGFuIG9iamVjdCBvZiBge3N0cmluZ0tleTogYXVkaW9Ob2RlfWAgZm9yIHJhdyBtYW5pcHVsYXRpb25cbiAgICAgIHJldHVybiBhdWRpb05vZGVzXG4gICAgfVxuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJhbmRvbWl6ZSB0aGUgb3JkZXIgb2YgdGhlIGVsZW1lbnRzIGluIGEgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBUaGUgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jb3B5XSAtIFNldHMgaWYgc2hvdWxkIHJldHVybiBhIHNodWZmbGVkIGNvcHkgb2YgdGhlIGdpdmVuIGFycmF5LiBCeSBkZWZhdWx0IGl0J3MgYSBmYWxzeSB2YWx1ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnJuZ10gLSBTcGVjaWZpZXMgYSBjdXN0b20gcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHNodWZmbGUoYXJyLCBvcHRpb25zKSB7XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NodWZmbGUgZXhwZWN0IGFuIGFycmF5IGFzIHBhcmFtZXRlci4nKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBjb2xsZWN0aW9uID0gYXJyLFxuICAgICAgbGVuID0gYXJyLmxlbmd0aCxcbiAgICAgIHJuZyA9IG9wdGlvbnMucm5nIHx8IE1hdGgucmFuZG9tLFxuICAgICAgcmFuZG9tLFxuICAgICAgdGVtcDtcblxuICBpZiAob3B0aW9ucy5jb3B5ID09PSB0cnVlKSB7XG4gICAgY29sbGVjdGlvbiA9IGFyci5zbGljZSgpO1xuICB9XG5cbiAgd2hpbGUgKGxlbikge1xuICAgIHJhbmRvbSA9IE1hdGguZmxvb3Iocm5nKCkgKiBsZW4pO1xuICAgIGxlbiAtPSAxO1xuICAgIHRlbXAgPSBjb2xsZWN0aW9uW2xlbl07XG4gICAgY29sbGVjdGlvbltsZW5dID0gY29sbGVjdGlvbltyYW5kb21dO1xuICAgIGNvbGxlY3Rpb25bcmFuZG9tXSA9IHRlbXA7XG4gIH1cblxuICByZXR1cm4gY29sbGVjdGlvbjtcbn07XG5cbi8qKlxuICogUGljayBvbmUgb3IgbW9yZSByYW5kb20gZWxlbWVudHMgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBUaGUgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnBpY2tzXSAtIFNwZWNpZmllcyBob3cgbWFueSByYW5kb20gZWxlbWVudHMgeW91IHdhbnQgdG8gcGljay4gQnkgZGVmYXVsdCBpdCBwaWNrcyAxLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucm5nXSAtIFNwZWNpZmllcyBhIGN1c3RvbSByYW5kb20gbnVtYmVyIGdlbmVyYXRvci5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbnNodWZmbGUucGljayA9IGZ1bmN0aW9uKGFyciwgb3B0aW9ucykge1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaHVmZmxlLnBpY2soKSBleHBlY3QgYW4gYXJyYXkgYXMgcGFyYW1ldGVyLicpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZyA9IG9wdGlvbnMucm5nIHx8IE1hdGgucmFuZG9tLFxuICAgICAgcGlja3MgPSBvcHRpb25zLnBpY2tzIHx8IDE7XG5cbiAgaWYgKHR5cGVvZiBwaWNrcyA9PT0gJ251bWJlcicgJiYgcGlja3MgIT09IDEpIHtcbiAgICB2YXIgbGVuID0gYXJyLmxlbmd0aCxcbiAgICAgICAgY29sbGVjdGlvbiA9IGFyci5zbGljZSgpLFxuICAgICAgICByYW5kb20gPSBbXSxcbiAgICAgICAgaW5kZXg7XG5cbiAgICB3aGlsZSAocGlja3MgJiYgbGVuKSB7XG4gICAgICBpbmRleCA9IE1hdGguZmxvb3Iocm5nKCkgKiBsZW4pO1xuICAgICAgcmFuZG9tLnB1c2goY29sbGVjdGlvbltpbmRleF0pO1xuICAgICAgY29sbGVjdGlvbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgbGVuIC09IDE7XG4gICAgICBwaWNrcyAtPSAxO1xuICAgIH1cblxuICAgIHJldHVybiByYW5kb207XG4gIH1cblxuICByZXR1cm4gYXJyW01hdGguZmxvb3Iocm5nKCkgKiBhcnIubGVuZ3RoKV07XG59O1xuXG4vKipcbiAqIEV4cG9zZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHNodWZmbGU7XG4iLCJ2YXIgbWFrZURpc3RvcnRpb25DdXJ2ZSA9IHJlcXVpcmUoJ21ha2UtZGlzdG9ydGlvbi1jdXJ2ZScpXG52YXIgTUlESVV0aWxzID0gcmVxdWlyZSgnbWlkaXV0aWxzJylcbnZhciBhZHNyID0gcmVxdWlyZSgnYS1kLXMtcicpXG4vLyB5ciBmdW5jdGlvbiBzaG91bGQgYWNjZXB0IGFuIGF1ZGlvQ29udGV4dCwgYW5kIG9wdGlvbmFsIHBhcmFtcy9vcHRzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhYywgb3B0cykge1xuICAvLyBtYWtlIHNvbWUgYXVkaW9Ob2RlcywgY29ubmVjdCB0aGVtLCBzdG9yZSB0aGVtIG9uIHRoZSBvYmplY3RcbiAgdmFyIGF1ZGlvTm9kZXMgPSB7fVxuXG4gIHZhciBvc2NpbGxhdG9yMSA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoYWMpXG4gIG9zY2lsbGF0b3IxLnR5cGUgPSAndHJpYW5nbGUnXG4gIG9zY2lsbGF0b3IxLmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcbiAgdmFyIG9zY2lsbGF0b3IyID0gYWMuY3JlYXRlT3NjaWxsYXRvcihhYylcbiAgb3NjaWxsYXRvcjIudHlwZSA9ICd0cmlhbmdsZSdcbiAgb3NjaWxsYXRvcjIuZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuICB2YXIgb3NjaWxsYXRvcjMgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKGFjKVxuICBvc2NpbGxhdG9yMy50eXBlID0gJ3Nhd3Rvb3RoJ1xuICBvc2NpbGxhdG9yMy5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG4gIHZhciBvc2NpbGxhdG9yNCA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoYWMpXG4gIG9zY2lsbGF0b3I0LnR5cGUgPSAndHJpYW5nbGUnXG4gIG9zY2lsbGF0b3I0LmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcblxuICB2YXIgb3NjaWxsYXRvcjUgPSBhYy5jcmVhdGVPc2NpbGxhdG9yKGFjKVxuICBvc2NpbGxhdG9yNS50eXBlID0gJ3NpbmUnXG4gIG9zY2lsbGF0b3I1LmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcbiAgdmFyIG9zY2lsbGF0b3I2ID0gYWMuY3JlYXRlT3NjaWxsYXRvcihhYylcbiAgb3NjaWxsYXRvcjYudHlwZSA9ICdzaW5lJ1xuICBvc2NpbGxhdG9yNi5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cblxuICB2YXIgZGVsYXlBID0gYWMuY3JlYXRlRGVsYXkoMC4wMTMyMilcblxuICB2YXIgZGVsYXlCID0gYWMuY3JlYXRlRGVsYXkoMC4wMTUyNzUyMzEzMTAzMjIyKVxuXG5cbiAgdmFyIGRlbGF5QyA9IGFjLmNyZWF0ZURlbGF5KDAuMDE3MjIyKVxuXG52YXIgZmlsdGVyQSA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5maWx0ZXJBLlEudmFsdWUgPSAxMlxuZmlsdGVyQS50eXBlID0gJ2hpZ2hwYXNzJ1xuZmlsdGVyQS5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cblxuLy8gdGhhdCBvbmUgZGlzdG9ydGlvbiBjdXJ2ZSB0aGF0IGV2ZXJ5b25lIGNvcHkgcGFzdGVzIGZyb20gc3RhY2sgb3ZlcmZsb3cgYW55d2F5c1xuXG4vLyBtYWtlIGEgZGlzdG9ydGlvbiBwZWRhbCEgeWF5IVxudmFyIGRpc3RvcnRpb25BID0gYWMuY3JlYXRlV2F2ZVNoYXBlcigpXG5kaXN0b3J0aW9uQS5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoMTAwKVxuXG52YXIgZmlsdGVyQiA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5maWx0ZXJCLlEudmFsdWUgPSAxMlxuZmlsdGVyQi50eXBlID0gJ2hpZ2hwYXNzJ1xuZmlsdGVyQi5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpXG5cbi8vIHRoYXQgb25lIGRpc3RvcnRpb24gY3VydmUgdGhhdCBldmVyeW9uZSBjb3B5IHBhc3RlcyBmcm9tIHN0YWNrIG92ZXJmbG93IGFueXdheXNcblxuLy8gbWFrZSBhIGRpc3RvcnRpb24gcGVkYWwhIHlheSFcbnZhciBkaXN0b3J0aW9uQiA9IGFjLmNyZWF0ZVdhdmVTaGFwZXIoKVxuZGlzdG9ydGlvbkIuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDEwMClcblxudmFyIGZpbHRlckMgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuZmlsdGVyQy5RLnZhbHVlID0gN1xuZmlsdGVyQy50eXBlID0gJ2xvd3Bhc3MnXG5maWx0ZXJDLmRldHVuZS52YWx1ZSA9IE1hdGgucmFuZG9tKClcblxuLy8gdGhhdCBvbmUgZGlzdG9ydGlvbiBjdXJ2ZSB0aGF0IGV2ZXJ5b25lIGNvcHkgcGFzdGVzIGZyb20gc3RhY2sgb3ZlcmZsb3cgYW55d2F5c1xuXG4vLyBtYWtlIGEgZGlzdG9ydGlvbiBwZWRhbCEgeWF5IVxudmFyIGRpc3RvcnRpb25DID0gYWMuY3JlYXRlV2F2ZVNoYXBlcigpXG5kaXN0b3J0aW9uQy5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoMTAwKVxuXG5cblxudmFyIGdhaW5BID0gYWMuY3JlYXRlR2FpbigpXG5nYWluQS5nYWluLnZhbHVlID0gMC4zMzMzMzMzMzMzMzMzMzNcbnZhciBnYWluQiA9IGFjLmNyZWF0ZUdhaW4oKVxuZ2FpbkIuZ2Fpbi52YWx1ZSA9IDAuMzMzMzMzMzMzMzMzMzMzXG52YXIgZ2FpbkMgPSBhYy5jcmVhdGVHYWluKClcbmdhaW5DLmdhaW4udmFsdWUgPSAwLjMzMzMzMzMzMzMzMzMzM1xudmFyIGdhaW5aID0gYWMuY3JlYXRlR2FpbigpXG5nYWluWi5nYWluLnZhbHVlID0gMC41XG5cblxuXG52YXIgZmlsdGVyWiA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5maWx0ZXJaLlEudmFsdWUgPSAxMlxuZmlsdGVyWi50eXBlID0gJ2hpZ2hzaGVsZidcbmZpbHRlclouZGV0dW5lLnZhbHVlID0gTWF0aC5yYW5kb20oKVxuXG4vLyB0aGF0IG9uZSBkaXN0b3J0aW9uIGN1cnZlIHRoYXQgZXZlcnlvbmUgY29weSBwYXN0ZXMgZnJvbSBzdGFjayBvdmVyZmxvdyBhbnl3YXlzXG5cbnZhciBkZWxheVogPSBhYy5jcmVhdGVEZWxheSgwLjAxMjIpXG5cbi8vIG1ha2UgYSBkaXN0b3J0aW9uIHBlZGFsISB5YXkhXG52YXIgZGlzdG9ydGlvblogPSBhYy5jcmVhdGVXYXZlU2hhcGVyKClcbmRpc3RvcnRpb25aLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSgxMDApXG5cblxuICB2YXIgdm9sdW1lID0gYWMuY3JlYXRlR2FpbigpXG4gIHZvbHVtZS5nYWluLnNldFZhbHVlQXRUaW1lKDAsIGFjLmN1cnJlbnRUaW1lKVxuXG4gIC8vICBTVEFSVCBPRiBDSEFJTiAoTk9UIE1BUktPVilcblxuICBvc2NpbGxhdG9yMS5jb25uZWN0KGRlbGF5QSlcblxuICBvc2NpbGxhdG9yNS5jb25uZWN0KGZpbHRlckEuZnJlcXVlbmN5KVxuICBvc2NpbGxhdG9yNS5jb25uZWN0KGdhaW5aLmdhaW4pXG4gIG9zY2lsbGF0b3I1LmZyZXF1ZW5jeS52YWx1ZSA9IDAuMTMzXG5cbiAgb3NjaWxsYXRvcjQuY29ubmVjdChkZWxheUIpXG4gIG9zY2lsbGF0b3I2LmNvbm5lY3QoZmlsdGVyQi5mcmVxdWVuY3kpXG4gIG9zY2lsbGF0b3I2LmNvbm5lY3QoZ2FpbkMuZ2FpbilcbiAgb3NjaWxsYXRvcjYuZnJlcXVlbmN5LnZhbHVlID0gMC4yNzNcblxuICBvc2NpbGxhdG9yMi5jb25uZWN0KGRlbGF5QylcbiAgb3NjaWxsYXRvcjMuY29ubmVjdChkZWxheUMpXG5cbiAgZGVsYXlBLmNvbm5lY3QoZmlsdGVyQSlcbiAgZGVsYXlCLmNvbm5lY3QoZmlsdGVyQilcbiAgZGVsYXlDLmNvbm5lY3QoZmlsdGVyQylcblxuICBmaWx0ZXJBLmNvbm5lY3QoZ2FpbkEpXG4gIGZpbHRlckIuY29ubmVjdChnYWluQilcbiAgZmlsdGVyQy5jb25uZWN0KGdhaW5DKVxuXG4gIG9zY2lsbGF0b3IxLmNvbm5lY3QoZ2FpbkEpXG4gIG9zY2lsbGF0b3I1LmNvbm5lY3QoZ2FpbkEpXG5cbiAgb3NjaWxsYXRvcjQuY29ubmVjdChnYWluQilcbiAgb3NjaWxsYXRvcjYuY29ubmVjdChnYWluQilcblxuICBvc2NpbGxhdG9yMi5jb25uZWN0KGdhaW5DKVxuICBvc2NpbGxhdG9yMy5jb25uZWN0KGdhaW5DKVxuXG4gIGdhaW5BLmNvbm5lY3QoZGlzdG9ydGlvbkEpXG4gIGdhaW5CLmNvbm5lY3QoZGlzdG9ydGlvbkIpXG4gIGdhaW5DLmNvbm5lY3QoZGlzdG9ydGlvbkMpXG5cbiAgZGlzdG9ydGlvbkMuY29ubmVjdChkZWxheVopXG4gIGRlbGF5Wi5jb25uZWN0KGZpbHRlclopXG4gIGRpc3RvcnRpb25DLmNvbm5lY3QoZ2FpblopXG4gIGZpbHRlclouY29ubmVjdChnYWluWilcbiAgZ2FpblouY29ubmVjdChkaXN0b3J0aW9uWilcblxuICBkaXN0b3J0aW9uQS5jb25uZWN0KHZvbHVtZSlcbiAgZGlzdG9ydGlvbkIuY29ubmVjdCh2b2x1bWUpXG4gIGRpc3RvcnRpb25aLmNvbm5lY3Qodm9sdW1lKVxuICAvLyBFTkQgT0YgQ0hBSU5cblxuICBhdWRpb05vZGVzLm9zY2lsbGF0b3IxID0gb3NjaWxsYXRvcjFcbiAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yMiA9IG9zY2lsbGF0b3IyXG4gIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjMgPSBvc2NpbGxhdG9yM1xuICBhdWRpb05vZGVzLm9zY2lsbGF0b3I0ID0gb3NjaWxsYXRvcjRcbiAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNSA9IG9zY2lsbGF0b3I1XG4gIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjYgPSBvc2NpbGxhdG9yNlxuICBhdWRpb05vZGVzLmRlbGF5QSA9IGRlbGF5QVxuICBhdWRpb05vZGVzLmRlbGF5QiA9IGRlbGF5QlxuICBhdWRpb05vZGVzLmRlbGF5QyA9IGRlbGF5Q1xuICBhdWRpb05vZGVzLmRlbGF5WiA9IGRlbGF5WlxuICBhdWRpb05vZGVzLmdhaW5BID0gZ2FpbkFcbiAgYXVkaW9Ob2Rlcy5nYWluQiA9IGdhaW5CXG4gIGF1ZGlvTm9kZXMuZ2FpbkMgPSBnYWluQ1xuICBhdWRpb05vZGVzLmZpbHRlckEgPSBmaWx0ZXJBXG4gIGF1ZGlvTm9kZXMuZmlsdGVyQiA9IGZpbHRlckJcbiAgYXVkaW9Ob2Rlcy5maWx0ZXJDID0gZmlsdGVyQ1xuICBhdWRpb05vZGVzLmZpbHRlclogPSBmaWx0ZXJaXG4gIGF1ZGlvTm9kZXMuZGlzdG9ydGlvbkEgPSBkaXN0b3J0aW9uQVxuICBhdWRpb05vZGVzLmRpc3RvcnRpb25CID0gZGlzdG9ydGlvbkJcbiAgYXVkaW9Ob2Rlcy5kaXN0b3J0aW9uQyA9IGRpc3RvcnRpb25DXG4gIGF1ZGlvTm9kZXMuZGlzdG9ydGlvblogPSBkaXN0b3J0aW9uWlxuICBhdWRpb05vZGVzLnZvbHVtZSA9IHZvbHVtZVxuICBhdWRpb05vZGVzLnNldHRpbmdzID0ge1xuICAgIGF0dGFjazogMC4wMSxcbiAgICBkZWNheTogMC4wNSxcbiAgICBzdXN0YWluOiAwLjQsXG4gICAgcmVsZWFzZTogMC4xLFxuICAgIHBlYWs6IDAuMyxcbiAgICBtaWQ6IDAuMSxcbiAgICBlbmQ6IDAuMDAwMDAwMDAwMDAwMDEgLy8gbG9sIGlkayB3dGZcbiAgfVxuXG4gIC8vIGJ6enp6elxuICBvc2NpbGxhdG9yMS5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgb3NjaWxsYXRvcjIuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIG9zY2lsbGF0b3IzLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBvc2NpbGxhdG9yNC5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgb3NjaWxsYXRvcjUuc3RhcnQoYWMuY3VycmVudFRpbWUpXG4gIG9zY2lsbGF0b3I2LnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuXG4gIHJldHVybiB7XG4gICAgY29ubmVjdDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICBhdWRpb05vZGVzLnZvbHVtZS5jb25uZWN0KGlucHV0KVxuICAgIH0sXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICh3aGVuKSB7XG4gICAgICBhZHNyKGF1ZGlvTm9kZXMudm9sdW1lLCB3aGVuLCBhdWRpb05vZGVzLnNldHRpbmdzKVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKHdoZW4pIHtcbiAgICAgIGNvbnNvbGUubG9nKCdTT01FVElNRVMgSSBET1VCVCBZUiBDT01NSVRNRU5UIDIgU1BBUktMRSBNT1RJT05cXG5wLnMuIHlyIG9zY2lsbGF0b3JzIGFyZSBkZXN0cm95ZWQsIG1ha2UgYSBuZXcgc3ludGggcGx6JylcbiAgICAgIG9zY2lsbGF0b3IxLnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3IyLnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3IzLnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3I0LnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3I1LnN0b3Aod2hlbilcbiAgICAgIG9zY2lsbGF0b3I2LnN0b3Aod2hlbilcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKG9wdHMsIHdoZW4pIHtcbiAgICAgIC8vIGF2YWlsYWJsZSBvcHRzOlxuICAgICAgLy8ge21pZGlOb3RlOiA2MiwgbGZvTDogLCBsZm9SOiAsIGZyZXEsIGF0dGFjazogLCBkZWNheTogLCBzdXN0YWluOiAsIHJlbGVhc2U6ICwgcGVhazogLCBtaWQ6fVxuICAgICAgT2JqZWN0LmtleXMob3B0cykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICB2YXIgdiA9IG9wdHNba11cbiAgICAgICAgaWYgKGsgPT0gJ21pZGlOb3RlJyB8fCBrID09ICdmcmVxJykge1xuICAgICAgICAgIHZhciBmcmVxID0gayA9PSAnbWlkaU5vdGUnID8gTUlESVV0aWxzLm5vdGVOdW1iZXJUb0ZyZXF1ZW5jeSh2KSA6IHZcblxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjEuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yMi5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLm9zY2lsbGF0b3IzLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxLCB3aGVuKVxuICAgICAgICAgIGF1ZGlvTm9kZXMub3NjaWxsYXRvcjQuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEsIHdoZW4pXG5cbiAgICAgICAgICBmaWx0ZXJBLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gKDIgKyBNYXRoLnJhbmRvbSgpKSwgd2hlbilcbiAgICAgICAgICBmaWx0ZXJCLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gKDIgKyBNYXRoLnJhbmRvbSgpKSwgd2hlbilcbiAgICAgICAgICBmaWx0ZXJDLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxIC8gKE1hdGgucmFuZG9tKCkpLCB3aGVuKVxuICAgICAgICAgIGZpbHRlclouZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgLyAoMS41ICsgTWF0aC5yYW5kb20oKSksIHdoZW4pXG5cbiAgICAgICAgfSBlbHNlIGlmIChrID09ICdsZm9MJyB8fCBrID09ICdsZm9SJykge1xuICAgICAgICAgIHZhciBub2RlID0gayA9PSAnbGZvTCcgPyBhdWRpb05vZGVzLm9zY2lsbGF0b3I1IDogYXVkaW9Ob2Rlcy5vc2NpbGxhdG9yNlxuICAgICAgICAgIG5vZGUuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKHYsIHdoZW4pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8ganVzdCBhbiBBRFNSIHZhbHVlXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5zZXR0aW5nc1trXSA9IHZcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIG5vZGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyByZXR1cm5zIGFuIG9iamVjdCBvZiBge3N0cmluZ0tleTogYXVkaW9Ob2RlfWAgZm9yIHJhdyBtYW5pcHVsYXRpb25cbiAgICAgIHJldHVybiBhdWRpb05vZGVzXG4gICAgfVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJncykge1xuICBhcmdzID0gYXJncyB8fCB7fVxuICByZXR1cm4ge1xuICAgIGJwbTogYXJncy5icG0gfHwgMTIwLFxuICAgIGFkdmFuY2VNb2Q6IGFyZ3MuYWR2YW5jZU1vZCB8fCAxLFxuICAgIF9pbnRlcnZhbDogdW5kZWZpbmVkLFxuICAgIF9jb3VudGVyOiAwLCAvLyBpbmNyZW1lbnRzIGVhY2ggbG9vcFxuICAgIF90aWNrOiAwLCAvLyBpbmNyZW1lbnRzIGVhY2ggaW50ZXJ2YWwvYmVhdFxuICAgIF9jdXJyZW50OiAwLCAvLyB3aGljaCBzZWN0aW9uIGZvciBlYWNoIGluc3QgKHZlcnNlLCBjaG9ydXMsIGV0Yy4pXG4gICAgX25leHRDdXJyZW50OiAwLCAvLyB3aGljaCBzZWN0aW9uIHdpbGwgYmUgcGxheWVkIG5leHRcbiAgICBfaW5zdHJ1bWVudHM6IFtdLCAvLyB0aGUgaW5zdHJ1bWVudHMsIGxvbFxuICAgIF9zdHJ1Y3R1cmU6IHVuZGVmaW5lZCwgLy8gaG93IHRvIGp1bXAgYmV0d2VlbiB0aGUgbGFyZ2VyIHBhdHRlcm5zXG4gICAgb25FbmQ6IHVuZGVmaW5lZCwgLy8gY2FsbGVkIHdoZW4gdGhlIHN0cnVjdHVyZSBoaXRzIGEgYG51bGxgXG4gICAgb25TZWN0aW9uU3RhcnQ6IHVuZGVmaW5lZCwgLy8gY2FsbGVkIHdoZW4gYSBwYXR0ZXJuIGJlZ2lucywgcGFzc2VkIGEgYm9vbGVhbiB0aGF0IGRlc2lnbmF0ZXMgd2hldGhlciBvciBub3QgdGhlIHNlY3Rpb24gd2lsbCB1cGRhdGUgYXQgdGhlIGVuZCBvZiB0aGUgY3VycmVudCBvbmVcbiAgICBjb21wYXJhdG9yOiBmdW5jdGlvbiAocmFuZG9tLCBwcm9iKSB7IC8vIGNhbGxlZCB0byBzZWUgaWYgYW4gaW5zdHJ1bWVudCBzaG91bGQgYmUgcGxheWVkLCBjYW4gYmUgb3ZlcndyaXR0ZW5cbiAgICAgIHJldHVybiByYW5kb20gPCBwcm9iXG4gICAgfSxcbiAgICBfcm9sbDogZnVuY3Rpb24gKHByb2IpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmF0b3IoTWF0aC5yYW5kb20oKSwgcHJvYilcbiAgICB9LFxuICAgIGJwbVRvTWlsbGlzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gNjAwMDAuMCAvIHRoaXMuYnBtXG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gbWFrZSBhIGxpc3QsIGNoZWNrIGl0IHR3aWNlLFxuICAgICAgaWYgKCF0aGlzLl9pbnN0cnVtZW50cy5sZW5ndGgpIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignbm8gZGF0YSBpcyBib3VuZCcpXG4gICAgICBpZiAoIXRoaXMuX3N0cnVjdHVyZSkgdGhyb3cgbmV3IFlvdUdvdEJpdEVycm9yKCdubyBzdHJ1Y3R1cmUgaXMgYm91bmQnKVxuICAgICAgaWYgKHRoaXMuX2ludGVydmFsKSB0aHJvdyBuZXcgWW91R290Qml0RXJyb3IoJ29vcHMgdSB0cmllZCB0byBzdGFydCBhbm90aGVyIGxvb3AsIHdheSB0byBnbyBTdGV2ZSBSZWljaCBzbWRoJylcbiAgICAgIGlmICghdGhpcy5faW5zdHJ1bWVudHMuc29tZShpbnN0cnVtZW50ID0+IGluc3RydW1lbnQubGVhZCkpIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignYSBsZWFkIGluc3RydW1lbnQgbXVzdCBiZSBib3VuZCcpXG5cbiAgICAgIC8vIG1ha2UgdGhlIGxlYWQgaW5zdHJ1bWVudCBiZSBsYXN0LCB0byBzaW1wbGlmeSBhZHZhbmNpbmcgdGhlIHNlcXVlbmNlIGxhdGVyXG4gICAgICB0aGlzLl9pbnN0cnVtZW50cy5zb3J0KChhLCBiKSA9PiBhLmxlYWQgPyAxIDogKGIubGVhZCA/IC0xIDogMCkpXG5cbiAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMuX2luc3RydW1lbnRzLmZvckVhY2goaW5zdHJ1bWVudCA9PiB7XG5cbiAgICAgICAgICAvLyBncmFiIHRoZSBjdXJyZW50IHNlY3Rpb24gZm9yIHRoaXMgaW5zdHJ1bWVudCAodmVyc2UsIGNob3J1cywgZXRjLilcbiAgICAgICAgICB2YXIgc2VjdGlvbiA9IGluc3RydW1lbnQuZGF0YVt0aGlzLl9jdXJyZW50XVxuXG4gICAgICAgICAgLy8gaWYgdGhlIHNlY3Rpb24gaGFzIGEgbW9kdWx1cyB2YWx1ZSwgc2VlIGlmIHRoaXMgaXMgaXQgaXMgb24gYmVhdFxuICAgICAgICAgIC8vIGkuZSwgbW9kIDE6IGV2ZXJ5IGJlYXQsIG1vZCAyOiBldmVyeSBvdGhlciBiZWF0XG4gICAgICAgICAgLy8gdXNlZnVsIGZvciBjcmVhdGluZyBicmVha2Rvd25zIGFuZCBiYXNzIGRyb3BzXG4gICAgICAgICAgdmFyIG1vZHVsdXMgPSAoc2VjdGlvbi5jb25maWcubW9kIHx8IDEpXG4gICAgICAgICAgdmFyIG9uSXRzQmVhdCA9IHRoaXMuX3RpY2sgJSBtb2R1bHVzID09PSAwXG4gICAgICAgICAgLy8gYWxzbyBjaGVjayBpZiB0aGUgaW5zdHJ1bWVudCB3aWxsIHBsYXkgb24gdGhlIG5leHQgdHVybiwgb3RoZXJ3aXNlIHdlIHdpbGwgZW5kIHBhdHRlcm5zIHRvbyBzb29uXG4gICAgICAgICAgdmFyIHdpbGxQbGF5T25OZXh0QmVhdCA9ICh0aGlzLl90aWNrICsgMSkgJSBtb2R1bHVzID09PSAwXG5cbiAgICAgICAgICB2YXIgd2lsbEFkdmFuY2VPbk5leHRCZWF0ID0gKHRoaXMuX2NvdW50ZXIgKyAxKSAlIHRoaXMuYWR2YW5jZU1vZCA9PT0gMFxuXG4gICAgICAgICAgaWYgKGluc3RydW1lbnQubGVhZCAmJiBvbkl0c0JlYXQgJiYgc2VjdGlvbi5fdGljayA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHdpbGxBZHZhbmNlT25OZXh0QmVhdCkgdGhpcy5fbmV4dEN1cnJlbnQgPSBwaWNrKHRoaXMuX3N0cnVjdHVyZVt0aGlzLl9jdXJyZW50XSlcbiAgICAgICAgICAgIGlmICh0aGlzLm9uU2VjdGlvblN0YXJ0KSB0aGlzLm9uU2VjdGlvblN0YXJ0KHRoaXMuX2N1cnJlbnQgIT09IHRoaXMuX25leHRDdXJyZW50KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGlmIHRoZSBzZWN0aW9uIGhhcyBhIGZpbGwsIGFuZCB0aGUgcGF0dGVybiBpcyBnb25uYSBjaGFuZ2UgbmV4dCB0dXJuXG4gICAgICAgICAgaWYgKG9uSXRzQmVhdCAmJiBzZWN0aW9uLmZpbGwgJiYgKHRoaXMuX2N1cnJlbnQgIT09IHRoaXMuX25leHRDdXJyZW50KSkge1xuICAgICAgICAgICAgIC8vIGlmIHRoZSBpbnN0cnVtZW50IGlzIG9uIGl0J3MgYmVhdCwgYW5kIHdpbnMgdGhlIGRpY2Ugcm9sbCwgcGxheSB0aGUgZmlsbFxuICAgICAgICAgICAgaWYgKG9uSXRzQmVhdCAmJiB0aGlzLl9yb2xsKHNlY3Rpb24uZmlsbC5wcm9ic1tzZWN0aW9uLl90aWNrXSkpIHtcbiAgICAgICAgICAgICAgLy8gcGxheSB0aGUgRklMTExMTExMTExMIGZvciB0aGF0IGluc3RydW1lbnQsIHBhc3NpbmcgYWxvbmcgYSByYW5kb21seSBjaG9zZW4gZGF0YSAgZm9yIHRoYXQgYmVhdCwgYWxvbmcgd2l0aCB0aGUgZW50aXJlIHNlY3Rpb24gb2JqZWN0XG4gICAgICAgICAgICAgIGluc3RydW1lbnQucGxheShwaWNrKHNlY3Rpb24uZmlsbC5kYXRhW3NlY3Rpb24uX3RpY2tdKSwgc2VjdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiB0aGUgaW5zdHJ1bWVudCBpcyBvbiBpdCdzIGJlYXQsIGFuZCB3aW5zIHRoZSBkaWNlIHJvbGxcbiAgICAgICAgICB9IGVsc2UgaWYgKG9uSXRzQmVhdCAmJiB0aGlzLl9yb2xsKHNlY3Rpb24ucHJvYnNbc2VjdGlvbi5fY3VycmVudF1bc2VjdGlvbi5fdGlja10pKSB7XG5cbiAgICAgICAgICAgIC8vIHBsYXkgdGhlIGluc3RydW1lbnQsIHBhc3NpbmcgYWxvbmcgYSByYW5kb21seSBjaG9zZW4gZGF0YSAgZm9yIHRoYXQgYmVhdCwgYWxvbmcgd2l0aCB0aGUgZW50aXJlIHNlY3Rpb24gb2JqZWN0XG4gICAgICAgICAgICBpbnN0cnVtZW50LnBsYXkocGljayhzZWN0aW9uLmRhdGFbc2VjdGlvbi5fY3VycmVudF1bc2VjdGlvbi5fdGlja10pLCBzZWN0aW9uKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGFkdmFuY2UgdGhlIGNvdW50ZXIgZm9yIHRoaXMgc2VjdGlvblxuICAgICAgICAgIGlmIChvbkl0c0JlYXQpIHNlY3Rpb24uX3RpY2srK1xuXG4gICAgICAgICAgLy8gaWYgd2UgYXJlIGF0IHRoZSBlbmQgb2YgYSBzZWN0aW9uIEFORCB0aGlzIGluc3RydW1lbnQgd2lsbCBwbGF5IG9uIHRoZSBuZXh0IGJlYXRcbiAgICAgICAgICBpZiAoc2VjdGlvbi5fdGljayA9PT0gc2VjdGlvbi5wcm9ic1tzZWN0aW9uLl9jdXJyZW50XS5sZW5ndGggJiYgd2lsbFBsYXlPbk5leHRCZWF0KSB7XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBjb3VudGVyIGZvciB0aGlzIHNlY3Rpb25cbiAgICAgICAgICAgIHNlY3Rpb24uX3RpY2sgPSAwXG5cbiAgICAgICAgICAgIC8vIHBpY2sgYSBuZXcgcGF0dGVybiB0byBwbGF5XG4gICAgICAgICAgICBzZWN0aW9uLl9jdXJyZW50ID0gcGljayhzZWN0aW9uLm5leHRzW3NlY3Rpb24uX2N1cnJlbnRdKVxuXG4gICAgICAgICAgICAvLyBpZiB0aGUgaW5zdHJ1bWVudCBpcyB0aGUgbGVhZFxuICAgICAgICAgICAgaWYgKGluc3RydW1lbnQubGVhZCkge1xuICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyKysgLy8gYWR2YW5jZSB0aGUgbG9vcCBjb3VudGVyXG5cbiAgICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSBwbGF5ZWQgdGhlIGxvb3Agc29tZSBudW1iZXIgb2YgaW5jcmVtZW50cyBvZiB0aGUgYWR2YW5jZU1vZHVsdXMuLi5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvdW50ZXIgJSB0aGlzLmFkdmFuY2VNb2QgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyAuLi4gcGljayBhIG5ldyBzZWN0aW9uIHRvIHBsYXlcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fbmV4dEN1cnJlbnRcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIGlmIHRoZSBuZXcgc2VjdGlvbiBpcyBudWxsIG9yIHNvbWUgb3RoZXIganVua1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2N1cnJlbnQgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlIGVuZCBvZiB0aGUgc29uZyEgZXJtLCB3aGF0IHRvIGRvIGhlcmU/XG4gICAgICAgICAgICAgICAgLy8gbWlnaHQgd2FudCB0byBiZSBhYmxlIHRvIGF0dGFjaCBhbiBvbkVuZCBjYWxsYmFjayB0aGluZ1xuICAgICAgICAgICAgICAgIC8vIGVzcGVjaWFsbHkgZm9yIG1lZGlhUmVjb3JkZXIuLi5cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9uRW5kKSB0aGlzLm9uRW5kKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAvLyBhZHZhbmNlIHRoZSBnbG9iYWwgY291bnRlclxuICAgICAgICB0aGlzLl90aWNrKytcbiAgICAgIH0sIHRoaXMuYnBtVG9NaWxsaXMoKSlcbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbClcbiAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbFxuICAgIH0sXG5cbiAgICBiaW5kOiBmdW5jdGlvbiAobGVhZCwgY2IsIGRhdGEpIHtcblxuICAgICAgLy8gaWYgdGhpcyBpbnN0cnVtZW50IGlzIGxhYmVsbGVkIGEgXCJsZWFkXCIgYnV0IHdlIGFscmVhZHkgaGF2ZSBhIGxlYWQsIHRoYXQncyBhIGJvby1ib29cbiAgICAgIGlmIChsZWFkICYmIHRoaXMuX2luc3RydW1lbnRzLnNvbWUoaW5zdHJ1bWVudCA9PiBpbnN0cnVtZW50LmxlYWQpKSB0aHJvdyBuZXcgWW91R290Qml0RXJyb3IoJ2EgbGVhZCBpbnN0cnVtZW50IGlzIGFscmVhZHkgYm91bmQnKVxuXG4gICAgICAvLyBjaGVjayB0byBzZWUgdGhhdCBldmVyeSBleGlzdGluZyBpbnN0cnVtZW50IGluIHRoZSBzZXF1ZW5jZXIuLi5cbiAgICAgIGlmICh0aGlzLl9pbnN0cnVtZW50cy5sZW5ndGgpIHtcblxuICAgICAgICAvLyBoYXMgdGhlIHNhbWUgbnVtYmVyIG9mIGxhcmdlciBwYXR0ZXJucyBhcyB0aGUgZGF0YSBiZWluZyBhZGRlZC4uLlxuICAgICAgICBpZiAodGhpcy5faW5zdHJ1bWVudHMuc29tZShpbnN0ID0+IGluc3QuZGF0YS5sZW5ndGggIT09IGRhdGEubGVuZ3RoKSkgdGhyb3cgbmV3IFlvdUdvdEJpdEVycm9yKCdkYXRhIGRvZXMgbm90IG1hdGNoIGV4aXN0aW5nIGRhdGEnKVxuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBhIHN0cnVjdHVyZSBib3VuZCwgLi4uXG4gICAgICBpZiAodGhpcy5fc3RydWN0dXJlKSB7XG5cbiAgICAgICAgLy8gLi4uIGNoZWNrIHRvIHNlZSB0aGF0IGl0IGhhcyBhcyBtYW55IHBhdHRlcm5zIGFzIHRoZXJlIGFyZSBpbiB0aGUgYm91bmQgZGF0YVxuICAgICAgICBpZiAodGhpcy5fc3RydWN0dXJlLmxlbmd0aCAhPT0gZGF0YS5sZW5ndGgpIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignZGF0YSBkb2VzIG5vdCBtYXRjaCBleGlzdGluZyBzdHJ1Y3R1cmUnKVxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayB0aGF0IHRoZSBkYXRhIGlzIHZhbGlkLCBub3RlL3Byb2IvbmV4dC13aXNlXG4gICAgICB2YXIgaXRJc0dvb2QgPSBkYXRhLmV2ZXJ5KChwYXR0ZXJuKSA9PiB7XG4gICAgICAgIGlmICghKHBhdHRlcm4uZGF0YS5sZW5ndGggPT09IHBhdHRlcm4ucHJvYnMubGVuZ3RoICYmIHBhdHRlcm4uZGF0YS5sZW5ndGggPT09IHBhdHRlcm4ubmV4dHMubGVuZ3RoKSkge1xuICAgICAgICAgIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignZGF0YS9wcm9icy9uZXh0cyBleHRlcm5hbCBtaXNtYXRjaCcpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdHRlcm4ubmV4dHMuc29tZShpID0+IGkgPj0gcGF0dGVybi5wcm9icy5sZW5ndGggfHwgaSA8IDApKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFlvdUdvdEJpdEVycm9yKCduZXh0cyBwb2ludHMgdG8gbm9uLWV4aXN0ZW50IHBhdHRlcm4nKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXR0ZXJuLnByb2JzLmV2ZXJ5KChsb29wLCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGxvb3AubGVuZ3RoID09PSBwYXR0ZXJuLmRhdGFbaV0ubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBpZiAoIWl0SXNHb29kKSB0aHJvdyBuZXcgWW91R290Qml0RXJyb3IoJ2RhdGEvcHJvYnMgaW50ZXJuYWwgbWlzbWF0Y2gnKVxuXG4gICAgICAvLyBhZGQgaW50ZXJuYWwgY291bnRlciB0aGluZ3MgdG8gdGhlIGJvdW5kIGRhdGFcbiAgICAgIGRhdGEgPSBkYXRhLm1hcChwYXR0ZXJuID0+IHtcbiAgICAgICAgcGF0dGVybi5fY3VycmVudCA9IDBcbiAgICAgICAgcGF0dGVybi5fdGljayA9IDBcbiAgICAgICAgcmV0dXJuIHBhdHRlcm5cbiAgICAgIH0pXG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgbWFkZSBpdCB0aGlzIGZhciwgcHVzaCBmb3J3YXJkIVxuICAgICAgdGhpcy5faW5zdHJ1bWVudHMucHVzaCh7ZGF0YTogZGF0YSwgcGxheTogY2IsIGxlYWQ6IGxlYWR9KVxuICAgIH0sXG5cbiAgICBzZXRTdHJ1Y3R1cmU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZiAodGhpcy5faW5zdHJ1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbnN0cnVtZW50c1swXS5kYXRhLmxlbmd0aCAhPT0gZGF0YS5sZW5ndGgpIHRocm93IG5ldyBZb3VHb3RCaXRFcnJvcignc3RydWN0dXJlIGRvZXMgbm90IG1hdGNoIGV4aXN0aW5nIGRhdGEnKVxuICAgICAgfVxuICAgICAgdGhpcy5fc3RydWN0dXJlID0gZGF0YVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwaWNrIChhcnIpIHtcbiAgcmV0dXJuIGFyclt+fihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldXG59XG5cbmZ1bmN0aW9uIFlvdUdvdEJpdEVycm9yIChtc2cpIHtcbiAgdGhpcy5uYW1lID0gJ1lvdUdvdEJpdEVycm9yJ1xuICB0aGlzLm1lc3NhZ2UgPSBtc2dcbn1cblxuWW91R290Qml0RXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKClcbllvdUdvdEJpdEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFlvdUdvdEJpdEVycm9yXG4iLCJ2YXIgYWRzciA9IHJlcXVpcmUoJ2EtZC1zLXInKVxudmFyIG1ha2VEaXN0b3J0aW9uQ3VydmUgPSByZXF1aXJlKCdtYWtlLWRpc3RvcnRpb24tY3VydmUnKVxuXG4vLyB5ciBmdW5jdGlvbiBzaG91bGQgYWNjZXB0IGFuIGF1ZGlvQ29udGV4dCwgYW5kIG9wdGlvbmFsIHBhcmFtcy9vcHRzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhYywgb3B0cykge1xuICAvLyBtYWtlIHNvbWUgYXVkaW9Ob2RlcywgY29ubmVjdCB0aGVtLCBzdG9yZSB0aGVtIG9uIHRoZSBvYmplY3RcbiAgdmFyIGF1ZGlvTm9kZXMgPSB7XG4gICAgb25lOiAgYWMuY3JlYXRlT3NjaWxsYXRvcigpLFxuICAgIHR3bzogIGFjLmNyZWF0ZU9zY2lsbGF0b3IoKSxcbiAgICB0aHJlZTogIGFjLmNyZWF0ZU9zY2lsbGF0b3IoKSxcbiAgICBmb3VyOiAgYWMuY3JlYXRlT3NjaWxsYXRvcigpLFxuICAgIGxmbzogYWMuY3JlYXRlT3NjaWxsYXRvcigpLFxuICAgIGZpbHRlcmxmb2dhaW46IGFjLmNyZWF0ZUdhaW4oKSxcbiAgICBwb3N0ZmlsdGVybGZvZ2FpbjogYWMuY3JlYXRlR2FpbigpLFxuICAgIHByZWdhaW46IGFjLmNyZWF0ZUdhaW4oKSxcbiAgICBwb3N0R2FpbjogYWMuY3JlYXRlR2FpbigpLFxuICAgIGZpbHRlcjogYWMuY3JlYXRlQmlxdWFkRmlsdGVyKCksXG4gICAgZGVsYXk6IGFjLmNyZWF0ZURlbGF5KDAuMDc1KSxcbiAgICBkaXN0b3J0aW9uOiBhYy5jcmVhdGVXYXZlU2hhcGVyKCksXG4gICAgcG9zdEZpbHRlcjogYWMuY3JlYXRlQmlxdWFkRmlsdGVyKCksXG4gICAgZW52ZWxvcGU6IGFjLmNyZWF0ZUdhaW4oKSxcbiAgICBzZXR0aW5nczoge1xuICAgICAgZnJlcTogNDQwLFxuICAgICAgYXR0YWNrOiAwLjA1MSxcbiAgICAgIGRlY2F5OiAwLjA1LFxuICAgICAgc3VzdGFpbjogMC4yMSxcbiAgICAgIHJlbGVhc2U6IDAuMjUsXG4gICAgICBkZXR1bmU6IDUsXG4gICAgICBwZWFrOiAwLjUsXG4gICAgICBtaWQ6IDAuMyxcbiAgICAgIGVuZDogMC4wMDAwMDFcbiAgICB9XG4gIH1cblxuICBhdWRpb05vZGVzLm9uZS50eXBlID0gJ3NxdWFyZSdcbiAgYXVkaW9Ob2Rlcy50d28udHlwZSA9ICdzYXd0b290aCdcbiAgYXVkaW9Ob2Rlcy50aHJlZS50eXBlID0gJ3NpbmUnXG4gIGF1ZGlvTm9kZXMuZm91ci50eXBlID0gJ3Nhd3Rvb3RoJ1xuXG4gIGF1ZGlvTm9kZXMub25lLmRldHVuZS5zZXRWYWx1ZUF0VGltZSgoKChNYXRoLnJhbmRvbSgpICogMikgLSAxKSAqIDEpLCBhYy5jdXJyZW50VGltZSlcbiAgYXVkaW9Ob2Rlcy50d28uZGV0dW5lLnNldFZhbHVlQXRUaW1lKCgoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpICogMiksIGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLnRocmVlLmRldHVuZS5zZXRWYWx1ZUF0VGltZSgoKChNYXRoLnJhbmRvbSgpICogMikgLSAxKSAqIDMpLCBhYy5jdXJyZW50VGltZSlcbiAgYXVkaW9Ob2Rlcy5mb3VyLmRldHVuZS5zZXRWYWx1ZUF0VGltZSgoKChNYXRoLnJhbmRvbSgpICogMikgLSAxKSAqIDMpLCBhYy5jdXJyZW50VGltZSlcblxuICBhdWRpb05vZGVzLmZpbHRlci50eXBlID0gJ2xvd3Bhc3MnXG4gIGF1ZGlvTm9kZXMucG9zdEZpbHRlci50eXBlID0gJ3BlYWtpbmcnXG5cbiAgYXVkaW9Ob2Rlcy5maWx0ZXJsZm9nYWluLmdhaW4udmFsdWUgPSAxNTA1MFxuICBhdWRpb05vZGVzLnBvc3RmaWx0ZXJsZm9nYWluLmdhaW4udmFsdWUgPSAxMDAwMFxuXG4gIGF1ZGlvTm9kZXMubGZvLmNvbm5lY3QoYXVkaW9Ob2Rlcy5maWx0ZXJsZm9nYWluKVxuICBhdWRpb05vZGVzLmxmby5jb25uZWN0KGF1ZGlvTm9kZXMucG9zdGZpbHRlcmxmb2dhaW4pXG4gIGF1ZGlvTm9kZXMuZmlsdGVybGZvZ2Fpbi5jb25uZWN0KGF1ZGlvTm9kZXMuZmlsdGVyLmZyZXF1ZW5jeSlcbiAgYXVkaW9Ob2Rlcy5wb3N0ZmlsdGVybGZvZ2Fpbi5jb25uZWN0KGF1ZGlvTm9kZXMucG9zdEZpbHRlci5mcmVxdWVuY3kpXG5cbiAgYXVkaW9Ob2Rlcy5kaXN0b3J0aW9uLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSg3NTApXG5cblxuICBhdWRpb05vZGVzLm9uZS5jb25uZWN0KGF1ZGlvTm9kZXMucHJlZ2FpbilcbiAgYXVkaW9Ob2Rlcy50d28uY29ubmVjdChhdWRpb05vZGVzLnByZWdhaW4pXG4gIGF1ZGlvTm9kZXMudGhyZWUuY29ubmVjdChhdWRpb05vZGVzLnByZWdhaW4pXG4gIGF1ZGlvTm9kZXMuZm91ci5jb25uZWN0KGF1ZGlvTm9kZXMucHJlZ2FpbilcbiAgYXVkaW9Ob2Rlcy5wcmVnYWluLmNvbm5lY3QoYXVkaW9Ob2Rlcy5maWx0ZXIpXG4gIGF1ZGlvTm9kZXMuZmlsdGVyLmNvbm5lY3QoYXVkaW9Ob2Rlcy5kZWxheSlcbiAgYXVkaW9Ob2Rlcy5kZWxheS5jb25uZWN0KGF1ZGlvTm9kZXMucG9zdEdhaW4pXG4gIGF1ZGlvTm9kZXMuZmlsdGVyLmNvbm5lY3QoYXVkaW9Ob2Rlcy5kaXN0b3J0aW9uKVxuICBhdWRpb05vZGVzLmRpc3RvcnRpb24uY29ubmVjdChhdWRpb05vZGVzLnBvc3RHYWluKVxuICBhdWRpb05vZGVzLnBvc3RHYWluLmNvbm5lY3QoYXVkaW9Ob2Rlcy5wb3N0RmlsdGVyKVxuICBhdWRpb05vZGVzLnBvc3RGaWx0ZXIuY29ubmVjdChhdWRpb05vZGVzLmVudmVsb3BlKVxuXG5cbiAgYXVkaW9Ob2Rlcy5wcmVnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMS4wIC8gMy4wLCBhYy5jdXJyZW50VGltZSlcbiAgYXVkaW9Ob2Rlcy5wb3N0R2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuNSwgYWMuY3VycmVudFRpbWUpXG4gIGF1ZGlvTm9kZXMuZW52ZWxvcGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCBhYy5jdXJyZW50VGltZSlcbiAgYXVkaW9Ob2Rlcy5sZm8uZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDEsIGFjLmN1cnJlbnRUaW1lKVxuXG4gIGF1ZGlvTm9kZXMub25lLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLnR3by5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgYXVkaW9Ob2Rlcy50aHJlZS5zdGFydChhYy5jdXJyZW50VGltZSlcbiAgYXVkaW9Ob2Rlcy5mb3VyLnN0YXJ0KGFjLmN1cnJlbnRUaW1lKVxuICBhdWRpb05vZGVzLmxmby5zdGFydChhYy5jdXJyZW50VGltZSlcblxuICByZXR1cm4ge1xuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgYXVkaW9Ob2Rlcy5lbnZlbG9wZS5jb25uZWN0KGlucHV0KVxuICAgIH0sXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICh3aGVuKSB7XG4gICAgICAvLyAvL3RoaXMgZnVuY3Rpb24gc2hvdWxkIGNhbGwgYHN0YXJ0KHdoZW4pYCBvbiB5ciBzb3VyY2Ugbm9kZXMuIFByb2JhYmx5IG9zY2lsbGF0b3JzL3NhbXBsZXJzIGkgZ3Vlc3MsIGFuZCBhbnkgTEZPIHRvbyFcbiAgICAgIGFkc3IoYXVkaW9Ob2Rlcy5lbnZlbG9wZSwgd2hlbiwgYXVkaW9Ob2Rlcy5zZXR0aW5ncylcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uICh3aGVuKSB7XG4gICAgICBhdWRpb05vZGVzLm9uZS5zdG9wKHdoZW4pXG4gICAgICBhdWRpb05vZGVzLnR3by5zdG9wKHdoZW4pXG4gICAgICBhdWRpb05vZGVzLnRocmVlLnN0b3Aod2hlbilcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKG9wdHMsIHdoZW4pIHtcbiAgICAgIE9iamVjdC5rZXlzKG9wdHMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgdmFyIHYgPSBvcHRzW2tdXG4gICAgICAgIGlmIChrID09ICdtaWRpTm90ZScgfHwgayA9PSAnZnJlcScpIHtcbiAgICAgICAgICB2YXIgZnJlcSA9IGsgPT0gJ21pZGlOb3RlJyA/IE1JRElVdGlscy5ub3RlTnVtYmVyVG9GcmVxdWVuY3kodikgOiB2XG4gICAgICAgICAgYXVkaW9Ob2Rlcy5vbmUuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgLyA0LjAsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy50d28uZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgLyAyLjAsIHdoZW4pXG4gICAgICAgICAgYXVkaW9Ob2Rlcy50aHJlZS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvIDguMCwgd2hlbilcbiAgICAgICAgICBhdWRpb05vZGVzLmZvdXIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEgLyA0LjAsIHdoZW4pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8ganVzdCBhbiBBRFNSIHZhbHVlXG4gICAgICAgICAgYXVkaW9Ob2Rlcy5zZXR0aW5nc1trXSA9IHZcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIH0sXG4gICAgbm9kZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHJldHVybnMgYW4gb2JqZWN0IG9mIGB7c3RyaW5nS2V5OiBhdWRpb05vZGV9YCBmb3IgcmF3IG1hbmlwdWxhdGlvblxuICAgICAgcmV0dXJuIGF1ZGlvTm9kZXNcbiAgICB9XG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYnBtXCI6IDYwMCxcbiAgXCJrZXlcIjoge1xuICAgIFwidG9uaWNcIjogXCJENFwiLFxuICAgIFwic2NhbGVcIjogXCJwZW50TWluXCJcbiAgfSxcbiAgXCJhZHZhbmNlTW9kXCI6IDFcbn0iLCJtb2R1bGUuZXhwb3J0cz1bXG4gIHtcbiAgICBkYXRhOiBbXG4gICAgICBbWzIsIDAsIC03XSwgWzRdLCBbMiwgMCwgN10sIFs2XSwgWzRdLCBbMiwgMCwgLTddLCBbMiwgMCwgLTddLCBbNF0sIFsyLCAwLCA3XSwgWzZdLCBbNF0sIFsyLCAwLCAtN11dLFxuICAgICAgW1stMiwgLTMsIDVdLCBbNF0sIFstMiwgLTMsIC05XSwgWzZdLCBbNF0sIFstMiwgLTMsIDVdLCBbLTIsIC0zLCA1XSwgWzRdLCBbLTIsIC0zLCAtOV0sIFs2XSwgWzRdLCBbLTIsIC0zLCA1XV0sXG4gICAgICBbWy0zLCAyLCAwLCAtMl0sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdLCBbNiwgMTNdLCBbNCwgMTFdLCBbLTMsIDIsIDAsIC0yXSwgWy0zLCAyLCAwLCAtMl0sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdLCBbNiwgMTNdLCBbNCwgMTFdLCBbLTMsIDIsIDAsIC0yXV1cbiAgICBdLFxuICAgIHByb2JzOiBbXG4gICAgICBbMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41LCAxLCAwLjI1LCAxLCAwLjc1LCAwLjc1LCAwLjVdLFxuICAgICAgWzEsIDAuMjUsIDEsIDAuNzUsIDAuNzUsIDAuNSwgMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41XSxcbiAgICAgIFsxLCAwLjUsIDEsIDAuNzUsIDEsIDAuNSwgMSwgMC41LCAxLCAwLjc1LCAxLCAwLjc1XVxuICAgIF0sXG4gICAgbmV4dHM6IFtcbiAgICAgIFswLCAwLCAxLCAxLCAyXSwgWzEsIDEsIDAsIDAsIDJdLCBbMiwgMiwgMiwgMCwgMV1cbiAgICBdLFxuICAgIGNvbmZpZzoge1xuICAgICAgbW9kOiAxXG4gICAgfVxuICB9LFxuICB7XG4gICAgZGF0YTogW1xuICAgICAgW1stMiwgMl0sIFstMiwgMl0sIFswXSwgWy0yLCAyXSxbLTIsIDJdLCBbMF0sIFswXSwgWy0yLCAyXSwgWzAsIDRdLCBbMCwgNF0sIFswXSwgWzAsIDRdLFswLCA0XSxbMF0sWzBdLCBbMCwgNF1dLFxuICAgICAgW1stMywgMV0sIFstMywgMV0sIFswXSwgWy0zLCAxXSxbLTMsIDFdLCBbMF0sIFswXSwgWy0zLCAxXSwgWzEsIDVdLCBbMSwgNV0sIFswXSwgWzEsIDVdLFsxLCA1XSxbMF0sWzBdLCBbMSwgNV1dLFxuICAgICAgW1stMywgMSwgLTIsIDIsIDQsIDVdLCBbLTMsIDEsIDEsIDUsIC02XSwgWzBdLCBbLTMsIDEsIC0yLCAyLCAtNSwgNV0sWy0zLCAxLCAxLCA1LCAtMiwgLTZdLFswXSxbMF0sIFstMywgMSwgNCwgLTZdLCBbMSwgNSwgMCwgNF0sIFsxLCA1LCAtNiwgMl0sIFswXSwgWzEsIDUsIDAsIDRdLFsxLCA1XSxbMF0sWzBdLCBbMSwgNSwgMCwgNF1dXG4gICAgXSxcbiAgICBwcm9iczogW1xuICAgICAgWzEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDEsIDEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDFdLFxuICAgICAgWzEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDEsIDEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDFdLFxuICAgICAgWzEsIDAuOTUsIDAuNSwgMSwgMC45NSwgMC41LCAwLjUsIDEsIDEsIDAuOTUsIDAuNSwgMSwgMC45NSwgMC41LCAwLjUsIDFdXG4gICAgXSxcbiAgICBuZXh0czogW1xuICAgICAgWzFdLCBbMCwgMCwgMl0sIFsyLCAyLCAwXVxuICAgIF0sXG4gICAgY29uZmlnOiB7XG4gICAgICBtb2Q6IDFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBkYXRhOiBbXG4gICAgICBbWzIsIDAsIC03XSwgWzRdLCBbMiwgMCwgN10sIFs2XSwgWzRdLCBbMiwgMCwgLTddLCBbMiwgMCwgLTddLCBbNF0sIFsyLCAwLCA3XSwgWzZdLCBbNF0sIFsyLCAwLCAtN11dLFxuICAgICAgW1stMiwgLTMsIDVdLCBbNF0sIFstMiwgLTMsIC05XSwgWzZdLCBbNF0sIFstMiwgLTMsIDVdLCBbLTIsIC0zLCA1XSwgWzRdLCBbLTIsIC0zLCAtOV0sIFs2XSwgWzRdLCBbLTIsIC0zLCA1XV0sXG4gICAgICBbWy0zLCAyLCAwLCAtMl0sIFs0LCAyXSwgWy0zLCAyLCAwLCAtMl0sIFs2LCAyXSwgWzQsIDJdLCBbLTMsIDIsIDAsIC0yXSwgWy0zLCAyLCAwLCAtMl0sIFs0LCAyXSwgWy0zLCAyLCAwLCAtMl0sIFs2LCAyXSwgWzQsIDJdLCBbLTMsIDIsIDAsIC0yXV1cbiAgICBdLFxuICAgIHByb2JzOiBbXG4gICAgICBbMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41LCAxLCAwLjI1LCAxLCAwLjc1LCAwLjc1LCAwLjVdLFxuICAgICAgWzEsIDAuMjUsIDEsIDAuNzUsIDAuNzUsIDAuNSwgMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41XSxcbiAgICAgIFsxLCAwLjUsIDEsIDAuNzUsIDEsIDAuNSwgMSwgMC41LCAxLCAwLjc1LCAxLCAwLjc1XVxuICAgIF0sXG4gICAgbmV4dHM6IFtcbiAgICAgIFswLCAwLCAxLCAxLCAyXSwgWzEsIDEsIDAsIDAsIDJdLCBbMiwgMiwgMiwgMCwgMV1cbiAgICBdLFxuICAgIGNvbmZpZzoge1xuICAgICAgbW9kOiA4XG4gICAgfVxuICB9LFxuICB7XG4gICAgZGF0YTogW1xuICAgICAgW1stMiwgMl0sIFstMiwgMl0sIFswXSwgWy0yLCAyXSxbLTIsIDJdLCBbMF0sIFswXSwgWy0yLCAyXSwgWzAsIDRdLCBbMCwgNF0sIFswXSwgWzAsIDRdLFswLCA0XSxbMF0sWzBdLCBbMCwgNF1dLFxuICAgICAgW1stMywgMV0sIFstMywgMV0sIFswXSwgWy0zLCAxXSxbLTMsIDFdLCBbMF0sIFswXSwgWy0zLCAxXSwgWzEsIDVdLCBbMSwgNV0sIFswXSwgWzEsIDVdLFsxLCA1XSxbMF0sWzBdLCBbMSwgNV1dLFxuICAgICAgW1stMywgMSwgLTIsIDIsIDQsIDVdLCBbLTMsIDEsIDEsIDUsIC02XSwgWzBdLCBbLTMsIDEsIC0yLCAyLCAtNSwgNV0sWy0zLCAxLCAxLCA1LCAtMiwgLTZdLFswXSxbMF0sIFstMywgMSwgNCwgLTZdLCBbMSwgNSwgMCwgNF0sIFsxLCA1LCAtNiwgMl0sIFswXSwgWzEsIDUsIDAsIDRdLFsxLCA1XSxbMF0sWzBdLCBbMSwgNSwgMCwgNF1dXG4gICAgXSxcbiAgICBwcm9iczogW1xuICAgICAgWzEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDEsIDEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDFdLFxuICAgICAgWzEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDEsIDEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDFdLFxuICAgICAgWzEsIDAuOTUsIDAuNSwgMSwgMC45NSwgMC41LCAwLjUsIDEsIDEsIDAuOTUsIDAuNSwgMSwgMC45NSwgMC41LCAwLjUsIDFdXG4gICAgXSxcbiAgICBuZXh0czogW1xuICAgICAgWzFdLCBbMCwgMCwgMl0sIFsyLCAyLCAwXVxuICAgIF0sXG4gICAgY29uZmlnOiB7XG4gICAgICBtb2Q6IDhcbiAgICB9XG4gIH1cbl1cbiIsIm1vZHVsZS5leHBvcnRzPVtcbiAge1xuICAgIGRhdGE6IFtcbiAgICAgIFtbMiwgMCwgLTddLCBbNF0sIFsyLCAwLCA3XSwgWzZdLCBbNF0sIFsyLCAwLCAtN10sIFsyLCAwLCAtN10sIFs0XSwgWzIsIDAsIDddLCBbNl0sIFs0XSwgWzIsIDAsIC03XV0sXG4gICAgICBbWy0yLCAtMywgNV0sIFs0XSwgWy0yLCAtMywgLTldLCBbNl0sIFs0XSwgWy0yLCAtMywgNV0sIFstMiwgLTMsIDVdLCBbNF0sIFstMiwgLTMsIC05XSwgWzZdLCBbNF0sIFstMiwgLTMsIDVdXSxcbiAgICAgIFtbLTMsIDIsIDAsIC0yXSwgWzQsIDExXSwgWy0zLCAyLCAwLCAtMl0sIFs2LCAxM10sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdLCBbLTMsIDIsIDAsIC0yXSwgWzQsIDExXSwgWy0zLCAyLCAwLCAtMl0sIFs2LCAxM10sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdXVxuICAgIF0sXG4gICAgcHJvYnM6IFtcbiAgICAgIFsxLCAwLjI1LCAxLCAwLjc1LCAwLjc1LCAwLjUsIDEsIDAuMjUsIDEsIDAuNzUsIDAuNzUsIDAuNV0sXG4gICAgICBbMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41LCAxLCAwLjI1LCAxLCAwLjc1LCAwLjc1LCAwLjVdLFxuICAgICAgWzEsIDAuNSwgMSwgMC43NSwgMSwgMC41LCAxLCAwLjUsIDEsIDAuNzUsIDEsIDAuNzVdXG4gICAgXSxcbiAgICBuZXh0czogW1xuICAgICAgWzAsIDAsIDEsIDEsIDJdLCBbMSwgMSwgMCwgMCwgMl0sIFsyLCAyLCAyLCAwLCAxXVxuICAgIF0sXG4gICAgY29uZmlnOiB7XG4gICAgICBtb2Q6IDFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBkYXRhOiBbXG4gICAgICBbWy0yLCAyXSwgWy0yLCAyXSwgWzBdLCBbLTIsIDJdLFstMiwgMl0sIFswXSwgWzBdLCBbLTIsIDJdLCBbMCwgNF0sIFswLCA0XSwgWzBdLCBbMCwgNF0sWzAsIDRdLFswXSxbMF0sIFswLCA0XV0sXG4gICAgICBbWy0zLCAxXSwgWy0zLCAxXSwgWzBdLCBbLTMsIDFdLFstMywgMV0sIFswXSwgWzBdLCBbLTMsIDFdLCBbMSwgNV0sIFsxLCA1XSwgWzBdLCBbMSwgNV0sWzEsIDVdLFswXSxbMF0sIFsxLCA1XV0sXG4gICAgICBbWy0zLCAxLCAtMiwgMiwgNCwgNV0sIFstMywgMSwgMSwgNSwgLTZdLCBbMF0sIFstMywgMSwgLTIsIDIsIC01LCA1XSxbLTMsIDEsIDEsIDUsIC0yLCAtNl0sWzBdLFswXSwgWy0zLCAxLCA0LCAtNl0sIFsxLCA1LCAwLCA0XSwgWzEsIDUsIC02LCAyXSwgWzBdLCBbMSwgNSwgMCwgNF0sWzEsIDVdLFswXSxbMF0sIFsxLCA1LCAwLCA0XV1cbiAgICBdLFxuICAgIHByb2JzOiBbXG4gICAgICBbMSwgMC44NSwgMCwgMSwgMC42NSwgMCwgMCwgMSwgMSwgMC44NSwgMCwgMSwgMC42NSwgMCwgMCwgMV0sXG4gICAgICBbMSwgMC44NSwgMCwgMSwgMC42NSwgMCwgMCwgMSwgMSwgMC44NSwgMCwgMSwgMC42NSwgMCwgMCwgMV0sXG4gICAgICBbMSwgMC45NSwgMC41LCAxLCAwLjk1LCAwLjUsIDAuNSwgMSwgMSwgMC45NSwgMC41LCAxLCAwLjk1LCAwLjUsIDAuNSwgMV1cbiAgICBdLFxuICAgIG5leHRzOiBbXG4gICAgICBbMV0sIFswLCAwLCAyXSwgWzIsIDIsIDBdXG4gICAgXSxcbiAgICBjb25maWc6IHtcbiAgICAgIG1vZDogMVxuICAgIH1cbiAgfSxcbiAge1xuICAgIGRhdGE6IFtcbiAgICAgIFtbMiwgMCwgLTddLCBbNF0sIFsyLCAwLCA3XSwgWzZdLCBbNF0sIFsyLCAwLCAtN10sIFsyLCAwLCAtN10sIFs0XSwgWzIsIDAsIDddLCBbNl0sIFs0XSwgWzIsIDAsIC03XV0sXG4gICAgICBbWy0yLCAtMywgNV0sIFs0XSwgWy0yLCAtMywgLTldLCBbNl0sIFs0XSwgWy0yLCAtMywgNV0sIFstMiwgLTMsIDVdLCBbNF0sIFstMiwgLTMsIC05XSwgWzZdLCBbNF0sIFstMiwgLTMsIDVdXSxcbiAgICAgIFtbLTMsIDIsIDAsIC0yXSwgWzQsIDExXSwgWy0zLCAyLCAwLCAtMl0sIFs2LCAxM10sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdLCBbLTMsIDIsIDAsIC0yXSwgWzQsIDExXSwgWy0zLCAyLCAwLCAtMl0sIFs2LCAxM10sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdXVxuICAgIF0sXG4gICAgcHJvYnM6IFtcbiAgICAgIFsxLCAwLjI1LCAxLCAwLjc1LCAwLjc1LCAwLjUsIDEsIDAuMjUsIDEsIDAuNzUsIDAuNzUsIDAuNV0sXG4gICAgICBbMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41LCAxLCAwLjI1LCAxLCAwLjc1LCAwLjc1LCAwLjVdLFxuICAgICAgWzEsIDAuNSwgMSwgMC43NSwgMSwgMC41LCAxLCAwLjUsIDEsIDAuNzUsIDEsIDAuNzVdXG4gICAgXSxcbiAgICBuZXh0czogW1xuICAgICAgWzAsIDAsIDEsIDEsIDJdLCBbMSwgMSwgMCwgMCwgMl0sIFsyLCAyLCAyLCAwLCAxXVxuICAgIF0sXG4gICAgY29uZmlnOiB7XG4gICAgICBtb2Q6IDFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBkYXRhOiBbXG4gICAgICBbWy0yLCAyXSwgWy0yLCAyXSwgWzBdLCBbLTIsIDJdLFstMiwgMl0sIFswXSwgWzBdLCBbLTIsIDJdLCBbMCwgNF0sIFswLCA0XSwgWzBdLCBbMCwgNF0sWzAsIDRdLFswXSxbMF0sIFswLCA0XV0sXG4gICAgICBbWy0zLCAxXSwgWy0zLCAxXSwgWzBdLCBbLTMsIDFdLFstMywgMV0sIFswXSwgWzBdLCBbLTMsIDFdLCBbMSwgNV0sIFsxLCA1XSwgWzBdLCBbMSwgNV0sWzEsIDVdLFswXSxbMF0sIFsxLCA1XV0sXG4gICAgICBbWy0zLCAxLCAtMiwgMiwgNCwgNV0sIFstMywgMSwgMSwgNSwgLTZdLCBbMF0sIFstMywgMSwgLTIsIDIsIC01LCA1XSxbLTMsIDEsIDEsIDUsIC0yLCAtNl0sWzBdLFswXSwgWy0zLCAxLCA0LCAtNl0sIFsxLCA1LCAwLCA0XSwgWzEsIDUsIC02LCAyXSwgWzBdLCBbMSwgNSwgMCwgNF0sWzEsIDVdLFswXSxbMF0sIFsxLCA1LCAwLCA0XV1cbiAgICBdLFxuICAgIHByb2JzOiBbXG4gICAgICBbMSwgMC44NSwgMCwgMSwgMC42NSwgMCwgMCwgMSwgMSwgMC44NSwgMCwgMSwgMC42NSwgMCwgMCwgMV0sXG4gICAgICBbMSwgMC44NSwgMCwgMSwgMC42NSwgMCwgMCwgMSwgMSwgMC44NSwgMCwgMSwgMC42NSwgMCwgMCwgMV0sXG4gICAgICBbMSwgMC45NSwgMC41LCAxLCAwLjk1LCAwLjUsIDAuNSwgMSwgMSwgMC45NSwgMC41LCAxLCAwLjk1LCAwLjUsIDAuNSwgMV1cbiAgICBdLFxuICAgIG5leHRzOiBbXG4gICAgICBbMV0sIFswLCAwLCAyXSwgWzIsIDIsIDBdXG4gICAgXSxcbiAgICBjb25maWc6IHtcbiAgICAgIG1vZDogMVxuICAgIH1cbiAgfVxuXVxuIiwibW9kdWxlLmV4cG9ydHM9W1xuICB7XG4gICAgZGF0YTogW1xuICAgICAgW1syLCAwLjMsIC03XSwgWzRdLCBbMiwgMC4zLCA3XSwgWzZdLCBbNF0sIFsyLCAwLjMsIC03XSwgWzIsIDAuMywgLTddLCBbNF0sIFsyLCAwLjMsIDddLCBbNl0sIFs0XSwgWzIsIDAuMywgLTddXSxcbiAgICAgIFtbLTIsIC0zLCA1XSwgWzRdLCBbLTIsIC0zLCAtOV0sIFs2XSwgWzRdLCBbLTIsIC0zLCA1XSwgWy0yLCAtMywgNV0sIFs0XSwgWy0yLCAtMywgLTldLCBbNl0sIFs0XSwgWy0yLCAtMywgNV1dLFxuICAgICAgW1stMywgMiwgMC4zLCAtMl0sIFs0LCAxMV0sIFstMywgMiwgMC4zLCAtMl0sIFs2LCAxM10sIFs0LCAxMV0sIFstMywgMiwgMC4zLCAtMl0sIFstMywgMiwgMC4zLCAtMl0sIFs0LCAxMV0sIFstMywgMiwgMC4zLCAtMl0sIFs2LCAxM10sIFs0LCAxMV0sIFstMywgMiwgMC4zLCAtMl1dXG4gICAgXSxcbiAgICBwcm9iczogW1xuICAgICAgWzEsIDAuNSwgMSwgMC43NSwgMC43NSwgMC41LCAxLCAwLjUsIDEsIDAuNzUsIDAuNzUsIDAuNV0sXG4gICAgICBbMSwgMC41LCAxLCAwLjc1LCAwLjc1LCAwLjUsIDEsIDAuNSwgMSwgMC43NSwgMC43NSwgMC41XSxcbiAgICAgIFsxLCAwLjUsIDEsIDAuNzUsIDEsIDAuNSwgMSwgMC41LCAxLCAwLjc1LCAxLCAwLjc1XVxuICAgIF0sXG4gICAgbmV4dHM6IFtcbiAgICAgIFswLjMsIDAuMywgMSwgMSwgMl0sIFsxLCAxLCAwLjMsIDAsIDJdLCBbMiwgMiwgMiwgMCwgMV1cbiAgICBdLFxuICAgIGNvbmZpZzoge1xuICAgICAgbW9kOiAxXG4gICAgfVxuICB9LFxuICB7XG4gICAgZGF0YTogW1xuICAgICAgW1stMiwgMl0sIFstMiwgMl0sIFswXSwgWy0yLCAyXSxbLTIsIDJdLCBbMF0sIFswXSwgWy0yLCAyXSwgWzAsIDRdLCBbMCwgNF0sIFswXSwgWzAsIDRdLFswLCA0XSxbMF0sWzBdLCBbMCwgNF1dLFxuICAgICAgW1stMywgMV0sIFstMywgMV0sIFswXSwgWy0zLCAxXSxbLTMsIDFdLCBbMF0sIFswXSwgWy0zLCAxXSwgWzEsIDVdLCBbMSwgNV0sIFswXSwgWzEsIDVdLFsxLCA1XSxbMF0sWzBdLCBbMSwgNV1dLFxuICAgICAgW1stMywgMSwgLTIsIDIsIDQsIDVdLCBbLTMsIDEsIDEsIDUsIC02XSwgWzBdLCBbLTMsIDEsIC0yLCAyLCAtNSwgNV0sWy0zLCAxLCAxLCA1LCAtMiwgLTZdLFswXSxbMF0sIFstMywgMSwgNCwgLTZdLCBbMSwgNSwgMCwgNF0sIFsxLCA1LCAtNiwgMl0sIFswXSwgWzEsIDUsIDAsIDRdLFsxLCA1XSxbMF0sWzBdLCBbMSwgNSwgMCwgNF1dXG4gICAgXSxcbiAgICBwcm9iczogW1xuICAgICAgWzEsIDAuODUsIDAsIDEsIDAuNjUsIDAuMywgMC4zLCAxLCAxLCAwLjg1LCAwLjMsIDEsIDAuNjUsIDAuMywgMC4zLCAxXSxcbiAgICAgIFsxLCAwLjg1LCAwLjMsIDEsIDAuNjUsIDAuMywgMC4zLCAxLCAxLCAwLjg1LCAwLjMsIDEsIDAuNjUsIDAuMywgMC4zLCAxXSxcbiAgICAgIFsxLCAwLjk1LCAwLjUsIDEsIDAuOTUsIDAuNSwgMC41LCAxLCAxLCAwLjk1LCAwLjUsIDEsIDAuOTUsIDAuNSwgMC41LCAxXVxuICAgIF0sXG4gICAgbmV4dHM6IFtcbiAgICAgIFsxXSwgWzAuMywgMC4zLCAyXSwgWzIsIDIsIDBdXG4gICAgXSxcbiAgICBjb25maWc6IHtcbiAgICAgIG1vZDogMlxuICAgIH1cbiAgfSxcbiAge1xuICAgIGRhdGE6IFtcbiAgICAgIFtbMiwgMC4zLCAtN10sIFs0XSwgWzIsIDAuMywgN10sIFs2XSwgWzRdLCBbMiwgMC4zLCAtN10sIFsyLCAwLjMsIC03XSwgWzRdLCBbMiwgMC4zLCA3XSwgWzZdLCBbNF0sIFsyLCAwLjMsIC03XV0sXG4gICAgICBbWy0yLCAtMywgNV0sIFs0XSwgWy0yLCAtMywgLTldLCBbNl0sIFs0XSwgWy0yLCAtMywgNV0sIFstMiwgLTMsIDVdLCBbNF0sIFstMiwgLTMsIC05XSwgWzZdLCBbNF0sIFstMiwgLTMsIDVdXSxcbiAgICAgIFtbLTMsIDIsIDAuMywgLTJdLCBbNCwgMl0sIFstMywgMiwgMC4zLCAtMl0sIFs2LCAyXSwgWzQsIDJdLCBbLTMsIDIsIDAuMywgLTJdLCBbLTMsIDIsIDAuMywgLTJdLCBbNCwgMl0sIFstMywgMiwgMC4zLCAtMl0sIFs2LCAyXSwgWzQsIDJdLCBbLTMsIDIsIDAuMywgLTJdXVxuICAgIF0sXG4gICAgcHJvYnM6IFtcbiAgICAgIFsxLCAwLjUsIDEsIDAuNzUsIDAuNzUsIDAuNSwgMSwgMC41LCAxLCAwLjc1LCAwLjc1LCAwLjVdLFxuICAgICAgWzEsIDAuNSwgMSwgMC43NSwgMC43NSwgMC41LCAxLCAwLjUsIDEsIDAuNzUsIDAuNzUsIDAuNV0sXG4gICAgICBbMSwgMC41LCAxLCAwLjc1LCAxLCAwLjUsIDEsIDAuNSwgMSwgMC43NSwgMSwgMC43NV1cbiAgICBdLFxuICAgIG5leHRzOiBbXG4gICAgICBbMC4zLCAwLjMsIDEsIDEsIDJdLCBbMSwgMSwgMC4zLCAwLjMsIDJdLCBbMiwgMiwgMiwgMC4zLCAxXVxuICAgIF0sXG4gICAgY29uZmlnOiB7XG4gICAgICBtb2Q6IDFcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBkYXRhOiBbXG4gICAgICBbWy0yLCAyXSwgWy0yLCAyXSwgWzBdLCBbLTIsIDJdLFstMiwgMl0sIFswXSwgWzBdLCBbLTIsIDJdLCBbMC4zLCA0XSwgWzAuMywgNF0sIFswXSwgWzAuMywgNF0sWzAuMywgNF0sWzBdLFswXSwgWzAuMywgNF1dLFxuICAgICAgW1stMywgMV0sIFstMywgMV0sIFswXSwgWy0zLCAxXSxbLTMsIDFdLCBbMF0sIFswXSwgWy0zLCAxXSwgWzEsIDVdLCBbMSwgNV0sIFswXSwgWzEsIDVdLFsxLCA1XSxbMF0sWzBdLCBbMSwgNV1dLFxuICAgICAgW1stMywgMSwgLTIsIDIsIDQsIDVdLCBbLTMsIDEsIDEsIDUsIC02XSwgWzBdLCBbLTMsIDEsIC0yLCAyLCAtNSwgNV0sWy0zLCAxLCAxLCA1LCAtMiwgLTZdLFswXSxbMF0sIFstMywgMSwgNCwgLTZdLCBbMSwgNSwgMC4zLCA0XSwgWzEsIDUsIC02LCAyXSwgWzBdLCBbMSwgNSwgMC4zLCA0XSxbMSwgNV0sWzBdLFswXSwgWzEsIDUsIDAuMywgNF1dXG4gICAgXSxcbiAgICBwcm9iczogW1xuICAgICAgWzEsIDAuODUsIDAuMywgMSwgMC42NSwgMC4zLCAwLjMsIDEsIDEsIDAuODUsIDAuMywgMSwgMC42NSwgMC4zLCAwLjMsIDFdLFxuICAgICAgWzEsIDAuODUsIDAuMywgMSwgMC42NSwgMC4zLCAwLjMsIDEsIDEsIDAuODUsIDAuMywgMSwgMC42NSwgMC4zLCAwLjMsIDFdLFxuICAgICAgWzEsIDAuOTUsIDAuNSwgMSwgMC45NSwgMC41LCAwLjUsIDEsIDEsIDAuOTUsIDAuNSwgMSwgMC45NSwgMC41LCAwLjUsIDFdXG4gICAgXSxcbiAgICBuZXh0czogW1xuICAgICAgWzFdLCBbMC4zLCAwLjMsIDJdLCBbMiwgMiwgMF1cbiAgICBdLFxuICAgIGNvbmZpZzoge1xuICAgICAgbW9kOiAyXG4gICAgfVxuICB9XG5dXG4iLCJtb2R1bGUuZXhwb3J0cz1bXG4gIHtcbiAgICBkYXRhOiBbXG4gICAgICBbWzIsIDAsIC03XSwgWzRdLCBbMiwgMCwgN10sIFs2XSwgWzRdLCBbMiwgMCwgLTddLCBbMiwgMCwgLTddLCBbNF0sIFsyLCAwLCA3XSwgWzZdLCBbNF0sIFsyLCAwLCAtN11dLFxuICAgICAgW1stMiwgLTMsIDVdLCBbNF0sIFstMiwgLTMsIC05XSwgWzZdLCBbNF0sIFstMiwgLTMsIDVdLCBbLTIsIC0zLCA1XSwgWzRdLCBbLTIsIC0zLCAtOV0sIFs2XSwgWzRdLCBbLTIsIC0zLCA1XV0sXG4gICAgICBbWy0zLCAyLCAwLCAtMl0sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdLCBbNiwgMTNdLCBbNCwgMTFdLCBbLTMsIDIsIDAsIC0yXSwgWy0zLCAyLCAwLCAtMl0sIFs0LCAxMV0sIFstMywgMiwgMCwgLTJdLCBbNiwgMTNdLCBbNCwgMTFdLCBbLTMsIDIsIDAsIC0yXV1cbiAgICBdLFxuICAgIHByb2JzOiBbXG4gICAgICBbMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41LCAxLCAwLjI1LCAxLCAwLjc1LCAwLjc1LCAwLjVdLFxuICAgICAgWzEsIDAuMjUsIDEsIDAuNzUsIDAuNzUsIDAuNSwgMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41XSxcbiAgICAgIFsxLCAwLjUsIDEsIDAuNzUsIDEsIDAuNSwgMSwgMC41LCAxLCAwLjc1LCAxLCAwLjc1XVxuICAgIF0sXG4gICAgbmV4dHM6IFtcbiAgICAgIFswLCAwLCAxLCAxLCAyXSwgWzEsIDEsIDAsIDAsIDJdLCBbMiwgMiwgMiwgMCwgMV1cbiAgICBdLFxuICAgIGNvbmZpZzoge1xuICAgICAgbW9kOiAxXG4gICAgfVxuICB9LFxuICB7XG4gICAgZGF0YTogW1xuICAgICAgW1stMiwgMl0sIFstMiwgMl0sIFswXSwgWy0yLCAyXSxbLTIsIDJdLCBbMF0sIFswXSwgWy0yLCAyXSwgWzAsIDRdLCBbMCwgNF0sIFswXSwgWzAsIDRdLFswLCA0XSxbMF0sWzBdLCBbMCwgNF1dLFxuICAgICAgW1stMywgMV0sIFstMywgMV0sIFswXSwgWy0zLCAxXSxbLTMsIDFdLCBbMF0sIFswXSwgWy0zLCAxXSwgWzEsIDVdLCBbMSwgNV0sIFswXSwgWzEsIDVdLFsxLCA1XSxbMF0sWzBdLCBbMSwgNV1dLFxuICAgICAgW1stMywgMSwgLTIsIDIsIDQsIDVdLCBbLTMsIDEsIDEsIDUsIC02XSwgWzBdLCBbLTMsIDEsIC0yLCAyLCAtNSwgNV0sWy0zLCAxLCAxLCA1LCAtMiwgLTZdLFswXSxbMF0sIFstMywgMSwgNCwgLTZdLCBbMSwgNSwgMCwgNF0sIFsxLCA1LCAtNiwgMl0sIFswXSwgWzEsIDUsIDAsIDRdLFsxLCA1XSxbMF0sWzBdLCBbMSwgNSwgMCwgNF1dXG4gICAgXSxcbiAgICBwcm9iczogW1xuICAgICAgWzEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDEsIDEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDFdLFxuICAgICAgWzEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDEsIDEsIDAuODUsIDAsIDEsIDAuNjUsIDAsIDAsIDFdLFxuICAgICAgWzEsIDAuOTUsIDAuNSwgMSwgMC45NSwgMC41LCAwLjUsIDEsIDEsIDAuOTUsIDAuNSwgMSwgMC45NSwgMC41LCAwLjUsIDFdXG4gICAgXSxcbiAgICBuZXh0czogW1xuICAgICAgWzFdLCBbMCwgMCwgMl0sIFsyLCAyLCAwXVxuICAgIF0sXG4gICAgY29uZmlnOiB7XG4gICAgICBtb2Q6IDFcbiAgICB9XG4gIH0sIFxuICB7XG4gICAgZGF0YTogW1xuICAgICAgW1syLCAwLCAtN10sIFs0XSwgWzIsIDAsIDddLCBbNl0sIFs0XSwgWzIsIDAsIC03XSwgWzIsIDAsIC03XSwgWzRdLCBbMiwgMCwgN10sIFs2XSwgWzRdLCBbMiwgMCwgLTddXSxcbiAgICAgIFtbLTIsIC0zLCA1XSwgWzRdLCBbLTIsIC0zLCAtOV0sIFs2XSwgWzRdLCBbLTIsIC0zLCA1XSwgWy0yLCAtMywgNV0sIFs0XSwgWy0yLCAtMywgLTldLCBbNl0sIFs0XSwgWy0yLCAtMywgNV1dLFxuICAgICAgW1stMywgMiwgMCwgLTJdLCBbNCwgMTFdLCBbLTMsIDIsIDAsIC0yXSwgWzYsIDEzXSwgWzQsIDExXSwgWy0zLCAyLCAwLCAtMl0sIFstMywgMiwgMCwgLTJdLCBbNCwgMTFdLCBbLTMsIDIsIDAsIC0yXSwgWzYsIDEzXSwgWzQsIDExXSwgWy0zLCAyLCAwLCAtMl1dXG4gICAgXSxcbiAgICBwcm9iczogW1xuICAgICAgWzEsIDAuMjUsIDEsIDAuNzUsIDAuNzUsIDAuNSwgMSwgMC4yNSwgMSwgMC43NSwgMC43NSwgMC41XSxcbiAgICAgIFsxLCAwLjI1LCAxLCAwLjc1LCAwLjc1LCAwLjUsIDEsIDAuMjUsIDEsIDAuNzUsIDAuNzUsIDAuNV0sXG4gICAgICBbMSwgMC41LCAxLCAwLjc1LCAxLCAwLjUsIDEsIDAuNSwgMSwgMC43NSwgMSwgMC43NV1cbiAgICBdLFxuICAgIG5leHRzOiBbXG4gICAgICBbMCwgMCwgMSwgMSwgMl0sIFsxLCAxLCAwLCAwLCAyXSwgWzIsIDIsIDIsIDAsIDFdXG4gICAgXSxcbiAgICBjb25maWc6IHtcbiAgICAgIG1vZDogMVxuICAgIH1cbiAgfSxcbiAge1xuICAgIGRhdGE6IFtcbiAgICAgIFtbLTIsIDJdLCBbLTIsIDJdLCBbMF0sIFstMiwgMl0sWy0yLCAyXSwgWzBdLCBbMF0sIFstMiwgMl0sIFswLCA0XSwgWzAsIDRdLCBbMF0sIFswLCA0XSxbMCwgNF0sWzBdLFswXSwgWzAsIDRdXSxcbiAgICAgIFtbLTMsIDFdLCBbLTMsIDFdLCBbMF0sIFstMywgMV0sWy0zLCAxXSwgWzBdLCBbMF0sIFstMywgMV0sIFsxLCA1XSwgWzEsIDVdLCBbMF0sIFsxLCA1XSxbMSwgNV0sWzBdLFswXSwgWzEsIDVdXSxcbiAgICAgIFtbLTMsIDEsIC0yLCAyLCA0LCA1XSwgWy0zLCAxLCAxLCA1LCAtNl0sIFswXSwgWy0zLCAxLCAtMiwgMiwgLTUsIDVdLFstMywgMSwgMSwgNSwgLTIsIC02XSxbMF0sWzBdLCBbLTMsIDEsIDQsIC02XSwgWzEsIDUsIDAsIDRdLCBbMSwgNSwgLTYsIDJdLCBbMF0sIFsxLCA1LCAwLCA0XSxbMSwgNV0sWzBdLFswXSwgWzEsIDUsIDAsIDRdXVxuICAgIF0sXG4gICAgcHJvYnM6IFtcbiAgICAgIFsxLCAwLjg1LCAwLCAxLCAwLjY1LCAwLCAwLCAxLCAxLCAwLjg1LCAwLCAxLCAwLjY1LCAwLCAwLCAxXSxcbiAgICAgIFsxLCAwLjg1LCAwLCAxLCAwLjY1LCAwLCAwLCAxLCAxLCAwLjg1LCAwLCAxLCAwLjY1LCAwLCAwLCAxXSxcbiAgICAgIFsxLCAwLjk1LCAwLjUsIDEsIDAuOTUsIDAuNSwgMC41LCAxLCAxLCAwLjk1LCAwLjUsIDEsIDAuOTUsIDAuNSwgMC41LCAxXVxuICAgIF0sXG4gICAgbmV4dHM6IFtcbiAgICAgIFsxXSwgWzAsIDAsIDJdLCBbMiwgMiwgMF1cbiAgICBdLFxuICAgIGNvbmZpZzoge1xuICAgICAgbW9kOiAxXG4gICAgfVxuICB9XG5dXG4iLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKVxudmFyIHNiID0gcmVxdWlyZSgnc3BpZGVyYml0ZScpXG4vLyB2YXIgbWlkaSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL21pZGktaW5wdXQnKTtcbnZhciBzaHVmZmxlID0gcmVxdWlyZSgnc2h1ZmZsZS1hcnJheScpXG4vLyBtaWRpKCk7XG5jb25maWcua2V5LnRvbmljID0gc2h1ZmZsZShbJ0EnLCAnQycsICdEJywgJ0YnLCAnRycsICdCJywgJ0UnLCAnQyMnLCAnRiMnLCAnRCMnLCAnQSMnLCAnRyMnXSlbMF0gKyAnMidcbmNvbmZpZy5rZXkuc2NhbGUgPSBzaHVmZmxlKFsnbWFqb3InLCAnbWlub3InLCAncGVudE1haicsICdwZW50TWluJywgJ2JsdWVzJ10pWzBdXG5jb25maWcuYnBtID0gfn4oTWF0aC5yYW5kb20oKSAqIDUwMCkgKyAxNTBcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5zdHJ1bWVudHMpIHtcbiAgdmFyIHNlcSA9IHNiKGNvbmZpZylcblxuXG4gdmFyIGJhc3NkYXRhID0gKHJlcXVpcmUoJy4vZGF0YS9iYXNzJykpLm1hcChmdW5jdGlvbiAoc2VjdGlvbikge1xuICBzZWN0aW9uLmRhdGEgPSBzaHVmZmxlKHNlY3Rpb24uZGF0YSkubWFwKGZ1bmN0aW9uIChkYXRhQmxvY2spIHtcbiAgICByZXR1cm4gc2h1ZmZsZShkYXRhQmxvY2spXG4gIH0pXG4gIHJldHVybiBzZWN0aW9uXG4gfSlcblxuICBzZXEuYmluZChmYWxzZSwgZnVuY3Rpb24gKGRhdGEsIHNlY3Rpb24pIHtcbiAgICBpbnN0cnVtZW50cy5iYXNzLnBsYXkoZGF0YSwgY29uZmlnLmtleSlcbiAgfSwgYmFzc2RhdGEpXG5cblxudmFyIHBlZWRhdGEgPSAocmVxdWlyZSgnLi9kYXRhL3BpYW5vJykpLm1hcChmdW5jdGlvbiAoc2VjdGlvbikge1xuICBzZWN0aW9uLmRhdGEgPSBzaHVmZmxlKHNlY3Rpb24uZGF0YSkubWFwKGZ1bmN0aW9uIChkYXRhQmxvY2spIHtcbiAgICByZXR1cm4gc2h1ZmZsZShkYXRhQmxvY2spXG4gIH0pXG4gIHNlY3Rpb24uY29uZmlnLm1vZCA9IHNodWZmbGUoWzEsIDQsIDIsIDNdKVswXVxuICByZXR1cm4gc2VjdGlvblxufSlcblxuICBzZXEuYmluZCh0cnVlLCBmdW5jdGlvbiAoZGF0YSwgc2VjdGlvbikge1xuICAgIGluc3RydW1lbnRzLnBpYW5vLnBsYXkoZGF0YSwgY29uZmlnLmtleSlcbiAgfSwgcGVlZGF0YSlcblxuXG52YXIgdm9kYXRhID0gKHJlcXVpcmUoJy4vZGF0YS92b2ljZScpKS5tYXAoZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgc2VjdGlvbi5kYXRhID0gc2h1ZmZsZShzZWN0aW9uLmRhdGEpLm1hcChmdW5jdGlvbiAoZGF0YUJsb2NrKSB7XG4gICAgcmV0dXJuIHNodWZmbGUoZGF0YUJsb2NrKVxuICB9KVxuICBzZWN0aW9uLmNvbmZpZy5tb2QgPSBzaHVmZmxlKFsxLCAyLCAzXSlbMF1cbiAgcmV0dXJuIHNlY3Rpb25cbn0pXG5cbiAgc2VxLmJpbmQoZmFsc2UsIGZ1bmN0aW9uIChkYXRhLCBzZWN0aW9uKSB7XG4gICAgaW5zdHJ1bWVudHMud2hpbnkucGxheShkYXRhLCBjb25maWcua2V5KVxuICB9LCB2b2RhdGEpXG5cblxudmFyIGd1aWRhdGEgPSAocmVxdWlyZSgnLi9kYXRhL2d1aXRhcicpKS5tYXAoZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgc2VjdGlvbi5kYXRhID0gc2h1ZmZsZShzZWN0aW9uLmRhdGEpLm1hcChmdW5jdGlvbiAoZGF0YUJsb2NrKSB7XG4gICAgcmV0dXJuIHNodWZmbGUoZGF0YUJsb2NrKVxuICB9KVxuICBzZWN0aW9uLmNvbmZpZy5tb2QgPSBzaHVmZmxlKFsxLCAyLCAzXSlbMF1cbiAgcmV0dXJuIHNlY3Rpb25cbn0pXG5cbiAgc2VxLmJpbmQoZmFsc2UsIGZ1bmN0aW9uIChkYXRhLCBzZWN0aW9uKSB7XG4gICAgaW5zdHJ1bWVudHMud2FyYmFzcy5wbGF5KGRhdGEsIGNvbmZpZy5rZXkpXG4gIH0sIGd1aWRhdGEpXG5cblxudmFyIHN0cmRhdGEgPSAocmVxdWlyZSgnLi9kYXRhL3N0cmluZ3MnKSkubWFwKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gIHNlY3Rpb24uZGF0YSA9IHNodWZmbGUoc2VjdGlvbi5kYXRhKS5tYXAoZnVuY3Rpb24gKGRhdGFCbG9jaykge1xuICAgIHJldHVybiBzaHVmZmxlKGRhdGFCbG9jaylcbiAgfSlcbiAgcmV0dXJuIHNlY3Rpb25cbn0pXG5cbiAgc2VxLmJpbmQoZmFsc2UsIGZ1bmN0aW9uIChkYXRhLCBzZWN0aW9uKSB7XG4gICAgaW5zdHJ1bWVudHMuc3BhcmtsZS5wbGF5KGRhdGEsIGNvbmZpZy5rZXkpXG4gIH0sIHN0cmRhdGEpXG5cbiAgc2VxLnNldFN0cnVjdHVyZShzaHVmZmxlKFtbMCwgMiwgMV0sIFsxLCAzLCAyXSwgWzIsIDAsIDNdLCBbMywgMSwgMF1dKSlcblxuICBcblxuICBzZXEub25TZWN0aW9uU3RhcnQgPSBmdW5jdGlvbiAodXBkYXRlKSB7XG4gICAgaWYgKHVwZGF0ZSkge1xuICAgICAgLy8gdGhlIGdsb2JhbCBjdXJyZW50IHBhdHRlcm4gdGhpbmcgaXMgZ29ubmEgY2hhbmdlIG9uIHRoZSBuZXh0IHNlY3Rpb24gc3RhcnQgeW8hXG4gICAgICAvLyB3ZSBjYW4gZmlndXJlIG91dCB3aGF0IHRoYXQgcGF0dGVybiB3aWxsIGJlIHRoYW5rcyB0byB0aGUgc2VxIHRoaW5nLiBvYmplY3QgYnJvLiBidWRkeSFcbiAgICB9IGVsc2Uge1xuICAgICAgLy8ganVzdCBncm9vdmluZy5cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2VxXG59XG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWMpIHtcbiAgLy8gVE9ETzogcHJvYmFibHkgcHV0IGEgbGlnaHQgZ2xvYmFsIHJldmVyYiBoZXJlIGFzIHdlbGwsIHllYWhcbiAgdmFyIG1haW5Wb2x1bWUgPSBhYy5jcmVhdGVHYWluKClcbiAgbWFpblZvbHVtZS5jb25uZWN0KGFjLmRlc3RpbmF0aW9uKVxuICByZXR1cm4ge1xuICAgIGFjOiBhYyxcbiAgICBtYWluVm9sdW1lOiBtYWluVm9sdW1lLFxuICAgIC8vIHJldmVyYjogcmV2ZXJiLFxuICAgIGJhc3M6IHJlcXVpcmUoJy4uL2luc3RydW1lbnRzL2Jhc3MnKShhYykuY29ubmVjdChtYWluVm9sdW1lKSxcbiAgICBwaWFubzogcmVxdWlyZSgnLi4vaW5zdHJ1bWVudHMvcGlhbm8nKShhYykuY29ubmVjdChtYWluVm9sdW1lKSxcbiAgICB3YXJiYXNzOiByZXF1aXJlKCcuLi9pbnN0cnVtZW50cy93YXJiYXNzJykoYWMpLmNvbm5lY3QobWFpblZvbHVtZSksXG4gICAgd2hpbnk6IHJlcXVpcmUoJy4uL2luc3RydW1lbnRzL3doaW55JykoYWMpLmNvbm5lY3QobWFpblZvbHVtZSksXG4gICAgc3BhcmtsZTogcmVxdWlyZSgnLi4vaW5zdHJ1bWVudHMvc3BhcmtsZScpKGFjKS5jb25uZWN0KG1haW5Wb2x1bWUpLFxuICAgIC8vIGV0Yy4gZXRjLiBldGMuIGZvcmV2ZXJcbiAgfVxufSJdfQ==
