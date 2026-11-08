// Builds every deck into one static site for GitHub Pages:
//   _site/index.html              course home page listing the decks
//   _site/<deck folder>/          one Slidev build per deck
//
// Run from the repo root: npm run build:site
// The URL base comes from the repo name: GITHUB_REPOSITORY in GitHub Actions,
// otherwise the default below. Pass --base / to preview locally at the server root.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, '_site')
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'vibe-coding-JSFiddle-game'
const baseArg = process.argv.indexOf('--base')
const siteBase = baseArg > -1 ? process.argv[baseArg + 1] : `/${repo}/`

const decks = fs.readdirSync(root)
  .filter(d => /^\d\d-/.test(d) && fs.existsSync(path.join(root, d, 'slides.md')))
  .sort()

fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(out)

const slidev = path.join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')
const list = []
for (const d of decks) {
  const base = `${siteBase}${d}/`
  console.log(`\n▶ ${d}  →  ${base}`)
  execFileSync(process.execPath, [slidev, 'build', '--base', base, '--out', path.join(out, d), '--router-mode', 'hash'],
    { cwd: path.join(root, d), stdio: 'inherit' })
  const head = fs.readFileSync(path.join(root, d, 'slides.md'), 'utf8').split(/^---\s*$/m)[1] ?? ''
  const title = head.match(/^title:\s*(.+)$/m)?.[1].trim() ?? d
  list.push({ n: Number(d.slice(0, 2)), dir: d, title })
}

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const cards = list.map(({ n, dir, title }) => `
    <a class="card" href="./${dir}/">
      <span class="num">第 ${n} 堂</span>
      <span class="title">${esc(title)}</span>
      <span class="go">打開投影片 ➜</span>
    </a>`).join('')

fs.writeFileSync(path.join(out, 'index.html'), `<!doctype html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vibe Coding 遊戲課</title>
<style>
  :root { --bg:#0b0f24; --panel:#141a3a; --text:#f3f5ff; --soft:#aab3d8; --neon:#3ee8ff; --yellow:#ffe066; --pink:#ff5fa2; }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; background:radial-gradient(circle at 20% 0%, #1c2560, var(--bg) 60%); color:var(--text);
         font-family:"Noto Sans TC","Microsoft JhengHei",system-ui,sans-serif; }
  main { max-width:960px; margin:0 auto; padding:48px 16px 64px; }
  h1 { margin:0 0 8px; font-size:clamp(2rem,6vw,3.2rem); color:var(--neon); text-shadow:0 0 18px rgba(62,232,255,.5); }
  .sub { margin:0 0 32px; color:var(--soft); font-size:1.2rem; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:18px; }
  .card { display:flex; flex-direction:column; gap:10px; padding:20px; background:var(--panel); color:var(--text);
          border:3px solid var(--neon); box-shadow:6px 6px 0 #000; text-decoration:none; transition:transform .1s; }
  .card:hover, .card:focus-visible { transform:translate(-2px,-2px); border-color:var(--yellow); outline:none; }
  .num { align-self:flex-start; padding:2px 10px; background:var(--pink); color:#fff; font-weight:900; }
  .title { font-size:1.35rem; font-weight:800; line-height:1.4; }
  .go { margin-top:auto; color:var(--yellow); font-weight:700; }
  footer { margin-top:40px; color:var(--soft); font-size:.95rem; }
</style>
</head>
<body>
<main>
  <h1>🎮 Vibe Coding 遊戲課</h1>
  <p class="sub">選今天上課的投影片，跟著老師一起做遊戲！</p>
  <div class="grid">${cards}
  </div>
  <footer>💡 在投影片裡按 ← → 換頁。看到 📋 複製 按鈕，就可以把 Prompt 複製給 AI。</footer>
</main>
</body>
</html>
`)
console.log(`\n✓ ${list.length} decks → ${path.relative(root, out)}/ (base ${siteBase})`)
