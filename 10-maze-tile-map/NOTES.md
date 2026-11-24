# 10-maze-tile-map NOTES

## Decisions
- 2026-11-24 (author, via /goal) Plan written as `outline.md` and treated as approved; deck built straight after.
- Class 10 genre: top-down maze. AI focus: ask for ONE complete function and replace it found with `Ctrl+F`
  (`function movePlayer`, then `const maps`); ask the AI to explain a function; ask the AI to draw maps and check them.
  Design word in focus: 規則 (walls block, key opens door).
- Game design: the starter owns every helper (`loadMap`, `drawMap`, `updateTop`, `showMessage`, `winGame`, `loseGame`,
  `startGame`, key and button wiring). Students only ever replace `movePlayer` (STEP 1–3) and `const maps` (STEP 3).
  Key/button handlers check `playing` outside `movePlayer`, so the AI cannot forget it.
- Lose condition = ⚡ energy (`maxEnergy = 40` per map, refilled by `loadMap`); built into STEP 1 so every STEP ends in a playable,
  complete game. K and D are plain floor in STEP 1 (said in the prompt context), so STEP 1 can be won.
- On-screen arrow buttons exist because JSFiddle's result frame only receives arrow keys after a click inside it.
- 抓錯地圖偵探 sits after the STEP 3 rule Prompt (page 22) so new maps can really be walked.
- 挑戰站 (pages 30–44, 0 min, added after the first build): A 🧪 potion (1 step), B 👻 monster (patrol, then chase + 🗡️ sword), C 🌀 portals → ⭐ stars lock the exit → 🧊 ice → own idea (C-4), plus 點子庫 (page 44).
  Purpose: fast students practise asking "what can I design into my game"; every goal page has a 🎨 設計想一想 question.
  Monsters are turn-based (they move after each player step, no timers) so AI code stays simple. Prompts ask for the complete JavaScript (several places change), like deck 09's 挑戰站.
- Ladder used: STEP 1 three blanks with word bank (③ written); explain prompt two blanks (picks); STEP 2 four blanks with word bank;
  map prompt three blanks (number, pick, bank); STEP 3 four blanks, no bank; own prompt four headings, hints only.

## Files
- `starter/parts/` page.html (HTML+CSS), js-base.js, maps-1/3.js, move-0..3.js; `npm run starter -w 10-maze-tile-map` builds
  `maze-0.html`, `rescue-1/2/3.html`. `npm run shots -w 10-maze-tile-map` plays them (30 checks) and captures `public/img/real-*.png`.
- Starter JS pane line numbers used on slides: `const maps` 7, P row 10, K row 12, E/D row 16; rescue 1 `movePlayer` 100, lines 101–107 on slide 7.

## 挑戰站 examples (teacher's own, all playable, played by a search that uses the real `movePlayer`)
`starter/challenge-a.html` (potion), `-b1` (patrol), `-b2` (chase + sword), `-c1` (portals), `-c2` (stars lock exit), `-c3` (= C-1+C-2+C-3 together, ice).
Build: `npm run challenges -w 10-maze-tile-map`; test + screenshots (`public/img/real-c-*.png`): `npm run test:challenges -w 10-maze-tile-map` (33 checks).
Shortest solutions (steps of 40 energy): A 20/26/32 · B-1 32/34/32 without being hit · B-2 24/28/32 · C-1 20/18/26 · C-2 32/32/32 · C-3 29/31/34.
Not built by the teacher (ideas only, said so in the notes of pages 43–44): 💣 bomb, 🪨 push stone, 🔦 fog, ⏱ time limit, 🔥 trap, 🔘 switch, sound, footprints.
No fiddles were made for the examples (sources only), same as deck 09's 挑戰站.

## Fiddles (made 2026-11-24, anonymous, unsaved-account fiddles; version 0)
| key | URL |
|---|---|
| starter | jsfiddle.net/ytbga857 |
| rescue1 | jsfiddle.net/axnh5ved |
| rescue2 | jsfiddle.net/a315frjb |
| rescue3 (= full game, slide 2) | jsfiddle.net/8Lquv7n3 |

## Prep checklist
- [x] Game sources and fiddles created and linked in `fiddles.json`
- [ ] Try the STEP 1 prompt on free ChatGPT/Gemini twice: only `movePlayer` returned?
- [ ] Try the slide-8 selection method (Ctrl+F, click line start, Shift+click after `}`) in JSFiddle's current editor
- [ ] Ask an AI the map prompt (page 20) twice; keep one wrong map as the example for page 22
- [ ] Try one 挑戰站 prompt (e.g. B-1) on free AI: does it return the whole JS? (examples exist, AI output not tested)
- [ ] Classroom assignment 「第 10 堂：迷宮尋寶」 with optional design-card box
- [ ] Sound/emoji: 🏁 🚪 🔑 🧑 render on school laptops

## Facts to verify
| Fact | Status |
|---|---|
| Arrow keys reach the JSFiddle result only after clicking inside it | check before class (buttons are the fallback) |
| Shift+click selection works in JSFiddle's editor | check before class |
| Free AI returns only one function when asked | check before class |
| Map solvability: map 1 20 steps, map 2 26, map 3 32 of 40 energy | verified by `npm run shots` |
