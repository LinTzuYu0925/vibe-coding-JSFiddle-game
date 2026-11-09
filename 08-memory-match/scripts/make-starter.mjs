// Builds the four playable game files from starter/parts/ (one shared HTML + CSS, four JavaScript versions).
//   starter/memory-match-0.html   starter fiddle (what students fork)
//   starter/rescue-1.html         + click flips a card            (after STEP 1)
//   starter/rescue-2.html         + two cards compared, 1 s wait  (after STEP 2)
//   starter/rescue-3.html         + moves, win, lose, replay      (after STEP 3 = finished version)
// To make a fiddle: paste the part under "CSS 窗格" into CSS, the <div id="game"> block into HTML,
// and the part under "JavaScript 窗格" into JavaScript.
// Run (repo root): node 08-memory-match/scripts/make-starter.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'starter')
const page = fs.readFileSync(path.join(dir, 'parts', 'page.html'), 'utf8')
const out = { 0: 'memory-match-0.html', 1: 'rescue-1.html', 2: 'rescue-2.html', 3: 'rescue-3.html' }
for (const [n, name] of Object.entries(out)) {
  const js = fs.readFileSync(path.join(dir, 'parts', `js-${n}.js`), 'utf8').trimEnd()
  fs.writeFileSync(path.join(dir, name), page.replace('/*JS*/', () => js))
  console.log(`${name}: JavaScript ${js.split('\n').length} lines`)
}
