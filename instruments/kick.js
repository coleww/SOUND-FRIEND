var kickMe = require('touch-down-dance')
module.exports = function (ac) {
  var kick = kickMe(ac)
  // kick.update({defaults: defaults?})
  return {
    play: function (data) {
      kick.start(ac.currentTime)
    },
    connect: function (destination) {
      kick.connect(destination)
      return this
    }
  }
}
