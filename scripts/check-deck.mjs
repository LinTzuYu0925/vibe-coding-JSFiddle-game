// Static check of one deck's order, timing and hidden pages.
// Usage (repo root): node scripts/check-deck.mjs 04-game-experience-design
//
// Prints one row per slide: number | ⏱ minutes | <Step> label | hidden | title,
// then minute totals against the 90-minute budget, speaker-note lines that point at other
// pages (上一頁/下一頁/第 N 頁/STEP n), and outline.md rows that do not match the slides.
// It reports; it never edits.
import fs from 'node:fs'
import path from 'node:path'
import { parse } from '@slidev/parser'

const BUDGET = 90
const deck = process.argv[2]
if (!deck) { console.error('usage: node scripts/check-deck.mjs <deck-folder>'); process.exit(1) }
const file = path.join(deck, 'slides.md')
const { slides } = await parse(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'), file)

let total = 0, student = 0
const noTime = [], refs = [], titles = []
console.log(` #  ⏱    step                    hidden  title`)
slides.forEach((s, i) => {
  const n = i + 1
  const note = s.note ?? ''
  const t = note.match(/⏱\s*(\d+(?:\.\d+)?)\s*分/)
  const min = t ? Number(t[1]) : null
  const hidden = s.frontmatter?.hostOnly === true
  const stepTag = s.content.match(/<Step\b[^>]*\/>/)?.[0] ?? ''
  const attr = k => stepTag.match(new RegExp(`\\b${k}="([^"]*)"`))?.[1]
  const step = stepTag ? [attr('label') ?? 'STEP', attr('n'), attr('kind'), attr('quest'), attr('actor')].filter(Boolean).join(' ') : ''
  const title = (s.title ?? '(no title)').trim()
  titles.push(title)
  if (min === null) noTime.push(`#${n} ${title}${/⏱/.test(note) ? '  (⏱ without minutes: ' + note.match(/⏱[^\n]{0,20}/)[0] + ')' : note ? '' : '  (no speaker notes)'}`)
  else { total += min; if (!hidden) student += min }
  for (const line of note.split('\n'))
    if (/上一頁|下一頁|下下頁|前一頁|前面|後面|第\s*\d+\s*頁|slide\s*\d+|STEP\s*\d/i.test(line)) refs.push(`#${n}: ${line.trim()}`)
  console.log(`${String(n).padStart(2)}  ${(min ?? '-').toString().padEnd(4)} ${step.slice(0, 22).padEnd(23)} ${hidden ? 'HIDDEN' : '      '}  ${title}`)
})

console.log(`\n== Time ==\nall slides: ${total} min · student-visible: ${student} min · budget: ${BUDGET} min`)
if (total !== BUDGET) console.log(`WARN total is ${total > BUDGET ? 'over' : 'under'} the ${BUDGET}-minute budget by ${Math.abs(total - BUDGET)} min`)
if (noTime.length) console.log('WARN slides without "⏱ N 分鐘" in their notes:\n  ' + noTime.join('\n  '))

console.log('\n== Speaker-note lines that point at other pages (re-read after any reorder) ==')
console.log(refs.length ? refs.join('\n') : '(none)')

const outline = path.join(deck, 'outline.md')
if (fs.existsSync(outline)) {
  console.log('\n== outline.md vs slides ==')
  const rows = fs.readFileSync(outline, 'utf8').split('\n').filter(l => /^\|\s*\d+\s*\|/.test(l)).map(l => l.split('|').map(c => c.trim()))
  rows.forEach((r, i) => console.log(r[1].padStart(2), r[2] === (titles[i] ?? '') ? 'ok      ' : 'MISMATCH', r[2], r[2] === titles[i] ? '' : `  ← slide: ${titles[i] ?? '(none)'}`))
  if (rows.length !== titles.length) console.log(`WARN outline.md has ${rows.length} rows, slides.md has ${titles.length} slides`)
} else console.log('\n(no outline.md)')
