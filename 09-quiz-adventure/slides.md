---
theme: default
title: 問答闖關：AI 出題，你來檢查
info: |
  國小 Vibe Coding 遊戲課第 9 堂：請 AI 出 10 題自己選的主題，抓出並修好有問題的題目；做出有對錯回饋、會贏也會輸的問答遊戲。
colorSchema: dark
layout: default
transition: slide-left
mdc: true
aspectRatio: 16/9
fonts:
  provider: none
---

# 問答闖關：AI 出題，你來檢查

<div class="cols" style="grid-template-columns:3fr 2fr;align-items:center;margin-top:.6rem">
<div>
  <div class="tag green" style="font-size:.9rem">第 9 堂</div>
  <div class="big">今天做一個<br><span class="yellow">題目由你決定</span>的問答遊戲 ❓</div>
  <div class="row" style="justify-content:flex-start;gap:.5rem;margin-top:1.2rem">
    <span class="tag neon">❓ 10 題我的主題</span>
    <span class="tag orange">✔ ✘ 對錯回饋</span>
    <span class="tag">⭐ 星星</span>
    <span class="tag pink">❤️ 三顆愛心</span>
    <span class="tag green">🕵️ 抓 AI 的錯題</span>
  </div>
  <p class="small" style="margin-top:1.2rem">國小 Vibe Coding 遊戲課 · JSFiddle ＋ AI</p>
</div>
<div class="center">
  <div class="shot fit" style="--h:19rem">
    <span class="label tag neon">真實畫面 · 老師的完成版</span>
    <img src="/img/real-right.png" alt="The finished quiz: the right answer turned green, 答對了">
  </div>
</div>
</div>

<!--
⏱ 1 分鐘。「今天做問答遊戲。題目不是老師出，是你選一個主題，請 AI 出題。」

【課前準備，第一次用這份投影片一定要看】
1. 建立 5 個 fiddle（原始碼都在 09-quiz-adventure/starter/，每個檔案裡 CSS、HTML、JavaScript 窗格的內容有註解標好，分別貼進 JSFiddle 再 Save）：
   起始遊戲 quiz-adventure-0.html、完整版 full-game.html（第 2 頁老師玩的）、救援 1、救援 2、救援 3。
2. 把 5 個網址填進 09-quiz-adventure/fiddles.json（只要改這一個地方：投影片上的連結和講者備註裡的網址都會自動更新），再 push。
   沒填的話，投影片和備註會顯示「老師課前填入」。
3. 救援和完整版的連結只放在第 27 頁「救援站」（學生網站也看得到），STEP 頁面上沒有連結，免得學生點錯、跑進別的遊戲。
   要給學生救援時，說「翻到第 27 頁，Fork 救援 2」。每一頁右下角都有頁碼。
4. Google Classroom 建立作業「第 9 堂：問答闖關」，加兩個「選填」欄位：設計卡（目標／規則／挑戰／回饋）、「我抓到的錯題：第＿題」。
5. 自己用第 10 頁的 Prompt 問 ChatGPT 或 Gemini 兩次以上：免費帳號會回傳完整 JS 嗎？正確答案位置有打散嗎？有沒有錯題？留一個真的錯題當第 12 頁的例子。

網址（課前填好 fiddles.json 後這裡會自動出現）：

起始遊戲 [[fiddle:starter]]

完整版 [[fiddle:full]]

救援 1 [[fiddle:rescue1]]

救援 2 [[fiddle:rescue2]]

救援 3 [[fiddle:rescue3]]
-->

---

# 電腦說我錯了？

<Step label="暖身" actor="all" />

<div class="cols" style="grid-template-columns:1.1fr 1fr;margin-top:.1rem;align-items:center">
<div class="center">
  <div class="shot fit" style="--h:19.5rem">
    <span class="label tag neon">真實畫面 · 老師的完成版</span>
    <img src="/img/real-hook-wrong.png" alt="台灣最高的山: the player chose 玉山, the game says wrong and shows 雪山 in green">
    <div class="hl" style="left:3.6%;top:44%;width:45.6%;height:16%"></div>
    <div class="hl-note" style="left:20%;top:35.5%">👇 全班喊：玉山！</div>
  </div>
</div>
<div>
  <ol class="steps">
    <li>老師玩<b>完成版</b>，大家一起喊答案</li>
    <li>第 1 題：台灣最高的山？<br>全班喊「<b class="yellow">玉山</b>」</li>
    <li>遊戲說：<b class="pink">✘ 答錯了</b> 😱</li>
  </ol>
  <div class="card yellow center" style="margin-top:1rem"><span class="q">❓ 是我們錯，<br>還是遊戲錯？</span></div>
</div>
</div>

<!--
完整版 [[fiddle:full]]

⏱ 5 分鐘。打開上面的完整版（投影出來，按 Run → 開始）。
第 1 題「台灣最高的山是哪一座？」請全班一起喊答案，老師照大家喊的按「玉山」。遊戲會說 ✘，還把「雪山」變綠色。
停下來問：「是我們錯，還是遊戲錯？」讓學生吵一下。有人說「玉山才對」，就問：「你怎麼知道？」（課本、去過、問大人）
先不要揭曉原因，下一頁再說。接著再玩 3–4 題（這些題目都是對的），讓大家看到答對時按鈕變綠、分數 +1。
事實：玉山約 3952 公尺，是台灣最高的山；雪山約 3886 公尺，是第二高。
這個完整版就是今天大家要做出來的遊戲，只是題目換成你自己的主題。
-->

---

# 答案是誰寫的？

<div class="flow" style="margin-top:.3rem">
  <div class="card yellow" style="flex:1.3">
    <div class="tag">📋 題目清單</div>
    <div style="text-align:left;font-size:1.1rem;line-height:1.7">
      題目：台灣最高的山？<br>
      選項：玉山、雪山、合歡山、阿里山<br>
      答案：<b class="pink" style="border:3px solid var(--pink);padding:0 .3rem">雪山</b> ← 寫錯了！
    </div>
  </div>
  <div class="arrow-r">➜</div>
  <div class="card" style="flex:1">
    <div class="tag neon">🤖 遊戲比一比</div>
    <div style="font-size:1.15rem;line-height:1.7">你按的：<b class="yellow">玉山</b><br>清單寫的：<b>雪山</b><br>一不一樣？</div>
  </div>
  <div class="arrow-r">➜</div>
  <div class="card pink" style="flex:.8">
    <div class="tag pink">結果</div>
    <div class="big pink">✘</div>
    <div style="font-size:1.1rem">說你答錯</div>
  </div>
</div>

<div class="card green center" style="margin-top:1rem;font-size:1.3rem">遊戲<b>不知道</b>哪座山最高，它只會拿你按的答案<b>跟清單比</b>。<br>清單寫錯，遊戲就跟著錯。</div>

<div class="card orange center" style="font-size:1.6rem;font-weight:900">🤖 今天的題目請 AI 寫 → 🧑 <span class="yellow">你來檢查</span></div>
<div class="small">示意圖</div>

<!--
⏱ 2 分鐘。揭曉：「遊戲其實不懂地理。它只做一件事：把你按的答案，跟題目清單上寫的答案比一比。清單上寫雪山，所以你按玉山它就說錯。」
「題目清單是誰寫的？這一題是老師故意寫錯的。今天你們的題目要請 AI 寫，AI 也會寫錯，所以要你來檢查。」
念最下面那一句，這是今天跟 AI 合作的重點：上一堂是「AI 的程式會寫錯，玩過才存」，今天是「AI 寫的內容（題目）也會錯，要查過」。
-->

---

# 今天的重點字：回饋

<div style="display:grid;grid-template-columns:1fr 1fr 1fr 2.2fr;gap:.7rem;margin-top:.1rem;align-items:stretch">
  <div class="card" style="margin:0;opacity:.6"><div class="tag neon">目標</div><div class="small">我要做到什麼？</div></div>
  <div class="card green" style="margin:0;opacity:.6"><div class="tag green">規則</div><div class="small">可以做什麼、不能做什麼？</div></div>
  <div class="card pink" style="margin:0;opacity:.6"><div class="tag pink">挑戰</div><div class="small">什麼讓它變難？</div></div>
  <div class="card orange" style="margin:0;border-width:6px"><div class="tag orange">回饋 Feedback</div><div class="yellow" style="font-weight:900;font-size:1.3rem">我做了一件事，<br>遊戲怎麼回答我？</div></div>
</div>

<div class="q" style="margin-top:.9rem;font-size:1.4rem">❓ 剛剛答完一題，遊戲怎麼回答你？</div>

<div class="row" style="margin-top:.5rem;gap:.6rem;flex-wrap:nowrap">
  <div class="card green center" style="flex:1;margin:0"><div class="big">✔ ✘</div>對還是錯</div>
  <div class="card green center" style="flex:1;margin:0"><div class="big">🟩</div>正確答案亮綠色</div>
  <div class="card green center" style="flex:1;margin:0"><div class="big">+1</div>分數變多</div>
  <div class="card green center" style="flex:1;margin:0"><div class="big">⭐⭐⭐</div>最後拿幾顆星</div>
</div>

<div class="small" style="margin-top:.6rem">🧠 第 8 堂的回饋：翻開看到 emoji、配對成功<b>變綠色留著</b>、翻錯 1 秒後蓋回</div>

<!--
⏱ 3 分鐘。「上一堂學過遊戲設計四個字。今天看哪一個？回饋：我做了一件事，遊戲怎麼回答我。」
問：「剛剛老師按了答案，遊戲怎麼回答？」讓學生說，說到一個就指下面一張卡（✔ ✘、正確答案亮綠、分數、星星）。
「答錯的時候，為什麼要把正確答案變綠色？」（讓玩的人學到正確答案）這是好的回饋。
「如果按了答案什麼都沒發生呢？」（以為壞掉了）起始遊戲現在就是這樣，STEP 2 要加回饋。
-->

---

# 今天的路線圖

<div class="card orange" style="margin-top:.1rem;font-size:1.2rem">🤖 <b>今天跟 AI 學：</b>請 AI 出<b>題目</b>（不只是程式）→ AI 寫的內容也會錯 → <b class="yellow">你來抓錯、請它修好</b></div>

<div class="flow road" style="margin-top:.8rem">
  <div class="card"><div class="tag neon">起始遊戲</div><img src="/img/real-starter.png" alt=""><div>3 題台灣題</div></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">STEP 1</div><img src="/img/real-step1.png" alt=""><div>10 題我的主題</div><div class="pf">✏️ 填 4 格</div></div>
  <div class="arrow-r">➜</div>
  <div class="card orange"><div class="tag orange">🕵️ 抓錯題</div><div style="font-size:3.2rem;line-height:7.2rem">🔎</div><div>修好一題</div><div class="pf">✏️ 填 3 格</div></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">STEP 2</div><img src="/img/real-wrong.png" alt=""><div>對錯回饋 ⭐</div><div class="pf">✏️ 填 5 格</div></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">STEP 3</div><img src="/img/real-lose.png" alt=""><div>愛心與輸贏</div><div class="pf">✏️ 四格都填</div></div>
  <div class="arrow-r">➜</div>
  <div class="card green"><div class="tag green">我的版本</div><div style="font-size:3.2rem;line-height:7.2rem">🎨</div><div>自己選一個改</div><div class="pf">✏️ 自己寫</div></div>
</div>
<div class="small" style="margin-top:.5rem">小圖都是<b>真實畫面</b>（老師的遊戲每一步的樣子）</div>

<style>
.road .card { padding: .35rem; font-size: 1rem; font-weight: 900; }
.road img { height: 7.2rem; width: auto; margin: .2rem auto; display: block; border: 2px solid #fff; }
.road .pf { margin-top: .25rem; background: var(--pink); color: #000; font-size: .95rem; }
.road .arrow-r { font-size: 1.2rem; }
</style>

<!--
⏱ 2 分鐘。先念橘色那一行：「上一堂我們學到 AI 寫的程式會錯。今天請 AI 寫題目，題目也會錯，要你們來抓。」
從左到右指一遍：起始遊戲只有 3 題 → STEP 1 換成 10 題你自己的主題 → 抓一題 AI 寫錯的、請它修好 → STEP 2 答對答錯有回饋、最後有星星 → STEP 3 三顆愛心、會輸 → 我的版本。
指粉紅色 ✏️：「Prompt 要你自己填的地方又變多了：STEP 3 四格整格都是你寫，『我的版本』整個 Prompt 自己寫。」
-->

---

# Fork 今天的起始遊戲

<Step label="SETUP" n="1" actor="all" />

<div class="cols" style="grid-template-columns:2fr 3fr;margin-top:.1rem">
<div>
  <ol class="steps" style="font-size:1.15rem">
    <li>點開起始遊戲：<br><Fiddle k="starter" /></li>
    <li>按上方 <b class="yellow">Fork</b>（分岔箭頭）</li>
    <li>網址的<b>遊戲編號</b>變了 = <b class="green">你自己的</b> 🎉</li>
    <li>按 <b class="neon">☁️ Save</b> 存一次</li>
  </ol>
  <div class="warn" style="font-size:1.05rem">⚠️ 遊戲編號跟起始遊戲<b>一樣</b>？<br>→ 還沒 Fork，回到第 2 步</div>
  <div class="small" style="margin-top:.5rem">右圖是第 2 堂的遊戲，按鈕位置一樣</div>
</div>
<div class="shot">
  <span class="label tag neon" style="left:.6rem;right:auto">真實畫面 · JSFiddle</span>
  <img src="/img/fiddle-original.png" alt="JSFiddle editor with the Fork and Save buttons at the top">
  <div class="hl" style="left:57.4%;top:1.4%;width:5.2%;height:6%"></div>
  <div class="hl-note" style="left:52%;top:9.5%">👆 Fork</div>
  <div class="hl" style="left:53.7%;top:1.4%;width:3.7%;height:6%;border-color:var(--neon);box-shadow:0 0 14px var(--neon);animation:none"></div>
  <div class="hl-note" style="left:38%;top:9.5%;background:var(--neon)">☁️ Save</div>
</div>
</div>

<!--
起始遊戲 [[fiddle:starter]]

⏱ 2 分鐘（登入時間不算在這裡，已經在另外 30 分鐘裡）。全班一起做，老師投影自己的畫面同步操作。上一堂做過，這次只是提醒。
「今天是新遊戲，不要打開上次的記憶翻牌，要 Fork 今天的起始遊戲。」
做完請大家看網址：jsfiddle.net/遊戲編號/版本編號。遊戲編號跟投影片上的不一樣才對。
右邊截圖是第 2 堂 Space Shooter 的 fiddle，按鈕位置一樣。截圖上的「运行」是 JSFiddle 跟著瀏覽器語言顯示的（zh-ok），學生畫面可能是 Run 或「執行」。
Fork 好請學生按 Run → 開始，玩一下：按任何答案都只會跳下一題，沒有對錯、沒有分數，第 3 題後又回到第 1 題。這就是今天要改的地方。
-->

---

# 新點子：題目是資料，規則不用改

<div class="cols" style="grid-template-columns:1fr 1.15fr;margin-top:-.1rem;gap:1.2rem">
<div>
  <div class="flow" style="gap:.5rem">
    <div class="card yellow"><div class="tag">📋 資料 Data</div><div class="big">🗂️</div>一疊題目卡<br><span class="small">題目、選項<br>答案</span></div>
    <div class="card"><div class="tag neon">⚖️ 規則 Rules</div><div class="big">🧑‍⚖️</div>裁判<br><span class="small">比答案、加分<br>扣愛心</span></div>
  </div>
  <div class="card green center" style="margin-top:.8rem;font-size:1.2rem">換一疊題目卡 ＝ 一個新遊戲<br><b class="yellow">裁判的規則不用改</b></div>
  <div class="card" style="font-size:1.05rem"><b>🔍 找找看</b>：點 JS 窗格 → <code>Ctrl+F</code> → 打 <code>questions</code> → Enter</div>
</div>
<div>
<div class="small" style="margin-bottom:.2rem">真的程式：起始遊戲 JavaScript 第 5–12 行</div>

```js {7,11} {lines:true,startLine:5}
// ===== 題目清單（資料）=====
// 每一題有：question 題目、choices 四個選項、answer 正確答案
const questions = [
  {
    question: "台灣最高的山是哪一座？",
    choices: ["玉山", "雪山", "合歡山", "阿里山"],
    answer: "雪山"
  },
```

<div style="font-size:1.1rem;line-height:1.6">
  第 7 行 <code>questions</code>＝<b>題目清單</b>從這裡開始<br>
  第 11 行 <code>answer</code>＝<b>正確答案</b>（看！就是寫錯的那一題）
</div>
</div>
</div>

<!--
⏱ 4 分鐘。小遊戲：老師拿一疊紙卡當題目卡，請一位同學當裁判。「裁判的工作是什麼？」（看答案對不對、加分）
「如果我換一疊恐龍題目卡，裁判要重新學規則嗎？」（不用，規則一樣）
「遊戲也一樣：上面一大段是題目清單（資料），下面是遊戲規則。今天 STEP 1 只換資料，規則不動。」
全班一起：點 JS 窗格 → Ctrl+F → questions → Enter，找到第 7 行。再請大家看第 11 行：answer 寫的就是「雪山」，第 2 頁的錯就在這裡。
Ctrl+F：要先點一下 JavaScript 窗格裡面，再按 Ctrl+F，JSFiddle 才會在程式裡找。
不用學陣列、物件這些名詞，只說「題目清單」。
-->

---

# STEP 1 目標：換成我的題目

<Step n="1" kind="目標" actor="all" />

<div style="display:flex;align-items:center;justify-content:center;gap:1rem;margin-top:-.3rem">
  <div class="shot fit" style="--h:11.5rem"><span class="label tag neon">現在</span><img src="/img/real-starter.png" alt="Starter: question 1 of 3, 台灣最高的山"></div>
  <div class="big yellow">➜</div>
  <div class="shot fit" style="--h:11.5rem"><span class="label tag green">STEP 1 完成</span><img src="/img/real-step1.png" alt="Rescue 1: question 1 of 10, an animal question"></div>
</div>

<div class="row" style="margin-top:.7rem;gap:.6rem;align-items:stretch;font-size:1.05rem">
  <div class="card green" style="flex:1.3;margin:0"><b>✅ 你會看到</b><br><b class="yellow">10</b> 題<b class="yellow">我的主題</b>；每題<b>四個選項</b>、<b>只有一個對</b>、<b>適合小學生</b>；正確答案的<b>位置打散</b></div>
  <div class="card pink" style="flex:1;margin:0"><b>❌ 不能發生</b><br>題目沒換、按鈕或「開始」壞掉</div>
  <div class="card" style="flex:.9;margin:0"><b>⏭️ 之後再做</b><br>對錯、分數：STEP 2</div>
</div>
<div class="card yellow" style="margin-top:.6rem;font-size:1.05rem">💡 <b>主題靈感</b>：恐龍 🦖　太空 🚀　海洋動物 🐙　台灣夜市 🍢　寶可夢 ⚡　國小數學 ➗　世界國旗 🏳️　……自己想的也可以！</div>
<div class="small" style="margin-top:.3rem">兩張都是<b>真實畫面</b>（老師的起始遊戲和救援 1）</div>

<!--
⏱ 2 分鐘。「STEP 1 只換題目清單：3 題台灣小知識 → 10 題你自己選的主題。」
請 2–3 位同學說說想做什麼主題。上一堂預告時請大家想過一個主題。
綠色卡就是下一頁 Prompt 要填的答案：10 題、我的主題、四個選項只有一個對、適合小學生、正確答案的位置打散。
「為什麼正確答案的位置要打散？」（如果都在左上角，玩的人一直按左上角就全對了）
主題太大或太難（「全部的歷史」）就建議縮小（「台灣的節日」）。
-->

---

# STEP 1 步驟

<Step n="1" kind="步驟" actor="all" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.2rem">
<div>
  <ol class="steps" style="font-size:1.12rem">
    <li><b>複製程式</b>：點一下 JSFiddle 的 JavaScript 窗格 → <code>Ctrl+A</code> 全選 → <code>Ctrl+C</code></li>
    <li><b class="pink">✏️ 填 4 格</b>：下一頁粉紅色的框，主題只要打<b>一個詞</b>，<b class="green">變綠色</b>就對了</li>
    <li><b>貼上程式</b>：最後一個框點一下 → <code>Ctrl+V</code></li>
    <li><b>貼給 AI</b>：按「📋 複製」→ AI 對話框 <code>Ctrl+V</code> → 送出</li>
    <li><b>整段換掉</b>：AI 程式框右上角按「複製」→ JavaScript 窗格 <code>Ctrl+A</code> → <code>Ctrl+V</code></li>
    <li><b class="yellow">先玩，再存</b>：按 <b>Run</b> 玩一玩，照第 11 頁檢查，才按 <b>☁️ Save</b></li>
  </ol>
</div>
<div>
  <div class="card pink" style="margin-top:.3rem;font-size:1.1rem"><b>🙅 題目裡不要寫</b><br>同學的名字、別人的私事、<br>會讓人難過的話</div>
  <div class="card yellow" style="font-size:1.05rem"><b>🖱️ 不會用快捷鍵？</b><br>在窗格裡按<b>滑鼠右鍵</b>：<br>全選 → 複製 → 貼上</div>
  <div class="card" style="font-size:1.05rem">程式會變長很多（10 題！），<br>AI 要給<b>完整</b>的程式</div>
</div>
</div>

<!--
⏱ 3 分鐘。全班一起：老師投影，一步一步示範第 1–5 步，學生跟著做。上一堂做過，速度可以快一點。
第 2 步：主題只打一個詞（恐龍、太空……），其他格可以點右邊黃色的字填進去，不用打字。
提醒粉紅卡：題目會給別人玩，不寫同學的名字或私人的事（例如「誰最胖」）。
第 1 步最常錯：沒有先點進 JavaScript 窗格，Ctrl+A 會選到整個網頁。
第 5 步：ChatGPT 程式框右上角有「Copy code／複製程式碼」，Gemini 是一個複製圖示。只複製程式框，不要複製 AI 的說明文字。
10 題會讓程式多 40–60 行。AI 如果寫「其餘不變」或「…」，回它：「請給我完整的 JavaScript，從第一行到最後一行，不要省略。」
-->

---

# STEP 1 Prompt

<Step n="1" kind="Prompt" actor="all" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 STEP 1：換成我的題目">
<p>我在 JSFiddle 做一個「問答闖關」遊戲。HTML 和 CSS 已經做好了，請只改 JavaScript。程式最上面的 questions 是題目清單：每一題有 question（題目）、choices（四個選項）、answer（正確答案，要跟其中一個選項一模一樣）。</p>
<p><b>① 加什麼：</b>把題目清單換成<Ph number>幾</Ph>題關於<Ph>我的主題</Ph>的新題目。</p>
<p><b>② 怎麼動：</b><Ph>題目要怎樣？</Ph></p>
<p><b>③ 不能弄壞：</b>只換題目清單；「開始」按鈕、四個答案按鈕和下面的遊戲規則都不要改。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 填 4 格</b>（看第 8 頁綠色卡）<br>
    <span class="n">1</span>幾題？　<span class="n">2</span>主題打<b>一個詞</b><br>
    <span class="n">3</span>題目要怎樣？先點框框，再點字：
    <Bank words="每題四個選項|只有一個是對的|適合小學生|正確答案的位置要打散" />
    <span class="n">4</span>怎麼玩來檢查？
    <Bank words="玩前三題|看題目是不是我的主題" />
  </div>
  <div class="card green checks" style="font-size:1.05rem"><b>🔍 貼回去以後</b>
    <ol class="steps">
      <li><code>Ctrl+F</code> 搜尋<b>你的主題詞</b>：找得到</li>
      <li>Run → 開始：右上角寫 <b>第 1 / 10 題</b></li>
    </ol>
  </div>
</div>
</div>

<!--
⏱ 5 分鐘。老師先完整做一次（用「動物」或自己的主題），學生跟著做。
填空答案：①「10」② 自己的主題，一個詞（例如「恐龍」）③ 點四個字都放進去：「每題四個選項、只有一個是對的、適合小學生、正確答案的位置要打散」④「玩前三題、看題目是不是我的主題」。
③ ④ 可以不打字：先點那一格的框框，再點右邊黃色的字（點幾個字會用「、」連起來）。
第一段是老師寫好的：告訴 AI 題目清單長什麼樣子（question、choices、answer），AI 才不會亂改格式。
AI 常見錯誤：
・只給題目清單，沒給完整程式（「下面的程式不變」）：回它「請給我完整的 JavaScript」。
・answer 跟選項差一個字（選項「8 隻」、答案「8」）：這題永遠答不對。第 12 頁會抓。
・正確答案都放在第一個選項：第 12 頁也會抓。
・改了下面的規則（例如自己加了分數）：沒關係，只要題目對、能玩就好；但 STEP 2 要記得貼最新的程式。
-->

---

# STEP 1 檢查

<Step n="1" kind="檢查" actor="all" />

<div class="cols" style="grid-template-columns:1.25fr 1fr;margin-top:-.2rem">
<div>
<ul class="check" style="font-size:1.15rem">
  <li>按 <b>Run</b> → 按「開始」：看到第 1 題</li>
  <li>題目是<b>我的主題</b></li>
  <li>右上角寫 <b>第 1 / 10 題</b></li>
  <li>四個按鈕都有字，按了會<b>跳下一題</b></li>
  <li><code>Ctrl+F</code> 搜尋 <code>questions</code>：找得到</li>
</ul>
<div class="card green" style="font-size:1.1rem;margin-top:.5rem">🎉 5 項都打勾 → 按 <b>☁️ Save</b> → STEP 1 完成！</div>
<div class="small">😵 卡住 10 分鐘？<b>舉手</b>，老師會告訴你怎麼辦</div>
</div>
<div>
  <div class="card orange bug" style="margin-top:0"><b>🪲 壞掉了？這樣告訴 AI：</b><br>
  ❌ 「不能玩，幫我修好」<br>
  ✅ 「我按開始後，按鈕上沒有字，題目也是空的。我希望看到第 1 題和四個選項。」
  <div class="small" style="margin-top:.3rem">＝ 我做了什麼 ＋ 看到什麼 ＋ 我期待什麼</div>
  </div>
  <div class="card pink" style="font-size:1.05rem">一次只說<b>一個</b>問題，<br>再貼上<b>最新</b>的 JavaScript</div>
</div>
</div>

<!--
救援 1 [[fiddle:rescue1]]

⏱ 3 分鐘。請學生一項一項打勾（用手指著螢幕念出來就好，不用寫）。全部打勾才按 ☁️ Save。
這一步先不用檢查題目的答案對不對，下一頁專門做。
卡住 10 分鐘、或 AI 額度用完的學生：請他翻到第 27 頁「救援站」，Fork 救援 1（10 題「動物」題目，已經檢查過沒有錯），再按一次 ☁️ Save。
用救援 1 的學生，下一頁還是可以抓錯：請他跟夥伴交換，檢查夥伴的題目；或在「我的版本」再請 AI 換成自己的主題。
常見問題：按鈕上沒字或整個空白 = AI 把題目格式改了（例如 options 不是 choices），把這句話告訴 AI。
-->

---

# 抓錯題偵探

<Step label="偵探" actor="pair" />

<div class="cols" style="grid-template-columns:1.35fr 1fr;margin-top:-.3rem;gap:1rem">
<div>
  <div style="font-weight:900;margin-bottom:.2rem">AI 出的題目，常見<b class="pink">四種錯</b>：</div>
  <div class="bad4">
    <div class="card pink"><b>① 答案錯</b><br>台灣最高的山？<br>答案：<s>雪山</s></div>
    <div class="card pink"><b>② 兩個都對</b><br>哪一個是水果？<br>蘋果、<b>香蕉</b>、石頭、椅子</div>
    <div class="card pink"><b>③ 題目看不懂</b><br>「它最大的是哪一個？」<br>它是誰？</div>
    <div class="card pink"><b>④ 答案都在同一格</b><br>10 題的答案<br>都在左上角</div>
  </div>
  <div class="small">四張都是<b>示意</b>的例子</div>
</div>
<div>
  <div style="font-weight:900;margin-bottom:.2rem">🔎 怎麼查？照順序試：</div>
  <ol class="steps" style="font-size:1.1rem">
    <li>🧠 <b>我自己知道嗎？</b></li>
    <li>👫 <b>問夥伴</b>（或老師）</li>
    <li>🌐 <b>Google</b>：兩個網站都一樣才算</li>
  </ol>
  <div class="card yellow" style="font-size:1.08rem"><b>👫 交換玩</b><br>跟隔壁交換電腦，玩對方的 10 題<br>→ 指出<b>一題</b>怪怪的</div>
  <div class="card green" style="font-size:1.05rem">找到了？記住：<b>第幾題</b>、<b>哪裡怪</b>、<b>查到什麼</b></div>
</div>
</div>

<style>
.bad4 { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
.bad4 .card { margin: 0; font-size: 1.02rem; line-height: 1.45; }
</style>

<!--
⏱ 6 分鐘。「AI 出題很快，但它不一定每題都對。今天每個人要當偵探，至少抓到一題怪怪的。」
先講四種錯（每種念例子）：
① 答案錯：就是第 2 頁那一題。② 兩個選項都對：香蕉和蘋果都是水果，玩的人選哪個都應該對。③ 題目看不懂：沒說清楚「它」是什麼。④ 正確答案都在同一個位置：玩的人很快就發現祕密。
三招查證：先自己想，再問夥伴，最後才 Google。老師在投影幕示範一次 Google：搜尋「台灣最高的山」，打開兩個網站，都說玉山（約 3952 公尺）才算數。
提醒：搜尋最上面的 AI 摘要也可能錯，要點進網站看。
交換玩：兩人一組交換電腦，各玩對方的 10 題（約 2 分鐘），指出一題可疑的，再換回自己的電腦。
如果真的一題都沒錯：選一題「最可能讓人搞混」的，或檢查答案位置（④）。用救援 1 的學生就幫夥伴抓。
課前：用第 10 頁 Prompt 問 AI 時，若抓到真的錯題，可以把它換進這一頁當例子。
Classroom 作業有選填欄位「我抓到的錯題：第＿題」。
-->

---

# 告訴 AI 修好一題

<Step label="修一題" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 修好一題">
<p>我在 JSFiddle 做「問答闖關」遊戲。程式最上面的 questions 題目清單裡，有一題怪怪的。HTML 和 CSS 已經做好了，請只改 JavaScript。</p>
<p><b>① 加什麼：</b>修好第<Ph number>幾</Ph>題。</p>
<p><b>② 怎麼動：</b>這一題<Ph pick="答案是錯的|兩個選項都對|題目看不懂" />。我查到的正確答案是<Ph>正確答案</Ph>。請修好這一題；修不好的話，就換成一題新的、確定是對的題目。</p>
<p><b>③ 不能弄壞：</b>其他題目和遊戲規則都不要改。</p>
<p><b>④ 怎麼檢查：</b>我會玩到這一題，按正確答案看看。</p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 填 3 格</b>（你剛剛抓到的）<br>
    <span class="n">1</span>第幾題？<br>
    <span class="n">2</span>哪裡怪？選一個<br>
    <span class="n">3</span>你查到的正確答案
  </div>
  <div class="card yellow" style="font-size:1.05rem">一次只說<b>一題</b><br>抓到「答案都在同一格」？送出前在最後補一句：「正確答案的位置要打散」</div>
  <div class="card green checks" style="font-size:1.05rem"><b>🔍 貼回去以後</b>
    <ol class="steps">
      <li><code>Ctrl+F</code> 搜尋<b>正確答案</b>：找得到</li>
      <li>玩到這一題，按它：<b>沒壞</b>才 ☁️ Save</li>
    </ol>
  </div>
</div>
</div>

<!--
⏱ 4 分鐘。學生自己做。「一次只說一題：第幾題、哪裡怪、你查到什麼。」
填空：① 題號（數字）② 選一個（沒有標準答案，選你看到的那種錯）③ 自己查到的答案，幾個字（例如「玉山」）。
抓到的是「④ 答案都在同一格」的學生：② 隨便選一個沒關係，請他在送出前多打一句「正確答案的位置要打散」，或直接跟 AI 說「10 題的正確答案都在第一個，請把位置打散」。
現在還沒有對錯回饋，所以「按正確答案看看」只能看到跳下一題；Ctrl+F 搜尋新答案是主要的檢查。STEP 2 做好以後，按下去就會變綠色。
AI 修完還是錯、或說不清楚：請它「換一題新的、確定是對的題目」。
AI 常見錯誤：順便把別的題目也改了（③ 寫了不要改）；只回傳那一題（要完整 JS）。
-->

---

# STEP 2 目標：答完要有回饋

<Step n="2" kind="目標" actor="me" />

<div class="cols" style="grid-template-columns:1fr 1fr 1fr;margin-top:-.4rem;gap:.8rem;align-items:start">
  <div class="center">
    <div class="shot fit" style="--h:12rem"><span class="label tag green">✔ 答對</span><img src="/img/real-right.png" alt="Right answer: green button, 答對了"></div>
    <div class="card green" style="font-size:1rem;margin-top:.7rem">按的按鈕<b>變綠</b>、分數 <b>+1</b>、顯示「✔ 答對了！」</div>
  </div>
  <div class="center">
    <div class="shot fit" style="--h:12rem"><span class="label tag pink">✘ 答錯</span><img src="/img/real-wrong.png" alt="Wrong answer: red button, the right one green"></div>
    <div class="card pink" style="font-size:1rem;margin-top:.7rem">按的按鈕<b>變紅</b>，<b>正確答案變綠</b>，分數不變</div>
  </div>
  <div class="center">
    <div class="shot fit" style="--h:12rem;border-color:var(--c-win)"><span class="label tag orange">🏆 答完</span><img src="/img/real-win.png" alt="Win screen with three stars"></div>
    <div class="card orange" style="font-size:1rem;margin-top:.7rem">9–10 題 ⭐⭐⭐<br>6–8 題 ⭐⭐　其他 ⭐</div>
  </div>
</div>

<div class="row" style="margin-top:.3rem;gap:.6rem;font-size:1.05rem;align-items:stretch">
  <div class="card" style="flex:1;margin:0">⏱ 等 <b>1 秒</b>，再到下一題</div>
  <div class="card pink" style="flex:1.4;margin:0"><b>❌ 不能發生</b>：等的時候<b>連按</b>，分數加很多</div>
</div>
<div class="small" style="margin-top:.2rem">三張都是<b>真實畫面</b>（救援 2 和完整版）</div>

<!--
⏱ 2 分鐘。從這裡開始是「你自己做」：學生照投影片自己做，老師巡堂。
「現在按答案什麼都沒發生，玩的人不知道自己對不對。STEP 2 加上回饋。」指三張圖講一遍。
「答錯為什麼要把正確答案變綠？」（讓玩的人學到）「為什麼要等 1 秒？」（讓人看清楚對錯）
「為什麼等的時候不能連按？」請一個學生猜：連按 5 次，分數會不會加 5 分？這就是要擋住的地方。
這一頁就是下一頁 Prompt 的答案頁。
-->

---

# STEP 2 步驟

<Step n="2" kind="步驟" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.2rem">
<div>
  <div class="warn" style="font-size:1.1rem;margin-bottom:.5rem">先確認：STEP 1（和修好的那一題）能玩，而且已經 <b>☁️ Save</b></div>
  <ol class="steps" style="font-size:1.12rem">
    <li><b>複製程式</b>：JS 窗格 <code>Ctrl+A</code> → <code>Ctrl+C</code></li>
    <li><b class="pink">✏️ 填 5 格</b>：答案在第 14 頁，<b class="green">全部變綠</b></li>
    <li><b>貼上程式</b>：最後一個框 <code>Ctrl+V</code>（<b class="yellow">最新</b>的程式）</li>
    <li><b>貼給 AI</b>：「📋 複製」→ AI 對話框 <code>Ctrl+V</code> → 送出</li>
    <li><b>整段換掉</b>：AI 的程式 → JS 窗格 <code>Ctrl+A</code> → <code>Ctrl+V</code></li>
    <li><b class="yellow">先玩，再存</b>：Run → 照第 17 頁檢查 → <b>☁️ Save</b></li>
  </ol>
</div>
<div>
  <div class="card yellow" style="font-size:1.1rem;margin-top:0"><b>最新的程式</b>＝<br>有<b>你的 10 題</b>、<b>修好那一題</b>的那一份</div>
  <div class="card" style="font-size:1.05rem"><b class="neon">🧑‍⚖️ 規則</b>：這次改的是裁判（比答案、加分），<br><b>題目清單不要動</b></div>
</div>
</div>

<!--
⏱ 2 分鐘。跟 STEP 1 一樣的六步，這次學生自己做。
提醒「最新」：一定要從 JSFiddle 現在的 JS 窗格複製，不要用 AI 上一次給的回答，也不要用起始遊戲。貼舊的程式，你的題目或修好的那一題會不見。
「STEP 1 換的是資料，STEP 2 改的是規則。」這是第 7 頁的新點子。
-->

---

# STEP 2 Prompt

<Step n="2" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 STEP 2：答對答錯的回饋">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在按答案只會跳下一題。HTML 和 CSS 已經做好了，請只改 JavaScript。HTML 裡有：答案按鈕 class "answer"、分數 id "score"、回饋文字 id "feedback"、過關畫面 id "winScreen"、星星 id "stars"、過關文字 id "winText"。按鈕變綠用 class "correct"、變紅用 class "wrong"；畫面用 class "hidden" 藏起來。</p>
<p><b>① 加什麼：</b><Ph>要加哪些東西？</Ph></p>
<p><b>② 怎麼動：</b>答對：按的按鈕變綠、分數 +1、顯示「✔ 答對了！」。答錯：按的按鈕變紅、正確答案<Ph pick="變綠色|不用顯示" answer="變綠色" />。等<Ph number>幾</Ph>秒再到下一題，等的時候按答案<Ph pick="沒有反應|可以再按" answer="沒有反應" />。全部答完顯示過關畫面：答對 9–10 題 3 顆星、6–8 題 2 顆、其他 1 顆。</p>
<p><b>③ 不能弄壞：</b>我的題目清單和「開始」按鈕都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 填 5 格</b>（看第 14 頁）<br>
    <span class="n">1</span>要加的：
    <Bank words="答對答錯的回饋|分數|星星" />
    <span class="n">2</span><span class="n">4</span>選一個　<span class="n">3</span>幾秒？<br>
    <span class="n">5</span>怎麼玩來檢查？
    <Bank words="故意答錯一題|答對一題|連按同一個答案|玩完看星星" />
  </div>
  <div class="card green checks" style="font-size:1.05rem"><b>🔍 貼回去以後</b>
    <ol class="steps">
      <li><code>Ctrl+F</code> 搜尋 <code>correct</code>：找得到</li>
      <li><code>Ctrl+F</code> 搜尋 <code>stars</code>：找得到</li>
    </ol>
  </div>
</div>
</div>

<!--
⏱ 5 分鐘（今天最難的一步）。學生自己做，老師巡堂。
第一段（HTML 裡的名字）是老師寫好的：AI 只看得到 JavaScript、看不到 HTML，所以要告訴它畫面叫什麼名字。
填空答案：①「答對答錯的回饋、分數、星星」② 選「變綠色」③「1」④ 選「沒有反應」⑤ 例如「故意答錯一題、答對一題、連按同一個答案、玩完看星星」。
① ⑤ 可以不打字：先點框框，再點右邊黃色的字。
學生寫 1 秒，AI 通常寫成 1000（毫秒）。
AI 常見錯誤：
・沒有擋住「等 1 秒」的時候連按（少了 waiting 之類的開關）：連按會加好幾分，或跳過好幾題。
・下一題時沒把綠色、紅色拿掉（沒有 remove "correct" / "wrong"），顏色一直留著。
・比對時拿按鈕的位置比，不是拿文字比：答案全部算錯。
・星星的分數線寫反（3 分給 3 顆星）。
遇到這些，請學生用下一頁的症狀表告訴 AI。一個 STEP 大約 3–5 次訊息；AI 額度用完：第 27 頁救援 2。
-->

---

# STEP 2 檢查

<Step n="2" kind="檢查" actor="me" />

<div class="cols" style="grid-template-columns:1fr 1.45fr;margin-top:-.3rem;gap:1rem">
<div>
<ul class="check" style="font-size:1.05rem">
  <li>答對：<b>變綠</b>、分數 +1</li>
  <li>答錯：<b>變紅</b>、正確答案變綠</li>
  <li>1 秒後下一題，<b>顏色不見</b></li>
  <li>同一個答案<b>連按 3 下</b>：只加 1 分</li>
  <li>答完 10 題：過關畫面＋<b>星星</b></li>
</ul>
<div class="card green" style="font-size:1.05rem">🎉 5 項都打勾 → <b>☁️ Save</b></div>
<div class="small">😵 卡超過 10 分鐘？<b>舉手</b></div>
</div>
<table class="sym"><tbody>
  <tr><th>你看到</th><th>可能是</th><th>這樣告訴 AI</th></tr>
  <tr><td>連按加很多分</td><td>等的時候沒擋住</td><td>「我答對後連按 3 下，分數加了 3 分。我希望等的時候按答案沒有反應。」</td></tr>
  <tr><td>答錯也加分</td><td>沒有比對答案</td><td>「我按了錯的答案，分數還是 +1。我希望只有答對才加分。」</td></tr>
  <tr><td>顏色沒變回來</td><td>下一題沒拿掉顏色</td><td>「到下一題時，上一題的綠色和紅色還在。我希望每一題開始時按鈕都是原本的顏色。」</td></tr>
  <tr><td>星星數不對</td><td>分數線寫錯</td><td>「我答對 10 題，只有 1 顆星。我希望 9–10 題是 3 顆星。」</td></tr>
</tbody></table>
</div>
<div class="small" style="margin-top:.3rem">一次只說<b>一個</b>問題 · 再貼上<b>最新</b>的 JavaScript · 句子＝我做了什麼 ＋ 看到什麼 ＋ 我期待什麼</div>

<!--
救援 2 [[fiddle:rescue2]]

⏱ 5 分鐘。學生照清單自己玩。全班大部分完成就往下走，不用等每一個人。
症狀表的句子可以直接照念給 AI，數字換成自己看到的。
這時候第 13 頁修好的那一題，按正確答案應該會變綠：請學生順便確認。
改壞了可以回到上一個版本：網址最後的版本編號改小一號（STEP 1 存的那一版），按 Enter，再 Save。
救援 2 給卡超過 10 分鐘的學生：請他翻到第 27 頁，Fork 救援 2（題目是「動物」，連結在最上面）。
後面 STEP 3 和「我的版本」也是今天的重點，不要讓學生卡在這裡。
-->

---

# STEP 3 目標：三顆愛心

<Step n="3" kind="目標" actor="me" />

<div class="s3flow" style="margin-top:-.3rem">
  <div class="shot fit" style="--h:12.5rem"><span class="label tag green">🎮 答錯 2 題</span><img src="/img/real-hearts.png" alt="Playing with one heart left"></div>
  <div class="branch">
    <div class="c-win">10 題答完、還有愛心 ➜</div>
    <div class="c-lose">愛心用完 ➜</div>
  </div>
  <div class="ends">
    <div class="shot fit" style="--h:6rem;border-color:var(--c-win)"><img src="/img/real-win.png" alt="Win screen"></div>
    <div class="shot fit" style="--h:6rem;border-color:var(--c-lose)"><img src="/img/real-lose.png" alt="Lose screen"></div>
  </div>
</div>

<div class="row" style="margin-top:.7rem;gap:.7rem;align-items:stretch;font-size:1.08rem">
  <div class="card pink" style="flex:1;margin:0"><b class="pink">🔥 挑戰</b><br>一開始 ❤️❤️❤️，<b>答錯少一顆</b></div>
  <div class="card win" style="flex:1;margin:0"><b class="c-win">🏆 勝利</b>／<b class="c-lose">💥 失敗</b><br>答完有星星；愛心沒了顯示失敗畫面</div>
  <div class="card" style="flex:1;margin:0;border-color:#fff"><b>↻ 再玩一次</b><br>回到<b>第 1 題</b>，分數 <b>0</b>，愛心回到 <b>3</b> 顆</div>
</div>
<div class="small" style="margin-top:.3rem">圖都是<b>真實畫面</b>（救援 3）</div>

<style>
.s3flow { display: flex; align-items: center; justify-content: center; gap: 1rem; }
.s3flow .branch { display: flex; flex-direction: column; gap: 3.2rem; font-weight: 900; font-size: 1.15rem; }
.s3flow .ends { display: flex; flex-direction: column; gap: .6rem; }
</style>

<!--
⏱ 2 分鐘。「現在亂按也能過關，只是星星少一點。這樣有挑戰嗎？」（沒有）
「加上三顆愛心：答錯一題少一顆，三顆都沒了就輸。」
指三張卡：挑戰、勝利或失敗、再玩一次。這就是「完整遊戲」的五格：開始、遊玩、勝利、失敗、重玩。
失敗畫面和「再玩一次」按鈕，起始遊戲的 HTML 都已經做好了，藏起來而已。
-->

---

# STEP 3 步驟

<Step n="3" kind="步驟" actor="me" />

<div class="cols" style="grid-template-columns:1fr 1fr;margin-top:-.2rem">
<div>
  <ol class="steps" style="font-size:1.12rem">
    <li><b>複製程式</b>：JS 窗格 <code>Ctrl+A</code> → <code>Ctrl+C</code></li>
    <li><b class="pink">✏️ 四格都填</b>：看第 18 頁，全部變綠</li>
    <li><b>貼上程式</b>：最後一個框 <code>Ctrl+V</code></li>
    <li><b>貼給 AI</b>：「📋 複製」→ <code>Ctrl+V</code> → 送出</li>
    <li><b>整段換掉</b>：JS 窗格 <code>Ctrl+A</code> → <code>Ctrl+V</code></li>
    <li><b class="yellow">先玩，再存</b>：照第 21 頁檢查 → <b>☁️ Save</b></li>
  </ol>
</div>
<div class="challenge">
  <b class="yellow">🧪 測試小技巧：數字先改小</b>
  <div style="font-size:1.1rem;margin-top:.3rem;line-height:1.6">
  要答錯 3 題才看得到失敗畫面，太久了！<br>
  ① <code>Ctrl+F</code> 搜尋 <code>maxHearts</code><br>
  ② 把 <code>3</code> 改成 <code>1</code> → Run → 故意答錯<br>
  ③ <b class="pink">改回 <code>3</code></b>，再 ☁️ Save
  </div>
  <div class="small" style="margin-top:.3rem">第 8 堂學過：步數 20 → 3</div>
</div>
</div>

<!--
⏱ 2 分鐘。重點在右邊的測試小技巧（上一堂學過）：測試時先把數字改小，測完改回來。
Prompt 裡會請 AI 把愛心數放在一個叫 maxHearts 的變數，所以 Ctrl+F 找 maxHearts 就找得到 3。
這是今天唯一要在 JSFiddle 程式裡「打字」的地方（只改一個數字）。
最常忘記：測完沒改回 3 就交作業。第 21 頁會再提醒一次。
-->

---

# STEP 3 Prompt

<Step n="3" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 STEP 3：愛心、失敗、再玩一次">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在答完會有對錯回饋、分數和星星。HTML 和 CSS 已經做好了，請只改 JavaScript。HTML 裡有：愛心 id "hearts"、失敗畫面 id "loseScreen"、過關畫面 id "winScreen"、兩個「再玩一次」按鈕 class "againBtn"；畫面用 class "hidden" 藏起來。一開始有幾顆愛心，請放在程式最上面的變數 maxHearts。</p>
<p><b>① 加什麼：</b><Ph>要加哪些東西？</Ph></p>
<p><b>② 怎麼動：</b><Ph>它怎麼動？</Ph></p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill s3fill" style="margin-top:0"><b>✏️ 四格都填</b>（看第 18 頁）<span class="small">先點框框，再點字</span><br>
    <span class="n">1</span>要加的：
    <Bank words="三顆愛心|失敗畫面|再玩一次" />
    <span class="n">2</span>怎麼動？
    <Bank words="答錯少一顆愛心|愛心用完就輸|回到第 1 題|分數歸零|愛心回到 3 顆" />
    <span class="n">3</span>不能壞的：
    <Bank words="我的題目|對錯回饋|分數|星星" />
    <span class="n">4</span>怎麼檢查？
    <Bank words="把 3 先改成 1 測失敗|玩到過關|按再玩一次" />
  </div>
  <div class="card green" style="font-size:.95rem">🔍 <code>Ctrl+F</code> 搜尋 <code>maxHearts</code>、<code>loseScreen</code>：都找得到</div>
</div>
</div>

<style>
.s3fill { font-size: .98rem; line-height: 1.35; }
.s3fill :deep(.bank) { gap: .25rem; margin: .1rem 0 .15rem; }
.s3fill :deep(button) { font-size: .92rem; }
</style>

<!--
⏱ 5 分鐘。學生自己做。這次四格整格都是空的：學生第一次自己寫完四格（還有字可以點）。
填空答案：①「三顆愛心、失敗畫面、再玩一次」②「答錯少一顆愛心、愛心用完就輸、回到第 1 題、分數歸零、愛心回到 3 顆」③「我的題目、對錯回饋、分數、星星」④「把 3 先改成 1 測失敗、玩到過關、按再玩一次」。
② 最長：五個字都要點。少點了「分數歸零」或「愛心回到 3 顆」，第 21 頁「重玩」那一項會抓到。
自己打、寫短一點也可以（「答錯扣一顆，沒了就輸」AI 也看得懂）。
AI 常見錯誤：
・「再玩一次」只關掉畫面，分數或愛心沒歸零、沒回到第 1 題。
・用 getElementById("againBtn") 只抓到一個按鈕（其實是 class，有兩個），其中一個畫面的按鈕沒反應。
・最後一題答錯、愛心剛好用完：同時跳出過關和失敗畫面（應該先判斷愛心）。
・失敗畫面出現後，還能按到答案（遊戲沒停）。
遇到這些，用「我做了什麼＋看到什麼＋我期待什麼」告訴 AI。
-->

---

# STEP 3 檢查

<Step n="3" kind="檢查" actor="me" />

<div class="cols" style="grid-template-columns:1.35fr 1fr;margin-top:-.2rem">
<div>
<ul class="check" style="font-size:1.12rem">
  <li><b class="c-start">🏁 開始</b>：按「開始」才開始，❤️❤️❤️</li>
  <li><b class="c-play">🎮 遊玩</b>：答錯一題，少一顆愛心</li>
  <li><b class="c-win">🏆 勝利</b>：答完 10 題 → 過關畫面＋星星</li>
  <li><b class="c-lose">💥 失敗</b>：（先改成 1）愛心用完 → 失敗畫面</li>
  <li><b>↻ 重玩</b>：「再玩一次」→ 第 1 題、分數 0、❤️❤️❤️</li>
</ul>
<div class="warn" style="font-size:1.1rem;margin-top:.4rem">⚠️ 記得把 <code>1</code> 改回 <code>3</code>，再 <b>☁️ Save</b>！</div>
<div class="small" style="margin-top:.3rem">😵 卡住了？<b>舉手</b></div>
</div>
<div class="row" style="flex-wrap:nowrap;gap:.6rem">
  <div class="shot fit" style="--h:12.5rem;border-color:var(--c-win)"><span class="label tag" style="background:var(--c-win)">🏆</span><img src="/img/real-win.png" alt="Win screen"></div>
  <div class="shot fit" style="--h:12.5rem;border-color:var(--c-lose)"><span class="label tag" style="background:var(--c-lose)">💥</span><img src="/img/real-lose.png" alt="Lose screen"></div>
</div>
</div>
<div class="small" style="margin-top:.3rem">右圖是<b>真實畫面</b>（救援 3）· 完整遊戲五格都要試到</div>

<!--
救援 3 [[fiddle:rescue3]]

⏱ 4 分鐘。這是「完整遊戲」檢查表，顏色跟第 4 堂一樣：開始藍、遊玩綠、勝利橘、失敗紅。
勝利要真的玩完 10 題（答錯不超過 2 題）；失敗用測試小技巧（maxHearts 改 1）。重玩要在過關畫面和失敗畫面各按一次。
5 項都過、1 改回 3，才按 ☁️ Save。
STEP 3 卡住的學生：翻到第 27 頁，Fork 救援 3（完整版，題目是「動物」），直接做第 22–24 頁「我的版本」和夥伴試玩（連結在最上面）。
用救援 3 的學生，「我的版本」可以選「換成我的主題」：用第 10 頁的 Prompt 再做一次。
-->

---

# 我的版本：選一個改

<Step label="我的版本" actor="me" />

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem;margin-top:-.1rem;font-size:1.05rem">
  <div class="card" style="margin:0"><div class="tag neon">目標</div><br>答對 <b>8 題</b>以上才算過關，不然顯示失敗畫面</div>
  <div class="card green" style="margin:0"><div class="tag green">規則</div><br>每題只能想 <b>10 秒</b>，時間到算答錯</div>
  <div class="card pink" style="margin:0"><div class="tag pink">挑戰</div><br>・第二輪更難的 10 題<br>・題目順序打亂</div>
  <div class="card orange" style="margin:0"><div class="tag orange">回饋</div><br>・答對放音效（第 3 堂的 raw 網址）<br>・每題配一個 emoji 圖<br>・答錯的按鈕晃一下</div>
</div>

<div class="row" style="margin-top:.7rem;gap:.8rem;align-items:stretch">
  <div class="card yellow" style="flex:1;margin:0">🎨 用救援的同學也可以：換成<b>我的主題</b>（第 10 頁的 Prompt）</div>
  <div class="card pink" style="flex:1;margin:0">☝️ 只選<b>一個</b>，做完、玩過、存好，再選下一個</div>
</div>
<div class="card" style="margin-top:.6rem;font-size:1.05rem">🕵️ 請 AI 出<b>新題目</b>（第二輪、換主題）？→ 一樣要<b>抓錯題</b>（第 12 頁的四種錯）</div>
<div class="card orange" style="margin-top:.5rem;font-size:1.05rem">🚀 做完、交了作業還有時間？→ 翻到<b>第 28 頁「挑戰站」</b>：💡 提示道具、🐉 魔王對決、🗺️ 冒險地圖</div>

<!--
⏱ 2 分鐘。「用遊戲設計四個字想一想：你想改目標、規則、挑戰，還是回饋？選一個就好。」
起始遊戲已經幫這些點子準備好了，學生只需要改 JavaScript（下一頁 Prompt 要把這些名字告訴 AI）：
・每題 10 秒：HTML 已經有藏起來的 ⏱（id "timer"，外框 id "timerStat"，用 class "hidden" 藏著）。
・答對 8 題才過關：失敗畫面的文字是 id "loseText"（可以改成「只答對 5 題，再試一次」）。
・晃一下：CSS 已經有 class "shake"。
・音效：到自己的 GitHub 倉庫（第 3 堂）複製聲音的 raw 網址，網址在雲端，換電腦也找得到。
・emoji 圖、第二輪、打亂順序：都只改 JavaScript（題目清單或規則）。
不知道選什麼的學生：建議「答對 8 題才過關」或「每題配 emoji」，最容易成功。
-->

---

# 寫我的 Prompt

<Step label="我的版本" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 我的 Prompt（四格自己寫）">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在可以答題、看對錯、拿星星，愛心用完也會輸。HTML 和 CSS 已經做好了，請只改 JavaScript。</p>
<p><b>① 加什麼：</b><Ph>我要加的東西</Ph></p>
<p><b>② 怎麼動：</b><Ph>它怎麼動？數字是多少？</Ph></p>
<p><b>③ 不能弄壞：</b><Ph>哪些已經做好、不能壞？</Ph></p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card yellow" style="margin-top:0;font-size:1.02rem"><b>💡 提示</b><br>
  ① 從第 22 頁選的那一個<br>
  ② 要有<b>數字</b>：幾秒？幾題？幾顆？<br>
  ③ STEP 1–3 做好的東西<br>
  ④ 數字先改小再測？</div>
  <div class="card" style="font-size:.98rem"><b>🤖 AI 看不到 HTML</b>，用到要寫名字：<br>
  ⏱ 計時：<code>timer</code>、<code>timerStat</code>、<code>hidden</code><br>
  失敗文字：<code>loseText</code>　晃一下：<code>shake</code></div>
  <div class="card pink" style="font-size:1.02rem">一次只改<b>一件事</b>　玩過才 <b>☁️ Save</b></div>
</div>
</div>

<!--
⏱ 8 分鐘。這是學生第二次四格全部自己寫，這次沒有範例，只有提示（上一堂有範例）。
做法：把四個粉紅框填成自己的話（變綠色）→ 最後一個框 Ctrl+V 貼上程式 → 按「📋 複製」→ 到 AI Ctrl+V → 送出。
每格打幾個字就好。老師心裡的範例（學生卡住再說）：
① 每題 10 秒倒數 ② 每題從 10 秒開始每秒減 1，顯示在藏起來的 id "timer"（外框 id "timerStat" 拿掉 class "hidden"）；時間到算答錯 ③ 題目、對錯回饋、分數、星星、愛心 ④ 我會先把 10 改成 3 來測。
① 答對 8 題才過關 ② 10 題答完，答對 8 題以上顯示過關畫面，不到 8 題顯示失敗畫面，id "loseText" 寫「只答對 N 題」③ … ④ 我會故意答錯 3 題。
老師巡堂：先看②有沒有數字。寫得太模糊（「更好玩」）就問：「怎樣算更好玩？要多少？」
請 AI 出新題目的學生（第二輪、換主題），做完要照第 12 頁再抓一次錯題。
做完一樣：先玩，再存。
-->

---

# 夥伴試玩

<Step label="試玩" actor="pair" />

<div class="cols" style="grid-template-columns:1.3fr 1fr;margin-top:-.2rem">
<div>
  <div style="font-size:1.1rem"><b class="neon">🎮 一人玩、一人打勾，再交換</b></div>
<ul class="check" style="font-size:1.05rem">
  <li><b>完整遊戲</b>：能開始／會贏／會輸／能再玩一次</li>
  <li><b class="orange">回饋</b>：答對答錯看得出來嗎？星星對嗎？</li>
  <li><b class="pink">挑戰</b>：太難還是太簡單？</li>
  <li>🕵️ 有沒有<b>一題怪怪的</b>？</li>
  <li>他改了四個字裡的<b>哪一個</b>？</li>
</ul>
</div>
<div>
  <div class="card yellow" style="margin-top:0;font-size:1.2rem">⭐ 我喜歡＿＿＿＿</div>
  <div class="card green" style="font-size:1.2rem">💡 如果＿＿＿＿<br>會更好玩</div>
  <div class="small">說給對方聽就好，不用寫。<br>說好的地方，也說一個點子。</div>
</div>
</div>

<!--
⏱ 5 分鐘。兩人一組（坐隔壁的），每人輪流 2 分半：A 在 B 的電腦上玩 B 的遊戲，B 看清單問問題；再交換。
玩的人最後要說 ⭐ 一個喜歡的地方＋💡 一個點子。示範一次：「⭐ 我喜歡答錯會告訴我正確答案。💡 如果每題有 emoji 圖會更好玩。」
又找到一題怪怪的題目：告訴對方第幾題，請他下次用第 13 頁的 Prompt 修。
提醒：點子是建議，不是批評；不要說「很爛」「好無聊」。
每個人還是改自己的遊戲，不要幫對方改。人數單數時，老師當其中一人的夥伴。
-->

---

# 存檔＋繳交

<Step label="交作業" actor="all" />

<div class="cols" style="grid-template-columns:1.3fr 1fr;margin-top:-.2rem">
<div>
  <ol class="steps" style="font-size:1.12rem">
    <li>按 <b class="neon">☁️ Save</b>（玩過、沒壞的版本）</li>
    <li>看網址：<b>遊戲編號</b>是你自己的，<b>不是</b>起始遊戲的</li>
    <li><b>Google Classroom</b> → 課堂作業 → <b class="green">第 9 堂：問答闖關</b></li>
    <li><b class="yellow">＋ 新增或建立</b> → <b class="yellow">連結</b> → 貼上網址 → <b>新增連結</b></li>
    <li>按 <b class="neon">繳交</b> ✅</li>
  </ol>
</div>
<div>
  <div class="card" style="margin-top:0"><span class="tag">示意圖</span> <b>設計卡（選填）</b>
    <div class="dcard">
      <div><b class="neon">目標</b> 答完 10 題恐龍題</div>
      <div><b class="green">規則</b> 每題選一個</div>
      <div><b class="pink">挑戰</b> 只有 3 顆愛心</div>
      <div><b class="orange">回饋</b> 答錯告訴我答案</div>
    </div>
    <div class="dline">🕵️ 我抓到的錯題：第 <b>4</b> 題</div>
  </div>
  <div class="small">想寫再寫，打幾個字就好；不寫也可以，剛剛用說的就算數。</div>
</div>
</div>

<style>
.dcard { display: grid; grid-template-columns: 1fr 1fr; gap: .3rem; margin-top: .3rem; font-size: 1rem; }
.dcard > div, .dline { border: 2px dashed #ffffff55; padding: .2rem .4rem; }
.dline { margin-top: .3rem; font-size: 1rem; }
</style>

<!--
⏱ 2 分鐘。上一堂學過，這裡只是提醒。最常見的錯：交了起始遊戲的網址（遊戲編號是老師的）。
交的是「最後一次 Save」的網址：版本編號是最新的那個。交完又改了：再 Save，在 Classroom 按「取消繳交」→ 換新網址 → 再繳交。
設計卡和「我抓到的錯題」是 Classroom 作業裡選填的欄位，不寫不扣分。右邊是範例內容。
-->

---

# 分享：我抓到 AI 哪一題錯？

<Step label="分享" actor="all" />

<div class="card orange" style="margin-top:.4rem;font-size:1.3rem;line-height:1.8">
🕵️ AI 出的第＿題＿＿＿＿（哪裡錯），<br>
我用＿＿＿＿（🧠 自己知道／👫 問夥伴／🌐 查網站）發現，<br>
我這樣告訴 AI：「＿＿＿＿＿」
</div>

<div class="card yellow" style="font-size:1.3rem">
🎨 我改了＿＿＿＿（<span class="neon">目標</span>／<span class="green">規則</span>／<span class="pink">挑戰</span>／<span class="orange">回饋</span>），因為＿＿＿＿
</div>

<div class="center q" style="margin-top:.8rem">🤖 AI 寫內容，🧑 你來檢查</div>

<!--
⏱ 3 分鐘。請 2–3 位同學用句型分享，老師把他們投影出來的遊戲玩一下也可以（玩到他抓到的那一題）。
先問：「誰的 AI 出了錯題？你怎麼發現的？」稱讚用「查證」發現的同學：這就是今天最重要的習慣。
再問：「你改了四個字裡的哪一個？」
最後全班一起念下面那句：上一堂是「玩過才存」，今天是「AI 寫內容，你來檢查」。
-->

---

# 救援站：老師說了才打開

<div class="warn center" style="font-size:1.25rem;margin-top:-.1rem">⚠️ 這些是<b>老師的</b>遊戲。老師叫你打開哪一個，才 Fork 那一個；<br>Fork 之後按 <b>☁️ Save</b>，確認遊戲編號是<b>你自己的</b>。</div>

<div class="rescue" style="margin-top:.8rem">
  <div class="card yellow"><div class="tag">救援 1</div><div>STEP 1 做好的樣子<br><span class="small">10 題「動物」題目</span></div><Fiddle k="rescue1" /></div>
  <div class="card yellow"><div class="tag">救援 2</div><div>STEP 2 做好的樣子<br><span class="small">＋對錯回饋、分數、星星</span></div><Fiddle k="rescue2" /></div>
  <div class="card yellow"><div class="tag">救援 3</div><div>STEP 3 做好的樣子<br><span class="small">＋三顆愛心、失敗、再玩一次</span></div><Fiddle k="rescue3" /></div>
  <div class="card green"><div class="tag green">完整版</div><div>第 2 頁老師玩的遊戲<br><span class="small">台灣小知識（有一題故意寫錯）</span></div><Fiddle k="full" /></div>
</div>

<div class="small" style="margin-top:.7rem">救援遊戲的題目是老師的主題。做完 STEP 3 以後，可以用第 10 頁的 Prompt 換成你自己的主題。</div>

<style>
.rescue { display: grid; grid-template-columns: repeat(4, 1fr); gap: .7rem; }
.rescue .card { margin: 0; display: flex; flex-direction: column; gap: .4rem; font-size: 1.1rem; font-weight: 900; }
.rescue .card > :last-child { margin-top: auto; font-size: .85rem; word-break: break-all; }
</style>

<!--
救援 1 [[fiddle:rescue1]]

救援 2 [[fiddle:rescue2]]

救援 3 [[fiddle:rescue3]]

完整版 [[fiddle:full]]

⏱ 0 分鐘（不用上；只在學生卡住時叫他翻到這一頁）。
這一頁放在最後，學生網站也看得到，所以學生不會在 STEP 頁面上誤點救援連結，跑進別的遊戲。
用法：「翻到第 27 頁，Fork 救援 2，再按 ☁️ Save。」確認他網址的遊戲編號已經變成自己的。
下課後學生也可以在這一頁玩完整版。
-->

---

# 挑戰站：做完了？選一個挑戰

<div class="warn" style="font-size:1.05rem;margin-top:-.2rem;line-height:1.5">
✅ STEP 3 做完、交了作業才來　·　開始前先 <b>☁️ Save</b>　·　<b>一步</b>做完、玩過、存好，才做下一步<br>
😵 弄壞了？網址最後的<b>版本編號改小一號</b> → Enter，回到上一個好的版本
</div>

<div class="cmenu" style="margin-top:.7rem">
  <div class="card yellow">
    <div class="row" style="justify-content:space-between;margin:0"><b class="yellow" style="font-size:1.3rem">A 💡 提示道具</b><span>⭐</span></div>
    <div class="shot fit" style="--h:7.4rem;margin:.4rem auto"><img src="/img/real-c-hint.png" alt="Hint button example"></div>
    <div>按一下，刪掉兩個錯的答案</div>
    <div class="go">1 步 · 第 29–30 頁</div>
  </div>
  <div class="card orange">
    <div class="row" style="justify-content:space-between;margin:0"><b class="orange" style="font-size:1.3rem">B 🐉 魔王對決</b><span>⭐⭐</span></div>
    <div class="shot fit" style="--h:7.4rem;margin:.4rem auto"><img src="/img/real-c-boss-angry.png" alt="Boss example"></div>
    <div>答對打魔王，答錯魔王打你</div>
    <div class="go">2 步 · 第 31–34 頁</div>
  </div>
  <div class="card pink">
    <div class="row" style="justify-content:space-between;margin:0"><b class="pink" style="font-size:1.3rem">C 🗺️ 冒險地圖</b><span>⭐⭐⭐</span></div>
    <div class="shot fit" style="--h:7.4rem;margin:.4rem auto"><img src="/img/real-c-map.png" alt="Adventure map example"></div>
    <div>在地圖上走，走到 🏰 才闖關</div>
    <div class="go">4 步 · 第 35–41 頁</div>
  </div>
</div>
<div class="small" style="margin-top:.4rem">圖都是<b>真實畫面</b>（老師做的範例）· 挑戰做好、Save 了，在 Classroom 換成新的網址（第 25 頁）</div>

<style>
.cmenu { display: grid; grid-template-columns: repeat(3, 1fr); gap: .8rem; }
.cmenu .card { margin: 0; display: flex; flex-direction: column; font-size: 1.05rem; text-align: center; }
.cmenu .go { margin-top: .3rem; font-weight: 900; color: var(--neon); }
</style>

<!--
⏱ 0 分鐘（不用上；給做完 STEP 3、交了作業、還有時間的同學，自己照頁碼往下做）。
「做完的同學翻到第 28 頁挑戰站，選一個。⭐ 越多越難。」不知道選哪個：先做 A（一步就好），做完再挑 B 或 C。
三個挑戰都只改 JavaScript：新的東西（提示按鈕、魔王、地圖）都請 AI 用 JavaScript 做出來，HTML 和 CSS 不用動。
每個挑戰老師都做過一次（starter/challenge-hint.html、challenge-boss.html、challenge-map.html），確定做得出來；圖片是這些範例的真實畫面。
程式越來越長（地圖做完約 280 行），免費 AI 可能會說「其餘不變」只給一半：程式變短很多就不要貼，回 AI 說「請給我完整的 JavaScript，一行都不要省略」。下一堂會教只換一段的貼法。
挑戰 C 用方向鍵走地圖，下一堂（迷宮尋寶）會正式教；做過的同學下一堂可以當小幫手。
做完挑戰要交新版本：Save → Classroom 按「取消繳交」→ 換新網址 → 再繳交。
-->

---

# 挑戰 A：💡 提示道具

<Step label="挑戰 A" kind="目標" actor="me" />

<div class="cgoal">
  <div class="shot fit" style="--h:17rem"><span class="label tag">真實畫面</span><img src="/img/real-c-hint.png" alt="Two wrong answers removed"></div>
  <div>
    <div class="card yellow"><b class="yellow">👀 會看到</b>：答案下面多一個<b>「💡 提示」</b>按鈕，按了<b>兩個錯的答案不見</b>，按鈕寫「剩幾次」</div>
    <div class="card pink"><b class="pink">🚫 不能發生</b>：把<b>正確答案</b>藏起來；下一題答案<b>還是少兩個</b></div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>按提示：剩 2 個答案，正確的在裡面</li>
        <li>下一題：4 個答案都回來</li>
        <li>次數用完：按鈕變灰，按了沒反應</li>
        <li>「再玩一次」：次數回來</li>
      </ul>
    </div>
  </div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
這是最簡單的挑戰：一個新按鈕＋一條規則。用「遊戲設計四個字」說：提示是讓「挑戰」變簡單一點的道具，所以一局只能用幾次。
做法跟 STEP 一樣：下一頁填好 Prompt → 貼程式 → 📋 複製 → 貼給 AI → JS 整段換掉 → 照這頁的 🔍 玩過 → ☁️ Save。
AI 常見錯誤：下一題沒有把藏起來的答案放回來（答案越來越少）；「再玩一次」沒把次數加回來。用「我做了什麼＋看到什麼＋我期待什麼」告訴 AI。
-->

---

# 挑戰 A：Prompt

<Step label="挑戰 A" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 A：提示道具">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在可以答題、看對錯、有分數、星星和三顆愛心，會贏也會輸。HTML 和 CSS 不要改，請只改 JavaScript。四個答案按鈕的 class 是 "answer"，它們外面的框 id 是 "answers"。</p>
<p><b>① 加什麼：</b>一個「💡 提示」按鈕，用 JavaScript 做出來，放在四個答案下面。</p>
<p><b>② 怎麼動：</b>按提示，這一題藏起<Ph pick="兩個|一個" />錯的答案（正確答案一定留著）。一局可以用<Ph number>幾</Ph>次，按鈕上寫還剩幾次；用完了按鈕變灰、按了沒反應。下一題四個答案都要回來。等下一題的時候不能按提示。「再玩一次」提示次數要回來。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 4 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>藏幾個：自己選　<span class="n">2</span>幾次：建議 <b>2</b><br>
    <span class="n">3</span>不能壞的：
    <Bank words="對錯回饋|分數|星星|愛心|再玩一次" />
    <span class="n">4</span>怎麼檢查？
    <Bank words="按提示看剩幾個答案|次數用完再按|按再玩一次看次數" />
  </div>
  <div class="card green" style="font-size:.95rem">🔍 <code>Ctrl+F</code> 搜尋 <code>提示</code>：找得到<br>再照第 29 頁玩一次</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案：① 兩個（一個也可以，都算對）② 幾次：1–3 都可以，建議 2 ③「對錯回饋、分數、星星、愛心、再玩一次」④「按提示看剩幾個答案、次數用完再按、按再玩一次看次數」。
範例：starter/challenge-hint.html（老師做的，題目是動物）。
如果按鈕跑到很奇怪的地方（例如畫面最上面）：告訴 AI「提示按鈕要放在四個答案按鈕下面、置中」。
-->

---

# 挑戰 B-1 目標：魔王出現了

<Step label="挑戰 B-1" kind="目標" actor="me" />

<div class="cgoal">
  <div class="shot fit" style="--h:17rem"><span class="label tag">真實畫面</span><img src="/img/real-c-boss.png" alt="Boss with full HP"></div>
  <div>
    <div class="card orange"><b class="orange">👀 會看到</b>：題目上面有<b>魔王</b>和<b>血條</b>。答對一題 → 魔王<b>少 1 滴血</b>、晃一下</div>
    <div class="card win"><b class="c-win">🏆 新的勝利</b>：魔王<b>沒血了</b>就過關（不是答完 10 題）</div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>答對：血條變短、數字少 1</li>
        <li>（先把血改成 <b>2</b>）答對 2 題 → 過關畫面</li>
        <li>答錯：還是少一顆 ❤️</li>
        <li>「再玩一次」：魔王血回滿；記得<b>改回來</b></li>
      </ul>
    </div>
  </div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
「目標」改了：以前是「答完 10 題」，現在是「打倒魔王」。挑戰也變了：要在 3 顆愛心用完之前打倒魔王。
測試小技巧又來了：魔王的血放在變數 bossMaxHp，Ctrl+F 找到它，先改成 2 測過關，測完改回來（跟 maxHearts 一樣）。
魔王的血建議 5 到 8 滴：10 題裡最多答錯 2 題，所以至少答對 8 題，8 滴以下一定打得完。填 9 或 10 會很難。
-->

---

# 挑戰 B-1 Prompt

<Step label="挑戰 B-1" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 B-1：魔王和血條">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在可以答題、看對錯、有分數、星星和三顆愛心，會贏也會輸。HTML 和 CSS 不要改，請只改 JavaScript。題目區的 id 是 "quiz"；CSS 有 class "shake" 可以讓東西晃一下；過關文字 id 是 "winText"，失敗文字 id 是 "loseText"。</p>
<p><b>① 加什麼：</b>一隻魔王<Ph>魔王 emoji</Ph>和它的血條，用 JavaScript 做出來，放在題目上面。</p>
<p><b>② 怎麼動：</b>魔王有<Ph number>幾</Ph>滴血，放在程式最上面的變數 bossMaxHp。答對一題，魔王少 1 滴血、晃一下，血條變短，旁邊寫「血 6 / 7」。過關的條件改成<Ph pick="魔王沒血了|答完 10 題" answer="魔王沒血了" />，過關文字寫「你打倒魔王了！」。題目答完魔王還有血，就顯示失敗畫面「魔王逃走了」。答錯一樣少一顆愛心。「再玩一次」魔王的血回滿。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 5 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>魔王：
    <Bank words="🐉|👾|🦖|👻|🤖" />
    <span class="n">2</span>幾滴血：<b>5 到 8</b>　<span class="n">3</span>看第 31 頁<br>
    <span class="n">4</span>不能壞的：
    <Bank words="對錯回饋|分數|愛心|失敗畫面|再玩一次" />
    <span class="n">5</span>怎麼檢查？
    <Bank words="先把血改成 2 測過關|故意答錯一題|按再玩一次" />
  </div>
  <div class="card green" style="font-size:.95rem">🔍 <code>Ctrl+F</code> 搜尋 <code>bossMaxHp</code>：找得到</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案：① 任一個 emoji ② 5–8 ③ 魔王沒血了 ④「對錯回饋、分數、愛心、失敗畫面、再玩一次」⑤「先把血改成 2 測過關、故意答錯一題、按再玩一次」。
③ 選錯「答完 10 題」會變橘色：魔王就沒有意義了。
AI 常見錯誤：魔王沒血了還要答完 10 題才過關（過關判斷沒改）；「再玩一次」魔王的血沒回滿；血條沒有變短（只有數字變）。
範例：starter/challenge-boss.html（B-1 和 B-2 都做完的樣子）。
-->

---

# 挑戰 B-2 目標：魔王會反擊

<Step label="挑戰 B-2" kind="目標" actor="me" />

<div class="cgoal">
  <div class="row" style="flex-wrap:nowrap;gap:.6rem;margin:0">
    <div class="shot fit" style="--h:12.5rem;border-color:var(--c-lose)"><span class="label tag" style="background:var(--c-lose)">答錯</span><img src="/img/real-c-boss-attack.png" alt="Boss attacks"></div>
    <div class="shot fit" style="--h:12.5rem;border-color:var(--orange)"><span class="label tag" style="background:var(--orange)">剩一半</span><img src="/img/real-c-boss-angry.png" alt="Boss angry"></div>
  </div>
  <div>
    <div class="card pink"><b class="pink">🔥 答錯</b>：魔王攻擊！畫面<b>閃紅光</b>，少一顆 ❤️</div>
    <div class="card orange"><b class="orange">😡 剩一半血</b>：魔王<b>變臉</b>、寫「魔王生氣了！」</div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>故意答錯：看到攻擊</li>
        <li>打到一半：魔王變臉</li>
        <li>過關星星 = 剩幾顆 ❤️</li>
      </ul>
    </div>
  </div>
</div>
<div class="small" style="margin-top:.4rem">兩張都是<b>真實畫面</b>（老師做的範例）</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
這一步全是「回饋」：答錯時遊戲用畫面告訴你「被打了」，魔王剩一半時告訴你「快贏了」。
星星改成看剩幾顆愛心：3 顆愛心 ⭐⭐⭐、2 顆 ⭐⭐、1 顆 ⭐。魔王對決裡「沒被打到」比「答對幾題」更重要。
AI 常見錯誤：攻擊的 🔥 一直留著沒變回魔王；生氣後「再玩一次」魔王還是生氣的臉。
-->

---

# 挑戰 B-2 Prompt

<Step label="挑戰 B-2" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 B-2：魔王反擊、生氣">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在有一隻魔王和血條：答對打魔王，魔王沒血就過關。HTML 和 CSS 不要改，請只改 JavaScript。整個遊戲的外框 id 是 "game"。</p>
<p><b>① 加什麼：</b>魔王會反擊，還會生氣。</p>
<p><b>② 怎麼動：</b>答錯的時候魔王攻擊：魔王變成<Ph>攻擊 emoji</Ph>0.5 秒，遊戲外框<Ph pick="閃紅光|晃一下" />，我少一顆愛心。魔王剩<Ph pick="一半|三分之一" />的血以下，就換成<Ph>生氣 emoji</Ph>，名字旁邊寫「魔王生氣了！」。過關畫面的星星改成看剩幾顆愛心：3 顆 ⭐⭐⭐、2 顆 ⭐⭐、1 顆 ⭐。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 6 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>攻擊：<Bank words="🔥|⚡|💥|☄️" />
    <span class="n">2</span><span class="n">3</span>自己選<br>
    <span class="n">4</span>生氣：<Bank words="👹|😡|💢|👿" />
    <span class="n">5</span>不能壞的：
    <Bank words="魔王血條|答對打魔王|過關和失敗|再玩一次" />
    <span class="n">6</span>怎麼檢查？
    <Bank words="故意答錯一題|打到剩一半|看星星對不對" />
  </div>
  <div class="card green" style="font-size:.95rem">🔍 <code>Ctrl+F</code> 搜尋 <code>生氣</code>：找得到</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案：① ③ 任一個 emoji ② ③ 兩個都可以（自己選）⑤「魔王血條、答對打魔王、過關和失敗、再玩一次」⑥「故意答錯一題、打到剩一半、看星星對不對」。
「再玩一次」之後魔王要變回原本的臉：如果還是生氣的臉，告訴 AI「我按再玩一次，魔王還是 😡，我期待它變回原本的樣子」。
-->

---

# 挑戰 C-1 目標：地圖和走路

<Step label="挑戰 C-1" kind="目標" actor="me" />

<div class="cgoal">
  <div class="shot fit" style="--h:16.5rem"><span class="label tag">示意圖</span><img src="/img/mock-c-step1.png" alt="Map with a player and one castle"></div>
  <div>
    <div class="card pink"><b class="pink">👀 會看到</b>：按開始先出現<b>地圖</b>，你是 🧙，用<b>方向鍵</b>走一格一格</div>
    <div class="card yellow"><b class="yellow">🏰 走到城堡</b>：地圖不見，開始答題（跟原本一樣）</div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>先<b>用滑鼠點一下遊戲</b>，再按方向鍵</li>
        <li>走到邊邊再按：<b>走不出去</b></li>
        <li>走到 🏰：出現第 1 題</li>
        <li>贏、輸、再玩一次都還可以</li>
      </ul>
    </div>
  </div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。挑戰 C 有四步，每一步做完都是一個能玩的遊戲：先有地圖，再分成三關，再加樹和寶箱，最後加自己的點子。
這一步：地圖只有一座 🏰，走到就開始原本的 10 題。左圖是示意圖（用老師的範例改簡單的地圖拍的）。
最常卡住：方向鍵沒反應。JSFiddle 的遊戲在右下角的框裡，要先用滑鼠點一下遊戲（或按「開始」），框框才收得到按鍵。
方向鍵讓整個網頁上下捲動：告訴 AI「按方向鍵時網頁不要捲動」（Prompt 裡已經寫了）。
-->

---

# 挑戰 C-1 Prompt

<Step label="挑戰 C-1" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 C-1：地圖和走路">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在可以答題、看對錯、有分數、星星和三顆愛心，會贏也會輸。HTML 和 CSS 不要改，請只改 JavaScript。題目區的 id 是 "quiz"。</p>
<p><b>① 加什麼：</b>一張冒險地圖，用 JavaScript 做出來，放在題目區前面。</p>
<p><b>② 怎麼動：</b>按「開始」先出現地圖，題目區藏起來。地圖是<Ph number>寬</Ph>格寬、<Ph number>高</Ph>格高的格子，玩家是<Ph>玩家 emoji</Ph>，從左上角出發。方向鍵一次走一格，不能走出地圖，按方向鍵時網頁不要捲動。地圖上有一個 🏰，走到 🏰 就藏起地圖、顯示題目，從第 1 題開始答。「再玩一次」回到地圖的起點。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 5 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span><span class="n">2</span>寬、高：建議 <b>8</b> 和 <b>6</b><br>
    <span class="n">3</span>玩家：<Bank words="🧙|🦸|🐱|🤖|🐸" />
    <span class="n">4</span>不能壞的：
    <Bank words="答題|對錯回饋|分數|愛心|過關和失敗|再玩一次" />
    <span class="n">5</span>怎麼檢查？
    <Bank words="走到邊邊再按|走到城堡看題目|按再玩一次" />
  </div>
  <div class="card green" style="font-size:.95rem">🔍 <code>Ctrl+F</code> 搜尋 <code>ArrowUp</code>：找得到（↑ 鍵）</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案：① 8 ② 6（太大會擠出遊戲框，寬 10、高 8 以內都可以）③ 任一個 emoji ④「答題、對錯回饋、分數、愛心、過關和失敗、再玩一次」⑤「走到邊邊再按、走到城堡看題目、按再玩一次」。
ArrowUp 是「↑ 鍵」在程式裡的名字；找得到代表 AI 有寫方向鍵。
AI 常見錯誤：開始畫面還沒按就能走；題目和地圖同時出現；「再玩一次」直接出現題目，不是地圖。
-->

---

# 挑戰 C-2 目標：三座城堡、三關

<Step label="挑戰 C-2" kind="目標" actor="me" />

<div class="cgoal">
  <div class="row" style="flex-wrap:nowrap;gap:.6rem;margin:0">
    <div class="shot fit" style="--h:12rem"><span class="label tag">示意圖</span><img src="/img/mock-c-step2.png" alt="Map with three castles"></div>
    <div class="shot fit" style="--h:12rem"><span class="label tag">真實畫面</span><img src="/img/real-c-stage.png" alt="Stage 1 question"></div>
  </div>
  <div>
    <div class="card pink"><b class="pink">🏰 三關</b>：第 1 關考第 1–3 題、第 2 關 4–6 題、第 3 關 7–10 題</div>
    <div class="card yellow"><b class="yellow">✅ 過一關</b>：回到地圖，城堡變 ✅，不能再進去</div>
    <div class="card win" style="margin-bottom:0"><b class="c-win">🏆 三關都過</b>才過關；愛心用完一樣輸</div>
  </div>
</div>
<div class="card green" style="margin-top:.5rem;font-size:1rem">🔍 做完檢查：過一關 → 回到地圖、城堡變 ✅ · 再走上去 → 不會再答 · 三關都過 → 過關畫面 · 故意答錯 3 題 → 失敗畫面</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
題目清單還是同一份 10 題（資料不用改），只是規則改成「哪一座城堡考哪幾題」。
左上角的標題變成「🏰 第 1 關」、題號變成「第 1 / 3 題」：讓玩家知道在哪一關、還剩幾題，這也是回饋。
左圖是示意圖（範例遊戲換成沒有樹的地圖拍的），右圖是範例的真實畫面。
AI 常見錯誤：過一關之後回到起點（應該站在原地）；站在 ✅ 上又開始答同一關；第 3 關只考 3 題，少了第 10 題。
-->

---

# 挑戰 C-2 Prompt

<Step label="挑戰 C-2" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 C-2：三座城堡">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在按開始會出現地圖，走到 🏰 就開始答題。HTML 和 CSS 不要改，請只改 JavaScript。</p>
<p><b>① 加什麼：</b>地圖上改成三座 🏰，每一座是一關，考不同的題目。</p>
<p><b>② 怎麼動：</b>第 1 關考第 1–3 題，第 2 關 4–6 題，第 3 關 7–10 題。走到還沒過的 🏰 就答那一關：左上角標題（class "brand"）寫「🏰 第 1 關」，題號寫「第 1 / 3 題」。一關答完回到地圖、站在原地，那座 🏰 變成<Ph>過關 emoji</Ph>，不能再進去。<Ph pick="三關都過了|過一關" answer="三關都過了" />才顯示過關畫面。愛心用完就<Ph pick="顯示失敗畫面|回到地圖" answer="顯示失敗畫面" />。「再玩一次」回到起點，三座 🏰 都恢復。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 5 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>過關：<Bank words="✅|🚩|⭐|🏳️" />
    <span class="n">2</span><span class="n">3</span>看第 37 頁<br>
    <span class="n">4</span>不能壞的：
    <Bank words="地圖和走路|對錯回饋|分數|愛心|再玩一次" />
    <span class="n">5</span>怎麼檢查？
    <Bank words="過一關看回到地圖|走回 ✅ 上面|三關都過|故意答錯 3 題" />
  </div>
  <div class="card green" style="font-size:.95rem">🔍 <code>Ctrl+F</code> 搜尋 <code>brand</code>：找得到（左上角標題）</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案：① 任一個 emoji ② 三關都過了 ③ 顯示失敗畫面 ④「地圖和走路、對錯回饋、分數、愛心、再玩一次」⑤「過一關看回到地圖、走回 ✅ 上面、三關都過、故意答錯 3 題」。
測三關很花時間：可以請夥伴當玩家，自己看清單。
這一步的程式最容易變長，AI 給的程式比原本短很多就先不要貼（看第 28 頁的提醒）。
-->

---

# 挑戰 C-3 目標：地圖也是資料

<Step label="挑戰 C-3" kind="目標" actor="me" />

<div class="cgoal">
  <div class="shot fit" style="--h:16.5rem"><span class="label tag">真實畫面</span><img src="/img/real-c-map.png" alt="Map with trees and a chest"></div>
  <div>
    <div class="card pink"><b class="pink">🌲 樹</b>：走不過去，要繞路　<b class="yellow">🎁 寶箱</b>：愛心 +1</div>
    <div class="card yellow" style="font-family:monospace;font-size:1.02rem;line-height:1.35"><b style="font-family:inherit">🗺️ 地圖寫成一張清單</b>（示意）<br>
      "P..#...."<br>".#.#.1#."<br>"..##.#.2"<br>"3#..G..."
    </div>
    <div class="card" style="margin-bottom:0;font-size:1rem">P 起點　1 2 3 城堡　# 樹　G 寶箱　. 空地<br>跟題目清單一樣：<b>改清單，地圖就變</b></div>
  </div>
</div>
<div class="card green" style="margin-top:.5rem;font-size:1rem">🔍 做完檢查：撞樹 → 走不過去 · 撿寶箱 → ❤️ 回來一顆 · 三座城堡都走得到 · <code>Ctrl+F</code> <code>mapRows</code>，把一個 <code>.</code> 改成 <code>#</code> → Run → 多一棵樹</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
這一步的重點是「地圖也是資料」：跟今天第 7 頁的題目清單一樣，地圖寫成一張清單，規則（怎麼走、撞到樹）不用改，改清單就換一張地圖。下一堂迷宮尋寶就用這個想法。
學生可以自己改地圖：Ctrl+F 找 mapRows，把「.」改成「#」多一棵樹（只改一個字，不要刪掉引號和逗號）。
如果改了之後有城堡被樹圍住走不到：再改回「.」。寶箱：愛心最多 3 顆，滿的時候撿了不會變 4 顆。
-->

---

# 挑戰 C-3 Prompt

<Step label="挑戰 C-3" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 C-3：樹和寶箱">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在有一張地圖，用方向鍵走，走到三座 🏰 分別答三關的題目。HTML 和 CSS 不要改，請只改 JavaScript。</p>
<p><b>① 加什麼：</b>地圖上加 🌲 樹和一個寶箱<Ph>寶箱 emoji</Ph>。</p>
<p><b>② 怎麼動：</b>請把地圖寫成程式最上面的一張清單 mapRows，每一行是一個字串：P 是起點、1 2 3 是三座 🏰、# 是樹、G 是寶箱、. 是空地，這樣我可以自己改地圖。樹大約<Ph number>幾</Ph>棵，樹走不過去，但每一座 🏰 都要走得到。走到寶箱，愛心<Ph pick="+1|+2" />（最多 3 顆），寶箱就不見。「再玩一次」寶箱回來。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 5 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>寶箱：<Bank words="🎁|💎|🍎|🧪" />
    <span class="n">2</span>幾棵樹：建議 <b>10</b>　<span class="n">3</span>自己選<br>
    <span class="n">4</span>不能壞的：
    <Bank words="地圖和走路|三關|對錯回饋|愛心|過關和失敗|再玩一次" />
    <span class="n">5</span>怎麼檢查？
    <Bank words="去撞樹|答錯再撿寶箱|三座城堡都走一次" />
  </div>
  <div class="card green" style="font-size:.95rem">🔍 <code>Ctrl+F</code> 搜尋 <code>mapRows</code>：找得到一張清單</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案：① 任一個 emoji ② 8–12 ③ 自己選 ④「地圖和走路、三關、對錯回饋、愛心、過關和失敗、再玩一次」⑤「去撞樹、答錯再撿寶箱、三座城堡都走一次」。
AI 常見錯誤：樹把城堡圍住走不到（請學生自己改 mapRows，或告訴 AI「第 3 座城堡走不到」）；寶箱撿了愛心變成 4 顆。
-->

---

# 挑戰 C-4：加上我的點子

<Step label="挑戰 C-4" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 C-4：我的地圖點子">
<p>我在 JSFiddle 做「問答闖關」遊戲，現在有一張地圖 mapRows（P 起點、1 2 3 城堡、# 樹、G 寶箱），用方向鍵走，走到三座 🏰 答三關的題目。HTML 和 CSS 不要改，請只改 JavaScript。</p>
<p><b>① 加什麼：</b><Ph>我要加的東西</Ph></p>
<p><b>② 怎麼動：</b><Ph>它怎麼動？數字是多少？</Ph></p>
<p><b>③ 不能弄壞：</b><Ph>哪些已經做好、不能壞？</Ph></p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card yellow" style="margin-top:0;font-size:.98rem;line-height:1.4"><b>💡 選一個點子</b><br>
    🔑 <b>鑰匙門</b>：先撿到 🔑，第 3 座城堡才進得去<br>
    👻 <b>怪物</b>：每 1 秒走一格，碰到少一顆 ❤️<br>
    🌀 <b>傳送門</b>：走進一個，從另一個出來<br>
    ⏱ <b>限時</b>：60 秒內三關都要過
  </div>
  <div class="card" style="font-size:.95rem"><b>寫 ② 的時候想一想</b>：在地圖上用<b>哪個字母</b>？碰到會怎樣？數字多少？</div>
  <div class="card pink" style="font-size:.98rem">一次只加<b>一個</b>　玩過才 <b>☁️ Save</b></div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。最後一步沒有填空，四格自己寫（跟第 23 頁一樣），右邊只有點子。
老師心裡的範例（學生卡住再說）：
① 一把鑰匙 🔑 ② 在 mapRows 用 K 代表鑰匙；還沒撿到鑰匙時，第 3 座城堡走不進去，地圖下面寫「需要 🔑」；撿到鑰匙後上方顯示 🔑 ③ 地圖、三關、樹、寶箱、愛心、再玩一次 ④ 我會先去第 3 座城堡，再去撿鑰匙。
👻 怪物最難：要用計時器讓它自己走，答題的時候怪物要停下來（提醒學生寫進 ②）。
⏱ 限時：上方的 ⏱（id "timer"，外框 id "timerStat"）HTML 已經有，藏在 class "hidden" 裡；要把這兩個名字寫進 Prompt。
做完的同學請他在「分享」時展示，或下一堂迷宮尋寶當小幫手。
-->

---
hostOnly: true
---

# 下一堂預告

<div class="cols" style="grid-template-columns:1fr 1fr;margin-top:.4rem;align-items:center">
<div class="card" style="margin:0">
  <span class="tag">示意圖</span>
  <div class="maze">
    <span>🧱</span><span>🧱</span><span>🧱</span><span>🧱</span><span>🧱</span><span>🧱</span>
    <span>🧱</span><span>🙂</span><span></span><span></span><span>🔑</span><span>🧱</span>
    <span>🧱</span><span></span><span>🧱</span><span>🧱</span><span></span><span>🧱</span>
    <span>🧱</span><span></span><span></span><span>🧱</span><span></span><span>🧱</span>
    <span>🧱</span><span>🧱</span><span></span><span>🚪</span><span>💎</span><span>🧱</span>
    <span>🧱</span><span>🧱</span><span>🧱</span><span>🧱</span><span>🧱</span><span>🧱</span>
  </div>
</div>
<div>
  <div class="big">迷宮尋寶 🗝️</div>
  <div style="font-size:1.25rem;margin-top:.6rem">用<b class="yellow">方向鍵</b>走迷宮，<br>地圖也可以請 <b class="orange">AI</b> 畫！<br>程式變長了，要學<b class="pink">新的貼法</b> ✂️</div>
</div>
</div>

<style>
.maze { display: grid; grid-template-columns: repeat(6, 2.6rem); gap: 2px; justify-content: center; margin-top: .3rem; }
.maze span { height: 2.6rem; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; background: #000; }
</style>

<!--
⏱ 1 分鐘。這一頁只在老師版出現。
「今天題目清單是資料，換題目規則不用改。下一堂做迷宮：地圖也是資料，可以請 AI 畫。」
「程式會越來越長，AI 常常不給完整的程式，所以下一次要學：只換掉改過的那一段（用 Ctrl+F 找）。」
-->
