// Scans course text for Simplified characters and Mainland vocabulary.
// Usage (repo root): node scripts/check-zh.mjs [files or deck folders ...]   (default: every deck)
// Scans .md, .vue, .html, .css, .mjs under the given paths (skips node_modules, dist, public).
// A line that must quote Simplified text on purpose (for example a JSFiddle UI label shown in
// Simplified Chinese) can end with the comment marker  zh-ok  to be skipped.
// Exit code 1 when anything is found, so it can gate a build.
import fs from 'node:fs'
import path from 'node:path'

// Simplified-only forms of characters common in this course (their Traditional forms differ).
const SIMPLIFIED = '这们个时说会对发过还样么没问题从与关开动现进见经实点体头场应长东车门间学习写图华书价单戏级战胜败帮页键钮击讯网络软数据设计码编让给种处画务输认记录话语读选择换变将难双听声乐视频览标签载运测试错误显线颜号节观传递储档态边启项复删资获访账户联创脚构护队鲁戏贴贝'
  .split('')
// Mainland terms written in Traditional characters → Taiwan wording.
const TERMS = {
  '程序': '程式', '代碼': '程式碼', '軟件': '軟體', '數據': '資料', '函數': '函式', '變量': '變數',
  '對象': '物件', '網絡': '網路', '接口': '介面', '默認': '預設', '運行': '執行', '服務器': '伺服器',
  '鼠標': '滑鼠', '視頻': '影片', '屏幕': '螢幕', '點擊': '點一下／按', '登錄': '登入', '賬號': '帳號',
  '用戶': '使用者', '信息': '訊息／資訊', '菜單': '選單', '硬件': '硬體', '設置': '設定', '激活': '啟用',
  '質量': '品質', '文件夾': '資料夾', '打印': '列印', '粘貼': '貼上', '剪切': '剪下', '視圖': '檢視',
}

const exts = new Set(['.md', '.vue', '.html', '.css', '.mjs'])
const skip = new Set(['node_modules', 'dist', 'public', '.git', '_site'])
const walk = p => fs.statSync(p).isDirectory()
  ? fs.readdirSync(p).filter(f => !skip.has(f)).flatMap(f => walk(path.join(p, f)))
  : exts.has(path.extname(p)) ? [p] : []
const args = process.argv.slice(2)
const roots = args.length ? args : fs.readdirSync('.').filter(d => /^\d\d-/.test(d))
const files = roots.flatMap(walk).filter(f => !f.endsWith(path.join('scripts', 'check-zh.mjs')))

let hits = 0
for (const f of files) {
  fs.readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    if (/zh-ok/.test(line)) return
    const found = []
    for (const c of SIMPLIFIED) if (line.includes(c)) found.push(`簡體「${c}」`)
    for (const [bad, good] of Object.entries(TERMS)) if (line.includes(bad)) found.push(`「${bad}」→「${good}」`)
    if (found.length) { hits++; console.log(`${f}:${i + 1}  ${found.join(' ')}\n    ${line.trim().slice(0, 120)}`) }
  })
}
console.log(hits ? `\n${hits} line(s) to fix (or mark with zh-ok if quoting on purpose) in ${files.length} files` : `clean: ${files.length} files`)
process.exit(hits ? 1 : 0)
