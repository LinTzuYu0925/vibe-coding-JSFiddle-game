// Writes the teacher's fiddle links into the speaker notes.
// In a note, [[fiddle:rescue1]] becomes a link (opens in a new tab, so the presenter view stays) to the address in ../fiddles.json (the same list <Fiddle k="rescue1" /> uses),
// so the links are filled in one place only.
import fs from 'node:fs'
import path from 'node:path'

export default function ({ filepath }: { filepath: string }) {
  const links: Record<string, string> = JSON.parse(fs.readFileSync(path.join(path.dirname(filepath), 'fiddles.json'), 'utf8'))
  const link = (k: string) => {
    const url = String(links[k] ?? '').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '')
    return url ? `<a href="https://${url}" target="_blank" rel="noopener" style="color:#ffe45e;font-weight:bold;text-decoration:underline">🔗 ${url}</a>` : `jsfiddle.net/（老師課前填入 fiddles.json 的 ${k}）`
  }
  return [{
    transformNote: (note?: string) => note?.replace(/\[\[fiddle:(\w+)\]\]/g, (_: string, k: string) => link(k)),
  }]
}
