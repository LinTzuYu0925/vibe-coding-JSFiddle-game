// Builds the playable game files from starter/parts/ (one shared HTML + CSS, shared JS, four versions of movePlayer).
//   starter/maze-0.html     starter fiddle (what students fork): map 1 is drawn, the player does not move
//   starter/rescue-1.html   + STEP 1 done: arrow keys move one tile, walls block, energy, exit = win, 0 energy = lose
//   starter/rescue-2.html   + STEP 2 done: key K opens door D
//   starter/rescue-3.html   + STEP 3 done: three maps, the exit loads the next map (= the finished game, also slide 2's demo)
// To make a fiddle: paste the part under "CSS 窗格" into CSS, the <div id="game"> block into HTML,
// and the part under "JavaScript 窗格" into JavaScript.
// Run (repo root): npm run starter -w 10-maze-tile-map
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'starter')
const read = n => fs.readFileSync(path.join(dir, 'parts', n), 'utf8').replace(/\r\n/g, '\n').trimEnd()
const page = read('page.html')
const base = read('js-base.js')
const make = (title, status, maps, move) =>
  base.replace('/*TITLE*/', title).replace('/*STATUS*/', status)
    .replace('/*MAPS*/', () => read(maps)).replace('/*MOVE*/', () => read(move))
const versions = {
  'maze-0.html': make('迷宮尋寶：起始遊戲', '// 現在：按「開始」會畫出地圖，但方向鍵和四個按鈕都還不能讓玩家走。\n// 還不會：走路、撞牆、撿鑰匙、開門、下一關、贏或輸。', 'maps-1.js', 'move-0.js'),
  'rescue-1.html': make('迷宮尋寶：救援 1（STEP 1 完成：走路、撞牆、體力）', '// 現在：方向鍵能走，牆擋得住，每走一步少 1 體力，走到 🏁 贏，體力 0 輸。\n// 還不會：撿鑰匙、開門、下一關。（鑰匙 🔑 和門 🚪 現在都當地板。）', 'maps-1.js', 'move-1.js'),
  'rescue-2.html': make('迷宮尋寶：救援 2（STEP 2 完成：鑰匙開門）', '// 現在：先撿 🔑 才能開 🚪，沒有鑰匙門會擋住。\n// 還不會：下一關（走到 🏁 就贏了）。', 'maps-1.js', 'move-2.js'),
  'rescue-3.html': make('迷宮尋寶：救援 3（STEP 3 完成 = 完整版：三關）', '// 完整版：三張地圖，走到 🏁 就載入下一關，第三關走到 🏁 才贏。', 'maps-3.js', 'move-3.js'),
}
for (const [name, js] of Object.entries(versions)) {
  if (/\/\*[A-Z]+\*\//.test(js)) throw new Error(`${name}: placeholder left`)
  fs.writeFileSync(path.join(dir, name), page.replace('/*JS*/', () => js) + '\n')
  console.log(`${name}: JavaScript ${js.split('\n').length} lines`)
}
