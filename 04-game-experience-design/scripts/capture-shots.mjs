// Captures REAL screenshots of the unmodified starting game (index-jsfiddle-d0svjbn1-0.html).
// Run: npm run shots
import { chromium } from 'playwright-chromium'
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url))
const html = pathToFileURL(path.join(root, '..', 'index-jsfiddle-d0svjbn1-0.html')).href
const out = (n) => path.join(root, '..', 'public', 'img', n)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 960, height: 860 } })
await page.goto(html)
const game = page.locator('#game')

// 1. as soon as the page opens: "GET READY!" + a start button under the pitch
await game.screenshot({ path: out('real-before-start.png') })

// 2. playing: click start, walk forward and sideways, shoot once
await page.click('#startButton')
await page.keyboard.down('ArrowUp'); await page.waitForTimeout(500); await page.keyboard.up('ArrowUp')
await page.keyboard.down('ArrowLeft'); await page.waitForTimeout(250); await page.keyboard.up('ArrowLeft')
await page.keyboard.press(' ')
await page.waitForTimeout(350)
await game.screenshot({ path: out('real-playing.png') })

// 3. the end: the real code path is endGame(); we only fast-forward the clock to the last 0.1 s
await page.evaluate(() => { timeLeft = 0.1 })
await page.waitForTimeout(400)
await game.screenshot({ path: out('real-full-time.png') })

await browser.close()
console.log('saved real-before-start.png, real-playing.png, real-full-time.png')
