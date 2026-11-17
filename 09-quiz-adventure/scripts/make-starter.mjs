// Builds the playable game files from starter/parts/ (one shared HTML + CSS, three rule versions, two question lists).
//   starter/quiz-adventure-0.html  starter fiddle (what students fork): 3 台灣小知識, the first one wrong on purpose
//   starter/rescue-1.html          + 10 checked 動物 questions                   (after STEP 1)
//   starter/rescue-2.html          + right/wrong feedback, score, stars          (after STEP 2)
//   starter/rescue-3.html          + 3 hearts, lose screen, replay               (after STEP 3 = finished version)
//   starter/full-game.html         finished version with 10 台灣小知識, the first one wrong on purpose (slide 2)
// To make a fiddle: paste the part under "CSS 窗格" into CSS, the <div id="game"> block into HTML,
// and the part under "JavaScript 窗格" into JavaScript.
// Run (repo root): npm run starter -w 09-quiz-adventure
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'starter')
const read = n => fs.readFileSync(path.join(dir, 'parts', n), 'utf8').replace(/\r\n/g, '\n').trimEnd()
const page = read('page.html')
const taiwan = read('q-taiwan.js')
const animals = read('q-animals.js')
// the starter keeps only the first three questions of the 台灣小知識 list
const firstThree = taiwan.replace(/(\n  \{[\s\S]*?\n  \},?){10}\n\];/, m => {
  const items = m.match(/\n  \{[\s\S]*?\n  \}/g).slice(0, 3)
  return items.join(',') + '\n];'
})
const header = (js, line) => js.replace(/^\/\/ =====.*=====\n/, `// ===== ${line} =====\n`)
const versions = {
  'quiz-adventure-0.html': read('js-0.js').replace('/*QUESTIONS*/', () => firstThree),
  'rescue-1.html': header(read('js-0.js'), '問答闖關：救援 1（STEP 1 完成：10 題「動物」題目）')
    .replace(/\/\/ 現在：.*\n\/\/ 還不會：.*\n/, '// 現在：按「開始」會出現 10 題動物題目，按任何一個答案就跳到下一題。\n// 還不會：說對錯、加分、星星、扣愛心、贏或輸。\n')
    .replace('/*QUESTIONS*/', () => animals),
  'rescue-2.html': read('js-2.js').replace('/*QUESTIONS*/', () => animals),
  'rescue-3.html': read('js-3.js').replace('/*QUESTIONS*/', () => animals),
  'full-game.html': header(read('js-3.js'), '問答闖關：完整版（台灣小知識 10 題）')
    .replace('/*QUESTIONS*/', () => taiwan),
}
for (const [name, js] of Object.entries(versions)) {
  if (js.includes('/*QUESTIONS*/')) throw new Error(`${name}: question list not inserted`)
  fs.writeFileSync(path.join(dir, name), page.replace('/*JS*/', () => js) + '\n')
  console.log(`${name}: JavaScript ${js.split('\n').length} lines, ${(js.match(/question: "/g) ?? []).length} questions`)
}
