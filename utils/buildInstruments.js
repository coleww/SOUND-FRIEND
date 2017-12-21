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