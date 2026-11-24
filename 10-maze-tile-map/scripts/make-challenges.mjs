// Builds the teacher's examples for the 挑戰站 (bonus pages) from the finished game (starter/rescue-3.html):
//   starter/challenge-a.html     A   🧪 potion (+10 energy)
//   starter/challenge-b1.html    B-1 👻 monster that patrols
//   starter/challenge-b2.html    B-2 👻 monster that chases + 🗡️ sword
//   starter/challenge-c1.html    C-1 🌀 portals
//   starter/challenge-c2.html    C-2 ⭐ stars (the exit stays locked until you have them all)
//   starter/challenge-c3.html    C-3 🧊 ice (you keep sliding)
// Every file is a complete, playable game. Slides show these as "老師做過的範例".
// Run (repo root): node 10-maze-tile-map/scripts/make-challenges.mjs   (then `npm run test:challenges -w 10-maze-tile-map`)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'starter')
const read = n => fs.readFileSync(path.join(dir, n), 'utf8').replace(/\r\n/g, '\n').trimEnd()
const page = read('parts/page.html')
const base = read('parts/js-base.js')
const baseMaps = new Function(read('parts/maps-3.js') + '; return maps')()

function once(text, from, to) {
  if (text.split(from).length !== 2) throw new Error('patch target not found exactly once:\n' + from)
  return text.replace(from, () => to)
}
function mapsText(puts, legend) {
  const maps = baseMaps.map(r => r.slice())
  for (const [m, x, y, c] of puts) {
    const row = maps[m][y]
    if (row[x] !== '.') throw new Error(`map ${m + 1} (${x},${y}) is "${row[x]}", not floor`)
    maps[m][y] = row.slice(0, x) + c + row.slice(x + 1)
  }
  return `// ===== 地圖（資料）=====\n// 一行字是一排。${legend}\nconst maps = [\n` +
    maps.map(m => '  [\n' + m.map(r => `    "${r}",\n`).join('') + '  ],\n').join('') + '];'
}

const moveHead = `// 移動玩家：dx、dy 是這一步要走的方向（往右 1,0　往左 -1,0　往下 0,1　往上 0,-1）
function movePlayer(dx, dy) {
  const nx = px + dx;                 // 想走去的那一格
  const ny = py + dy;
  const tile = grid[ny][nx];          // 那一格是什麼字

  if (tile === "#") {                 // 牆：走不過去
    showMessage("🧱 撞到牆了");
    return;
  }
  if (tile === "D" && !hasKey) {      // 門：沒有鑰匙就走不過去
    showMessage("🔒 門鎖住了，先找鑰匙");
    return;
  }

  px = nx;                            // 走過去
  py = ny;
  energy = energy - 1;                // 每走一步少 1 點體力
  showMessage("");
`
const moveKeyDoor = `
  if (tile === "K") {                 // 鑰匙：撿起來，那一格變地板
    hasKey = true;
    grid[ny][nx] = ".";
    showMessage("🔑 拿到鑰匙了！");
  }
  if (tile === "D") {                 // 有鑰匙的門：打開，那一格變地板
    grid[ny][nx] = ".";
    showMessage("🔓 門開了！");
  }
`
const moveExit = (winLine) => `
  if (tile === "E") {                 // 走到出口：還有下一關就載入，沒有了就贏
    if (level + 1 < maps.length) {
      loadMap(level + 1);
      showMessage("🎉 過關！第 " + (level + 1) + " 關");
    } else {
      drawMap();
      updateTop();
      winText.textContent = ${winLine};
      winGame();
    }
    return;
  }
`
const moveTail = `
  drawMap();
  updateTop();
  if (energy <= 0) {                  // 體力用完：輸了
    loseGame();
  }
}`
const plainWin = '"你走出了 " + maps.length + " 座迷宮！"'

// ---------- A: potion ----------
const A = {
  maps: mapsText([[0, 9, 1, 'H'], [0, 3, 5, 'H'], [1, 6, 1, 'H'], [1, 1, 3, 'H'], [1, 8, 7, 'H'], [2, 4, 1, 'H'], [2, 2, 7, 'H'], [2, 7, 7, 'H']],
    '# 牆　. 地板　P 玩家起點　E 出口　K 鑰匙　D 門　H 藥水'),
  draw: '      if (c === "H") tile.textContent = "🧪";\n',
  move: moveHead + moveKeyDoor + `
  if (tile === "H") {                 // 藥水：喝掉，體力 +10（最多 40），那一格變地板
    energy = Math.min(maxEnergy, energy + 10);
    grid[ny][nx] = ".";
    showMessage("🧪 喝了藥水，體力 +10");
  }
` + moveExit(plainWin) + moveTail,
  vars: ['level', 'grid', 'px', 'py', 'hasKey', 'energy'],
}

// ---------- B: monsters ----------
const monsterDecls = `let monsters = [];      // 怪物：每隻有 x、y、dir（1 往右、-1 往左）
let startX = 0;         // 這一關玩家出發的位置（被怪物撞到要回來）
let startY = 0;
let hasSword = false;   // 有沒有劍
let steps = 0;          // 這一關走了幾步
`
const monsterHelpers = (chase) => `// 這一格能不能走（不是牆、不是門、沒有跑出地圖）
function canWalk(x, y) {
  const row = grid[y];
  return row !== undefined && row[x] !== undefined && row[x] !== "#" && row[x] !== "D";
}

// 這一格有沒有怪物
function monsterAt(x, y) {
  return monsters.find(function (m) { return m.x === x && m.y === y; });
}

// 玩家碰到怪物。傳回 true 代表玩家被撞到（回起點），false 代表怪物被打倒
function hitMonster(m) {
${chase ? `  if (hasSword) {                     // 有劍：打倒怪物，劍用掉
    monsters.splice(monsters.indexOf(m), 1);
    hasSword = false;
    showMessage("⚔️ 打倒怪物了！");
    return false;
  }
` : ''}  energy = Math.max(0, energy - 10);   // 被撞到：體力 -10，回到這一關的起點
  px = startX;
  py = startY;
  showMessage("👻 被怪物撞到！體力 -10，回到起點");
  return true;
}

// 每走一步，所有怪物動一下
function moveMonsters() {
${chase ? `  steps = steps + 1;
  if (steps % 2 !== 0) return;        // 怪物慢一點：玩家走兩步，怪物才走一步
  monsters.slice().forEach(function (m) {
    const sx = Math.sign(px - m.x);   // 玩家在左邊還是右邊（-1、0、1）
    const sy = Math.sign(py - m.y);   // 玩家在上面還是下面
    const tryX = [sx, 0];
    const tryY = [0, sy];
    const order = Math.abs(px - m.x) >= Math.abs(py - m.y) ? [tryX, tryY] : [tryY, tryX];
    for (const d of order) {
      if ((d[0] !== 0 || d[1] !== 0) && canWalk(m.x + d[0], m.y + d[1]) && !monsterAt(m.x + d[0], m.y + d[1])) {
        m.x = m.x + d[0];
        m.y = m.y + d[1];
        break;
      }
    }
    if (m.x === px && m.y === py && hitMonster(m)) return;
  });
` : `  monsters.slice().forEach(function (m) {
    const nx = m.x + m.dir;
    if (canWalk(nx, m.y) && !monsterAt(nx, m.y)) {
      m.x = nx;                       // 往前走一格
    } else {
      m.dir = -m.dir;                 // 走不動了：轉身
    }
    if (m.x === px && m.y === py) hitMonster(m);
  });
`}}
`
const bMove = (chase) => moveHead + `
  if (monsterAt(px, py) && hitMonster(monsterAt(px, py))) {   // 走到怪物身上
    drawMap();
    updateTop();
    if (energy <= 0) loseGame();
    return;
  }
` + moveKeyDoor + (chase ? `
  if (tile === "S") {                 // 劍：撿起來，那一格變地板
    hasSword = true;
    grid[ny][nx] = ".";
    showMessage("🗡️ 拿到劍了！撞到怪物就能打倒它");
  }
` : '') + moveExit(plainWin) + `
  moveMonsters();                     // 怪物動一下
` + moveTail
const B = (chase) => ({
  maps: mapsText([[0, 4, 5, 'M'], [1, 2, 3, 'M'], [2, 7, 7, 'M'], ...(chase ? [[0, 3, 1, 'S'], [1, 3, 1, 'S'], [2, 1, 5, 'S']] : [])],
    '# 牆　. 地板　P 玩家起點　E 出口　K 鑰匙　D 門　M 怪物' + (chase ? '　S 劍' : '')),
  decls: monsterDecls,
  init: '  monsters = [];\n  hasSword = false;\n  steps = 0;\n',
  scan: '      if (grid[y][x] === "M") {      // 怪物：記下位置，那一格變地板\n        monsters.push({ x: x, y: y, dir: 1 });\n        grid[y][x] = ".";\n      }\n',
  end: '  startX = px;\n  startY = py;\n',
  draw: '      if (monsterAt(x, y)) tile.textContent = "👻";\n' + (chase ? '      if (c === "S") tile.textContent = "🗡️";\n' : ''),
  top: chase ? '  keyStat.textContent = (hasKey ? "有" : "沒有") + (hasSword ? " 🗡️" : "");\n' : '',
  helpers: monsterHelpers(chase),
  move: bMove(chase),
  vars: ['level', 'grid', 'px', 'py', 'hasKey', 'energy', 'monsters', 'startX', 'startY', 'hasSword', 'steps'],
})

// ---------- C: portals, stars, ice ----------
const portalPuts = [[0, 1, 5, 'T'], [0, 9, 5, 'T'], [1, 3, 3, 'T'], [1, 7, 3, 'T'], [2, 1, 7, 'T'], [2, 9, 5, 'T']]
const starPuts = [[0, 9, 1, '*'], [0, 5, 2, '*'], [1, 6, 1, '*'], [1, 8, 5, '*'], [2, 4, 1, '*'], [2, 7, 3, '*']]
const icePuts = [[0, 3, 5, 'I'], [0, 4, 5, 'I'], [0, 5, 5, 'I'], [1, 2, 7, 'I'], [1, 3, 7, 'I'], [1, 4, 7, 'I'], [2, 6, 5, 'I'], [2, 7, 5, 'I'], [2, 8, 5, 'I']]
const cMove = (stars, ice) => `// 移動玩家：dx、dy 是這一步要走的方向（往右 1,0　往左 -1,0　往下 0,1　往上 0,-1）
${ice ? '// sliding 是 true，代表現在是在冰上滑，不是玩家按的\nfunction movePlayer(dx, dy, sliding) {' : 'function movePlayer(dx, dy) {'}
  const nx = px + dx;                 // 想走去的那一格
  const ny = py + dy;
  const tile = grid[ny][nx];          // 那一格是什麼字

  if (tile === "#") {                 // 牆：走不過去
${ice ? '    if (!sliding) showMessage("🧱 撞到牆了");' : '    showMessage("🧱 撞到牆了");'}
    return;
  }
  if (tile === "D" && !hasKey) {      // 門：沒有鑰匙就走不過去
${ice ? '    if (!sliding) showMessage("🔒 門鎖住了，先找鑰匙");' : '    showMessage("🔒 門鎖住了，先找鑰匙");'}
    return;
  }
${stars ? `  if (tile === "E" && starsLeft() > 0) {   // 出口：還有 ⭐ 沒拿，出不去
${ice ? '    if (!sliding) showMessage("🔒 還要拿 " + starsLeft() + " 顆 ⭐ 才能出去");' : '    showMessage("🔒 還要拿 " + starsLeft() + " 顆 ⭐ 才能出去");'}
    return;
  }
` : ''}
  px = nx;                            // 走過去
  py = ny;
${ice ? '  if (!sliding) energy = energy - 1;  // 自己走一步少 1 點體力，滑行不扣' : '  energy = energy - 1;                // 每走一步少 1 點體力'}
  showMessage("");
` + moveKeyDoor + (stars ? `
  if (tile === "*") {                 // 星星：撿起來，那一格變地板
    grid[ny][nx] = ".";
    starsGot = starsGot + 1;
    starTotal = starTotal + 1;
    showMessage("⭐ 拿到星星了！");
  }
` : '') + `
  if (tile === "T") {                 // 傳送門：跳到另一個 🌀
    const other = otherPortal();
    px = other.x;
    py = other.y;
    showMessage("🌀 傳送！");
  }
` + moveExit(stars ? '"你走出了 " + maps.length + " 座迷宮，拿了 " + starTotal + " 顆 ⭐"' : plainWin) + `
  drawMap();
  updateTop();
  if (energy <= 0) {                  // 體力用完：輸了
    loseGame();
    return;
  }
${ice ? `  if (tile === "I") {                 // 冰：不會停，往同一個方向再滑一格
    movePlayer(dx, dy, true);
  }
` : ''}}`
const portalHelpers = `// 找另一個 🌀：地圖上的 T 有兩個，傳回不是現在站的那一個
function otherPortal() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "T" && !(x === px && y === py)) return { x: x, y: y };
    }
  }
  return { x: px, y: py };
}

`
const starDecls = `let starsGot = 0;       // 這一關拿了幾顆 ⭐
let starTotal = 0;      // 這一局一共拿了幾顆 ⭐
`
const starHelpers = `// 這一關地圖上還剩幾顆 ⭐
function starsLeft() {
  let n = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "*") n = n + 1;
    }
  }
  return n;
}
`
const hudStar = `// 上面多一格 ⭐ 數量
const starNum = document.createElement("b");
const starStat = document.createElement("span");
starStat.className = "stat";
starStat.append("⭐ ", starNum);
document.querySelector(".topbar").appendChild(starStat);
`
const C = (stars, ice) => ({
  maps: mapsText([...portalPuts, ...(stars ? starPuts : []), ...(ice ? icePuts : [])],
    '# 牆　. 地板　P 玩家起點　E 出口　K 鑰匙　D 門　T 傳送門（兩個一組）' + (stars ? '　* 星星' : '') + (ice ? '　I 冰' : '')),
  decls: stars ? starDecls : '',
  init: stars ? '  starsGot = 0;\n' : '',
  draw: '      if (c === "T") tile.textContent = "🌀";\n' + (stars ? '      if (c === "*") tile.textContent = "⭐";\n' : '') +
    (ice ? '      if (c === "I") { tile.textContent = "🧊"; tile.style.background = "#4f8fb8"; }\n' : ''),
  top: stars ? '  starNum.textContent = starsGot + " / " + (starsGot + starsLeft());\n' : '',
  helpers: portalHelpers + (stars ? starHelpers : ''),
  hud: stars ? hudStar : '',
  start: stars ? '  starTotal = 0;\n' : '',
  move: cMove(stars, ice),
  vars: ['level', 'grid', 'px', 'py', 'hasKey', 'energy', ...(stars ? ['starsGot', 'starTotal'] : [])],
})

const versions = {
  'challenge-a.html': ['迷宮尋寶：挑戰 A（藥水）', A],
  'challenge-b1.html': ['迷宮尋寶：挑戰 B-1（巡邏的怪物）', B(false)],
  'challenge-b2.html': ['迷宮尋寶：挑戰 B-2（追人的怪物和劍）', B(true)],
  'challenge-c1.html': ['迷宮尋寶：挑戰 C-1（傳送門）', C(false, false)],
  'challenge-c2.html': ['迷宮尋寶：挑戰 C-2（星星鎖住出口）', C(true, false)],
  'challenge-c3.html': ['迷宮尋寶：挑戰 C-3（冰）', C(true, true)],
}
const manifest = {}
for (const [name, [title, v]] of Object.entries(versions)) {
  let js = base.replace('/*TITLE*/', title)
    .replace('/*STATUS*/', '// 老師做的挑戰範例：從「完整版」多加了一個新點子。')
    .replace('/*MAPS*/', () => v.maps)
  js = once(js, 'let playing = false;    // 遊戲正在進行嗎\n', 'let playing = false;    // 遊戲正在進行嗎\n' + (v.decls || ''))
  js = once(js, '  hasKey = false;\n  energy = maxEnergy;\n', '  hasKey = false;\n  energy = maxEnergy;\n' + (v.init || ''))
  if (v.scan) js = once(js, '      if (grid[y][x] === "P") {', v.scan + '      if (grid[y][x] === "P") {')
  if (v.end) js = once(js, '  showMessage("");\n  drawMap();\n  updateTop();\n}', v.end + '  showMessage("");\n  drawMap();\n  updateTop();\n}')
  if (v.draw) js = once(js, '      if (x === px && y === py)', v.draw + '      if (x === px && y === py)')
  if (v.top) js = once(js, '  energyText.textContent = energy;\n}', '  energyText.textContent = energy;\n' + v.top + '}')
  if (v.start) js = once(js, 'function startGame() {\n', 'function startGame() {\n' + v.start)
  if (v.hud) js = once(js, '// 載入第 n 關', v.hud + '\n// 載入第 n 關')
  js = js.replace('/*MOVE*/', () => (v.helpers ? v.helpers + '\n' : '') + v.move)
  if (/\/\*[A-Z]+\*\//.test(js)) throw new Error(name + ': placeholder left')
  fs.writeFileSync(path.join(dir, name), page.replace('/*JS*/', () => js).replace('<title>迷宮尋寶</title>', `<title>${title}</title>`) + '\n')
  manifest[name] = v.vars
  console.log(`${name}: JavaScript ${js.split('\n').length} lines`)
}
fs.writeFileSync(path.join(dir, 'challenge-vars.json'), JSON.stringify(manifest, null, 1))
