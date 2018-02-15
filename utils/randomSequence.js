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