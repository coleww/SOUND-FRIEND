var gimmeAHatPleaseOhDearMilliner = require('really-hi-hat')

module.exports = function (ac) {
  var hat = gimmeAHatPleaseOhDearMilliner(ac)
  // hat.update({defaults: defaults?})
  return {
    play: function (data) {
      hat.start(ac.currentTime)
    },
    connect: function (destination) {
      hat.connect(destination)
      return this
    }
  }
}
