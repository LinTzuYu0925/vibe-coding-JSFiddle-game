# 09-quiz-adventure NOTES

## Decisions
- 2026-11-09 Class 09 genre: quiz. AI focus: ask the AI for content (questions), not only code, and check it;
  each student finds and fixes at least one problem question. Design word in focus: 回饋 Feedback (+ 挑戰 hearts).
  See `COURSE-PLAN.md` §4 class card 09.
- 2026-11-09 Whole-JS replacement still (game stays short). Function find-and-replace starts in class 10.
- 2026-11-09 The hook uses a finished version with one planted mistake (台灣最高的山 → 雪山) so the class discovers
  that the game is only as right as its question list.

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
- [ ] Starter fiddle `jsfiddle.net/<game index>/0`; source saved at `starter/quiz-adventure-0.html`
      (3 台灣小知識 questions, one planted mistake; variable named `questions`)
- [ ] Hook fiddle: finished version with the planted mistake (slide 2)
- [ ] Rescue 1 (+10 checked 動物 questions), Rescue 2 (+ feedback, score, stars), Rescue 3 (+ hearts, lose, replay)
- [ ] Slide 12: ask an AI the STEP 1 prompt twice or more; keep one real problem question as the example
- [ ] Classroom assignment 「第 9 堂：問答闖關」 with optional design-card box and optional 「我抓到的錯題：第＿題」
- [ ] Screenshots: finished game (start, right, wrong, win with stars, lose), starter JS with `const questions = [`

## Facts to verify
| Fact | Status |
|---|---|
| Free ChatGPT / Gemini return the complete JS with 10 questions without "其餘不變" | check before class |
| AI spreads the correct answer across the four positions when asked | check before class |
| School laptops allow Google search / which sites students may use to check facts | ask school |
| 玉山 is Taiwan's highest mountain (3,952 m); 雪山 is second (3,886 m) | verified (common knowledge; confirm figure if shown on a slide) |

## Sources
- `COURSE-PLAN.md` §1 strand A (content, check it), §4 class card 09
