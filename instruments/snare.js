var pipFartingOnASnareDrum = require('dj-snazzy-snare')

module.exports = function (ac) {
  var snare = pipFartingOnASnareDrum(ac)
  // snare.update({defaults: defaults?})
  return {
    play: function (data) {
      snare.start(ac.currentTime)
    },
    connect: function (destination) {
      snare.connect(destination)
      return this
    }
  }
}
