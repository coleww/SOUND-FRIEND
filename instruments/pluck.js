
var PluckStringNode = require('pluck-node')



var int2freq = require('int2freq')
module.exports = function (ac) {
  var pluck = new PluckStringNode(ac);

  return {
    play: function (data, key) {
    	pluck.color = 1000;
pluck.timeConstant = 10;
		pluck.frequency.value = int2freq(data, key)
        pluck.start(ac.currentTime)
		pluck.stop(ac.currentTime + 2);
    },
    connect: function (destination) {
      pluck.connect(destination)
      return this
    }
  }
}
