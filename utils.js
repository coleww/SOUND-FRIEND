function gimmeProbs (num) {
  var probs = []
  for (var i = 0; i < num; i++) {
    if (i % 4 === 0) {
      probs.push(1)
    } else if (i % 2 === 0) {
      probs.push((Math.random() * 0.5) + 0.5)
    } else {
      probs.push(Math.random())
    }
  }
  return probs
}