var piano = require('pie-ano')(ac)





module.exports = function (ac) {
  return {
    play: function (data) {
      // HERE based on data, play a different sample
    },
    connect: function (destination) {
      // piano.connect(destination)
      return this
    }
  }
}
