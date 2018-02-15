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