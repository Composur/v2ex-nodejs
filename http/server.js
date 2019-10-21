const http = require('http')
const port = 9000
const fs = require('fs')
const url = require('url')
const queryString = require('querystring')
const gameStart = require('./game')
let userWinCount = 0
let lastPlayAction = null
let sameActionCount = 0;
const app = http.createServer((req, res) => {
  const urlParse = url.parse(req.url)
  if (urlParse.pathname === '/favicon.ico') {
    res.writeHead(200)
    res.end()
    return
  }
  // 游戏逻辑
  if (urlParse.pathname === '/game') {
    // 用户赢超过3次退出不玩
    if (userWinCount > 3 || sameActionCount === 100) {
      res.writeHead(500);
      res.end('你太厉害了，我不玩了')
      return
    }

    // 用户连续出3次一样的action判定作弊
    if (sameActionCount >= 2) {
      res.writeHead(400);
      res.end('你作弊')
      sameActionCount = 100
      return
    }

    res.writeHead(200);

    const playAction = queryString.parse(urlParse.query)
    const action = playAction.action
    const gameResult = gameStart(action)

    if (lastPlayAction && action === lastPlayAction) {
      console.log(lastPlayAction)
      sameActionCount++;
    } else {
      sameActionCount = 0
    }
    console.log(sameActionCount)
    lastPlayAction = action

    if (gameResult === 0) {
      res.end('平局')
      userWinCount = 0
    } else if (gameResult === 1) {
      userWinCount++;
      res.end('你赢了')
    } else {
      res.end('电脑赢')
      userWinCount = 0
    }
  }
  if (urlParse.pathname === '/') {
    res.writeHead(200);
    fs.createReadStream(__dirname + '/index.html').pipe(res)
  }
})
app.listen(port, function () {
  console.log('start:' + port)
})