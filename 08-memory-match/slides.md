---
theme: default
title: 記憶翻牌：第一個用滑鼠玩的遊戲
info: |
  國小 Vibe Coding 遊戲課第 8 堂：用 AI 做出只用滑鼠玩、可以贏也可以輸的記憶翻牌遊戲；學會「AI 也會出錯，先玩再存」。
colorSchema: dark
layout: default
transition: slide-left
mdc: true
aspectRatio: 16/9
fonts:
  provider: none
---

# 記憶翻牌：第一個用滑鼠玩的遊戲

<div class="cols" style="grid-template-columns:3fr 2fr;align-items:center;margin-top:.6rem">
<div>
  <div class="tag green" style="font-size:.9rem">第 8 堂</div>
  <div class="big">今天做一個<br><span class="yellow">只用滑鼠</span>玩的遊戲 🖱️</div>
  <div class="row" style="justify-content:flex-start;gap:.5rem;margin-top:1.2rem">
    <span class="tag neon">🖱️ 點一下翻牌</span>
    <span class="tag">🧠 記住第一張</span>
    <span class="tag green">👣 20 步挑戰</span>
    <span class="tag orange">🤖 AI 也會出錯</span>
  </div>
  <p class="small" style="margin-top:1.2rem">國小 Vibe Coding 遊戲課 · JSFiddle ＋ AI</p>
</div>
<div class="center">
  <div class="shot fit" style="--h:20rem">
    <span class="label tag neon">真實畫面 · 老師的完成版</span>
    <img src="/img/real-playing.png" alt="The finished memory game: some pairs matched in green, moves 4 / 20">
  </div>
</div>
</div>

<!--
⏱ 1 分鐘。「今天的遊戲不用鍵盤，只用滑鼠。你們的記憶力好不好？今天就來考考看！」

【課前準備，第一次用這份投影片一定要看】
1. 建立 4 個 fiddle（原始碼都在 08-memory-match/starter/）：起始遊戲 memory-match-0.html、救援 1、救援 2、救援 3（完整版）。
   每個檔案裡 CSS 窗格、HTML 窗格、JavaScript 窗格的內容有註解標好，分別貼進 JSFiddle 再 Save。
2. 把 4 個網址填進 components/Fiddle.vue 最上面的 FIDDLES（只要改這一個地方，所有頁面都會更新），再 push。
   沒填的話，投影片會顯示粉紅色的「老師課前填入」。
3. Google Classroom 建立作業「第 8 堂：記憶翻牌」，加一個「選填」的設計卡欄位（目標／規則／挑戰／回饋）。
4. 自己用第 11 頁的 Prompt 問一次 ChatGPT 或 Gemini，確認免費帳號會回傳「完整」的 JavaScript。
-->

---

# 你記得住嗎？

<Step label="暖身" actor="teacher" />

<div class="cols" style="grid-template-columns:1.1fr 1fr;margin-top:.2rem">
<div class="row" style="gap:.8rem;flex-wrap:nowrap">
  <div class="shot fit" style="--h:18.5rem">
    <span class="label tag" style="background:var(--c-win)">🏆 贏</span>
    <img src="/img/real-win.png" alt="Win screen: 你贏了！">
  </div>
  <div class="shot fit" style="--h:18.5rem">
    <span class="label tag" style="background:var(--c-lose)">💥 輸</span>
    <img src="/img/real-lose.png" alt="Lose screen: 步數用完了">
  </div>
</div>
<div>
  <ol class="steps">
    <li>老師玩<b>完成版</b>，你們出主意</li>
    <li>大家一起喊：「<b class="yellow">翻這張！</b>」</li>
    <li>玩兩次：一次<b class="c-win">贏</b>、一次<b class="c-lose">輸</b></li>
  </ol>
  <div class="card yellow center" style="margin-top:1rem"><span class="q">❓ 為什麼會輸？</span></div>
</div>
</div>
<div class="small" style="margin-top:.8rem">兩張都是<b>真實畫面</b>（老師的完成版）</div>

<!--
⏱ 4 分鐘。打開救援 3（完整版，網址是 components/Fiddle.vue 裡的 rescue3），投影出來，按 Run → 開始。
讓全班喊要翻哪一張，老師照著點。第一局認真記、贏給大家看；第二局故意亂翻，讓 20 步用完，看到失敗畫面。
問：「為什麼會輸？」等學生說出「步數用完了」，再追問：「如果不限步數，好玩嗎？」帶出下一頁的「挑戰」。
常見狀況：學生喊太多張，老師就說「一次只能翻兩張」，順便帶出規則。
-->

---

# 遊戲設計四個字

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.7rem;margin-top:.2rem">
  <div class="card" style="margin:0"><div class="tag neon">目標 Goal</div><div class="yellow" style="font-weight:900">我要做到什麼？</div><div class="small" style="margin-top:.3rem">⚽ 60 秒內射進 5 球</div></div>
  <div class="card green" style="margin:0"><div class="tag green">規則 Rules</div><div class="yellow" style="font-weight:900">我可以做什麼、不能做什麼？</div><div class="small" style="margin-top:.3rem">⚽ 方向鍵跑、空白鍵射門</div></div>
  <div class="card pink" style="margin:0"><div class="tag pink">挑戰 Challenge</div><div class="yellow" style="font-weight:900">什麼讓它變難？</div><div class="small" style="margin-top:.3rem">⚽ 守門員、防守球員、時間</div></div>
  <div class="card orange" style="margin:0"><div class="tag orange">回饋 Feedback</div><div class="yellow" style="font-weight:900">我做了一件事，遊戲怎麼回答我？</div><div class="small" style="margin-top:.3rem">⚽ 跳出「GOAL!!!」、進球 +1</div></div>
</div>

<div class="small" style="margin:.5rem 0 .2rem">⚽ 例子：SUPER STRIKER（第 4 堂的足球遊戲）</div>

<div class="card" style="margin-top:.6rem;border-style:dashed">
  <b>另外一張檢查表：完整遊戲</b>（第 4 堂學過）
  <div class="stages" style="margin-top:.4rem">
    <div class="s1">🏁 開始</div><div class="s2">🎮 遊玩</div><div class="s3">🏆 勝利</div><div class="s4">💥 失敗</div><div class="s5">↻ 重玩</div>
  </div>
</div>

<!--
⏱ 4 分鐘。「做遊戲的人會問自己四個問題，我們叫它『遊戲設計四個字』：目標、規則、挑戰、回饋。」
一張一張念問題，再請學生用 SUPER STRIKER 回答（例子已經寫在卡片下面，可以先遮住再對答案）。
回饋最容易懂錯：不是「別人給你的意見」，是「你做了一件事，遊戲怎麼回答你」：進球時跳出 GOAL!!!、按了按鈕有反應。
獎勵（加分、星星）是開心的回饋。
最後指下面的色條：「四個字讓遊戲『好玩』；完整遊戲這張表讓遊戲『做完』。兩張表都要用。」
SUPER STRIKER 的「60 秒內射進 5 球」是第 4 堂加上的勝利條件（原始遊戲只有 60 秒倒數和進球數）。
-->

---

# 找找看：目標和挑戰

<Step label="找找看" actor="all" />

<div class="find" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:.4rem">
  <div>
    <div class="shot"><span class="label tag neon">真實畫面</span><img src="/img/game-result.png" alt="Space Shooter"></div>
    <div class="card" style="margin-top:.9rem"><b>🚀 Space Shooter</b><br>目標？<br>挑戰？</div>
  </div>
  <div>
    <div class="shot"><span class="label tag neon">真實畫面</span><img src="/img/game-soccer.png" alt="SUPER STRIKER"></div>
    <div class="card" style="margin-top:.9rem"><b>⚽ SUPER STRIKER</b><br>目標？<br>挑戰？</div>
  </div>
  <div>
    <div class="shot"><span class="label tag">示意圖</span><MarioLevel /></div>
    <div class="card" style="margin-top:.9rem"><b>🍄 超級瑪利歐</b><br>目標？<br>挑戰？</div>
  </div>
</div>

<style>
.find .shot img { height: 9.5rem; object-fit: cover; object-position: center top; }
.find .shot svg { height: 9.5rem; display: block; }
.find .card { font-size: 1.15rem; line-height: 1.6; }
</style>

<!--
⏱ 2 分鐘。每個遊戲問兩題：「目標是什麼？」「什麼讓它變難？」請不同學生回答，答案在下一頁（只有老師版看得到）。
瑪利歐的圖是原創示意圖（不是任天堂的畫面）。作者已同意可以用 Super Mario Bros. 的真實截圖：
有截圖的話放到 public/img/mario.png，把這一格的 MarioLevel 換成 img 標籤（src 為 /img/mario.png），標籤改成「真實畫面」。
學生常把規則講成挑戰（「要按空白鍵」）。提醒：擋住你、讓你可能輸的，才是挑戰。
-->

---
hostOnly: true
---

# 答案：目標和挑戰

<div class="find" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:.4rem">
  <div>
    <div class="shot"><span class="label tag neon">真實畫面</span><img src="/img/game-result.png" alt="Space Shooter"></div>
    <div class="card" style="margin-top:.9rem"><b>🚀 Space Shooter</b><br>目標：<span class="yellow">打外星人，拿高分</span><br>挑戰：<span class="pink">外星人一直來、只有 3 條命</span></div>
  </div>
  <div>
    <div class="shot"><span class="label tag neon">真實畫面</span><img src="/img/game-soccer.png" alt="SUPER STRIKER"></div>
    <div class="card" style="margin-top:.9rem"><b>⚽ SUPER STRIKER</b><br>目標：<span class="yellow">60 秒內射進 5 球</span><br>挑戰：<span class="pink">守門員、防守球員、時間</span></div>
  </div>
  <div>
    <div class="shot"><span class="label tag">示意圖</span><MarioLevel /></div>
    <div class="card" style="margin-top:.9rem"><b>🍄 超級瑪利歐</b><br>目標：<span class="yellow">走到終點旗子</span><br>挑戰：<span class="pink">敵人、會掉下去的洞</span></div>
  </div>
</div>

<div class="card yellow center" style="margin-top:.8rem">怎麼分？<b>你想做到的</b>是目標，<b>擋住你的</b>是挑戰</div>

<style>
.find .shot img { height: 8rem; object-fit: cover; object-position: center top; }
.find .shot svg { height: 8rem; display: block; }
.find .card { font-size: 1.05rem; line-height: 1.5; }
</style>

<!--
⏱ 1 分鐘。這一頁只在老師版出現。對完答案，念黃色那一句。
給老師參考（不用全部講）：
・規則：Space Shooter 左右鍵移動、空白鍵射擊；SUPER STRIKER 方向鍵跑、空白鍵射門；瑪利歐 左右走、按鍵跳。
・回饋：外星人被打中消失、分數 +1；跳出 GOAL!!!；吃到金幣有聲音、分數變多。
學生答「別的挑戰」只要說得出「為什麼讓它變難」就算對。
-->

---

# 今天的路線圖

<div class="card orange" style="margin-top:.1rem;font-size:1.25rem">🤖 <b>今天跟 AI 學：</b>AI 也會出錯，每次回答也不一樣 → <b class="yellow">先玩，再 ☁️ Save</b></div>

<div class="flow road" style="margin-top:.9rem">
  <div class="card"><div class="tag neon">起始遊戲</div><img src="/img/real-board-closed.png" alt=""><div>點了沒反應</div></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">STEP 1</div><img src="/img/real-step1.png" alt=""><div>點一下翻牌</div><div class="pf">✏️ 填 2 格</div></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">STEP 2</div><img src="/img/real-mismatch.png" alt=""><div>翻兩張比一比</div><div class="pf">✏️ 填 4 格</div></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">STEP 3</div><img src="/img/real-lose.png" alt=""><div>步數與輸贏</div><div class="pf">✏️ 填 5 格</div></div>
  <div class="arrow-r">➜</div>
  <div class="card green"><div class="tag green">我的版本</div><div style="font-size:3.2rem;line-height:7.2rem">🎨</div><div>自己選一個改</div><div class="pf">✏️ 四格自己寫</div></div>
</div>
<div class="small" style="margin-top:.5rem">小圖都是<b>真實畫面</b>（老師的遊戲每一步的樣子）· ✏️ Prompt 裡你要自己填的地方，一步比一步多</div>

<style>
.road .card { padding: .4rem; font-size: 1.05rem; font-weight: 900; }
.road img { height: 7.2rem; width: auto; margin: .2rem auto; display: block; border: 2px solid #fff; }
.road .pf { margin-top: .25rem; background: var(--pink); color: #000; font-size: 1rem; }
</style>

<!--
⏱ 2 分鐘。先念橘色那一行：「今天除了做遊戲，還要學一件跟 AI 合作很重要的事：AI 也會寫錯。所以每一步都要先玩過，確定沒問題才按 ☁️ Save。」
再從左到右指一遍：起始遊戲點牌沒反應 → STEP 1 會翻 → STEP 2 會比對 → STEP 3 有步數、會贏會輸 → 最後做自己的版本。
「每一步都是一個新的版本編號，壞掉了可以回去上一個版本。」
指粉紅色的 ✏️：「今天的 Prompt 不是全部都幫你寫好。STEP 1 你要填 2 格，STEP 2 填 4 格，STEP 3 填 5 格，最後『我的版本』四格都自己寫。練習到最後，你就能自己寫 Prompt。」
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
⏱ 3 分鐘（登入時間不算在這裡，已經在另外 30 分鐘裡）。全班一起做，老師投影自己的畫面同步操作。
「今天是新遊戲，不要打開上次的遊戲，要 Fork 今天的起始遊戲。」
做完請大家看網址：jsfiddle.net/遊戲編號/版本編號。遊戲編號跟投影片上的不一樣才對。
右邊截圖是第 2 堂 Space Shooter 的 fiddle，按鈕位置一樣。截圖上的「运行」是 JSFiddle 跟著瀏覽器語言顯示的（zh-ok），學生畫面可能是 Run 或「執行」。
常見問題：沒登入 JSFiddle 時 Fork 會要你登入，選 GitHub 登入。
-->

---

# 新東西：點一下也是事件

<div class="flow" style="margin-top:.2rem">
  <div class="card" style="flex:1"><div class="tag neon">第 2 堂</div><div class="big">⌨️ ➜ 🚀</div><div>按<b class="yellow">空白鍵</b> → 發射子彈</div></div>
  <div class="card yellow" style="flex:1"><div class="tag">今天</div><div class="big">🖱️ ➜ 🃏</div><div><b class="yellow">點一下</b>牌 → 翻開</div></div>
</div>

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:.8rem;align-items:center">
<div>

```js
// 示意：當這張牌被「點一下」
card.addEventListener("click", function () {
  // 就翻開這張牌
});
```

</div>
<div style="font-size:1.2rem">
  <b class="neon">事件 Event</b>：有事發生，就做一件事<br>
  <code>click</code> 就是「滑鼠點一下」
</div>
</div>

<div class="small" style="margin-top:.4rem">左邊程式是<b>示意</b>，不用打字，認得 <code>click</code> 這個字就好</div>

<!--
⏱ 3 分鐘。問：「第 2 堂的太空射擊，按空白鍵會怎樣？」（發射子彈）「這叫事件：有事發生，就做一件事。」
「今天的遊戲沒有鍵盤，滑鼠點一下也是一種事件，英文叫 click。」
程式不用懂每個字，只要認得 click：之後 AI 給的程式裡，看到 click 就知道「這裡是點一下以後要做的事」。
這段是示意，起始遊戲裡的「開始」按鈕就是用一樣的寫法（startBtn.addEventListener("click", …)）。
-->

---

# STEP 1 目標：點一下就翻牌

<Step n="1" kind="目標" actor="all" />

<div style="display:flex;align-items:center;justify-content:center;gap:1rem;margin-top:-.2rem">
  <div class="shot fit" style="--h:13.5rem"><span class="label tag neon">現在</span><img src="/img/real-board-closed.png" alt="All 12 cards face down"></div>
  <div class="big yellow">➜</div>
  <div class="shot fit" style="--h:13.5rem"><span class="label tag green">STEP 1 完成</span><img src="/img/real-step1.png" alt="Three cards flipped open showing emoji"></div>
</div>

<div class="row" style="margin-top:.8rem;gap:.7rem;align-items:stretch;font-size:1.1rem">
  <div class="card green" style="flex:1;margin:0"><b>✅ 你會看到</b><br>點蓋著的牌 → 翻開看到 emoji（這就是<b class="orange">回饋</b>）</div>
  <div class="card pink" style="flex:1;margin:0"><b>❌ 不能發生</b><br>點翻開的牌，它又蓋回去</div>
  <div class="card" style="flex:1;margin:0"><b>⏭️ 之後再做</b><br>翻幾張都可以，STEP 2 才比對</div>
</div>
<div class="small" style="margin-top:.4rem">兩張都是<b>真實畫面</b>（老師的起始遊戲和救援 1）</div>

<!--
⏱ 2 分鐘。「現在點牌沒有反應，這是一個沒有回饋的遊戲，玩的人會以為壞掉了。STEP 1 要讓它點一下就翻開。」
指粉紅卡：「翻開的牌再點一下，要保持翻開，不能蓋回去。」這一條等一下第 13 頁會用到（有的 AI 會寫錯這裡）。
「開始」畫面會蓋住整個桌面，所以按開始之前本來就點不到牌，不用特別請 AI 處理。
-->

---

# STEP 1 步驟

<Step n="1" kind="步驟" actor="all" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.2rem">
<div>
  <ol class="steps" style="font-size:1.15rem">
    <li><b>複製程式</b>：點一下 JSFiddle 的 JavaScript 窗格 → <code>Ctrl+A</code> 全選 → <code>Ctrl+C</code></li>
    <li><b class="pink">✏️ 填空</b>：下一頁粉紅色的框，一格一格填，<b class="green">變綠色</b>就對了</li>
    <li><b>貼上程式</b>：最後一個框點一下 → <code>Ctrl+V</code></li>
    <li><b>貼給 AI</b>：按「📋 複製」→ AI 對話框 <code>Ctrl+V</code> → 送出</li>
    <li><b>整段換掉</b>：AI 程式框右上角按「複製」→ JavaScript 窗格 <code>Ctrl+A</code> → <code>Ctrl+V</code></li>
    <li><b class="yellow">先玩，再存</b>：按 <b>Run</b> 玩一玩，檢查都過了，才按 <b>☁️ Save</b></li>
  </ol>
</div>
<div>
  <div class="card pink" style="margin-top:.3rem"><b>✏️ 填空長這樣</b>
    <div style="margin-top:.3rem">點 <span class="ph-demo">幾</span> 張牌 → 點框框，打 3</div>
    <div style="margin-top:.3rem">點 <span class="ph-demo ok">3</span> 張牌 → <b class="green">綠色 = 填好了</b></div>
    <div class="small" style="margin-top:.3rem">「📋 複製」會把你填的字一起複製</div>
  </div>
  <div class="card yellow" style="font-size:1.1rem"><b>🖱️ 不會用快捷鍵？</b><br>在窗格裡按<b>滑鼠右鍵</b>：<br>全選 → 複製 → 貼上</div>
</div>
</div>

<style>
.ph-demo { color: #000; background: var(--pink); font-weight: 900; padding: 0 .5rem; border: 3px solid #000; }
.ph-demo.ok { background: var(--green); }
</style>

<!--
⏱ 3 分鐘。全班一起：老師投影，一步一步示範第 1–5 步，學生跟著做（第一次用整段換掉，老師一定要示範一次）。
新做法：Prompt 的空格直接在投影片上填（學生在自己筆電上開課程網站）。每一格填好會從粉紅變綠色；全部變綠，「📋 複製」按鈕也會變綠。
按「📋 複製」會把整段 Prompt 連同填的字、貼上的程式一起複製，到 AI 只要 Ctrl+V 一次就能送出。
今天每一步要填的格子會越來越多（路線圖上的 ✏️），最後自己寫整個 Prompt。
第 1 步最常錯：沒有先點進 JavaScript 窗格，Ctrl+A 會選到整個網頁。看到整頁變藍色，就是選錯了，點一下 JS 窗格再按一次。
第 3 步：最後一個粉紅框是放程式的，點一下再 Ctrl+V，看到「✅ 已貼上 ○○ 行」就對了。程式框只會留在這一頁，換頁回來要重新貼（確保每次都是最新的程式）。
填的字在同一個瀏覽器分頁裡換頁會保留；重新整理或換電腦就要重填。
第 5 步：ChatGPT 程式框右上角有「Copy code／複製程式碼」，Gemini 是一個複製圖示。只複製程式框，不要複製 AI 的說明文字。
第 6 步是今天的重點：先玩，再存。
-->

---

# STEP 1 Prompt

<Step n="1" kind="Prompt" actor="all" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 STEP 1：點一下就翻牌">
<p>我在 JSFiddle 做一個「記憶翻牌」遊戲。HTML 和 CSS 已經做好了，請只改 JavaScript。</p>
<p><b>① 加什麼：</b>點一張蓋著的牌，它會翻開，露出 emoji。</p>
<p><b>② 怎麼動：</b>翻開時幫牌加上 class "flipped"（CSS 已經寫好了）。已經翻開的牌再點一次，要<Ph pick="保持翻開|蓋回去" answer="保持翻開" />。一次翻很多張也沒關係，先不用比對。</p>
<p><b>③ 不能弄壞：</b>「開始」按鈕和洗牌要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會按 Run、按開始，點<Ph number>幾</Ph>張牌，再點一張已經翻開的牌。</p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 填 2 格</b><br>
    <span class="n">1</span>翻開的牌再點，應該怎樣？看第 9 頁「❌ 不能發生」<br>
    <span class="n">2</span>打一個數字<br>
    <span class="small">最後一格：<code>Ctrl+V</code> 貼上你的程式</span>
  </div>
  <div class="card orange" style="font-size:1.02rem"><b>為什麼要「完整」？</b>AI 有時只給一半（「其餘不變」），貼上去遊戲就壞。</div>
  <div class="card green checks" style="font-size:1.05rem"><b>🔍 貼回去以後</b>
    <ol class="steps">
      <li>點 JS 窗格 → <code>Ctrl+F</code> 搜尋 <code>flipped</code>：找得到</li>
      <li>Run → 開始 → 點三張：都翻開</li>
    </ol>
  </div>
</div>
</div>

<!--
⏱ 5 分鐘。老師先完整做一次：填 2 格 → 最後一格 Ctrl+V 貼上程式 → 按「📋 複製」→ 到 AI Ctrl+V → 送出 → 複製程式框 → 整段換掉 → Run。學生跟著做。
填空答案：第 1 格選「保持翻開」（選對變綠色；選「蓋回去」會變橘色，旁邊提示「再看一次目標頁」）；第 2 格任何數字都可以（例如 3）。
複製按鈕是粉紅色的「⚠️ 📋 複製（還有 N 格／還要貼程式）」＝還有格子不是綠色；全部好了按鈕會變綠。
格子沒填好就按複製：不會複製，上面跳出粉紅色警告，沒填好的格子會閃黃光。4 秒內再按一次會「照樣複製」（沒填的格子變成【…】），請學生先填好。
帶學生看 Prompt 的四個部分：① 加什麼 ② 怎麼動 ③ 不能弄壞 ④ 怎麼檢查，第 24 頁他們要自己寫一個。
「flipped」是起始遊戲 CSS 裡已經寫好的樣式（翻開的牌變白色、看得到 emoji），所以 AI 只要加上這個 class。
AI 常見錯誤：用 classList.toggle("flipped")，翻開的牌再點會蓋回去（第 13 頁會拿來討論）；只回一半的程式碼（寫「其餘不變」）。
遇到只回一半：回 AI「請給我完整的 JavaScript，從第一行到最後一行，不要省略。」
-->

---

# STEP 1 檢查

<Step n="1" kind="檢查" actor="all" />

<div class="cols" style="grid-template-columns:1.25fr 1fr;margin-top:-.2rem">
<div>
<ul class="check" style="font-size:1.2rem">
  <li>按 <b>Run</b> → 按「開始」：12 張牌都蓋著</li>
  <li>點一張牌：<b>翻開</b>，看到 emoji</li>
  <li>再點三張：<b>都翻開</b></li>
  <li>點一張已經翻開的牌：<b>還是翻開</b></li>
  <li><code>Ctrl+F</code> 搜尋 <code>flipped</code>：找得到</li>
</ul>
<div class="card green" style="font-size:1.1rem;margin-top:.5rem">🎉 5 項都打勾 → 按 <b>☁️ Save</b> → STEP 1 完成！</div>
<div class="small">😵 卡住 10 分鐘？Fork 救援 1：<Fiddle k="rescue1" /></div>
</div>
<div>
  <div class="card orange bug" style="margin-top:0"><b>🪲 壞掉了？這樣告訴 AI：</b><br>
  ❌ 「不能玩，幫我修好」<br>
  ✅ 「我按開始後點一張牌，牌沒有翻開。我希望點一下就翻開看到 emoji。」
  <div class="small" style="margin-top:.3rem">＝ 我做了什麼 ＋ 看到什麼 ＋ 我期待什麼</div>
  </div>
  <div class="card pink" style="font-size:1.05rem">一次只說<b>一個</b>問題，<br>再貼上<b>最新</b>的 JavaScript</div>
</div>
</div>

<!--
⏱ 4 分鐘。請學生一項一項打勾（用手指著螢幕念出來就好，不用寫）。全部打勾才按 ☁️ Save。
Ctrl+F：要先點一下 JavaScript 窗格裡面，再按 Ctrl+F，JSFiddle 才會在程式裡找（框框出現在窗格上方）。
救援 1 網址在左下角。卡住的學生 Fork 救援 1，就直接有 STEP 1 完成的遊戲，再按一次 ☁️ Save 繼續。
老師巡堂時順便找兩位「AI 寫法不一樣」的同學，下一頁可以請他們分享。
-->

---

# AI 也會出錯

<Step label="AI" actor="all" />

<div class="cols" style="margin-top:-.2rem;gap:1rem">
<div class="card green" style="margin:0">
  <b>A 同學的 AI</b>

```js
if (card.classList.contains("flipped")) return;
card.classList.add("flipped");
```

  <div style="font-size:1.05rem">「已經翻開，就不理它」</div>
  <div class="green" style="font-weight:900">✅ 點翻開的牌：還是翻開</div>
</div>
<div class="card pink" style="margin:0">
  <b>B 同學的 AI</b>

```js
card.onclick = function () {
  card.classList.toggle("flipped");
};
```

  <div style="font-size:1.05rem"><code>toggle</code>＝切換：開的變關、關的變開</div>
  <div class="pink" style="font-weight:900">❌ 點翻開的牌：又蓋回去了</div>
</div>
</div>

<div class="row" style="margin-top:.7rem;align-items:center;gap:1rem">
  <div class="q">你的跟隔壁一樣嗎？</div>
  <div class="card yellow" style="margin:0;font-size:1.25rem">🤖 AI 寫，🧑 <b>你來檢查</b>：玩過才按 ☁️ Save</div>
</div>
<div class="small" style="margin-top:.3rem">示意圖：同一個 Prompt，兩次 AI 回答的一小段</div>

<!--
⏱ 3 分鐘。問全班：「你的 AI 給的程式，跟隔壁一樣嗎？」請兩位同學比一比（上一頁巡堂找到的）。
「同一句話，AI 每次回答都不一樣，這很正常；只要遊戲照我們要的方式動就好。」
「但是 AI 也可能寫錯：右邊這個 AI 用了 toggle（切換），翻開的牌再點一下就蓋回去了。如果沒有玩過就 Save，壞掉的版本就存起來了。」
結論念黃色卡片。B 的程式也不是「爛」，是沒有照我們的規則做，所以我們的 Prompt 寫「再點一次要保持翻開」，檢查清單也有這一條。
課前：若有時間，用第 11 頁 Prompt 問 AI 幾次，把真的不一樣的回答換進來（目前兩段是示意，依常見寫法整理）。
-->

---

# STEP 2 目標：翻兩張，比一比

<Step n="2" kind="目標" actor="me" />

<div class="cols" style="grid-template-columns:1fr 1.25fr;margin-top:-.3rem;align-items:center">
<div class="center">
  <div class="shot fit" style="--h:19rem">
    <span class="label tag neon">真實畫面 · 救援 2</span>
    <img src="/img/real-mismatch.png" alt="A matched pair of monkeys in green; a fox and a dog just flipped">
    <div class="hl" style="left:27%;top:12.6%;width:46.2%;height:27.6%"></div>
    <div class="hl-note" style="left:5%;top:42%">⏱ 不一樣：1 秒後蓋回</div>
    <div class="hl" style="left:3.2%;top:12.6%;width:22.6%;height:27.6%;border-color:var(--green);box-shadow:0 0 14px var(--green);animation:none"></div>
    <div class="hl" style="left:74.2%;top:41.1%;width:22.6%;height:27.6%;border-color:var(--green);box-shadow:0 0 14px var(--green);animation:none"></div>
    <div class="hl-note" style="left:45%;top:71%;background:var(--green)">✅ 一樣：留著</div>
  </div>
</div>
<div style="font-size:1.15rem">
  <div class="card" style="margin-top:0"><b class="neon">📏 規則</b><br>一次翻兩張，比一比</div>
  <div class="card green"><b class="green">🎁 回饋</b><br>一樣 → 變綠色，<b>一直留著</b><br>不一樣 → 等 <b>1 秒</b>，蓋回去</div>
  <div class="card pink"><b class="pink">❌ 不能發生</b><br>等 1 秒的時候，又翻開第三張</div>
</div>
</div>

<!--
⏱ 3 分鐘。從這裡開始是「你自己做」：學生照投影片自己做，老師巡堂。
指圖：左上和右邊中間兩隻猴子一樣 → 變綠色留著；上面狐狸和小狗不一樣 → 1 秒後蓋回去。
「為什麼要等 1 秒？」（不然還沒看清楚就蓋回去，記不住）這也是回饋：讓玩家有時間記。
「為什麼不能翻第三張？」（規則說一次只能翻兩張）
-->

---

# 新點子：遊戲要記住第一張

<div class="flow" style="margin-top:.2rem">
  <div class="card yellow"><div class="tag">① 翻第一張</div><div class="big">🐱</div>放進腦袋盒子<br><code>firstCard</code></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">② 翻第二張</div><div class="big">🐶</div>拿出第一張<br>比一比</div>
  <div class="arrow-r">➜</div>
  <div class="card"><div class="tag neon">③ 一樣嗎？</div><div style="font-size:1.15rem;line-height:1.9"><span class="green">✅ 一樣：留著</span><br><span class="pink">❌ 不一樣：蓋回去</span></div></div>
</div>

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:.7rem;align-items:center">
<div>

```js
// 示意
if (第一張 === 第二張) {
  // 一樣：兩張留著
} else {
  // 不一樣：等 1 秒，蓋回去
}
```

</div>
<div style="font-size:1.15rem">
  <b class="yellow">變數 Variable</b> ＝ 會記住東西的盒子（第 2 堂學過）<br>
  <code>===</code> 的意思是「<b>一不一樣</b>」
</div>
</div>

<!--
⏱ 3 分鐘。小遊戲：請一位同學當「遊戲的腦袋」。老師翻一張紙卡（或在黑板畫 🐱），請他記住，蓋起來；再翻第二張 🐶，問他「一樣嗎？」
「你剛剛用腦袋記住第一張。電腦沒有腦袋，所以要用一個變數（盒子）記住第一張，AI 常常叫它 firstCard。」
「如果……就……」就是第 2 堂的條件 Condition。
程式是示意（不是遊戲裡真的寫法），只要認得 === 是「比一比一不一樣」。
-->

---

# STEP 2 步驟

<Step n="2" kind="步驟" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.2rem">
<div>
  <div class="warn" style="font-size:1.1rem;margin-bottom:.5rem">先確認：STEP 1 能玩，而且已經 <b>☁️ Save</b></div>
  <ol class="steps" style="font-size:1.15rem">
    <li><b>複製程式</b>：JS 窗格 <code>Ctrl+A</code> → <code>Ctrl+C</code></li>
    <li><b class="pink">✏️ 填 4 格</b>：答案在第 14 頁，<b class="green">全部變綠</b></li>
    <li><b>貼上程式</b>：最後一個框 <code>Ctrl+V</code>（<b class="yellow">最新</b>的程式）</li>
    <li><b>貼給 AI</b>：「📋 複製」→ AI 對話框 <code>Ctrl+V</code> → 送出</li>
    <li><b>整段換掉</b>：AI 的程式 → JS 窗格 <code>Ctrl+A</code> → <code>Ctrl+V</code></li>
    <li><b class="yellow">先玩，再存</b>：Run → 照第 18 頁檢查 → <b>☁️ Save</b></li>
  </ol>
</div>
<div>
  <div class="card"><b class="neon">⏱ 計時器 Timer</b><br>「等 1 秒」在程式裡寫成<br><code>1000</code>（1000 毫秒 ＝ 1 秒）</div>
  <div class="card yellow" style="font-size:1.1rem"><b>最新的程式</b>＝<br>你 STEP 1 改好、玩過的那一份</div>
</div>
</div>

<!--
⏱ 2 分鐘。跟 STEP 1 一樣的六步，這次學生自己做。這次要填 4 格，比 STEP 1 多：答案都在第 14 頁的目標頁（規則、回饋、不能發生）。
提醒「最新」：一定要從 JSFiddle 現在的 JS 窗格複製，不要用 AI 上一次給的回答，也不要用起始遊戲。貼舊的程式，STEP 1 做好的翻牌會不見。
1000 毫秒：等一下 Ctrl+F 搜尋 1000 就能確認 AI 有沒有加「等 1 秒」。
-->

---

# STEP 2 Prompt

<Step n="2" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 STEP 2：翻兩張，比一比">
<p>我在 JSFiddle 做「記憶翻牌」遊戲，現在點一下牌會翻開。HTML 和 CSS 已經做好了，請只改 JavaScript。</p>
<p><b>① 加什麼：</b>翻兩張牌之後，比一比是不是一樣。</p>
<p><b>② 怎麼動：</b>一次只能翻兩張。兩張一樣，就幫它們加上 class "matched"（CSS 已經寫好了），<Ph pick="一直留著|蓋回去" answer="一直留著" />。兩張不一樣，等<Ph number>幾</Ph>秒再一起蓋回去。等的時候，點別張牌<Ph pick="沒有反應|可以翻開" answer="沒有反應" />。</p>
<p><b>③ 不能弄壞：</b>點牌翻開、「開始」按鈕和洗牌都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 填 4 格</b>（看第 14 頁）<br>
    <span class="n">1</span><span class="n">3</span>選一個　<span class="n">2</span>幾秒？<br>
    <span class="n">4</span>怎麼玩？先點框框，再點字：
    <Bank words="翻兩張不一樣的|等的時候點第三張|翻一對一樣的" />
  </div>
  <div class="card green checks" style="font-size:1.05rem"><b>🔍 貼回去以後</b>
    <ol class="steps">
      <li><code>Ctrl+F</code> 搜尋 <code>1000</code>：找得到</li>
      <li><code>Ctrl+F</code> 搜尋 <code>matched</code>：找得到</li>
    </ol>
  </div>
</div>
</div>

<!--
⏱ 6 分鐘（今天最難的一步，給最多時間）。學生自己做，老師巡堂。
填空答案：① 選「一直留著」②「1」③ 選「沒有反應」④ 自己寫，例如「翻兩張不一樣的、等的時候點第三張」。
④ 可以不打字：先點 ④ 的框框，再點右邊黃色的字，字就會填進框框（點兩個字會用「、」連起來）。
學生寫 1 秒，AI 通常會寫成 1000（毫秒），所以 Ctrl+F 1000 仍然有效；寫成 2 秒也能玩，只是比較慢，不用改。
「matched」也是 CSS 裡寫好的樣式：配對成功的牌變綠色。
AI 常見錯誤：
・沒有擋住「等 1 秒」的時候點第三張（少了 waiting 或 lockBoard 之類的開關），快速連點會翻開三張，甚至卡住。
・比對時拿整張牌比（card === card），不是比 emoji，結果永遠「不一樣」。
・忘了把第一張清掉，第三次翻牌開始亂掉。
遇到這些，請學生用下一頁的症狀表告訴 AI。一個 STEP 大約 3–5 次訊息；AI 額度用完就 Fork 救援 2。
-->

---

# STEP 2 檢查

<Step n="2" kind="檢查" actor="me" />

<div class="cols" style="grid-template-columns:1fr 1.45fr;margin-top:-.3rem;gap:1rem">
<div>
<ul class="check" style="font-size:1.1rem">
  <li>翻兩張<b>一樣</b>的：變綠色，留著</li>
  <li>翻兩張<b>不一樣</b>的：1 秒後蓋回</li>
  <li>等的時候點第三張：<b>沒反應</b></li>
  <li>全部 6 對都能配完</li>
</ul>
<div class="card green" style="font-size:1.05rem">🎉 4 項都打勾 → <b>☁️ Save</b></div>
<div class="small">😵 卡超過 10 分鐘？<br>Fork 救援 2：<Fiddle k="rescue2" /></div>
</div>
<table class="sym"><tbody>
  <tr><th>你看到</th><th>可能是</th><th>這樣告訴 AI</th></tr>
  <tr><td>可以翻第三張</td><td>等的時候沒擋住</td><td>「我翻兩張不一樣的，等的時候點第三張，它也翻開了。我希望等的時候點別張沒反應。」</td></tr>
  <tr><td>一樣的也蓋回去</td><td>沒有比 emoji</td><td>「我翻到兩張🐱，1 秒後也蓋回去了。我希望一樣的兩張一直留著。」</td></tr>
  <tr><td>不一樣的不會蓋回</td><td>少了「等 1 秒」</td><td>「我翻了🐱和🐶，它們一直開著。我希望 1 秒後蓋回去。」</td></tr>
</tbody></table>
</div>
<div class="small" style="margin-top:.4rem">一次只說<b>一個</b>問題 · 再貼上<b>最新</b>的 JavaScript · 句子＝我做了什麼 ＋ 看到什麼 ＋ 我期待什麼</div>

<!--
⏱ 5 分鐘。學生照清單自己玩。全班大部分完成就往下走，不用等每一個人。
症狀表的句子可以直接照念給 AI，把 🐱 🐶 換成自己看到的 emoji。
改壞了可以回到上一個版本：網址最後的版本編號改小一號（STEP 1 存的那一版），按 Enter，再 Fork 或 Save。
救援 2 給卡超過 10 分鐘的學生；後面 STEP 3 和「我的版本」才是今天的重點之一，不要讓學生卡在這裡。
-->

---

# STEP 3 目標：步數用完就輸

<Step n="3" kind="目標" actor="me" />

<div class="s3flow" style="margin-top:-.2rem">
  <div class="shot fit" style="--h:12.5rem"><span class="label tag green">🎮 遊玩中</span><img src="/img/real-playing.png" alt="Playing, moves 4 / 20"></div>
  <div class="branch">
    <div class="c-win">全部配對 ➜</div>
    <div class="c-lose">20 步用完 ➜</div>
  </div>
  <div class="ends">
    <div class="shot fit" style="--h:6rem;border-color:var(--c-win)"><img src="/img/real-win.png" alt="Win screen"></div>
    <div class="shot fit" style="--h:6rem;border-color:var(--c-lose)"><img src="/img/real-lose.png" alt="Lose screen"></div>
  </div>
</div>

<div class="row" style="margin-top:.7rem;gap:.7rem;align-items:stretch;font-size:1.1rem">
  <div class="card pink" style="flex:1;margin:0"><b class="pink">🔥 挑戰</b><br>每翻兩張 ＝ 1 步，最多 <b>20</b> 步</div>
  <div class="card win" style="flex:1;margin:0"><b class="c-win">🏆 勝利</b>／<b class="c-lose">💥 失敗</b><br>顯示勝利畫面或失敗畫面</div>
  <div class="card" style="flex:1;margin:0;border-color:#fff"><b>↻ 再玩一次</b><br>步數歸零、牌重新洗過</div>
</div>
<div class="small" style="margin-top:.3rem">圖都是<b>真實畫面</b>（救援 3）</div>

<style>
.s3flow { display: flex; align-items: center; justify-content: center; gap: 1rem; }
.s3flow .branch { display: flex; flex-direction: column; gap: 3.2rem; font-weight: 900; font-size: 1.2rem; }
.s3flow .ends { display: flex; flex-direction: column; gap: .6rem; }
</style>

<!--
⏱ 2 分鐘。「現在可以一直翻、一直翻，永遠不會輸。這樣好玩嗎？」（不好玩，太簡單）
「所以要加挑戰：只有 20 步。挑戰太少很無聊，太多會氣死；20 步剛剛好嗎？等一下你們可以自己調。」
勝利畫面、失敗畫面和「再玩一次」按鈕，起始遊戲的 HTML 都已經做好了，藏起來而已，這一步只是讓 JavaScript 把它們叫出來。
這就是「完整遊戲」的五格：開始、遊玩、勝利、失敗、重玩。
-->

---

# STEP 3 步驟

<Step n="3" kind="步驟" actor="me" />

<div class="cols" style="grid-template-columns:1fr 1fr;margin-top:-.2rem">
<div>
  <ol class="steps" style="font-size:1.15rem">
    <li><b>複製程式</b>：JS 窗格 <code>Ctrl+A</code> → <code>Ctrl+C</code></li>
    <li><b class="pink">✏️ 填 5 格</b>：看第 19 頁，全部變綠</li>
    <li><b>貼上程式</b>：最後一個框 <code>Ctrl+V</code></li>
    <li><b>貼給 AI</b>：「📋 複製」→ <code>Ctrl+V</code> → 送出</li>
    <li><b>整段換掉</b>：JS 窗格 <code>Ctrl+A</code> → <code>Ctrl+V</code></li>
    <li><b class="yellow">先玩，再存</b>：照第 22 頁檢查 → <b>☁️ Save</b></li>
  </ol>
</div>
<div class="challenge">
  <b class="yellow">🧪 測試小技巧：數字先改小</b>
  <div style="font-size:1.1rem;margin-top:.3rem;line-height:1.6">
  要走 20 步才看得到失敗畫面，太久了！<br>
  ① <code>Ctrl+F</code> 搜尋 <code>maxMoves</code><br>
  ② 把 <code>20</code> 改成 <code>3</code> → Run → 故意輸<br>
  ③ <b class="pink">改回 <code>20</code></b>，再 ☁️ Save
  </div>
</div>
</div>

<!--
⏱ 2 分鐘。重點在右邊的測試小技巧：做遊戲的人測試時，會把數字先改小，測完再改回來。
Prompt 裡會請 AI 把步數上限放在一個叫 maxMoves 的變數，所以 Ctrl+F 找 maxMoves 就找得到 20。
這是今天唯一要在 JSFiddle 程式裡「打字」的地方（只改一個數字）。
最常忘記：測完沒改回 20 就交作業。第 22 頁會再提醒一次。
-->

---

# STEP 3 Prompt

<Step n="3" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 STEP 3：步數、勝利、失敗">
<p>我在 JSFiddle 做「記憶翻牌」遊戲，現在翻兩張會比對。HTML 和 CSS 已經做好了，請只改 JavaScript。HTML 裡有：步數 id "moves"、步數上限 id "maxMoves"、勝利畫面 id "winScreen"、失敗畫面 id "loseScreen"、兩個「再玩一次」按鈕 class "againBtn"；畫面用 class "hidden" 藏起來。</p>
<p><b>① 加什麼：</b><Ph>要加哪些東西？</Ph></p>
<p><b>② 怎麼動：</b>每翻兩張，步數 +1。最多<Ph number>幾</Ph>步，這個數字放在程式最上面的變數 maxMoves。全部配對成功就顯示勝利畫面；步數用完還沒配完就顯示失敗畫面。按「再玩一次」：<Ph>會發生什麼？</Ph>，也要關掉勝利或失敗畫面。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會把 maxMoves 改成<Ph number>小數字</Ph>測失敗，再改回原本的數字玩到贏。</p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 填 5 格</b>（看第 19 頁）<br><span class="small">先點框框，再點黃色的字，就會填進去</span><br>
    <span class="n">1</span>要加的：
    <Bank words="步數|勝利畫面|失敗畫面|再玩一次" />
    <span class="n">2</span>幾步？　<span class="n">3</span>再玩一次會怎樣？
    <Bank words="步數歸零|重新洗牌" />
    <span class="n">4</span>已經做好、不能壞的：
    <Bank words="翻牌|比對|等 1 秒蓋回" />
    <span class="n">5</span>測試用的小數字
  </div>
  <div class="card green checks" style="font-size:1.05rem"><b>🔍</b> <code>Ctrl+F</code> 搜尋 <code>maxMoves</code>、<code>winScreen</code>：都找得到</div>
</div>
</div>

<!--
⏱ 5 分鐘。學生自己做。第一段（HTML 裡的名字）是老師寫好的：AI 只看得到 JavaScript、看不到 HTML，所以要告訴它畫面叫什麼名字。這些技術名字不用學生填。
這次 ① 和 ③ 整格都是空的，學生第一次自己寫一整格。可以不打字：先點那一格的框框，再點右邊黃色的字，字就會填進去（多個字用「、」連起來）；自己打、寫短一點也可以（「翻牌和比對」AI 也看得懂）。
填空答案：①「步數、勝利畫面、失敗畫面、再玩一次」②「20」③「步數歸零、重新洗牌」④「翻牌、比對、等 1 秒蓋回」⑤「3」。
③ 不能弄壞的答案就是 STEP 1、STEP 2 做好的東西：問學生「你前面做好了哪些？」
Ctrl+F 檢查之後，再 Run → 開始 → 翻兩張：步數應該變 1。
AI 常見錯誤：
・「再玩一次」只關掉畫面，沒有重新洗牌或步數沒歸零。
・用 getElementById("againBtn") 只抓到一個按鈕（其實是 class，有兩個），失敗畫面的按鈕沒反應。
・最後一步剛好配對成功，卻先顯示失敗畫面（應該先判斷贏）。
遇到這些，用「我做了什麼＋看到什麼＋我期待什麼」告訴 AI。
-->

---

# STEP 3 檢查

<Step n="3" kind="檢查" actor="me" />

<div class="cols" style="grid-template-columns:1.35fr 1fr;margin-top:-.2rem">
<div>
<ul class="check" style="font-size:1.15rem">
  <li><b class="c-start">🏁 開始</b>：按「開始」才開始，步數 0 / 20</li>
  <li><b class="c-play">🎮 遊玩</b>：每翻兩張，步數 +1</li>
  <li><b class="c-win">🏆 勝利</b>：全部配對 → 勝利畫面</li>
  <li><b class="c-lose">💥 失敗</b>：（先改成 3）步數用完 → 失敗畫面</li>
  <li><b>↻ 重玩</b>：「再玩一次」→ 步數 0、牌重新洗過</li>
</ul>
<div class="warn" style="font-size:1.1rem;margin-top:.4rem">⚠️ 記得把 <code>3</code> 改回 <code>20</code>，再 <b>☁️ Save</b>！</div>
<div class="small" style="margin-top:.3rem">😵 卡住了？Fork 救援 3：<Fiddle k="rescue3" /></div>
</div>
<div class="row" style="flex-wrap:nowrap;gap:.6rem">
  <div class="shot fit" style="--h:14rem;border-color:var(--c-win)"><span class="label tag" style="background:var(--c-win)">🏆</span><img src="/img/real-win.png" alt="Win screen"></div>
  <div class="shot fit" style="--h:14rem;border-color:var(--c-lose)"><span class="label tag" style="background:var(--c-lose)">💥</span><img src="/img/real-lose.png" alt="Lose screen"></div>
</div>
</div>
<div class="small" style="margin-top:.3rem">右圖是<b>真實畫面</b>（救援 3）· 完整遊戲五格都要試到</div>

<!--
⏱ 4 分鐘。這是「完整遊戲」檢查表，顏色跟第 4 堂一樣：開始藍、遊玩綠、勝利橘、失敗紅。
勝利要真的玩到 6 對全部配完；失敗用測試小技巧（maxMoves 改 3）。重玩要在勝利畫面和失敗畫面各按一次。
5 項都過、20 改回來，才按 ☁️ Save。
STEP 3 卡住的學生 Fork 救援 3（完整版），直接做第 23–25 頁「我的版本」和夥伴試玩。
-->

---

# 我的版本：選一個改

<Step label="我的版本" actor="me" />

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem;margin-top:-.1rem;font-size:1.05rem">
  <div class="card" style="margin:0"><div class="tag neon">目標</div><br>勝利畫面顯示「你用了幾步」，挑戰自己最少步數</div>
  <div class="card green" style="margin:0"><div class="tag green">規則</div><br>翻錯一對，要等 2 秒才能再翻</div>
  <div class="card pink" style="margin:0"><div class="tag pink">挑戰</div><br>・步數變少（15 步）<br>・加 60 秒倒數<br>・牌變 16 張（8 對）</div>
  <div class="card orange" style="margin:0"><div class="tag orange">回饋</div><br>・配對成功放音效（第 3 堂的 raw 網址）<br>・翻錯的牌晃一下</div>
</div>

<div class="row" style="margin-top:.7rem;gap:.8rem;align-items:stretch">
  <div class="card yellow" style="flex:1;margin:0">🎨 也可以：換 emoji 主題（水果、恐龍、太空…）</div>
  <div class="card pink" style="flex:1;margin:0">☝️ 只選<b>一個</b>，做完、玩過、存好，再選下一個</div>
</div>

<!--
⏱ 2 分鐘。「用遊戲設計四個字想一想：你想改目標、規則、挑戰，還是回饋？選一個就好。」
起始遊戲已經幫這些點子準備好了，學生只需要改 JavaScript：
・倒數計時：HTML 已經有藏起來的 ⏱（id "timer"，外框 id "timerStat"，用 class "hidden" 藏著）。
・晃一下：CSS 已經有 class "shake"。
・勝利畫面的文字：id "winText"。
・16 張牌：emoji 多放兩種就好，排版會自動變 4×4。
・音效：到自己的 GitHub 倉庫（第 3 堂）複製聲音的 raw 網址，網址在雲端，換電腦也找得到。
不知道選什麼的學生：建議「換 emoji 主題」或「步數變少」，最容易成功。
-->

---

# 寫我的 Prompt

<Step label="我的版本" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 我的 Prompt（四格自己寫）">
<p>我在 JSFiddle 做「記憶翻牌」遊戲，現在已經可以玩到贏和輸。HTML 和 CSS 已經做好了，請只改 JavaScript。</p>
<p><b>① 加什麼：</b><Ph>我要加的東西</Ph></p>
<p><b>② 怎麼動：</b><Ph>它怎麼動？數字是多少？</Ph></p>
<p><b>③ 不能弄壞：</b><Ph>哪些已經做好、不能壞？</Ph></p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card yellow" style="margin-top:0;font-size:1.02rem"><b>範例（挑戰）</b><br>
  ① 60 秒倒數計時<br>
  ② 按開始後從 60 每秒減 1，顯示在藏起來的 id "timer"（外框 id "timerStat"）；時間到顯示失敗畫面<br>
  ③ 翻牌、比對、步數、勝利、再玩一次<br>
  ④ 我會先把 60 改成 5 來測</div>
  <div class="card pink" style="font-size:1.05rem">每格只打<b>幾個字</b>就好<br>一次只改<b>一件事</b>　玩過才 <b>☁️ Save</b></div>
</div>
</div>

<!--
⏱ 8 分鐘。這是學生第一次四格全部自己寫（STEP 1 填 2 格 → STEP 2 填 4 格 → STEP 3 填 5 格 → 這裡四格全空）。
做法：在投影片上把四個粉紅框填成自己的話（變綠色）→ 最後一個框 Ctrl+V 貼上程式 → 按「📋 複製」→ 到 AI Ctrl+V → 送出。
每格打幾個字就好（例如 ① 翻錯晃一下 ② 翻錯的兩張加上 class shake ③ 翻牌、比對、步數 ④ 我會翻兩張不一樣的）。
③ 卡住的同學：「STEP 1–3 做好的東西，就是不能壞的。」
用到 HTML 裡的東西時，要把名字告訴 AI（timer、timerStat、winText、shake），第 23 頁講者備註有清單。
老師巡堂：先看①②有沒有寫清楚、有沒有數字。寫得太模糊（「更好玩」）就問：「怎樣算更好玩？要多少？」
做完一樣：先玩，再存。
-->

---

# 夥伴試玩

<Step label="試玩" actor="pair" />

<div class="cols" style="grid-template-columns:1.3fr 1fr;margin-top:-.2rem">
<div>
  <div style="font-size:1.1rem"><b class="neon">🎮 一人玩、一人打勾，再交換</b></div>
<ul class="check" style="font-size:1.08rem">
  <li><b>完整遊戲</b>：能開始／會贏／會輸／能再玩一次</li>
  <li><b class="neon">目標</b>說得出來嗎？</li>
  <li><b class="green">規則</b>清楚嗎？</li>
  <li><b class="pink">挑戰</b>夠不夠難？</li>
  <li><b class="orange">回饋</b>點了有沒有反應？</li>
  <li>他改了<b>哪一個字</b>？</li>
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
玩的人最後要說 ⭐ 一個喜歡的地方＋💡 一個點子。示範一次：「⭐ 我喜歡翻錯會晃一下。💡 如果配對成功有聲音會更好玩。」
提醒：點子是建議，不是批評；不要說「很爛」「好無聊」。
每個人還是改自己的遊戲，不要幫對方改。人數單數時，老師當其中一人的夥伴。
-->

---

# 存檔＋繳交

<Step label="交作業" actor="all" />

<div class="cols" style="grid-template-columns:1.3fr 1fr;margin-top:-.2rem">
<div>
  <ol class="steps" style="font-size:1.15rem">
    <li>按 <b class="neon">☁️ Save</b>（玩過、沒壞的版本）</li>
    <li>看網址：<b>遊戲編號</b>是你自己的，<b>不是</b>起始遊戲的</li>
    <li><b>Google Classroom</b> → 課堂作業 → <b class="green">第 8 堂：記憶翻牌</b></li>
    <li><b class="yellow">＋ 新增或建立</b> → <b class="yellow">連結</b> → 貼上網址 → <b>新增連結</b></li>
    <li>按 <b class="neon">繳交</b> ✅</li>
  </ol>
</div>
<div>
  <div class="card" style="margin-top:0"><span class="tag">示意圖</span> <b>設計卡（選填）</b>
    <div class="dcard">
      <div><b class="neon">目標</b> 6 對全部配完</div>
      <div><b class="green">規則</b> 一次翻兩張</div>
      <div><b class="pink">挑戰</b> 只有 15 步</div>
      <div><b class="orange">回饋</b> 翻錯會晃一下</div>
    </div>
  </div>
  <div class="small">想寫再寫，打幾個字就好；不寫也可以，剛剛用說的就算數。</div>
</div>
</div>

<style>
.dcard { display: grid; grid-template-columns: 1fr 1fr; gap: .3rem; margin-top: .3rem; font-size: 1rem; }
.dcard > div { border: 2px dashed #ffffff55; padding: .2rem .4rem; }
</style>

<!--
⏱ 2 分鐘。上一堂學過，這裡只是提醒。最常見的錯：交了起始遊戲的網址（遊戲編號是老師的）。
交的是「最後一次 Save」的網址：版本編號是最新的那個。交完又改了：再 Save，在 Classroom 按「取消繳交」→ 換新網址 → 再繳交。
設計卡是 Classroom 作業裡選填的欄位，不寫不扣分。右邊是範例內容。
-->

---

# 分享：AI 哪裡出錯？我改了哪個字？

<Step label="分享" actor="all" />

<div class="card orange" style="margin-top:.4rem;font-size:1.3rem;line-height:1.8">
🤖 AI 給我的程式＿＿＿＿＿（壞掉的地方），<br>
我<b>玩的時候</b>發現，<br>
我這樣告訴 AI：「＿＿＿＿＿」
</div>

<div class="card yellow" style="font-size:1.3rem">
🎨 我改了＿＿＿＿（<span class="neon">目標</span>／<span class="green">規則</span>／<span class="pink">挑戰</span>／<span class="orange">回饋</span>），因為＿＿＿＿
</div>

<div class="center q" style="margin-top:.8rem">AI 寫，你來檢查：玩過才 ☁️ Save</div>

<!--
⏱ 3 分鐘。請 2–3 位同學用句型分享，老師把他們投影出來的遊戲玩一下也可以。
先問：「今天誰的 AI 給錯過？你怎麼發現的？」稱讚「玩的時候發現」的同學：這就是今天最重要的習慣。
再問：「你改了四個字裡的哪一個？」
最後全班一起念下面那句。
-->

---
hostOnly: true
---

# 下一堂預告

<div class="cols" style="grid-template-columns:1fr 1fr;margin-top:.4rem;align-items:center">
<div class="card" style="margin:0">
  <span class="tag">示意圖</span>
  <div style="font-weight:900;font-size:1.3rem;margin:.3rem 0">❓ 第 3 題：一年有幾個月？</div>
  <div class="quiz">
    <div>A. 10</div><div>B. 12</div><div>C. 13</div><div>D. 52</div>
  </div>
  <div style="margin-top:.4rem">⭐ 分數 2　❤️❤️❤️</div>
</div>
<div>
  <div class="big">問答闖關 ❓</div>
  <div style="font-size:1.25rem;margin-top:.6rem">題目請 <b class="orange">AI</b> 出，<br>但 AI 出的題目<b class="pink">也可能有錯</b>，<br>要你來抓！🕵️</div>
</div>
</div>

<style>
.quiz { display: grid; grid-template-columns: 1fr 1fr; gap: .4rem; font-size: 1.15rem; }
.quiz > div { border: 3px solid var(--neon); padding: .2rem .5rem; background: #000; }
</style>

<!--
⏱ 1 分鐘。這一頁只在老師版出現。
「今天我們發現 AI 的程式會寫錯。下一堂做問答遊戲，題目也請 AI 出；可是 AI 出的題目也可能答案是錯的，要靠你們抓出來。」
可以請學生回家想一個自己喜歡的主題（恐龍、寶可夢、台灣…），下次用。不用寫下來，記在腦袋就好。
-->
