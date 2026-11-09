// Tests the starter and the three rescue versions by playing them, and captures REAL screenshots
// of the teacher's game for the slides (public/img/real-*.png).
// Run (repo root): node 08-memory-match/scripts/capture-shots.mjs
import { chromium } from 'playwright-chromium'
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const url = n => pathToFileURL(path.join(root, 'starter', n)).href
const out = n => path.join(root, 'public', 'img', n)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 600, height: 640 }, deviceScaleFactor: 2 })
// same shuffle on every run, so card positions (and the slide highlights on them) stay put
await page.addInitScript(() => { let s = 7; Math.random = () => (s = (s * 16807) % 2147483647) / 2147483647 })
const game = page.locator('#game')
let fails = 0
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) fails++ }
const flipped = () => page.locator('.card.flipped').count()
const matched = () => page.locator('.card.matched').count()
const card = i => page.locator('.card').nth(i)
// indexes of the two cards of each emoji
const pairs = () => page.$$eval('.card', cs => {
  const m = {}; cs.forEach((c, i) => (m[c.dataset.emoji] ??= []).push(i)); return Object.values(m)
})
const shoot = async name => { await page.waitForTimeout(350); await game.screenshot({ path: out(name) }) }

// ---- starter: clicking a card does nothing
await page.goto(url('memory-match-0.html'))
await shoot('real-start.png')
await page.click('#startBtn')
await shoot('real-board-closed.png')
await card(0).click()
ok(await flipped() === 0, 'starter: clicking a card does nothing')
ok(await page.locator('.card').count() === 12, 'starter: 12 cards')

// ---- rescue 1: flips only after Start, a flipped card stays open
await page.goto(url('rescue-1.html'))
await card(0).click({ force: true }).catch(() => {})
ok(await flipped() === 0, 'rescue 1: no flip before Start')
await page.click('#startBtn')
await card(0).click(); await card(5).click(); await card(10).click()
ok(await flipped() === 3, 'rescue 1: three clicks flip three cards')
await card(0).click()
ok(await flipped() === 3, 'rescue 1: clicking an open card keeps it open')
await page.mouse.move(0, 0)
await shoot('real-step1.png')

// ---- rescue 2: compare two cards
await page.goto(url('rescue-2.html'))
await page.click('#startBtn')
let p = await pairs()
await card(p[0][0]).click(); await card(p[0][1]).click()
ok(await matched() === 2, 'rescue 2: a pair stays open (matched)')
await card(p[1][0]).click(); await card(p[2][0]).click()
await page.mouse.move(0, 0)
await shoot('real-mismatch.png')
await card(p[3][0]).click()
ok(await flipped() === 4, 'rescue 2: a third card cannot be flipped while waiting')
await page.waitForTimeout(1200)
ok(await flipped() === 2, 'rescue 2: different cards flip back after 1 second')

// ---- rescue 3: moves, win, lose, replay
await page.goto(url('rescue-3.html'))
await page.click('#startBtn')
p = await pairs()
await card(p[0][0]).click(); await card(p[0][1]).click()
await card(p[1][0]).click(); await card(p[2][0]).click(); await page.waitForTimeout(1200)
await card(p[3][0]).click(); await card(p[3][1]).click()
await card(p[1][0]).click(); await card(p[1][1]).click()
await card(p[4][0]).click()
await page.mouse.move(0, 0)
ok(await page.textContent('#moves') === '4', 'rescue 3: four moves counted')
await shoot('real-playing.png')
await card(p[4][1]).click(); await card(p[2][0]).click(); await card(p[2][1]).click()
await card(p[5][0]).click(); await card(p[5][1]).click()
await page.waitForTimeout(300)
ok(await page.isVisible('#winScreen'), 'rescue 3: all pairs found -> win screen')
await shoot('real-win.png')

await page.click('#winScreen .againBtn')
ok(await page.textContent('#moves') === '0' && await flipped() === 0 && !(await page.isVisible('#winScreen')),
  'rescue 3: replay resets moves and cards')
p = await pairs()
for (let i = 0; i < 20; i++) {
  await card(p[0][0]).click(); await card(p[1][0]).click()
  await page.waitForTimeout(1150)
}
ok(await page.isVisible('#loseScreen'), 'rescue 3: 20 moves without winning -> lose screen')
ok(await page.textContent('#moves') === '20', 'rescue 3: counter shows 20')
await shoot('real-lose.png')
await page.click('#loseScreen .againBtn')
ok(await page.textContent('#moves') === '0' && !(await page.isVisible('#loseScreen')), 'rescue 3: replay after losing')

await browser.close()
console.log(fails ? `${fails} FAILED` : 'all passed; screenshots in public/img/')
process.exit(fails ? 1 : 0)
