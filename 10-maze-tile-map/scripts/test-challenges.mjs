// Plays the 挑戰站 examples (starter/challenge-*.html) with a search that uses the game's own movePlayer,
// checks each new rule, and captures REAL screenshots for the slides (public/img/real-c-*.png).
// Run (repo root): node 10-maze-tile-map/scripts/make-challenges.mjs && node 10-maze-tile-map/scripts/test-challenges.mjs
import { chromium } from 'playwright-chromium'
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const url = n => pathToFileURL(path.join(root, 'starter', n)).href
const out = n => path.join(root, 'public', 'img', n)
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'starter', 'challenge-vars.json'), 'utf8'))
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 600, height: 700 }, deviceScaleFactor: 2 })
const game = page.locator('#game')
let fails = 0
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) fails++ }
const shoot = async name => { await page.mouse.move(0, 0); await page.waitForTimeout(150); await game.screenshot({ path: out(name) }) }
const text = sel => page.textContent(sel)
const arrows = { '1,0': 'ArrowRight', '-1,0': 'ArrowLeft', '0,1': 'ArrowDown', '0,-1': 'ArrowUp' }
const walk = async p => { for (const [dx, dy] of p) await page.keyboard.press(arrows[dx + ',' + dy]) }

// Breadth-first search over real game states. `goal` is JS run in the page after a move; `bad` marks states to avoid.
// The search must not change the page: it saves the globals and puts them back at the end.
async function search(vars, goal, bad = 'false') {
  return page.evaluate(([vars, goal, bad]) => {
    const save = () => JSON.stringify(vars.map(v => (0, eval)(v)))
    const load = s => { const a = JSON.parse(s); new Function('a', vars.map((v, i) => `${v} = a[${i}];`).join(''))(a) }
    const real = { drawMap, updateTop, showMessage, winGame, loseGame }
    let msg = '', won = false, lost = false
    drawMap = () => {}; updateTop = () => {}; showMessage = t => { msg = t }
    winGame = () => { won = true }; loseGame = () => { lost = true }
    const start = save()
    const startLevel = level
    const isGoal = new Function('msg', 'won', 'startLevel', 'lost', `return (${goal})`)
    const isBad = new Function('msg', 'won', 'lost', `return (${bad})`)
    const q = [[start, []]], seen = new Set([start])
    let found = null
    while (q.length && !found) {
      const [s, p] = q.shift()
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        load(s); msg = ''; won = false; lost = false
        window.__x0 = px; window.__y0 = py
        movePlayer(dx, dy)
        if (isBad(msg, won, lost)) continue
        const np = [...p, [dx, dy]]
        if (isGoal(msg, won, startLevel, lost)) { found = np; break }
        if (lost) continue
        const ns = save()
        if (!seen.has(ns)) { seen.add(ns); q.push([ns, np]) }
      }
    }
    load(start)
    ;({ drawMap, updateTop, showMessage, winGame, loseGame } = real)
    return found
  }, [vars, goal, bad])
}
const open = async name => { await page.goto(url(name)); await page.click('#startBtn') }
// walk through every level; returns steps used per level
async function playAll(vars, bad) {
  const total = await page.evaluate(() => maps.length)
  const lens = []
  for (let n = 0; n < total; n++) {
    const p = await search(vars, n === total - 1 ? 'won' : 'level > startLevel', bad)
    if (!p) { lens.push(null); return lens }
    lens.push(p.length)
    await walk(p)
  }
  return lens
}

// ---------- A: potion ----------
{
  const name = 'challenge-a.html', vars = manifest[name]
  await open(name)
  ok(await page.locator('.tile').count() === 99, 'A: map drawn')
  const p = await search(vars, 'msg.includes("藥水")')
  ok(p !== null, `A: a potion can be reached (${p?.length} steps)`)
  const e0 = Number(await text('#energy'))
  await walk(p)
  const e1 = Number(await text('#energy'))
  ok(e1 === Math.min(40, e0 - p.length + 10), `A: potion gives +10 (energy ${e0} → ${e1} after ${p.length} steps)`)
  ok((await text('#message')).includes('藥水'), 'A: message says the potion was used')
  await shoot('real-c-potion.png')
  ok(await page.locator('.tile', { hasText: '🧪' }).count() >= 1, 'A: other potions still on the map')
  await open(name)
  const lens = await playAll(vars)
  ok(lens.length === 3 && lens.every(Boolean), `A: all 3 maps solvable (${lens})`)
  ok(await page.locator('#winScreen:not(.hidden)').count() === 1, 'A: win screen')
}

// ---------- B-1: patrol ----------
{
  const name = 'challenge-b1.html', vars = manifest[name]
  await open(name)
  ok(await page.evaluate(() => monsters.length) === 1, 'B-1: one monster on map 1')
  const m0 = await page.evaluate(() => monsters[0].x)
  await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowUp')
  const m2 = await page.evaluate(() => monsters[0].x)
  ok(m2 !== m0, `B-1: the monster moves after each step (x ${m0} → ${m2})`)
  await open(name)
  const hit = await search(vars, 'msg.includes("被怪物撞到")')
  ok(hit !== null, `B-1: the monster can be touched (${hit?.length} steps)`)
  await walk(hit)
  ok(await page.evaluate(() => px === startX && py === startY), 'B-1: touching sends the player back to the start')
  ok(Number(await text('#energy')) <= 40 - 10 - 0, `B-1: touching costs 10 energy (energy ${await text('#energy')})`)
  await shoot('real-c-monster-hit.png')
  await open(name)
  await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowDown')
  await shoot('real-c-monster.png')
  await open(name)
  const lens = await playAll(vars, 'msg.includes("被怪物撞到")')
  ok(lens.length === 3 && lens.every(Boolean), `B-1: all 3 maps solvable without being hit (${lens})`)
  ok(await page.locator('#winScreen:not(.hidden)').count() === 1, 'B-1: win screen')
}

// ---------- B-2: chase + sword ----------
{
  const name = 'challenge-b2.html', vars = manifest[name]
  await open(name)
  const sw = await search(vars, 'hasSword')
  ok(sw !== null, `B-2: the sword can be reached (${sw?.length} steps)`)
  await walk(sw)
  ok((await text('#keyStat')).includes('🗡️'), 'B-2: the top bar shows the sword')
  await shoot('real-c-sword.png')
  const kill = await search(vars, 'msg.includes("打倒")')
  ok(kill !== null, `B-2: with the sword the monster can be beaten (${kill?.length} steps)`)
  await walk(kill)
  ok(await page.evaluate(() => monsters.length === 0 && !hasSword), 'B-2: monster gone, sword used up')
  await shoot('real-c-monster-dead.png')
  await open(name)
  const chase = await page.evaluate(() => [monsters[0].x, monsters[0].y])
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowLeft')
  const after = await page.evaluate(() => [monsters[0].x, monsters[0].y])
  ok(JSON.stringify(chase) !== JSON.stringify(after), `B-2: the monster walks toward the player (${chase} → ${after})`)
  await open(name)
  const lens = await playAll(vars, 'msg.includes("被怪物撞到")')
  ok(lens.length === 3 && lens.every(Boolean), `B-2: all 3 maps solvable without being hit (${lens})`)
  ok(await page.locator('#winScreen:not(.hidden)').count() === 1, 'B-2: win screen')
}

// ---------- C-1: portal ----------
{
  const name = 'challenge-c1.html', vars = manifest[name]
  await open(name)
  const t = await search(vars, 'msg.includes("傳送")')
  ok(t !== null, `C-1: a portal can be used (${t?.length} steps)`)
  const before = await page.evaluate(() => [px, py])
  await walk(t)
  const after = await page.evaluate(() => [px, py])
  ok(await page.evaluate(() => grid[py][px] === 'T') && JSON.stringify(before) !== JSON.stringify(after), `C-1: teleported ${before} → ${after}`)
  await shoot('real-c-portal.png')
  await open(name)
  const lens = await playAll(vars)
  ok(lens.length === 3 && lens.every(Boolean), `C-1: all 3 maps solvable (${lens})`)
}

// ---------- C-2: stars ----------
{
  const name = 'challenge-c2.html', vars = manifest[name]
  await open(name)
  const locked = await search(vars, 'msg.includes("才能出去")')
  ok(locked !== null, `C-2: the exit is locked while stars are left (${locked?.length} steps)`)
  await walk(locked)
  ok(await page.evaluate(() => grid[py][px] !== 'E'), 'C-2: the player did not step onto the locked exit')
  await shoot('real-c-locked-exit.png')
  const star = await search(vars, 'msg.includes("拿到星星")')
  await walk(star)
  ok((await text('#message')).includes('星星') && (await page.locator('.topbar').innerText()).includes('1 /'), 'C-2: picking a star updates the counter')
  await open(name)
  const lens = await playAll(vars)
  ok(lens.length === 3 && lens.every(Boolean), `C-2: all 3 maps solvable (${lens})`)
  ok((await text('#winText')).includes('⭐'), `C-2: win text counts stars: ${await text('#winText')}`)
  await shoot('real-c-star-win.png')
}

// ---------- C-3: ice ----------
{
  const name = 'challenge-c3.html', vars = manifest[name]
  await open(name)
  const s = await search(vars, 'Math.abs(px - __x0) + Math.abs(py - __y0) > 1 && grid[py][px] !== "T" && level === 0')
  ok(s !== null, `C-3: can slide across the ice on map 1 (${s?.length} steps)`)
  await walk(s.slice(0, -1))
  const startE = Number(await text('#energy')), x0 = await page.evaluate(() => px)
  await walk(s.slice(-1))
  const x1 = await page.evaluate(() => px), used = startE - Number(await text('#energy'))
  ok(Math.abs(x1 - x0) > 1 && used === 1, `C-3: one key press slid the player ${Math.abs(x1 - x0)} tiles and cost ${used} energy`)
  await shoot('real-c-ice.png')
  await open(name)
  const lens = await playAll(vars)
  ok(lens.length === 3 && lens.every(Boolean), `C-3: all 3 maps solvable with portals, stars and ice (${lens})`)
  for (let i = 0; i < lens.length; i++) ok(lens[i] !== null, `C-3: map ${i + 1} needs ${lens[i]} steps of 40`)
}

await browser.close()
console.log(fails ? `\n${fails} FAILED` : '\nall passed')
process.exit(fails ? 1 : 0)
