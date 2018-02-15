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