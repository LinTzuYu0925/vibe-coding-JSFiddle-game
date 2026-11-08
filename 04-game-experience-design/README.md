# 從瑪利歐到完整的足球遊戲（game-experience-design）

Slidev deck, 21 slides, Traditional Chinese (Taiwan), for a 2-hour elementary-school vibe-coding class.
Students use JSFiddle + an AI chat tool to add a start screen, victory, Game Over and restart to the existing 2.5D soccer game
(`index-jsfiddle-d0svjbn1-0.html`, the unmodified starting game).

Run from the repo root (dependencies are installed once there, see `../CLAUDE.md`):

```bash
npm run dev -w 04-game-experience-design      # http://localhost:3030 (presenter view: /presenter)
npm run build -w 04-game-experience-design    # static site in dist/
npm run export -w 04-game-experience-design   # PDF (for handouts add: -- --with-clicks)
npm run shots -w 04-game-experience-design    # re-capture the real game screenshots in public/img/real-*.png
```

## Lesson backbone (what students do, what they should see)

Slide 2 is the whole lesson on one page: **起點 → STEP 1 → STEP 2 → STEP 3**, each with a mockup of what the game looks like at that point.
Every STEP uses the same slide types, and each hands-on slide has a header (STEP n/3, kind, who acts: 老師示範 / 全班一起 / 你自己做):

| Slide type | Answers |
|---|---|
| 目標 | What will my game look like when this step is done? (before → after mockups) |
| 步驟 | What do I do, in order? (6 numbered actions + the one concept needed) |
| Prompt | What do I say to the AI? (copy button, 4-part annotation) |
| 檢查 | How do I know it worked? (checklist, bug-report sentence, symptom table) |

| Part | Slides | Student result | Min |
|---|---|---|---|
| Understand (Mario, 4 stages, our game) + STEP 0 plan card | 1–7 | paper plan card | 15 |
| STEP 1 Start screen (Prompt A) | 8–11 | menu waits for Start | 25 |
| STEP 2 Win / Game Over / Replay (Prompt B) | 12–16 | victory, game over, clean restart | 35 |
| STEP 3 My version (own prompt; Prompt C = optional level 2) | 17–21 | their own change, partner playtest, showcase | 25 |
| Buffer | – | – | 20 |

## Visual system

Light, printer-friendly background; navy text, grass green, restrained orange. Stage colours are used consistently on every slide:
**Start = blue, Play = green, Victory = orange, Game Over = red** (`styles/index.css`).

Components (`components/`): `PromptBox` (copy button), `StateFlow` (state diagram), `ScreenMock` (now / start / play / victory / game-over / mine mockups), `MarioLevel` (original platformer diagram), `Step` (STEP progress + actor badge).

## What is real and what is not

- **Real screenshots** (`public/img/real-*.png`): captured by `scripts/capture-shots.mjs` from the unmodified game with Playwright.
  `real-full-time.png` is the real end-of-game code path, but the clock was fast-forwarded to the last 0.1 s (`timeLeft = 0.1`) so the shot did not need a 60 s wait.
- **Mockups** (`ScreenMock`, `StateFlow`, `MarioLevel`): original illustrations, labelled 示意圖 / 原創示意圖 on the slide. They are **not** screenshots of a finished game, and the Mario illustration uses no Nintendo artwork.
- No JSFiddle screenshots are included (nothing was captured from JSFiddle for this deck).
- The code on slides 9 and 13 is short, hand-written illustration. It passes `node --check` (syntax only); it was **not** run inside the game. The three AI prompts (A, B, C) were **not** executed against an AI tool, so the exact output students get will vary.

## Before class

- Run through Prompt A and B once yourself with the AI tool students will use, and keep a working "after A" and "after B" copy of the game as a rescue file for students who get stuck.
- Slide 12 uses a real behaviour of the starting game: at time-up the HTML text "TIME UP!" and the canvas text "FULL TIME!" overlap.
- Slide 6 says the start button sits under the pitch and the game only shows "GET READY!": that is how the unmodified file behaves.
- The deck loads Noto Sans TC and Press Start 2P from Google Fonts; offline it falls back to system fonts (Microsoft JhengHei etc.).
- Prompt C (two levels) is the hardest; suggest that fast students split it into two steps (level state first, then a faster goalkeeper).
