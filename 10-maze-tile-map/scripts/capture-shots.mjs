// Tests the starter and the three rescue versions by playing them, and captures REAL screenshots
// of the teacher's game for the slides (public/img/real-*.png).
// Run (repo root): npm run shots -w 10-maze-tile-map   (run `npm run starter -w 10-maze-tile-map` first)
import { chromium } from 'playwright-chromium'
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const url = n => pathToFileURL(path.join(root, 'starter', n)).href
const out = n => path.join(root, 'public', 'img', n)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 600, height: 640 }, deviceScaleFactor: 2 })
const game = page.locator('#game')
let fails = 0
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) fails++ }
const shoot = async name => { await page.mouse.move(0, 0); await page.waitForTimeout(150); await game.screenshot({ path: out(name) }) }
const text = sel => page.textContent(sel)
const pos = () => page.evaluate(() => [px, py])
const key = k => page.keyboard.press(k)
const arrows = { '1,0': 'ArrowRight', '-1,0': 'ArrowLeft', '0,1': 'ArrowDown', '0,-1': 'ArrowUp' }
const gridRows = () => page.evaluate(() => grid.map(r => r.join('')))

// shortest path (list of [dx,dy]) from `from` to the first tile whose letter is in `goals`; the door D is a wall unless needKey
const solve = (rows, goals, from, needKey) => page.evaluate(([rows, goals, from, needKey]) => {
  const q = [[from[0], from[1], []]], seen = new Set([from + ''])
  while (q.length) {
    const [x, y, path] = q.shift()
    if (goals.includes(rows[y][x])) return path
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy, c = rows[ny]?.[nx]
      if (!c || c === '#' || (c === 'D' && !needKey) || seen.has([nx, ny] + '')) continue
      seen.add([nx, ny] + ''); q.push([nx, ny, [...path, [dx, dy]]])
    }
  }
  return null
}, [rows, goals, from, needKey])
const walk = async p => { for (const [dx, dy] of p) await key(arrows[dx + ',' + dy]) }

// ---- starter: map drawn, nothing moves
await page.goto(url('maze-0.html'))
await shoot('real-start.png')
await page.click('#startBtn')
await shoot('real-starter.png')
const p0 = await pos()
await key('ArrowRight'); await key('ArrowDown'); await page.click('#btnRight')
ok(JSON.stringify(await pos()) === JSON.stringify(p0), 'starter: arrow keys and buttons do not move the player')
ok(await page.locator('.tile').count() === 99, 'starter: map 1 is drawn (11 × 9 tiles)')
ok(await page.locator('.tile.wall').count() > 40, 'starter: walls are drawn')

// ---- rescue 1: move, walls block, energy, exit wins (key and door are plain floor), 0 energy loses
await page.goto(url('rescue-1.html'))
await page.click('#startBtn')
await key('ArrowUp')
ok((await text('#message')).includes('牆') && await text('#energy') === '40', 'rescue 1: a wall blocks, no energy lost')
await shoot('real-wall.png')
await key('ArrowDown')
ok(JSON.stringify(await pos()) === '[1,2]' && await text('#energy') === '39', 'rescue 1: one step down, energy 39')
await shoot('real-step1.png')
let rows = await gridRows()
await walk(await solve(rows, ['E'], await pos(), true))   // the door is plain floor in rescue 1
ok(await page.locator('#winScreen:not(.hidden)').count() === 1, 'rescue 1: exit reached → win screen')
await page.goto(url('rescue-1.html'))
await page.click('#startBtn')
await page.evaluate(() => { energy = 2 })
await key('ArrowDown'); await key('ArrowDown')
ok(await page.locator('#loseScreen:not(.hidden)').count() === 1, 'rescue 1: energy 0 → lose screen')
await page.click('#loseScreen .againBtn')
ok(await text('#energy') === '40' && await page.locator('#loseScreen.hidden').count() === 1, 'rescue 1: replay resets energy and closes the lose screen')

// ---- rescue 2: the key opens the door
await page.goto(url('rescue-2.html'))
await page.click('#startBtn')
rows = await gridRows()
await walk(await solve(rows, ['D'], await pos(), true))    // path straight to the door, ignoring the lock
const [bx, by] = await pos()
ok((await text('#message')).includes('鎖') && (await text('#keyStat')) === '沒有', 'rescue 2: no key → "門鎖住了", the player stays in front of the door')
await shoot('real-locked.png')
await page.goto(url('rescue-2.html'))
await page.click('#startBtn')
await walk(await solve(rows, ['K'], await pos(), false))
ok((await text('#keyStat')) === '有' && (await text('#message')).includes('鑰匙'), 'rescue 2: stepping on 🔑 picks it up')
ok((await gridRows()).join('').includes('K') === false, 'rescue 2: the key tile became floor')
await shoot('real-key.png')
await walk(await solve(await gridRows(), ['D'], await pos(), true))
ok((await text('#message')).includes('門開了'), 'rescue 2: with the key the door opens')
await shoot('real-door.png')
await walk(await solve(await gridRows(), ['E'], await pos(), true))
ok(await page.locator('#winScreen:not(.hidden)').count() === 1, 'rescue 2: key → door → exit → win')

// ---- rescue 3: three maps, each solvable key → door → exit, the last exit wins
await page.goto(url('rescue-3.html'))
await shoot('real-full-start.png')
await page.click('#startBtn')
const total = await page.evaluate(() => maps.length)
ok(total === 3, 'rescue 3: three maps')
for (let n = 0; n < total; n++) {
  ok(await text('#levelNum') === String(n + 1), `rescue 3: on level ${n + 1}`)
  const toKey = await solve(await gridRows(), ['K'], await pos(), false)
  ok(toKey !== null, `map ${n + 1}: key reachable without the door (${toKey?.length} steps)`)
  if (n === 1) await shoot('real-level2.png')
  await walk(toKey)
  const toExit = await solve(await gridRows(), ['E'], await pos(), true)
  ok(toExit !== null, `map ${n + 1}: exit reachable with the key (${toExit?.length} steps)`)
  const spare = Number(await text('#energy')) - toExit.length
  ok(spare >= 5, `map ${n + 1}: ${spare} energy to spare`)
  if (n === 0) {
    await walk(toExit)
    ok(await text('#levelNum') === '2' && await text('#energy') === '40' && await text('#keyStat') === '沒有', 'exit of level 1 loads level 2 with full energy and no key')
    await shoot('real-next-level.png')
  } else {
    await walk(toExit)
  }
}
ok(await page.locator('#winScreen:not(.hidden)').count() === 1, 'rescue 3: last exit → win screen')
await shoot('real-win.png')
await page.click('#winScreen .againBtn')
ok(await text('#levelNum') === '1' && await page.locator('#winScreen.hidden').count() === 1, 'rescue 3: replay goes back to level 1')
await page.evaluate(() => { energy = 1 })
await key('ArrowDown')
await shoot('real-lose.png')
ok(await page.locator('#loseScreen:not(.hidden)').count() === 1, 'rescue 3: out of energy → lose screen')

await browser.close()
console.log(fails ? `\n${fails} FAILED` : '\nall passed')
process.exit(fails ? 1 : 0)
