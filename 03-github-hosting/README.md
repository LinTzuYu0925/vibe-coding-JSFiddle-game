# github_hosting — 用 GitHub 幫太空船換裝＆加音效

Slidev deck (18 slides, Traditional Chinese) for the Space Shooter class: host a ship GIF and sounds on GitHub, then use the raw URLs in JSFiddle.

Run from the repo root (dependencies are installed once there, see `../CLAUDE.md`):

```bash
npm run dev -w 03-github-hosting      # http://localhost:3030, presenter view at /presenter
npm run build -w 03-github-hosting    # static site in dist/
```

## Before class

- The BGM/kick buttons in the deck are browser-synthesized stand-ins; only the game-over button plays the real WAV (`public/audio/`).
- Speaker notes on each slide carry timing (≈ 2 hours total) and teacher tips.
- From slide 14 on, students Fork the original game (https://jsfiddle.net/pt7hyo8a/2/) and use an AI tool (ChatGPT, Gemini, …) to edit the JavaScript. Each change has a copyable prompt (`components/PromptBox.vue`, blanks marked with `Ph.vue`) and a check list. Try the Fork once before class to see whether JSFiddle asks for a login.
- `public/img/game-result.png` is the real game running with the example GIF; `fiddle-original.png` is the original fiddle.
- After 檢查點 1, students submit their fiddle link to the Google Classroom task 「打造你的專屬戰機!」 (mock: `components/GcSubmit.vue`), learn the JSFiddle URL scheme (`/編號/版本`), then fork the second game, SUPER STRIKER (https://jsfiddle.net/d0svjbn1/), for the sound tasks: BGM, kick sound, and a time-up sound (`public/img/game-soccer.png`, `fiddle-soccer.png`).
- Prepare `bgm.mp3` and `kick.wav` for students.

## Assets

- `public/img/gh-*.png`, `jsfiddle.png` — real screenshots captured with Playwright (logged out), taken from the example repo.
- File URLs follow what GitHub gives students today: images → right-click the image → `https://github.com/USER/REPO/blob/main/FILE?raw=true`; sounds → right-click **View raw** → `https://github.com/USER/REPO/raw/refs/heads/main/FILE`. Both redirect to raw.githubusercontent.com.
- `public/img/docs-*.png` — official screenshots from docs.github.com ("New repository" menu, repository name field).
- Mocks labeled 示意圖: sign-up form and email code (`GhSignup.vue`, GitHub blocks automated screenshots of /signup), repo Configuration / Public + README (`GhNewRepo.vue`), and upload flow (`GhUpload.vue`) — these pages need a login. To use real screenshots instead, drop a PNG into `public/img/` and swap the component for an `<img>` in `slides.md`.
- GitHub's terms require users to be 13+; see the speaker note on the sign-up slide.
