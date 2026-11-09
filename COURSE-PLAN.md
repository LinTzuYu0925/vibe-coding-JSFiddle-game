# Course plan: classes 08–17

Course map for the rest of the Vibe Coding game course. Read `CLAUDE.md` first (students, class routine,
prompt method). This file says **which game, mechanic, skill and design idea each class carries**; the detailed
slide-by-slide plan for each class goes in `<folder>/outline.md` (next step, see §7).

Decided with the author on 2026-11-08:
- Decks 02–04 took classes 02–07 (timing slipped), so ten classes remain: 08–17.
- The course ends with every student's **own game, hosted on GitHub Pages, shown at a showcase**.
- Genres the author wants: memory / quiz (puzzle), maze (top-down), platformer.
- Every game is designed and checked with two separate ideas (§3), decided 2026-11-09:
  - **遊戲設計四個字** (is it a game, is it fun?): 目標 Goal, 規則 Rules, 挑戰 Challenge, 回饋 Feedback.
  - **完整遊戲** (is it finished?): 開始／遊玩／勝利／失敗／重玩 (deck 04's stages).

## 1. Main teaching points

What a 10–12-year-old can really learn when an AI writes the code. They do **not** learn to write JavaScript.
Most of all they learn to **work with an AI**: describe what they want, give it the right context, test what
comes back and tell it what broke. Around that they learn to **design** a game, **fix** it, **publish** it, and to
**recognise** how a game thinks. Six strands run through the course, the most important first; every class touches most of them.
"Can show" is what the teacher sees in class or in the Classroom submission.

### A. 跟 AI 合作 Working with AI (the vibe-coding method, the core of the course)
| Teaching point | The child can show | Where |
|---|---|---|
| Describe clearly: four-part prompt ① 加什麼 ② 怎麼動 ③ 不能弄壞 ④ 怎麼檢查 | fill the four parts for their own change | 04, every class; first own prompt 08; whole game 15–16 |
| The AI needs context: paste the **latest** code | prompt includes the current JS | every class |
| Ask for the answer form you can use | complete JS (08–09) / complete functions found with Ctrl+F (10 on) | 08, 10 |
| One change at a time | one request per message | every class |
| The AI can be wrong, and answers differ each time | test before Save, never trust without playing | 08; facts in content 09 |
| Ask the AI for content, not only code, and check it | questions, maps, themes from a topic word; spot a wrong answer | 09, 10 |
| Ask the AI to explain in plain Chinese | 「這一段是什麼意思？請用小學生聽得懂的話」 | 10 on |
| Describe how it should feel, then tune numbers | 「跳太低了，請跳高一點」「我 1 分鐘就贏了，請調難一點」 | 11, 13 |
| Ask the AI to change the shape of code, not the game | merge three panes into one HTML file, game unchanged | 12 |
| ③ 不能弄壞: protect what already works when adding a big change | check the old features still work after the change | 14 |
| Ask the AI for ideas, then choose yourself | pick one of the AI's ideas and say why | 15 |
| Keep a conversation going when the fix fails: one bug per message, roll back and say it differently | fix a bug in two or three messages | 16 |
| You are the designer, the AI is the tool | say what they decided vs. what the AI wrote | 15–17 |

### B. 遊戲設計 Game design
| Teaching point | The child can show | Where |
|---|---|---|
| Every game has 目標／規則／挑戰／回饋 | name the four for a game they play | 08, then every class |
| A complete game: 開始／遊玩／勝利／失敗／重玩 | play their game to every stage | 04, every starter |
| Balance: too easy is boring, too hard is frustrating | change one number, replay, say what changed | 08 (move limit), 11 (gravity), 13 (prices) |
| Different genres need different rules | say what is new in this genre | 02–14, one genre per class |
| Playtesting finds what the maker can't see | watch a partner play and tick a list | 08, 14, 16, 17 |
| Plan before building | fill a design card for their own game | 15 |

### C. 遊戲怎麼想 How a game thinks (recognise and find with Ctrl+F, never type)
| Idea | Plain-Chinese meaning for the slide | Where |
|---|---|---|
| 變數 Variable | 一個會記住數字的盒子（分數、生命、步數） | 02, 08 |
| 條件 Condition | 如果……就…… | 02, 08 (same pair?), 10 (wall?) |
| 事件 Event | 有事發生就做一件事：按鍵、點一下、時間到 | 02 (keys), 08 (click), 13 (timer) |
| 遊戲迴圈 Game loop | 遊戲一秒重畫很多次 | 02, 11 |
| 座標 Coordinates | 用 x、y 說東西在哪裡 | 02, 10 (grid), 11 |
| 碰撞 Collision | 兩個東西碰到了嗎？ | 02, 10 (walls), 11 (platforms), 14 |
| 隨機 Random | 每次都不一樣（洗牌、出現位置） | 08, 14 |
| 資料和規則分開 Data vs rules | 換題目、換地圖，規則不用改 | 09 (questions), 10 (maps) |
| 計時器 Timer | 等一下、每秒做一次 | 08 (wait 1 s), 13 (every second) |
| 重力 Gravity and speed | 每一刻都往下拉一點 | 11 |
| 狀態 State | 遊戲現在在哪個畫面 | 04, every starter |

### D. 測試與除錯 Testing and fixing
| Teaching point | The child can show | Where |
|---|---|---|
| Check by playing and by Ctrl+F | tick the STEP's check list | every STEP |
| Make numbers small to test (20 → 3), then change back | reach the lose screen quickly | 08 on |
| Bug report: 我做了什麼 ＋ 看到什麼 ＋ 我期待什麼 | send one good bug message | every class |
| Symptoms point to causes | use a symptom table | 08 on |
| Roll back to a version that worked | open a lower version index | 03, 16 |
| Stuck is normal: rescue fiddle, then keep going | fork the rescue fiddle and continue | every class |

### E. 電腦與網路 Computer and web skills
| Teaching point | The child can show | Where |
|---|---|---|
| Copy, paste, select all, find: `Ctrl+C` `Ctrl+V` `Ctrl+A` `Ctrl+F`, right-click | do them without help | 01–08, repeated |
| HTML = what is there, CSS = how it looks, JS = how it behaves | point at the right pane | 01–02 |
| A URL has parts: game index / version index | say which number is theirs | 03, every submission |
| Files live in the cloud, not on the laptop | open their work on a new laptop | every class |
| GitHub: repository, upload, raw URL | use a raw URL for a picture or sound | 03 |
| GitHub: create a file, Commit changes, Pages | open their game from a `github.io` link | 12, 17 |
| Fiddle link vs. Pages link | say who can play which | 12 |

### F. 數位公民 Digital citizenship and AI literacy
| Teaching point | The child can show | Where |
|---|---|---|
| Privacy: no real name, school, photo or address in prompts, repos or public games | use a nickname in the repo and game | 12, 17; reminder when using AI |
| Public means anyone can see it | say who can open a Pages link | 12 |
| Use pictures and sounds you are allowed to use (own drawings, free assets); commercial games are for learning, not for copying into a published game | say where their assets came from | 03, 15, 17 |
| Kind, useful feedback: ⭐ one thing I liked ＋ 💡 one idea | give ⭐ + 💡 to a classmate | 08, 14, 16, 17 |
| Accounts and passwords are private | log in without sharing a password | every class (login time) |

### Not taught
Typing code or memorising syntax; editing HTML or CSS after class 01 (starters provide them); saving files on the
laptop; game engines or frameworks.

## 2. Map

Columns follow the six strands of §1, most important first. Only what is **new** in a class is listed; the habits
every class repeats are in §5.

| Class | Game / genre | A. 🤖 Working with AI (new) | B. Design word in focus | C. How a game thinks | D–F. Testing · computer · citizenship |
|---|---|---|---|---|---|
| 01 | AI's first game | ask an AI for a whole game | — | — | JSFiddle's three panes |
| 02–07 (decks 02–04) | Space Shooter, SUPER STRIKER | four-part prompt; paste the latest code; one change at a time | 完整遊戲 | variable, condition, event (keys), game loop, coordinates, collision, state | Fork / Save, version index, GitHub raw URLs |
| 08 `08-memory-match` | 記憶翻牌 Memory Match (puzzle) | ask for **complete JS**; **the AI can be wrong**, answers differ: test before Save; **first own four-part prompt** | 挑戰 (move limit) + 回饋 (flip, match stays) | event (**click**), variable (remember the first card), random (shuffle), timer (wait 1 s) | small-number testing trick, symptom table, ⭐ + 💡 partner feedback |
| 09 `09-quiz-adventure` | 問答闖關 Quiz | ask for **content**, not code; **check the AI's facts** (find a wrong answer) | 回饋 (✔／✘, score, stars) | **data vs rules** (question list) | type only a topic word |
| 10 `10-maze-tile-map` | 迷宮尋寶 Maze (top-down) | ask for **complete functions** and replace them with `Ctrl+F`; **ask the AI to explain** in plain Chinese; AI draws maps | 規則 (walls block, key opens door) | grid coordinates, collision with walls, data vs rules (maps) | `Ctrl+F` a whole function |
| 11 `11-platformer-gravity` | 跳跳平台 Platformer | **describe a feeling** (跳太低、掉太快) and let the AI tune numbers | 挑戰 (gaps, enemy, level 2) | **gravity and speed**, game loop, collision with platforms | bug sentence on a moving game |
| 12 `12-github-pages` | 發布我的遊戲 (a game from 08–11) | ask the AI to **change the shape of code** (merge into one HTML file) without changing the game | check all four words + 完整遊戲 | — | **GitHub Pages**, commit, fiddle link vs Pages link; **privacy and public links** (nicknames) |
| 13 `13-clicker-upgrade` | 點點工廠 Clicker / idle | **balance with playtest numbers** (「我 1 分鐘就贏了」) | 回饋 loop + 挑戰 balance | **timer** (every second), variables that grow | — |
| 14 `14-two-player-duel` | 雙人對決 Two-player star grab | **③ 不能弄壞**: add a big feature and protect what works | 目標 (first to 5, best of three) + 完整遊戲 with rounds | two event sets (two players' keys), collision, random | pair playtest as the main check |
| 15 `15-my-game-plan` | 我的遊戲 ① 企劃與開工 | **ask the AI for ideas, choose yourself**; turn the design card into own prompts | all four + 完整遊戲, planned | (student's choice) | allowed pictures and sounds |
| 16 `16-my-game-build` | 我的遊戲 ② 製作與試玩 | **keep a fix conversation going**: one bug per message, roll back, say it differently | all four + 完整遊戲, working | (student's choice) | roll back by version index, playtest swap |
| 17 `17-my-game-showcase` | 我的遊戲 ③ 發布與發表會 | **say what I decided vs what the AI wrote** | all four, shown to the class | — | Pages again, gallery with ⭐ + 💡, final link in Classroom |

Proposed folders: `08-memory-match`, `09-quiz-adventure`, `10-maze-tile-map`, `11-platformer-gravity`, `12-github-pages`,
`13-clicker-upgrade`, `14-two-player-duel`, `15-my-game-plan`, `16-my-game-build`, `17-my-game-showcase`.

Folder names are proposals until a deck is published; after that they never change (CLAUDE.md).
The home page labels a deck 「第 N 堂」 from its folder number, so deck 04 shows as 第 4 堂 although it ran 04–07.

**Why this order**
- The AI strand grows one step per class: trust but test (08) → check content (09) → work with parts of the code and
  ask why (10) → describe a feeling (11) → reshape code (12) → tune with evidence (13) → protect what works (14) →
  lead the AI with your own plan (15–17).
- 08–09 have no reflexes and no movement: a calm start after the shooter and football games, and the first mouse game.
- 10 brings grids and levels; 11 (physics) is the hardest technical class and sits mid-way, not just before the final project.
- 12 teaches GitHub Pages while students have four fresh games to choose from, so class 17 is a repeat, not new.
- 13–14 are lighter and social (numbers to balance, a partner to beat).
- 15–17 are the final project: plan, build and playtest, publish and show.

## 3. Two ideas for every game: 遊戲設計四個字 and 完整遊戲

### 遊戲設計四個字 (is it a game, and is it fun?)

| Word | Question for students | 08 Memory | 09 Quiz | 10 Maze | 11 Platformer | 13 Clicker | 14 Duel |
|---|---|---|---|---|---|---|---|
| 目標 Goal | 我要做到什麼？ | find all pairs | answer every question | reach the exit | reach the flag | 1000 coins | first to 5 stars |
| 規則 Rules | 我可以做什麼、不能做什麼？ | flip two at a time | pick one answer | walls block; a key opens the door | jump only from the ground | buy only what you can pay for | each player has own keys |
| 挑戰 Challenge | 什麼讓它變難？ | 20-move limit | 3 hearts | timer, enemy, harder maps | gaps, enemy, level 2 | time limit, rising prices | the other player |
| 回饋 Feedback | 我做了一件事，遊戲怎麼回答我？ | card flips; a match stays open | ✔／✘, score, stars | key picked up, door opens | coin sound, score | coins jump up | point, round winner |

- Where the words come from: games share a goal, rules and a feedback system (Jane McGonigal, *Reality Is Broken*, 2011);
  play is most fun when the challenge grows with the player's skill (flow, Csikszentmihalyi).
- 回饋 includes rewards (獎勵): a reward is the happy kind of feedback. Saying 回饋 also covers the
  "I clicked and nothing happened" bugs and helps students describe what they saw when reporting a bug.
- Levels (關卡) are not a separate word: a new level is one way to raise the 挑戰 (class 10–11).

### 完整遊戲 Complete game (is it finished?)

開始／遊玩／勝利／失敗／重玩, deck 04's stages with the same colours
(Start = blue, Play = green, Victory = orange, Game Over = red). A checklist to tick, not a design word.
Every starter has these screens in its HTML already; STEPs make them work.

### How every class uses them
- **Hook**: play the game and ask 「這個遊戲的目標是什麼？挑戰是什麼？」
- **One STEP** adds the word in focus (column "Design word in focus" in §2).
- **Own version**: one change idea per word (rules, challenge, feedback; goal for bolder students).
- **Partner playtest**: four words + the 完整遊戲 checklist.
- **Recap**: each student says which word they changed.
- **設計卡 (design card)**: four boxes (目標／規則／挑戰／回饋) shown on the slides. The Classroom assignment has
  an **optional** box for it: students may type a few words, nobody has to. Spoken answers count.
  In class 15 the design card becomes the plan for the student's own game. Never on paper or a local file.

## 4. Class cards (input for each outline.md)

Every starter has its HTML and CSS ready: start screen, play area, win screen, lose screen and replay button
(students change JavaScript only). Each STEP is one visible change that can be tested by playing, and has a rescue
fiddle. Goals use verbs the teacher can see: 做出, 改, 找到, 測試, 修好, 說出.

Each card starts with the **AI focus**: the strand-A point the class teaches and where it happens.

### 08 記憶翻牌 Memory Match
- AI focus: the AI can be wrong and gives a different answer each time, so test before ☁️ Save (a short slide after
  STEP 1 shows two different AI answers to the same prompt); ask for complete JS; the first own four-part prompt
  (own-version slot).
- Starter: a 4×3 grid of face-down emoji cards; clicking does nothing yet; start / win / lose screens exist.
- STEPs: ① clicking a card flips it ② after two picks: same → they stay open, different → flip back after 1 second
  ③ move limit with a counter → win (all pairs) and lose (out of moves) screens appear.
- Own version: emoji theme, bigger grid, more or fewer moves, a match sound.
- Goals: 做出 a memory game you can win and lose; 說出 its goal, rules, challenge and feedback; 測試 by playing to both endings.

### 09 問答闖關 Quiz
- AI focus: ask for content, not code, and check it: each student finds and fixes at least one question whose answer
  is wrong or unclear (the teacher's sample list contains one planted mistake).
- Starter: a quiz on one topic with a list of 3 questions, four answer buttons, score display, end screen.
- STEPs: ① ask the AI for 10 questions on my topic and replace the question list (the list is content, the rules stay)
  ② right / wrong feedback, score, 1–3 stars on the end screen ③ 3 hearts; no hearts → game over.
- Own version: timer per question, harder second round, a picture per question.
- Goals: 做出 a quiz about my own topic; 找到 the question list with `Ctrl+F`; 改 the feedback (✔／✘, stars).

### 10 迷宮尋寶 Maze
- AI focus: complete functions, found and replaced with `Ctrl+F`; ask the AI to explain a function in plain Chinese
  (「這一段是什麼意思？請用小學生聽得懂的話」); ask the AI to draw new maps.
- Starter: one map drawn as text rows (`#` wall, `.` floor, `P` player, `E` exit); the map draws but the player doesn't move.
- STEPs: ① arrow keys move one tile, walls block ② a key `K` must be picked up to open the door `D`
  ③ reaching the exit loads the next, harder map (the AI draws two more maps).
- Own version: an enemy that walks back and forth, a timer, a new tile type.
- Goals: 找到 the map with `Ctrl+F` and change it; 做出 three maps; 說出 the maze's rules (what blocks you, what opens).

### 11 跳跳平台 Platformer
- AI focus: describe how it should feel (「跳太低」「掉太快」「好難控制」) and let the AI change the numbers;
  then find the numbers with `Ctrl+F` and say what each one does.
- Starter: side view, a player who falls onto the floor and walks left/right; platforms drawn but not solid.
- STEPs: ① jump only when standing on the ground, tune the gravity and jump numbers ② coins with a score
  ③ reaching the flag opens level 2, with one enemy.
- Hardest physics of the course: the middle STEP gets the most time and the strongest rescue fiddle.
- Own version: double jump, a moving platform, a spike that costs a life.
- Goals: 改 gravity and jump numbers and 說出 what changed; 做出 coins and a second level; 修好 one bug with the bug sentence.

### 12 發布我的遊戲 GitHub Pages
- AI focus: ask the AI to change the shape of the code (three panes → one HTML file) and check that the game did not
  change. Citizenship: a Pages link is public, so use a nickname and no real name, school or photo.
- No new starter: each student chooses one of their saved fiddles from 08–11 (from Classroom).
- STEPs: ① ask the AI to merge the fiddle's three panes into one HTML file; in the class-3 repo,
  Add file → Create new file (`<game>.html`), paste, Commit changes ② Settings → Pages → branch `main` → Save;
  open `<user>.github.io/<repo>/<game>.html` ③ a partner plays from the link and checks the four words + 完整遊戲;
  fix one thing in the fiddle, merge again, commit again.
- Submission: Pages link + fiddle link.
- Every Pages screen shown click by click with real screenshots (`technical-research-fact-checking`).
- Goals: 做出 a game link anyone can open; 測試 it on another laptop; 說出 the difference between a fiddle link and a Pages link.

### 13 點點工廠 Clicker
- AI focus: balance with evidence from playtesting (「我 1 分鐘就贏了」「3 分鐘只有 200 金幣」) instead of
  「調難一點」; compare before and after.
- Starter: a big button and a coin counter; clicking adds nothing yet; win / lose screens exist.
- STEPs: ① clicking earns coins, and a worker earns automatically every second (timer)
  ② upgrade shop: each upgrade earns more and its price grows ③ goal: 1000 coins in 3 minutes → win / lose;
  ask the AI to balance it when it is too easy or too hard.
- Own version: a new upgrade, a golden bonus that appears for 3 seconds, a different theme.
- Goals: 做出 an upgrade that pays back; 說出 why prices grow (feedback vs. challenge); 改 numbers until a partner just barely wins.

### 14 雙人對決 Two-player star grab
- AI focus: ③ 不能弄壞. Adding a second player touches almost every function; students list what must keep working
  before they prompt, and test that list afterwards.
- Starter: arena with one player (arrow keys) and a star that reappears when touched; one score.
- STEPs: ① a second player on `W A S D` ② each player scores, first to 5 wins the round
  ③ best of three rounds → match winner screen → replay.
- Pair playtest is the main check; building stays individual (one fork each).
- Own version: power-up, obstacle, faster star.
- Goals: 做出 a two-player game with rounds; 測試 it with a partner; 說出 the goal of a round and of a match.

### 15 我的遊戲 ① 企劃與開工
- AI focus: ask the AI for ideas (「給我 5 個讓記憶翻牌更好玩的點子」), choose one yourself and say why; turn the
  design card into own four-part prompts. Citizenship: use pictures and sounds you are allowed to use.
- Review the genres from 02–14 → choose one starter (teacher's starter fiddles linked from the slides) + one twist →
  fill the 設計卡 (目標／規則／挑戰／回饋) + 完整遊戲 checklist, optionally typed in the Classroom box →
  turn each box into a four-part prompt → first change + Save.
- Fallback: a "blank complete game" starter (start / play / win / lose / replay already working) for students who want
  something different.
- Goals: 說出 (or write) my game's goal, rules, challenge and feedback; 改 the first part of my game and save it.

### 16 我的遊戲 ② 製作與試玩
- AI focus: keep a fix conversation going: one bug per message; if the AI's fix makes it worse, roll back to the last
  good version index and describe the bug differently.
- Build loop with teacher check-ins; mid-class playtest swap with the four words + 完整遊戲 checklist; teacher demo of
  rolling back by opening a lower version index; bug-report sentence; fix + Save.
- Goals: 修好 at least one bug a partner found; every 完整遊戲 stage works in my game.

### 17 我的遊戲 ③ 發布與發表會
- AI focus: in the showcase each student says what they decided and what the AI wrote (「我決定……，AI 幫我寫……」).
- Final polish (short) → publish with the class-12 routine (update the existing file or add `index.html`) →
  game gallery: each student plays three classmates' games and leaves ⭐ one thing I liked + 💡 one idea →
  course recap (all the genres, the four words, 完整遊戲).
- Goals: 做出 my final game link; 說出 my game's goal, rules, challenge and feedback to the class.

## 5. Threads through all ten classes

- **Working with AI first**: every class names its AI focus on the roadmap slide and in the recap, before the game
  content. Output form: whole JS (08–09) → find and replace one function (10 on). Own prompts: one in each
  own-version slot from 08, a whole game in 15–16.
- **Prompt fill-in ladder (decided 2026-11-09)**: students learn to write their own four-part prompts because the
  teacher's prompts fade. Blanks (`<Ph>`) grow from STEP to STEP inside a class, and every class's first STEP starts
  at least where the previous class's last guided STEP ended. Blank kinds, easiest first:
  ① 選一個 (a dropdown on the slide, chosen before pressing 📋 複製) → ② 填數字 → ③ 幾個字 with a word bank on the slide (click a word to copy it) →
  ④ a whole part (①–④) with a word bank → ⑤ a whole part without a word bank → ⑥ the whole prompt from the design card.
  The teacher always writes what is not the skill being trained: the context sentence, technical names the AI cannot
  see (HTML ids, CSS classes), the output-form line and the paste-your-code blank. Each blank stays typeable
  (≤ about 12 characters). Answers to fill-ins come from that STEP's 目標 page, so no extra answer page is needed;
  the 檢查 page catches a wrong fill by playing.

  | Class | First STEP | Last guided STEP | Own version |
  |---|---|---|---|
  | 08 | 2 blanks: 選一個 + a number (②④) | 5 blanks: ① and ③ whole parts with a word bank, numbers | all four parts blank, filled example + hints |
  | 09 | ② and ④ as short phrases, word bank | ①②③④ blank, word bank | all four blank, hints only (no filled example) |
  | 10 | ①②④ blank; ③ written | ①–④ blank, no word bank | four headings only |
  | 11 | ①–④ blank, word bank | ①–④ blank, no word bank | four headings only |
  | 12–14 | ①–④ blank in every STEP; slide gives only context + technical names + output form | same | same |
  | 15–17 | students write the context sentence too, from their design card; slide shows the four headings and the output-form line | | |
- **Habits** every deck repeats: one change at a time, always paste the latest code, test before ☁️ Save,
  bug-report sentence 「我做了什麼 ＋ 看到什麼 ＋ 我期待什麼」, roll back by version index.
- **Nothing local**: starters are fiddles, images and sounds live in the class-3 GitHub repo, links and design cards
  go into Classroom.
- **Complete game** every time: each starter already has start / win / lose screens and replay.

## 6. Prep

- Starter fiddles to build, with their source saved in the deck folder (`<deck>/starter/`): 08, 09, 10, 11, 13, 14,
  plus the blank complete-game starter for 15. Each needs a rescue fiddle per STEP.
- Deck 12: fresh real screenshots of GitHub Add file → Create new file, Commit changes, Settings → Pages,
  and the published page (check before class: Pages can take a minute or more to appear).
- Classroom assignments named 「第 N 堂：<title>」; classes 15–17 can share one assignment for the final game.

## 7. Next steps

1. Author approves or changes this map.
2. Write `08-memory-match/outline.md` with the `instructional-design` skill, get approval; then 09, 10 … 17.
   Each outline is approved before any slide of that class is built.
3. Update CLAUDE.md's course table if the map changes.

## 8. Open questions

- Was "find and replace one function" already taught in classes 02–07? If yes, class 10 only reminds.
- Public Pages links: use nicknames (no real names) in repo and file names? Recommended yes.
- Class 14: two-player star grab, or an endless runner (difficulty curve) instead?
- Should the home page show the real class range for decks 02–04 (deck 04 = 第 4–7 堂)? Needs a `build-site.mjs` change.
