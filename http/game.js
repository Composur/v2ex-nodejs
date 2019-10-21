module.exports = function (userAction) {
  const { log } = console
  // 计算机随机出一个
  let random = Math.random() * 3
  let computerAction;
  const rock = 'rock', paper = 'paper', scissor = 'scissor';
  if (random < 1) {
    computerAction = rock
  } else if (random > 2) {
    computerAction = paper
  } else {
    computerAction = scissor
  }
  if (userAction === computerAction) {
    return 0
  } else if (
    (userAction === rock && computerAction == scissor) ||
    (userAction === paper && computerAction == rock) ||
    (userAction === scissor && computerAction == paper)
  ) {
    return -1
  } else {
    return 1
  }
}