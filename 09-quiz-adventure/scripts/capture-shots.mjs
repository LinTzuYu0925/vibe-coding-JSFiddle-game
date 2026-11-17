// Tests the starter, the three rescue versions and the full game by playing them, and captures REAL screenshots
// of the teacher's game for the slides (public/img/real-*.png).
// Run (repo root): npm run shots -w 09-quiz-adventure   (run `npm run starter -w 09-quiz-adventure` first)
import { chromium } from 'playwright-chromium'
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const url = n => pathToFileURL(path.join(root, 'starter', n)).href
const out = n => path.join(root, 'public', 'img', n)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 600, height: 520 }, deviceScaleFactor: 2 })
const game = page.locator('#game')
let fails = 0
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) fails++ }
const shoot = async name => { await page.mouse.move(0, 0); await page.waitForTimeout(300); await game.screenshot({ path: out(name) }) }
const text = sel => page.textContent(sel)
const btn = t => page.locator('.answer', { hasText: t }).first()
const qs = () => page.evaluate(() => questions.map(q => ({ ...q })))
// the button holding the right / a wrong answer of the question on screen
const pick = async right => {
  const list = await qs()
  const i = Number(await text('#qNum')) - 1
  const q = list[i]
  return page.locator('.answer').nth(right ? q.choices.indexOf(q.answer) : q.choices.findIndex(c => c !== q.answer))
}
const answer = async (right, wait = 1150) => { await (await pick(right)).click(); await page.waitForTimeout(wait) }

// ---- question lists: every answer is one of its four choices; answers spread over the four positions
for (const f of ['rescue-1.html', 'full-game.html', 'quiz-adventure-0.html']) {
  await page.goto(url(f))
  const list = await qs()
  ok(list.every(q => q.choices.length === 4 && q.choices.includes(q.answer)), `${f}: ${list.length} questions, each answer is one of 4 choices`)
  const pos = new Set(list.map(q => q.choices.indexOf(q.answer)))
  if (list.length === 10) ok(pos.size === 4, `${f}: right answers sit in all four positions`)
}

// ---- starter: an answer only moves on, no score, no colours
await page.goto(url('quiz-adventure-0.html'))
await shoot('real-start.png')
await page.click('#startBtn')
ok(await text('#qTotal') === '3', 'starter: 3 questions')
await shoot('real-starter.png')
await btn('玉山').click()
ok(await text('#qNum') === '2' && await text('#score') === '0', 'starter: answering moves to question 2, score stays 0')
ok(await page.locator('.answer.correct, .answer.wrong').count() === 0, 'starter: no right/wrong colours')

// ---- full game (slide 2): the class says 玉山, the game says ✘
await page.goto(url('full-game.html'))
await page.click('#startBtn')
await btn('玉山').click()
ok((await text('#feedback')).includes('雪山'), 'full game: 玉山 is marked wrong, the list says 雪山')
await shoot('real-hook-wrong.png')

// ---- rescue 1: ten animal questions, still no feedback
await page.goto(url('rescue-1.html'))
await page.click('#startBtn')
ok(await text('#qTotal') === '10', 'rescue 1: 10 questions')
await shoot('real-step1.png')

// ---- rescue 2: feedback, score, stars; clicking while waiting does nothing
await page.goto(url('rescue-2.html'))
await page.click('#startBtn')
const right = await pick(true)
await right.click(); await right.click(); await right.click()
ok(await text('#score') === '1', 'rescue 2: clicking three times while waiting scores once')
ok(await page.locator('.answer.correct').count() === 1, 'rescue 2: right answer turns green')
await shoot('real-right.png')
await page.waitForTimeout(1150)
ok(await text('#qNum') === '2' && await page.locator('.answer.correct').count() === 0, 'rescue 2: next question after 1 s, colours cleared')
await (await pick(false)).click()
ok(await page.locator('.answer.wrong').count() === 1 && await page.locator('.answer.correct').count() === 1, 'rescue 2: wrong answer red, right answer green')
ok(await text('#score') === '1', 'rescue 2: wrong answer adds nothing')
await shoot('real-wrong.png')
await page.waitForTimeout(1150)
for (let i = 2; i < 10; i++) await answer(i !== 5) // 8 right of 10 in total -> 2 stars
ok(await page.isVisible('#winScreen') && await text('#stars') === '⭐⭐', 'rescue 2: 8 right -> win screen with 2 stars')

// ---- rescue 3: hearts, lose, win, replay
await page.goto(url('rescue-3.html'))
await page.click('#startBtn')
await answer(true); await answer(false)
ok(await text('#hearts') === '❤️❤️🤍', 'rescue 3: a wrong answer takes one heart')
await answer(true)
await (await pick(false)).click()
await shoot('real-hearts.png')
await page.waitForTimeout(1150)
await answer(false)
ok(await page.isVisible('#loseScreen'), 'rescue 3: no hearts left -> lose screen')
await shoot('real-lose.png')
await page.locator('#loseScreen .againBtn').click()
ok(await text('#qNum') === '1' && await text('#score') === '0' && await text('#hearts') === '❤️❤️❤️' && !(await page.isVisible('#loseScreen')),
  'rescue 3: replay after losing -> question 1, score 0, 3 hearts')
for (let i = 0; i < 10; i++) await answer(true)
ok(await page.isVisible('#winScreen') && await text('#stars') === '⭐⭐⭐', 'rescue 3: 10 right -> win screen with 3 stars')
await shoot('real-win.png')
await page.locator('#winScreen .againBtn').click()
ok(await text('#qNum') === '1' && await text('#score') === '0' && !(await page.isVisible('#winScreen')), 'rescue 3: replay after winning')

// ---- 挑戰 A: the hint hides two wrong answers, limited uses, all four back on the next question and on replay
await page.goto(url('challenge-hint.html'))
await page.click('#startBtn')
const shown = () => page.evaluate(() => [...document.querySelectorAll('.answer')].filter(b => b.style.visibility !== 'hidden').map(b => b.textContent))
await page.click('#hintBtn')
const firstQ = (await qs())[0]
let left = await shown()
ok(left.length === 2 && left.includes(firstQ.answer), 'challenge A: hint leaves two answers, one of them right')
ok((await text('#hintBtn')).includes('剩 1 次'), 'challenge A: one hint left')
await shoot('real-c-hint.png')
await answer(true)
ok((await shown()).length === 4, 'challenge A: next question shows all four answers again')
await page.click('#hintBtn'); await answer(true)
ok(await page.isDisabled('#hintBtn') && (await shown()).length === 4, 'challenge A: no hints left -> button off')
await page.evaluate(() => startGame())
ok((await text('#hintBtn')).includes('剩 2 次'), 'challenge A: replay gives the hints back')

// ---- 挑戰 B: boss HP, attack on a wrong answer, angry at half HP, win when the boss has no HP
await page.goto(url('challenge-boss.html'))
await page.click('#startBtn')
const bossLine = () => page.evaluate(() => bossName.textContent)
const bossFaceNow = () => page.evaluate(() => bossFace.textContent)
await shoot('real-c-boss.png')
await answer(true)
ok((await bossLine()).includes('6 / 7'), 'challenge B: right answer takes one boss HP')
await answer(true)
await (await pick(false)).click()
await page.mouse.move(0, 0); await page.waitForTimeout(120)
await game.screenshot({ path: out('real-c-boss-attack.png') })
ok(await bossFaceNow() === '🔥' && await text('#hearts') === '❤️❤️🤍', 'challenge B: wrong answer -> boss attacks, one heart gone')
await page.waitForTimeout(1000)
await answer(true); await answer(true)
ok((await bossLine()).includes('生氣') && await bossFaceNow() === '👹', 'challenge B: boss at half HP is angry')
await shoot('real-c-boss-angry.png')
for (let i = 0; i < 3; i++) await answer(true)
ok(await page.isVisible('#winScreen') && (await text('#winText')).includes('打倒魔王'), 'challenge B: boss HP 0 -> win screen')
await page.locator('#winScreen .againBtn').click()
ok((await bossLine()).includes('7 / 7') && await bossFaceNow() === '🐉' && await text('#qNum') === '1', 'challenge B: replay -> boss back to full HP')

// ---- 挑戰 C: walk the map with the arrow keys, three stages, trees block, chest gives a heart
await page.goto(url('challenge-map.html'))
await page.click('#startBtn')
const pos = () => page.evaluate(() => [px, py])
const mapOn = () => page.isVisible('#map')
const go = async keys => { for (const k of keys) { await page.keyboard.press(k); await page.waitForTimeout(40) } }
// the button with the right / a wrong answer of the stage question on screen
const pickMap = async right => {
  const q = await page.evaluate(() => questions[stageList[stageStep]])
  return page.locator('.answer').nth(right ? q.choices.indexOf(q.answer) : q.choices.findIndex(c => c !== q.answer))
}
const answerMap = async right => { await (await pickMap(right)).click(); await page.waitForTimeout(1150) }
ok(await mapOn() && !(await page.isVisible('#quiz')), 'challenge C: start -> map, no question')
await shoot('real-c-map.png')
await go(['ArrowLeft', 'ArrowUp'])
ok(JSON.stringify(await pos()) === '[0,0]', 'challenge C: cannot walk off the map')
await go(['ArrowRight', 'ArrowRight', 'ArrowRight'])
ok(JSON.stringify(await pos()) === '[2,0]', 'challenge C: a tree 🌲 blocks the way')
await go(['ArrowDown', 'ArrowDown', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowRight']) // to (5,0)
await go(['ArrowDown'])                                                                              // stage 1 at (5,1)
ok(!(await mapOn()) && (await text('.brand')).includes('第 1 關') && await text('#qTotal') === '3', 'challenge C: stepping on 🏰 1 opens its questions')
await shoot('real-c-stage.png')
await answerMap(true); await answerMap(false); await answerMap(true)
ok(await mapOn() && await page.evaluate(() => done['1']) === true, 'challenge C: stage done -> back to the map, 🏰 becomes ✅')

await go(['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowLeft'])                 // to the chest at (3,4)
ok(await text('#hearts') === '❤️❤️❤️', 'challenge C: chest 🎁 gives the lost heart back')
await go(['ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowDown', 'ArrowDown', 'ArrowDown']) // stage 2 at (7,3)
ok((await text('.brand')).includes('第 2 關'), 'challenge C: stage 2 opens')
for (let i = 0; i < 3; i++) await answerMap(true)
await go(['ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowUp', 'ArrowLeft', 'ArrowLeft', 'ArrowDown']) // stage 3 at (0,5)
ok((await text('.brand')).includes('第 3 關') && await text('#qTotal') === '4', 'challenge C: stage 3 opens')
for (let i = 0; i < 4; i++) await answerMap(true)
ok(await page.isVisible('#winScreen'), 'challenge C: all three stages done -> win screen')
await page.locator('#winScreen .againBtn').click()
ok(await mapOn() && JSON.stringify(await pos()) === '[0,0]' && await page.evaluate(() => Object.keys(done).length) === 0, 'challenge C: replay -> start square, stages reset')
await go(['ArrowRight', 'ArrowRight', 'ArrowDown', 'ArrowDown', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowRight', 'ArrowDown'])
await answerMap(false); await answerMap(false); await answerMap(false)
ok(await page.isVisible('#loseScreen'), 'challenge C: no hearts left -> lose screen')

// 示意圖 for 挑戰 C step 1 and 2: the same game with a simpler map (step 1: one 🏰 for all 10 questions; step 2: no trees, no chest)
await page.goto(url('challenge-map.html'))
await page.evaluate(() => {
  mapRows.splice(0, 6, 'P.......', '........', '........', '....1...', '........', '........')
  for (const k of Object.keys(stages)) delete stages[k]
  stages['1'] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
})
await page.click('#startBtn'); await go(['ArrowRight', 'ArrowDown'])
await shoot('mock-c-step1.png')
await page.goto(url('challenge-map.html'))
await page.evaluate(() => mapRows.splice(0, 6, 'P.......', '.....1..', '........', '.......2', '........', '3.......'))
await page.click('#startBtn'); await go(['ArrowRight', 'ArrowRight'])
await shoot('mock-c-step2.png')

await browser.close()
console.log(fails ? `${fails} FAILED` : 'all passed; screenshots in public/img/')
process.exit(fails ? 1 : 0)
