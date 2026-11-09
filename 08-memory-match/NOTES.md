# 08-memory-match NOTES

## Decisions
- 2026-11-08 Class 08 is the first class after decks 02–04 (which ran classes 02–07). Genre: memory match,
  first mouse-only game. Design words in focus: 挑戰 Challenge (move limit) + 回饋 Feedback. See `COURSE-PLAN.md`.
- 2026-11-08 Whole-JS replacement (game stays short). Function find-and-replace starts in class 10.
- 2026-11-09 Design words are 目標／規則／挑戰／回饋; 完整遊戲 (開始／遊玩／勝利／失敗／重玩) is a separate checklist.
- 2026-11-09 Classroom assignment has an optional design-card box; writing in it is never required, spoken answers count.

- 2026-11-09 Slide 4 uses a Super Mario Bros. screenshot (真實畫面) next to Space Shooter and SUPER STRIKER: approved.

- 2026-11-09 Working with AI is the first strand. Class 08's AI focus: "the AI can be wrong and answers differ, so play
  before ☁️ Save" (new slide 13 「AI 也會出錯」), complete JS, first own four-part prompt.

- 2026-11-09 (build) Starter and rescue games written into `starter/` (shared HTML + CSS in `starter/parts/page.html`,
  one JS file per version; `npm run starter -w 08-memory-match` assembles the four playable files).
- 2026-11-09 (build) The start screen covers the whole board, so 「按開始前點牌不能翻」 is already guaranteed by the
  starter. STEP 1's must-not rule became 「點翻開的牌，它又蓋回去」, and slide 13's broken example is an AI answer
  using `classList.toggle("flipped")`. Outline rows 9, 11, 12, 13 updated.
- 2026-11-09 (build) Prompts name the CSS classes and HTML ids the AI needs (`flipped`, `matched`, `moves`, `maxMoves`,
  `winScreen`, `loseScreen`, `againBtn`, `hidden`), because the AI only sees the JavaScript. 🔍 checks use those words
  (`flipped`, `1000` + `matched`, `maxMoves` + `winScreen`) instead of `click`/`20`, which the starter already contains.
- 2026-11-09 (build) The move limit lives in `const maxMoves = 20` (STEP 3 prompt asks for it), so the testing trick is
  Ctrl+F `maxMoves`, change 20 → 3, change back.
- 2026-11-09 (build) Fiddle URLs live in one place, `components/Fiddle.vue`; unfilled ones show pink 「老師課前填入」.
- 2026-11-09 (build) Slide 1's h1 = deck `title:` 「記憶翻牌：第一個用滑鼠玩的遊戲」 (check:deck reads slide 1's title
  from the headmatter); 「第 8 堂」 is a tag on the cover. Outline titles for the hidden pages dropped the 「（hostOnly）」 suffix.
- 2026-11-09 (build) Shared components for this deck: `Step.vue` is the merged 03/04 badge in dark colours
  (label / n / kind / actor teacher·all·me·pair); `PromptBox.vue` body raised to 1rem (deck 03's was .95rem).

- 2026-11-09 (author) Prompts fade: blanks for students grow STEP 1 (2) → STEP 2 (4) → STEP 3 (5, ① and ③ whole
  parts) → own prompt (all four parts). Word banks beside word blanks; answers on each STEP's 目標 page and in the
  notes. Course-wide ladder for 09–17 written in `COURSE-PLAN.md` §5, `CLAUDE.md` (Prompts) and `demo-and-practice` §3.
  Timings unchanged (STEP 1 prompt 5 min, STEP 2 6, STEP 3 5); watch whether filling in needs more time.

- 2026-11-09 (author) Pick-one blanks are dropdowns on the slide (`<Ph pick="A|B" />`), chosen before 📋 複製; the copy
  contains only the chosen word (unchosen → 【選一個：A／B】). Word banks are `<Bank>` buttons that copy their word.
  Tested in Chromium on a hash-mode build: copy text correct for chosen, unchosen and chip cases.

- 2026-11-09 (author) Blanks are filled on the slide: `<Ph>` boxes turn green when properly filled (pick = the right
  answer, number = a number, text = not empty, code = looks like JS); the JS is pasted into the last box; 📋 copies
  the whole prompt with answers and code. `<Bank>` words fill the last-clicked box. Tested in Chromium on a hash-mode
  build (11 checks: colours, wrong-pick hint, arrow keys stay in the box, copied text, answers kept between slides,
  chips fill a box). Shared state in `fill-store.js`.

- 2026-11-09 (author) Copy-button warning: pink ⚠️ while a box is not green; a press then shows a warning strip
  (overlaid, so the tall STEP 3 prompt still fits 1280×720) and makes unfilled boxes blink, without copying; a second
  press within 4 s copies anyway. Tested in Chromium (warn, no copy, 3 boxes blink, second press copies).

## Glossary (reuse in later decks)
| 中文 | English | How we say it to students |
|---|---|---|
| 目標 | Goal | 我要做到什麼？ |
| 規則 | Rules | 我可以做什麼、不能做什麼？ |
| 挑戰 | Challenge | 什麼讓它變難？ |
| 回饋 | Feedback | 我做了一件事，遊戲怎麼回答我？（獎勵是開心的回饋） |
| 完整遊戲 | Complete game | 開始／遊玩／勝利／失敗／重玩 |
| 點一下 | click | 滑鼠點一下也是事件 Event |
| 步數 | moves | 每翻兩張算一步 |
| 計時器 | Timer | 「等 1 秒」＝ 1000 毫秒 |
| 切換 | toggle | 開的變關、關的變開 |

## Prep checklist
- [x] Starter source `starter/memory-match-0.html`; rescue sources `starter/rescue-1.html`, `rescue-2.html`, `rescue-3.html`
      (all four play-tested by `node 08-memory-match/scripts/capture-shots.mjs`, 14 checks pass)
- [ ] Create the four fiddles from those files (each file marks the CSS, HTML and JavaScript pane contents), Save,
      and write the URLs into `components/Fiddle.vue`, then push
- [ ] Finished-version fiddle for the hook (slide 2) = Rescue 3
- [ ] Slide 13 (optional): ask an AI the STEP 1 prompt several times; if one answer really uses `toggle` or breaks,
      replace the 示意 snippets with it
- [ ] Classroom assignment 「第 8 堂：記憶翻牌」 with an optional design-card box (目標／規則／挑戰／回饋)
- [x] Screenshots: finished game (start, play, mismatch, win, lose) captured from the real game (`public/img/real-*.png`)
- [x] JSFiddle Fork / Save screenshot reused from deck 03 (`fiddle-original.png`)
- [ ] Super Mario Bros. screenshot for slides 4–5 (`public/img/mario.png`); until then an original illustration labeled 示意圖

## Facts to verify
| Fact | Status |
|---|---|
| Free ChatGPT / Gemini return the complete starter JS (finished version 127 lines) without "其餘不變" | check before class |
| JSFiddle Fork / Save button labels and position unchanged since deck 03 screenshots | check before class |
| After Fork, the URL shows the new game index right away (version index appears after the first Save) | check before class |
| In JSFiddle, clicking inside the JS pane then `Ctrl+F` opens the editor's own search box | check before class |
| ChatGPT code blocks have a 「Copy code／複製程式碼」 button at the top right; Gemini has a copy icon | check before class |
| Classroom menu wording 「新增或建立」→「連結」→「新增連結」→「繳交」 (same as deck 03) | check before class |
| The start overlay covers the board, so cards cannot be clicked before 開始 | verified in starter (Playwright) |
| Different cards flip back after 1 s; a third card cannot be flipped while waiting | verified in rescue 2/3 (Playwright) |
| SUPER STRIKER starter: 60-second timer, 「⚽ GOAL!!!」 message (`index-jsfiddle-d0svjbn1-0.html` lines 159, 750); 「5 球」 win rule was added in class 4 | verified |

## Sources
- `COURSE-PLAN.md` §4 class card 08
- `04-game-experience-design/index-jsfiddle-d0svjbn1-0.html` (SUPER STRIKER facts on slides 3 and 5)
