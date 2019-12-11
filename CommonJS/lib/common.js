// 如果没有导出 其它文件引入该文件默认是一个空对象
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
  log(`你出了${userAction}；计算机出了${computerAction}`)
  if (userAction === computerAction) {
    log('平局！！')
    return 0
  } else if (
    (userAction === rock && computerAction == scissor) ||
    (userAction === paper && computerAction == rock) ||
    (userAction === scissor && computerAction == paper)
  ) {
    log('你赢了！！')
    return -1
  } else {
    log('你输了！！')
    return 1
  }
}