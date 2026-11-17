# 09-quiz-adventure NOTES

## Decisions
- 2026-11-09 Class 09 genre: quiz. AI focus: ask the AI for content (questions), not only code, and check it;
  each student finds and fixes at least one problem question. Design word in focus: 回饋 Feedback (+ 挑戰 hearts).
  See `COURSE-PLAN.md` §4 class card 09.
- 2026-11-09 Whole-JS replacement still (game stays short). Function find-and-replace starts in class 10.
- 2026-11-09 The hook uses a finished version with one planted mistake (台灣最高的山 → 雪山) so the class discovers
  that the game is only as right as its question list.

- 2026-11-17 (author) Outline approved. Answers to the open questions: school laptops may use Google search
  (slide 12 order: 自己知道 → 問夥伴 → Google, two sites must agree; teacher demos once); a topic list is given as
  inspiration (slide 8), own topics welcome; 10 questions is enough.
- 2026-11-17 (author) Rescue and full-game links are NOT on the STEP pages (class-8 students clicked them by mistake and
  ended up in the wrong game). They sit on one student-visible page near the end, 第 27 頁「救援站：老師說了才打開」;
  STEP 檢查 pages say 「舉手」, and the teacher says 「翻到第 27 頁，Fork 救援 2」. The same links are in the speaker notes.
- 2026-11-17 (author) Every slide shows its page number (bottom right, `slide-bottom.vue`). The number skips hostOnly
  slides, so the teacher version and the student site show the same number; a hostOnly slide shows 「🔒 老師頁」.
  Verified on a `build:site` build: student #/27 and teacher #/27 both 「第 27 頁」, teacher #/28 「老師頁」.

- 2026-11-17 (build) Fiddle links live in one place, `fiddles.json` (keys starter, full, rescue1–3). `components/Fiddle.vue`
  reads it for slides; `setup/preparser.ts` replaces `[[fiddle:<key>]]` in speaker notes with the same address.
  Tested by building with a dummy rescue1 value: it appeared on slide 27 and in the notes.
- 2026-11-17 (build) Starter and rescue games in `starter/` (shared HTML + CSS `starter/parts/page.html`, rule versions
  `js-0/2/3.js`, question lists `q-taiwan.js`, `q-animals.js`); `npm run starter -w 09-quiz-adventure` assembles
  `quiz-adventure-0.html`, `rescue-1/2/3.html`, `full-game.html`. `npm run shots -w 09-quiz-adventure` plays all of them
  (21 checks pass) and captures `public/img/real-*.png`.
- 2026-11-17 (build) The question list stores the answer as text (`answer: "雪山"`), and the rule compares the button text
  with it, so 「遊戲只會拿你的答案跟清單比」 is literally true. The full game (slide 2) is rescue 3's rules with 10 台灣小知識,
  the first one wrong on purpose; the starter has the first three of those. The answer card positions are spread over
  all four buttons in both 10-question lists.
- 2026-11-17 (build) Prompt ladder used: STEP 1 four blanks (number, topic, ② and ④ whole parts with word bank);
  fix-one-question prompt three blanks (number, pick, answer); STEP 2 five blanks (① and ④ whole parts with bank, two
  picks, a number); STEP 3 all four parts blank with word banks; own prompt all four blank, hints only, no example.
  Ids the AI needs (`answer`, `score`, `feedback`, `winScreen`, `stars`, `winText`, `correct`, `wrong`, `hearts`,
  `loseScreen`, `againBtn`, `hidden`, `maxHearts`) are written by the teacher in each prompt's context sentence.
- 2026-11-17 (build) Added 第 27 頁 救援站 (⏱ 0); the next-class preview moved to 28 (hostOnly). Total still 90 min.

## Glossary (reuse in later decks)
| 中文 | English | How we say it to students |
|---|---|---|
| 資料 | Data | 遊戲要用的內容，像一疊題目卡、一張地圖 |
| 規則 | Rules | 遊戲怎麼判斷：比對答案、加分、扣愛心 |
| 題目清單 | question list | `questions`，用 Ctrl+F 找得到 |
| 錯題 | wrong question | 答案錯、兩個都對、題目看不懂、正確答案都在同一格 |
| 查證 | check a fact | 我自己知道嗎？問夥伴？查一個可靠的網站 |
| 愛心 | hearts / lives | 答錯少一顆，沒了就輸 |

## Prep checklist
- [x] Starter source `starter/quiz-adventure-0.html` (3 台灣小知識, the first one wrong on purpose; variable `questions`,
      line 7); full game `starter/full-game.html`; rescue sources `starter/rescue-1/2/3.html` (all play-tested, 21 checks)
- [ ] Create the five fiddles from those files (each file marks the CSS, HTML and JavaScript pane contents), Save,
      write the URLs into `fiddles.json`, then push. Until then slides and notes show 「老師課前填入」.
- [ ] Slide 12: ask an AI the STEP 1 prompt twice or more; keep one real problem question as the example
- [ ] Classroom assignment 「第 9 堂：問答闖關」 with optional design-card box and optional 「我抓到的錯題：第＿題」
- [x] Screenshots: real game captured by `scripts/capture-shots.mjs` (start, starter, rescue 1, right, wrong, hearts,
      win, lose, the full game's 雪山 question). Slide 7 shows the starter's lines 5–12 as code instead of a JSFiddle screenshot.

## Facts to verify
| Fact | Status |
|---|---|
| Free ChatGPT / Gemini return the complete JS with 10 questions without "其餘不變" | check before class |
| AI spreads the correct answer across the four positions when asked | check before class |
| School laptops allow Google search | confirmed by the author 2026-11-17 |
| 濁水溪 is Taiwan's longest river; 台北 101 is in 台北; 櫻花鉤吻鮭 is the 國寶魚; 澎湖 lies west of Taiwan; 台灣黑熊 has a V-shaped white chest mark | verified (common knowledge; used in the full game) |
| Animal list (rescue 1–3): 藍鯨 largest animal, 海豚 mammal, spider 8 legs, insect 6 legs, giraffe neck 7 vertebrae, 企鵝 cannot fly, tadpole, panda eats bamboo, cheetah fastest on land, caterpillar | verified (common knowledge) |
| 玉山 is Taiwan's highest mountain (3,952 m); 雪山 is second (3,886 m) | verified (common knowledge; confirm figure if shown on a slide) |

## Sources
- `COURSE-PLAN.md` §1 strand A (content, check it), §4 class card 09
