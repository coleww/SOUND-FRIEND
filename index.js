var sb = require('spiderbite')
var shuffle = require('shuffle-array')
var makeCOnfig = require('./utils/randomKey')

var randomSequence = require('./utils/randomSequence')

function pick (arr) {
  return arr[~~(Math.random() * arr.length)]
}

function song (instruments) {
	var config = makeCOnfig()
	console.log(JSON.stringify(config, null, '\t'))
	var seq = sb(config)

	var hasLead = false

	if (Math.random() < 0.5) {
		var bassdata = [randomSequence(~~(Math.random() * 4) * pick([2, 3, 4, 3, 4, 5]))].map(function (section) {
			section.data = shuffle(section.data).map(function (dataBlock) {
				return shuffle(dataBlock)
			})
			section.config.mod = shuffle([1, 2, 3, 4])[0]
			return section
		})

		if (!hasLead) {
			bassdata.lead = true
			hasLead = true
		}
		seq.bind(false, function (data, section) {
			instruments.bass.play(data, config.key)
		}, bassdata)
	}




	if (Math.random() < 0.5) {
		var peedata = [randomSequence(~~(Math.random() * 4) * pick([2, 3, 4, 3, 4, 5]))].map(function (section) {
			section.data = shuffle(section.data).map(function (dataBlock) {
				return shuffle(dataBlock)
			})
			section.config.mod = shuffle([1, 2, 3, 4])[0]
			return section
		})
		if (!hasLead) {
			peedata.lead = true
			hasLead = true
		}

		seq.bind(true, function (data, section) {
			instruments.piano.play(data, config.key)
		}, peedata)
	}

	if (Math.random() < 0.5) {
		var vodata = [randomSequence(~~(Math.random() * 4) * pick([2, 3, 4, 3, 4, 5]))].map(function (section) {
			section.data = shuffle(section.data).map(function (dataBlock) {
				return shuffle(dataBlock)
			})
			section.config.mod = shuffle([1, 2, 3, 4])[0]
			return section
		})
		if (!hasLead) {
			vodata.lead = true
			hasLead = true
		}

		seq.bind(false, function (data, section) {
			instruments.whiny.play(data, config.key)
		}, vodata)
	}

	if (Math.random() < 0.5) {
		var guidata = [randomSequence(~~(Math.random() * 4) * pick([2, 3, 4, 3, 4, 5]))].map(function (section) {
			section.data = shuffle(section.data).map(function (dataBlock) {
				return shuffle(dataBlock)
			})
			section.config.mod = shuffle([1, 2, 3, 4])[0]
			return section
		})

		if (!hasLead) {
			guidata.lead = true
			hasLead = true
		}
		seq.bind(false, function (data, section) {
			instruments.warbass.play(data, config.key)
		}, guidata)
	}

	if (Math.random() < 0.5) {
		var strdata = [randomSequence(~~(Math.random() * 4) * pick([2, 3, 4, 3, 4, 5]))].map(function (section) {
			section.data = shuffle(section.data).map(function (dataBlock) {
				return shuffle(dataBlock)
			})

			section.config.mod = shuffle([1, 2, 3, 4])[0]
			return section
		})
		if (!hasLead) {
			strdata.lead = true
			hasLead = true
		}

		seq.bind(false, function (data, section) {
			instruments.sparkle.play(data, config.key)
		}, strdata)
	}

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