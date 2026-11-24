---
theme: default
title: 迷宮尋寶：只換一個函式
info: |
  國小 Vibe Coding 遊戲課第 10 堂：用 Ctrl+F 找到一個函式、只換這一個；請 AI 解釋、請 AI 畫地圖並檢查；做出會走、撞牆、鑰匙開門、有三關的迷宮。
colorSchema: dark
layout: default
transition: slide-left
mdc: true
aspectRatio: 16/9
fonts:
  provider: none
---

# 迷宮尋寶：只換一個函式

<div class="cols" style="grid-template-columns:3fr 2fr;align-items:center;margin-top:.6rem">
<div>
  <div class="tag green" style="font-size:.9rem">第 10 堂</div>
  <div class="big">今天做一個<br><span class="yellow">有牆、有鑰匙、有門</span>的迷宮 🗝️</div>
  <div class="row" style="justify-content:flex-start;gap:.5rem;margin-top:1.2rem">
    <span class="tag neon">🧱 牆擋住你</span>
    <span class="tag orange">🔑 鑰匙開門</span>
    <span class="tag">🗺️ 三張地圖</span>
    <span class="tag pink">⚡ 體力</span>
    <span class="tag green">✂️ 只換一個函式</span>
  </div>
  <p class="small" style="margin-top:1.2rem">國小 Vibe Coding 遊戲課 · JSFiddle ＋ AI</p>
</div>
<div class="center">
  <div class="shot fit" style="--h:19rem">
    <span class="label tag neon">真實畫面 · 老師的完成版</span>
    <img src="/img/real-level2.png" alt="The finished maze, level 2 of 3">
  </div>
</div>
</div>

<!--
⏱ 1 分鐘。「今天做走迷宮。有牆擋住你、要先找鑰匙才能開門。你們還要學一種新的貼法：不用再整段換，只換一個函式。」

【課前準備，第一次用這份投影片一定要看】
1. 建立 4 個 fiddle（原始碼都在 10-maze-tile-map/starter/，每個檔案裡 CSS、HTML、JavaScript 窗格的內容有註解標好，分別貼進 JSFiddle 再 Save）：
   起始遊戲 maze-0.html、救援 1 rescue-1.html、救援 2 rescue-2.html、救援 3 rescue-3.html（救援 3 就是完整版，第 2 頁老師也玩它）。
2. 把 4 個網址填進 10-maze-tile-map/fiddles.json（只改這一個地方：投影片上的連結和講者備註裡的網址都會自動更新），再 push。
   沒填的話，投影片和備註會顯示「老師課前填入」。
3. 救援的連結只放在第 29 頁「救援站」（學生網站也看得到），STEP 頁面上沒有連結，免得學生點錯。
   要給學生救援時，說「翻到第 29 頁，Fork 救援 2」。每一頁右下角都有頁碼。
4. Google Classroom 建立作業「第 10 堂：迷宮尋寶」，加選填的「設計卡」欄位（目標／規則／挑戰／回饋）。
5. 自己用第 11 頁的 Prompt 問 ChatGPT 或 Gemini 兩次：是不是只回傳 movePlayer 一個函式？再用第 20 頁的 Prompt 請它畫地圖，
   留一張真的有問題的地圖當第 22 頁的例子。
6. 在 JSFiddle 實際試一次第 8 頁的選取方法（Ctrl+F、Shift＋點）。

網址（課前填好 fiddles.json 後這裡會自動出現）：

起始遊戲 [[fiddle:starter]]

救援 1 [[fiddle:rescue1]]

救援 2 [[fiddle:rescue2]]

救援 3（完整版） [[fiddle:rescue3]]
-->

---

# 走走看：誰擋住我？

<Step label="暖身" actor="all" />

<div class="cols" style="grid-template-columns:repeat(3,1fr);margin-top:-.1rem;gap:.8rem;align-items:start">
  <div class="center">
    <div class="shot fit" style="--h:12.5rem"><span class="label tag pink">🧱 撞牆</span><img src="/img/real-wall.png" alt="The player bumps into a wall: 撞到牆了"></div>
    <div class="card pink" style="font-size:1.02rem;margin-top:.6rem">走不過去，還說了一句話</div>
  </div>
  <div class="center">
    <div class="shot fit" style="--h:12.5rem"><span class="label tag orange">🔒 沒鑰匙</span><img src="/img/real-locked.png" alt="The door is locked: 門鎖住了，先找鑰匙"></div>
    <div class="card orange" style="font-size:1.02rem;margin-top:.6rem">門擋住你</div>
  </div>
  <div class="center">
    <div class="shot fit" style="--h:12.5rem"><span class="label tag green">🔓 有鑰匙</span><img src="/img/real-door.png" alt="With the key the door opens: 門開了"></div>
    <div class="card green" style="font-size:1.02rem;margin-top:.6rem">門打開，變成路</div>
  </div>
</div>

<div class="card yellow center" style="margin-top:.5rem"><span class="q">❓ 什麼擋住我？什麼可以打開它？</span></div>
<div class="small" style="margin-top:.2rem">三張都是<b>真實畫面</b>（老師的完成版）</div>

<!--
救援 3（完整版） [[fiddle:rescue3]]

⏱ 4 分鐘。打開上面的完整版（救援 3），投影出來，按 Run → 先用滑鼠點一下遊戲畫面（這樣方向鍵才收得到）→ 按「開始」。
老師用方向鍵走：先故意撞牆（地圖下面會說「撞到牆了」），再走去 🚪 門前面（說「門鎖住了」），再去撿 🔑（說「拿到鑰匙了」），回頭開門。
問：「什麼擋住我？」（牆、鎖住的門）「什麼可以打開它？」（鑰匙）「走一步，上面哪個數字會變？」（⚡ 體力少 1）
走到 🏁 就進第 2 關。不用玩完，讓大家看到有三關就好。這個遊戲就是今天大家要做出來的。
常見狀況：方向鍵沒反應 = 沒有先點遊戲畫面；改點畫面上的四個箭頭按鈕也可以。學生的筆電上也一樣。
-->

---

# 今天的重點字：規則

<div style="display:grid;grid-template-columns:1fr 2.2fr 1fr 1fr;gap:.7rem;margin-top:.1rem;align-items:stretch">
  <div class="card" style="margin:0;opacity:.6"><div class="tag neon">目標</div><div class="small">我要做到什麼？</div></div>
  <div class="card green" style="margin:0;border-width:6px"><div class="tag green">規則 Rules</div><div class="yellow" style="font-weight:900;font-size:1.3rem">我可以做什麼、<br>不能做什麼？</div></div>
  <div class="card pink" style="margin:0;opacity:.6"><div class="tag pink">挑戰</div><div class="small">什麼讓它變難？</div></div>
  <div class="card orange" style="margin:0;opacity:.6"><div class="tag orange">回饋</div><div class="small">遊戲怎麼回答我？</div></div>
</div>

<div class="q" style="margin-top:.9rem;font-size:1.4rem">❓ 迷宮裡，我<b class="pink">不能</b>做什麼？我<b class="green">可以</b>做什麼？</div>

<div class="row" style="margin-top:.5rem;gap:.6rem;flex-wrap:nowrap">
  <div class="card pink center" style="flex:1;margin:0"><div class="big">🧱</div>牆：走不過去</div>
  <div class="card pink center" style="flex:1;margin:0"><div class="big">🚪</div>門：沒鑰匙打不開</div>
  <div class="card green center" style="flex:1;margin:0"><div class="big">🔑</div>鑰匙：撿起來就能開門</div>
  <div class="card green center" style="flex:1;margin:0"><div class="big">🏁</div>出口：走到就過關</div>
</div>

<div class="small" style="margin-top:.6rem">🧠 前面學的：<b>回饋</b>（第 9 堂：✔／✘、星星）　<b>挑戰</b>（⚡ 體力用完會輸，地圖一關比一關長）</div>

<!--
⏱ 2 分鐘。「前面學過目標、規則、挑戰、回饋。今天看規則：我可以做什麼、不能做什麼。」
指四張卡：牆是不能（走不過去）、門在沒鑰匙時是不能、鑰匙讓門變成可以、出口走到就過關。
「如果沒有規則，會怎樣？」（可以穿牆，一步就走到出口，遊戲就沒意思了）規則讓遊戲有得玩。
目標是走到 🏁；挑戰是體力和越來越長的地圖；回饋是地圖下面那句話（「撞到牆了」）。這幾個今天都會出現，但重點是規則。
-->

---

# 今天的路線圖

<div class="card orange" style="margin-top:.1rem;font-size:1.2rem">🤖 <b>今天跟 AI 學：</b>只要<b class="yellow">一個函式</b>（用 Ctrl+F 找到再換掉）→ 請 AI <b>解釋</b>給你聽 → 請 AI <b>畫地圖</b>，你來檢查</div>

<div class="flow road" style="margin-top:.8rem">
  <div class="card"><div class="tag neon">起始遊戲</div><img src="/img/real-starter.png" alt=""><div>地圖有了<br>人不會動</div></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">STEP 1</div><img src="/img/real-step1.png" alt=""><div>會走、撞牆</div><div class="pf">✏️ 填 3 格</div></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">STEP 2</div><img src="/img/real-key.png" alt=""><div>鑰匙開門</div><div class="pf">✏️ 填 4 格</div></div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">STEP 3</div><img src="/img/real-next-level.png" alt=""><div>三張地圖</div><div class="pf">✏️ 四格都填</div></div>
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
⏱ 2 分鐘。先念橘色那一行：「以前 AI 給我們整段程式，我們整段換掉。今天程式變長了，AI 常常只給一部分。所以今天學：只要一個函式，找到它、整個換掉。」
「函式就是一個有名字的小工具。今天主角叫 movePlayer：玩家要走一步的時候，就叫它出來做事。」
從左到右指一遍：起始遊戲地圖畫好了但人不會動 → STEP 1 會走、撞牆 → STEP 2 鑰匙開門 → STEP 3 三張地圖 → 我的版本。
中間還有兩件事：請 AI 解釋 movePlayer（第 13 頁）、請 AI 畫地圖再檢查它畫得對不對（第 20、22 頁）。
指粉紅色 ✏️：「Prompt 要你自己填的地方又變多了。」
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

⏱ 1 分鐘（登入時間不算在這裡，已經在另外 30 分鐘裡）。全班一起做，老師投影自己的畫面同步操作。上次做過，這次只是提醒。
「今天是新遊戲，不要打開上次的問答，要 Fork 今天的起始遊戲。」
做完請大家看網址：jsfiddle.net/遊戲編號/版本編號。遊戲編號跟投影片上的不一樣才對。
右邊截圖是第 2 堂 Space Shooter 的 fiddle，按鈕位置一樣。截圖上的「运行」是 JSFiddle 跟著瀏覽器語言顯示的（zh-ok），學生畫面可能是 Run 或「執行」。
Fork 好請學生按 Run：地圖畫出來了，可是按方向鍵、按箭頭按鈕，🧑 都不會動。「這就是今天要做的事。」
-->

---

# 新點子：地圖是一排一排的字

<div class="cols" style="grid-template-columns:1fr 1.15fr;margin-top:-.1rem;gap:1.2rem">
<div>
  <div class="flow" style="gap:.5rem">
    <div class="card yellow" style="font-size:1.05rem"><div class="tag">📋 資料 Data</div><div style="font-size:1.8rem">🗺️</div>一排一排的字<br><span class="small"># 牆　. 地板<br>P 起點　E 出口<br>K 鑰匙　D 門</span></div>
    <div class="card" style="font-size:1.05rem"><div class="tag neon">⚖️ 規則 Rules</div><div style="font-size:1.8rem">🧑‍⚖️</div>movePlayer<br><span class="small">牆擋住、撿鑰匙<br>開門、下一關</span></div>
  </div>
  <div class="card green center" style="margin-top:.5rem;font-size:1.1rem">換一張地圖 ＝ 新的迷宮<br><b class="yellow">規則不用改</b>（跟第 9 堂一樣）</div>
  <div class="card" style="font-size:1.05rem"><b>🔍 找找看</b>：點 JS 窗格 → <code>Ctrl+F</code> → 打 <code>const maps</code> → Enter</div>
</div>
<div>
<div class="small" style="margin-bottom:.2rem">真的程式：起始遊戲 JavaScript 第 5–19 行</div>

```js {7,10,12,16} {lines:true,startLine:5}
// ===== 地圖（資料）=====
// 一行字是一排。# 牆　. 地板　P 玩家起點　E 出口　K 鑰匙　D 門
const maps = [
  [
    "###########",
    "#P..#.....#",
    "#.#.#.###.#",
    "#.#...#K#.#",
    "#.#####.#.#",
    "#.......#.#",
    "#.#####.#.#",
    "#.#E..D...#",
    "###########",
  ],
];
```

<div style="font-size:1.05rem;line-height:1.55">
  第 7 行 <code>maps</code>＝<b>地圖清單</b>　第 10 行 <code>P</code>＝你在這裡<br>
  第 12 行 <code>K</code>＝鑰匙　第 16 行 <code>E</code> 和 <code>D</code>＝出口和門
</div>
</div>
</div>

<!--
⏱ 3 分鐘。複習上一堂：「題目清單是資料，裁判的規則不用改。今天的資料是什麼？」（地圖）
「地圖就是一排一排的字：一個字是一格。# 是牆、點是路、P 是你站的地方……」讓學生在右邊找 P、K、E、D 各在哪一排。
「如果我把第 10 行的字換一換，地圖就變了，可是走路的規則不用改。」
全班一起：點 JS 窗格 → Ctrl+F → const maps → Enter，找到第 7 行。Ctrl+F：要先點一下 JavaScript 窗格裡面再按，JSFiddle 才會在程式裡找。
不用學陣列、迴圈這些名詞，只說「地圖清單」「一排一排的字」。
高亮的是第 7、10、12、16 行（const maps、P、K、E 和 D 所在的行）。
-->

---

# 走一步：座標與撞牆

<div class="cols" style="grid-template-columns:1fr 1.25fr;margin-top:-.1rem;gap:1.2rem;align-items:start">
<div>
  <div class="card" style="margin:0 0 .4rem"><span class="tag">示意圖</span> <b>(x, y)：第幾欄、第幾排</b>
    <div class="cgrid">
      <span class="ax"></span><span class="ax">0</span><span class="ax">1</span><span class="ax">2</span><span class="ax">3</span><span class="ax">4</span>
      <span class="ax">0</span><span class="w">🧱</span><span class="w">🧱</span><span class="w">🧱</span><span class="w">🧱</span><span class="w">🧱</span>
      <span class="ax">1</span><span class="w">🧱</span><span class="me">🧑</span><span class="nx">▶</span><span class="w">🧱</span><span class="f"></span>
      <span class="ax">2</span><span class="w">🧱</span><span class="f"></span><span class="f"></span><span class="f"></span><span class="w">🧱</span>
    </div>
  </div>
  <div style="font-size:1.05rem;line-height:1.6">
    🧑 站在 <b class="yellow">(1, 1)</b>：<code>px</code> ＝ 1、<code>py</code> ＝ 1<br>
    往右走一步：<code>dx</code> ＝ 1 → <b>x + 1</b> ＝ 2<br>
    往下走一步：<code>dy</code> ＝ 1 → <b>y + 1</b>
  </div>
</div>
<div>
<div class="small" style="margin-bottom:.2rem">真的程式：救援 1 的 <code>movePlayer</code> 第 101–107 行</div>

```js {103,105} {lines:true,startLine:101}
  const nx = px + dx;                 // 想走去的那一格
  const ny = py + dy;
  const tile = grid[ny][nx];          // 那一格是什麼字

  if (tile === "#") {                 // 牆：走不過去
    showMessage("🧱 撞到牆了");
    return;
```

<div class="card green" style="font-size:1.1rem;line-height:1.55;margin-top:.5rem">
  🧠 先看<b>下一格</b>（<code>nx</code>、<code>ny</code>）是什麼字<br>
  <b class="yellow">如果</b>是 <code>"#"</code>（牆）<b class="yellow">就</b>不走：說一句話，<code>return</code> ＝ 這一步到此為止
</div>
</div>
</div>

<style>
.cgrid { display: grid; grid-template-columns: repeat(6, 2.1rem); gap: 3px; margin-top: .4rem; font-size: 1.25rem; line-height: 2.1rem; text-align: center; }
.cgrid span { height: 2.1rem; }
.cgrid .ax { font-family: 'Press Start 2P', monospace; font-size: .7rem; color: var(--yellow); }
.cgrid .w { background: #5b6b8a; }
.cgrid .f { background: #223656; }
.cgrid .me { background: #2f5d8a; }
.cgrid .nx { background: #223656; color: var(--yellow); }
</style>

<!--
⏱ 2 分鐘。「地圖上每一格有兩個數字：第幾欄 x、第幾排 y，從 0 開始數。就像教室的座位：第幾排第幾個。」
指左圖：🧑 在 (1, 1)。「往右走一步，x 要加幾？」（1）「往下呢？」（y 加 1；往上是 y 減 1）
右邊是救援 1 裡真的 movePlayer 的前幾行（不是起始遊戲，起始遊戲的 movePlayer 是空的）。
重點是「走之前先看下一格是什麼字」，這叫「碰撞」：如果是牆就不讓你走。學生不用懂每個字，只要看到 if (tile === "#") 就是「如果是牆」。
問：「如果把這一段拿掉會怎樣？」（可以穿牆）所以規則就寫在這個函式裡。
-->

---

# 新貼法：只換一個函式

<Step label="新貼法" actor="all" />

<div class="cols" style="grid-template-columns:3fr 2.2fr;margin-top:-.2rem">
<div>
  <ol class="steps" style="font-size:1.1rem">
    <li>點 JS 窗格 → <code>Ctrl+F</code> → 打 <code>function movePlayer</code> → <code>Enter</code>：找到了！</li>
    <li>用滑鼠點一下那一行<b>最前面</b>（<code>function</code> 的 f 前面）</li>
    <li>找到函式<b>最後的 <code>}</code></b>（在最左邊，下面是空行）：先按住 <code>Shift</code> 不放，再點一下 <code>}</code> 的<b>後面</b></li>
    <li>整個函式<b class="yellow">變成反白</b>了 → AI 程式框的「複製」→ <code>Ctrl+V</code>，換掉！</li>
  </ol>
  <div class="row" style="justify-content:flex-start;gap:.6rem;margin-top:.3rem">
    <div class="card pink" style="margin:0;font-size:1.02rem">選歪了？<code>Ctrl+Z</code> 回上一步</div>
    <div class="card" style="margin:0;font-size:1.02rem">右鍵也行：選取 → 右鍵 → 貼上</div>
  </div>
</div>
<div>
  <div class="card" style="margin:0"><span class="tag">示意圖</span> <b>要選的範圍</b>
<div class="codebox">
<div class="dim">// 移動玩家：dx、dy 是…</div>
<div class="sel"><b>function movePlayer(dx, dy) {</b></div>
<div class="sel">&nbsp;&nbsp;// 現在什麼都不做…</div>
<div class="sel"><b>}</b></div>
<div class="dim">&nbsp;</div>
<div class="dim">// 過關：顯示勝利畫面</div>
<div class="dim">function winGame() {</div>
<div class="dim">&nbsp;&nbsp;…</div>
</div>
  </div>
  <div class="card green" style="font-size:1.02rem;margin-top:.5rem">🤖 請 AI <b>只給「完整的」一個函式</b>，並寫出<b>函式的名字</b><br><span class="small">你才知道要換哪一個</span></div>
</div>
</div>

<style>
.codebox { font-family: ui-monospace, Consolas, monospace; font-size: .98rem; line-height: 1.5; margin-top: .3rem; background: #0a0f24; padding: .3rem .5rem; }
.codebox .dim { opacity: .45; }
.codebox .sel { background: #3d63c9; color: #fff; }
</style>

<!--
⏱ 5 分鐘。老師示範一次，學生跟著做（起始遊戲的 movePlayer 只有 3 行，最好選）。
「程式越來越長，免費的 AI 常常只給一部分，或寫『其餘不變』。所以今天改成：只問 AI 要『一個完整的函式』，我們找到舊的、整個換掉。」
示範：Ctrl+F → function movePlayer → Enter。點最前面 → 按住 Shift → 點最後的 } 後面 → 反白。這時先不貼，說「下一頁開始真的貼」。
最常卡住：① 沒有先點進 JS 窗格就按 Ctrl+F（會搜到整個網頁）。② Shift 沒按住就點，變成只是移動游標。③ 選到 } 後面還多選了下一個函式的註解：Ctrl+Z 重來。
④ 手不穩的學生：改用「點最前面，再用鍵盤 Shift+↓ 往下選」；或把滑鼠按住從最前面拖到最後。
JSFiddle 的編輯器版本不同，介面可能略有差異，課前請先自己試一次（NOTES.md 要確認的事實）。
貼壞了：先 Ctrl+Z；真的亂了，把網址最後的版本編號改小一號（回到上一次 Save）。
也問一下：「為什麼要寫出函式的名字？」（AI 說「改這個函式」時，我們才知道去找哪一個）
-->

---

# STEP 1 目標：會走、會撞牆

<Step n="1" kind="目標" actor="all" />

<div style="display:flex;align-items:center;justify-content:center;gap:1rem;margin-top:-.3rem">
  <div class="shot fit" style="--h:12rem"><span class="label tag neon">現在</span><img src="/img/real-starter.png" alt="Starter: the map is drawn, the player does not move"></div>
  <div class="big yellow">➜</div>
  <div class="shot fit" style="--h:12rem"><span class="label tag green">STEP 1 完成</span><img src="/img/real-step1.png" alt="Rescue 1: the player has walked down, energy 39"></div>
</div>

<div class="row" style="margin-top:.6rem;gap:.6rem;align-items:stretch;font-size:1.02rem">
  <div class="card green" style="flex:1.7;margin:0"><b>✅ 你會看到</b><br>方向鍵<b>走一格</b>；撞到 <b class="yellow">#</b> 牆<b>走不過去</b>；每走一步 ⚡ 體力<b>少 1</b>；走到 <b class="yellow">E</b> 就<b>贏</b>；體力是 <b class="yellow">0</b> 就<b>輸</b></div>
  <div class="card pink" style="flex:1;margin:0"><b>❌ 不能發生</b><br>穿過牆；畫面沒更新；改到別的函式</div>
  <div class="card" style="flex:.9;margin:0"><b>⏭️ 之後再做</b><br>鑰匙和門：STEP 2<br><span class="small">（現在 K、D 先當地板）</span></div>
</div>
<div class="small" style="margin-top:.3rem">兩張都是<b>真實畫面</b>（老師的起始遊戲和救援 1）</div>

<!--
⏱ 2 分鐘。「STEP 1 只換 movePlayer：讓 🧑 會走，牆擋得住，有體力，到出口贏，體力沒了輸。」
綠色卡的每一句，就是下一頁 Prompt 要填的答案：方向鍵走一格、撞牆走不過去、每走一步體力少 1、走到 E 贏、體力 0 輸。
「K 和 D 先當地板」：所以今天 STEP 1 的迷宮，不拿鑰匙也能走到 🏁 贏，這是故意的，STEP 2 才加規則。
請一位同學說：「為什麼每走一步要少 1 體力？」（沒有限制的話，怎麼走都可以，沒有挑戰）
-->

---

# STEP 1 步驟

<Step n="1" kind="步驟" actor="all" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.2rem">
<div>
  <ol class="steps" style="font-size:1.1rem">
    <li><b>複製程式</b>：點一下 JS 窗格 → <code>Ctrl+A</code> 全選 → <code>Ctrl+C</code></li>
    <li><b class="pink">✏️ 填 3 格</b>：下一頁粉紅色的框，答案在第 9 頁，<b class="green">變綠色</b>就對了</li>
    <li><b>貼上程式</b>：最後一個框點一下 → <code>Ctrl+V</code></li>
    <li><b>貼給 AI</b>：按「📋 複製」→ AI 對話框 <code>Ctrl+V</code> → 送出</li>
    <li><b class="yellow">只換函式</b>：AI 給的 <code>movePlayer</code> 程式框按「複製」→ 照第 8 頁選取舊的 → <code>Ctrl+V</code></li>
    <li><b class="yellow">先玩，再存</b>：按 <b>Run</b>，照第 12 頁檢查，才按 <b>☁️ Save</b></li>
  </ol>
</div>
<div>
  <div class="card orange" style="margin-top:.3rem;font-size:1.1rem"><b>🖱️ 玩之前先點一下遊戲畫面</b><br>再按方向鍵。不想點？用畫面上的 ⬆️⬅️⬇️➡️ 按鈕</div>
  <div class="card yellow" style="font-size:1.05rem"><b>🖱️ 不會用快捷鍵？</b><br>在窗格裡按<b>滑鼠右鍵</b>：<br>全選 → 複製 → 貼上</div>
  <div class="card" style="font-size:1.02rem">AI 給了<b>好幾段</b>程式？<br>只複製寫著 <code>function movePlayer</code> 的那一段</div>
</div>
</div>

<!--
⏱ 2 分鐘。全班一起：老師投影，一步一步示範第 1–6 步，學生跟著做。
第 5 步是今天的新動作（第 8 頁剛教過）：ChatGPT 程式框右上角有「Copy code／複製程式碼」，Gemini 是一個複製圖示。只複製程式框，不要複製 AI 的說明文字。
第 5 步最常錯：① 把 AI 的函式貼在舊函式「旁邊」，沒有換掉：程式裡有兩個 movePlayer，後面那個才算數，還好不會當機，但要刪掉舊的。Ctrl+F 搜尋 function movePlayer 應該只有 1 個。
② AI 連整個遊戲一起給（很長）：只複製 movePlayer 那一段，或回它「我只要完整的 movePlayer 函式」。
方向鍵沒反應：幾乎都是沒有先點一下遊戲畫面。
-->

---

# STEP 1 Prompt

<Step n="1" kind="Prompt" actor="all" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 STEP 1：會走、會撞牆">
<p>我在 JSFiddle 做一個「迷宮尋寶」遊戲。HTML 和 CSS 已經做好了，請只改 JavaScript。地圖寫在 maps 裡：# 是牆、. 是地板、E 是出口，K 是鑰匙、D 是門（這一步先把 K 和 D 都當成地板）。程式已經有：grid（這一關的地圖，grid[y][x] 是一個字）、px 和 py（玩家的位置）、energy（體力）、showMessage(文字)（在地圖下面顯示一句話）、drawMap()（重畫地圖）、updateTop()（更新上方的數字）、winGame()（過關）、loseGame()（輸了）。玩家按方向鍵時會呼叫 movePlayer(dx, dy)，dx 和 dy 是這一步要走的方向。目前 movePlayer 是空的。</p>
<p><b>① 加什麼：</b><Ph>要加什麼？</Ph></p>
<p><b>② 怎麼動：</b><Ph>它怎麼動？</Ph></p>
<p><b>③ 不能弄壞：</b>只寫 movePlayer；其他函式和地圖都不要改。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請只給我「完整的 movePlayer 函式」（從 function movePlayer 到它最後的 }），並寫出函式的名字，不要給整份程式。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 填 3 格</b>（看第 9 頁綠色卡）<span class="small">先點框框，再點字</span><br>
    <span class="n">1</span>要加什麼？
    <Bank words="讓玩家會走路|牆擋得住|體力|出口和失敗" />
    <span class="n">2</span>怎麼動？
    <Bank words="按方向鍵走一格|撞到 # 牆走不過去|每走一步體力少 1|走到 E 就 winGame()|體力是 0 就 loseGame()" />
    <span class="n">4</span>怎麼玩來檢查？
    <Bank words="走到 🏁|撞牆看看|看體力有沒有少" />
  </div>
  <div class="card green" style="font-size:.98rem">🔍 <code>Ctrl+F</code> <code>function movePlayer</code>：<b>只有 1 個</b>；Run 後 🧑 會動</div>
</div>
</div>

<style>
.fill :deep(.bank) { gap: .25rem; margin: .1rem 0 .2rem; }
.fill :deep(button) { font-size: .92rem; }
</style>

<!--
⏱ 5 分鐘。老師先完整做一次，學生跟著做。
填空答案：① 點「讓玩家會走路、牆擋得住、體力、出口和失敗」（至少前兩個）② 點五句：「按方向鍵走一格、撞到 # 牆走不過去、每走一步體力少 1、走到 E 就 winGame()、體力是 0 就 loseGame()」④「走到 🏁、撞牆看看、看體力有沒有少」。
③ 老師寫好了（「只寫 movePlayer；其他都不要改」）：今天先看一次完整的樣子，STEP 2 開始 ③ 要自己填。
第一大段是老師寫好的：告訴 AI 它看不到的名字（grid、px、py、showMessage……）。這些名字是 HTML／JS 裡的，AI 看不到，沒寫它就會自己亂取名字，函式就接不上。
最後一句重點：「請只給我完整的 movePlayer 函式，並寫出函式的名字」，這就是今天的新貼法。
AI 常見錯誤：
・給了整份程式（太長）：只複製 movePlayer；或回「我只要 movePlayer 這一個函式」。
・用 energy-- 或 energy -= 1：都可以，Ctrl+F 搜尋 energy 就看到。
・忘了 drawMap()：走了但畫面不動。症狀表在下一頁。
・忘了呼叫 winGame()／loseGame()：走到 🏁 沒反應。
・走出地圖（地圖外圈是牆，正常不會）。
-->

---

# STEP 1 檢查

<Step n="1" kind="檢查" actor="all" />

<div class="cols" style="grid-template-columns:1.2fr 1fr;margin-top:-.2rem">
<div>
<ul class="check" style="font-size:1.08rem">
  <li>Run → 按「開始」→ <b>點一下遊戲畫面</b></li>
  <li>方向鍵：🧑 走一格；<b>撞牆</b>會說「撞到牆了」，體力不少</li>
  <li>每走一步 ⚡ <b>少 1</b></li>
  <li>走到 🏁：<b>勝利畫面</b>；按「再玩一次」回到起點</li>
  <li class="x">🧪 <code>Ctrl+F</code> <code>maxEnergy</code>：<code>40</code> 改成 <code>3</code> → 走 3 步：<b>失敗畫面</b>，再<b class="pink">改回 40</b></li>
</ul>
<div class="card green" style="font-size:1.05rem;margin-top:.4rem">🎉 5 項都打勾 → 按 <b>☁️ Save</b> → STEP 1 完成！</div>
<div class="small">😵 卡住 10 分鐘？<b>舉手</b>，老師會告訴你怎麼辦</div>
</div>
<div>
  <table class="sym">
    <tr><th>你看到</th><th>這樣告訴 AI</th></tr>
    <tr><td>走了，畫面沒動</td><td>「走了以後畫面沒更新」（要 <code>drawMap()</code>）</td></tr>
    <tr><td>可以穿過牆</td><td>「碰到 # 還是走過去了」</td></tr>
    <tr><td>撞牆也少體力</td><td>「撞牆時體力不應該少」</td></tr>
    <tr><td>到 🏁 沒事</td><td>「走到 E 沒有出現勝利畫面」</td></tr>
  </table>
  <div class="card orange bug" style="margin-top:.5rem"><b>🪲 回報句：</b><br>「我<b>按右鍵</b>，<b>🧑 沒有動</b>，我<b>希望它往右走一格</b>。」<br><span class="small">＝ 我做了什麼 ＋ 看到什麼 ＋ 我期待什麼</span></div>
</div>
</div>

<!--
救援 1 [[fiddle:rescue1]]

⏱ 3 分鐘。請學生一項一項打勾（用手指著螢幕念出來就好）。全部打勾才按 ☁️ Save。
第 5 項是「數字先改小再測」（第 8、9 堂學過）：體力 40 要走 40 步才會輸，太久；改成 3，走 3 步就輸。測完一定改回 40，不然下一堂別人玩不下去。
Ctrl+F 搜尋 maxEnergy 會看到 const maxEnergy = 40; 這一行。這是今天唯一要在 JSFiddle 程式裡打字的地方（改一個數字）。
卡住 10 分鐘、或 AI 額度用完的學生：翻到第 29 頁「救援站」，Fork 救援 1，再按一次 ☁️ Save。
症狀表：不用全念，學生遇到哪一個再看。一次只告訴 AI 一個問題，並貼上最新的 JavaScript。
走到 🏁 就贏：這一關不用拿鑰匙，因為 STEP 1 把 K、D 當地板（故意的）。
-->

---

# 請 AI 解釋：牆是怎麼擋住我的？

<Step label="請 AI 解釋" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2.4fr;margin-top:-.3rem">
<PromptBox title="🤖 請 AI 解釋一個函式">
<p>我是小學生，正在學做遊戲。下面是我遊戲裡的 movePlayer 函式。請用<Ph pick="小學生聽得懂的話|一行一行說明" answer="小學生聽得懂的話" />告訴我：<Ph pick="牆是怎麼擋住玩家的|體力是怎麼減少的|走到出口會怎麼樣" />？請先寫出程式裡的那一行（原文），再用一句話解釋。不要改我的程式。</p>
<p><Ph code>貼上 movePlayer 函式（Ctrl+C 選取的那一段）</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 填 2 格</b><br>
    <span class="n">1</span>選一個說法　<span class="n">2</span>選你想問的<br>
    <span class="small">貼程式：用第 8 頁的方法選起 movePlayer → <code>Ctrl+C</code> → 貼進最後的框</span></div>
  <div class="card green" style="font-size:1.02rem"><b>🔍 AI 回來以後，三件事</b>
    <ol class="steps">
      <li>它寫的那一行，<code>Ctrl+F</code> 找得到嗎？</li>
      <li>它說的，<b>跟我玩的一樣嗎</b>？</li>
      <li>有哪一句<b>看不懂</b>？再問它</li>
    </ol>
  </div>
</div>
</div>

<div class="row" style="margin-top:.3rem;gap:.6rem;align-items:stretch;font-size:1rem">
  <div class="card" style="flex:1;margin:0"><b>🤖 AI 說</b><br>「如果下一格是牆，就說撞到牆，然後不走」</div>
  <div class="card" style="flex:1;margin:0"><b>🔎 我找到</b><br><code>if (tile === "#")</code></div>
  <div class="card green" style="flex:1;margin:0"><b>🎮 玩起來</b><br>撞牆真的走不過去 ✅</div>
</div>
<div class="small" style="margin-top:.1rem">下面三張是<b>示意</b>的例子。AI 的解釋<b>也可能錯</b>，要玩玩看。</div>

<!--
⏱ 5 分鐘。「寫程式的人也常常看不懂別人的程式，所以會請人解釋。你們可以請 AI 當老師。」
做法：照第 8 頁的方法選起 movePlayer（Ctrl+F → 點最前面 → Shift＋點最後），Ctrl+C，貼進粉紅色的最後一格；前面兩格選一個。按「📋 複製」→ 到 AI 貼上。
重點：① 請它「先寫原文那一行」，我們才能用 Ctrl+F 在程式裡找到它說的地方（找不到就是它亂講）。② 不要光相信，玩玩看對不對。
AI 的解釋也可能錯（例如說 return 是「回來」）：玩玩看、問夥伴，或再問一次「這句為什麼這樣說」。
看不懂的字（const、return、tile）很正常：回它「這個字是什麼意思？請用例子說」。不用全部懂，只要知道「規則寫在這個函式裡」。
這一頁沒有一定要貼回遊戲，答案不是程式碼：做完的人可以再選另外兩個問題問 AI。
常見問題：貼了整份程式 AI 回很長：沒關係，但請它「只解釋 movePlayer」。
-->

---

# STEP 2 目標：鑰匙開門

<Step n="2" kind="目標" actor="me" />

<div class="cols" style="grid-template-columns:1fr 1fr 1fr;margin-top:-.4rem;gap:.8rem;align-items:start">
  <div class="center">
    <div class="shot fit" style="--h:11.5rem"><span class="label tag pink">🔒 沒鑰匙</span><img src="/img/real-locked.png" alt="Locked door: 門鎖住了，先找鑰匙"></div>
    <div class="card pink" style="font-size:1rem;margin-top:.6rem">走到 🚪 <b>走不過去</b>，說「門鎖住了，先找鑰匙」，體力<b>不少</b></div>
  </div>
  <div class="center">
    <div class="shot fit" style="--h:11.5rem"><span class="label tag orange">🔑 撿鑰匙</span><img src="/img/real-key.png" alt="Picked up the key: 🔑 有"></div>
    <div class="card orange" style="font-size:1rem;margin-top:.6rem">走到 🔑：上方顯示 <b>有</b>，那格<b>變地板</b>，說「拿到鑰匙了！」</div>
  </div>
  <div class="center">
    <div class="shot fit" style="--h:11.5rem"><span class="label tag green">🔓 開門</span><img src="/img/real-door.png" alt="The door opened: 門開了"></div>
    <div class="card green" style="font-size:1rem;margin-top:.6rem">有鑰匙走到 🚪：門<b>變地板</b>，說「門開了！」可以走過去</div>
  </div>
</div>

<div class="row" style="margin-top:.4rem;gap:.6rem;font-size:1.02rem;align-items:stretch">
  <div class="card green" style="flex:1;margin:0"><b>🧠 規則</b>：<b>沒鑰匙</b>打不開門，<b>撿了鑰匙</b>才能開</div>
  <div class="card pink" style="flex:1;margin:0"><b>❌ 不能發生</b>：牆、體力、🏁 出口都要<b>跟原本一樣</b></div>
</div>
<div class="small" style="margin-top:.2rem">三張都是<b>真實畫面</b>（救援 2）</div>

<!--
⏱ 2 分鐘。從這裡開始是「你自己做」：學生照投影片自己做，老師巡堂。
「現在 🔑 和 🚪 只是裝飾，走過去什麼都沒發生。STEP 2 加上今天的規則：鑰匙開門。」指三張圖講一遍。
「為什麼撞到鎖住的門，體力不能少？」（沒走成，沒有走一步）「門打開以後那一格會變成什麼？」（地板，所以可以走過去）
綠色卡和三張圖的說明，就是下一頁 Prompt 要填的答案。
這是遊戲設計「規則」：同一個門，有沒有鑰匙，結果不一樣。
-->

---

# STEP 2 步驟

<Step n="2" kind="步驟" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.2rem">
<div>
  <div class="warn" style="font-size:1.1rem;margin-bottom:.5rem">先確認：STEP 1 能玩，而且已經 <b>☁️ Save</b></div>
  <ol class="steps" style="font-size:1.1rem">
    <li><b>複製程式</b>：JS 窗格 <code>Ctrl+A</code> → <code>Ctrl+C</code></li>
    <li><b class="pink">✏️ 填 4 格</b>：答案在第 14 頁，<b class="green">全部變綠</b></li>
    <li><b>貼上程式</b>：最後一個框 <code>Ctrl+V</code>（<b class="yellow">最新</b>的程式）</li>
    <li><b>貼給 AI</b>：「📋 複製」→ AI <code>Ctrl+V</code> → 送出</li>
    <li><b class="yellow">只換函式</b>：AI 的 <code>movePlayer</code> → 選取舊的（第 8 頁）→ <code>Ctrl+V</code></li>
    <li><b class="yellow">先玩，再存</b>：照第 17 頁檢查 → <b>☁️ Save</b></li>
  </ol>
</div>
<div>
  <div class="card yellow" style="margin-top:.3rem;font-size:1.05rem"><b>💡 這次 ③ 要自己填</b><br>不能壞的東西：<br>走路、撞牆、體力、出口</div>
  <div class="card" style="font-size:1.02rem">AI 常常把<b>整個函式重寫</b>，沒關係，<br>只要<b>舊的功能還在</b></div>
</div>
</div>

<!--
⏱ 1 分鐘。跟 STEP 1 一樣的六步，速度快一點。
最重要的一句：貼「最新」的 JavaScript（STEP 1 做好的），不是起始遊戲的。AI 才知道 movePlayer 現在已經會走了。
這次 ③ 要學生自己填：不能弄壞什麼？答案：走路、撞牆、體力、出口（STEP 1 做好的全部）。
-->

---

# STEP 2 Prompt

<Step n="2" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 STEP 2：鑰匙開門">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，現在玩家會走、會撞牆、有體力，走到 E 會贏。HTML 和 CSS 已經做好了，請只改 JavaScript。地圖：# 牆、. 地板、E 出口、K 鑰匙、D 門。程式已經有：grid（grid[y][x] 是這一格的字）、hasKey（有沒有鑰匙，true 或 false）、px 和 py（玩家的位置）、energy（體力）、showMessage(文字)（在地圖下面顯示一句話）、drawMap()、updateTop()、winGame()、loseGame()。玩家按方向鍵時會呼叫 movePlayer(dx, dy)。撿起鑰匙或打開門以後，要把那一格 grid[y][x] 改成 "."（地板）。</p>
<p><b>① 加什麼：</b><Ph>要加什麼？</Ph></p>
<p><b>② 怎麼動：</b><Ph>它怎麼動？</Ph></p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請只給我「完整的 movePlayer 函式」，並寫出函式的名字，不要給整份程式。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill s2fill" style="margin-top:0"><b>✏️ 填 4 格</b>（看第 14 頁）<span class="small">先點框框，再點字</span><br>
    <span class="n">1</span>要加什麼？
    <Bank words="撿鑰匙|鎖住的門|開門" />
    <span class="n">2</span>怎麼動？
    <Bank words="走到 K：hasKey 變 true，那格變地板|沒有鑰匙走到 D：走不過去，說門鎖住了|有鑰匙走到 D：門變地板，走過去" />
    <span class="n">3</span>不能壞的：
    <Bank words="走路|撞牆|體力|出口" />
    <span class="n">4</span>怎麼檢查？
    <Bank words="先去門前面試試|撿鑰匙再開門" />
  </div>
  <div class="card green" style="font-size:.98rem">🔍 <code>Ctrl+F</code> 搜尋 <code>hasKey</code>：<b>找得到</b>（好幾個）</div>
</div>
</div>

<style>
.s2fill { font-size: .98rem; line-height: 1.35; }
.s2fill :deep(.bank) { gap: .25rem; margin: .1rem 0 .15rem; }
.s2fill :deep(button) { font-size: .9rem; }
</style>

<!--
⏱ 5 分鐘。學生自己做。這次四格都是空的，有字庫可以點。
填空答案：① 點「撿鑰匙、鎖住的門、開門」② 點三句：「走到 K：hasKey 變 true，那格變地板」「沒有鑰匙走到 D：走不過去，說門鎖住了」「有鑰匙走到 D：門變地板，走過去」③ 點「走路、撞牆、體力、出口」④「先去門前面試試、撿鑰匙再開門」。
② 最長：三句都要點。少點了「沒有鑰匙走不過去」，第 17 頁會抓到（沒鑰匙也能開門）。
自己打、寫短一點也可以。
AI 常見錯誤：
・沒鑰匙也過得去，或過去以後門還擋著（沒把 D 那格改成 "."）。
・撞鎖住的門還少體力（沒走成不該少）。
・撿鑰匙的訊息被後面的 showMessage("") 蓋掉：看不到「拿到鑰匙了」，但鑰匙有撿到（上方「有」）。可以不修。
・把 STEP 1 的功能弄壞（撞牆不見了）：回它「撞牆的功能不見了」，或貼回上一個 Save 的函式。
・K 撿完還在地圖上（沒改成地板）。
-->

---

# STEP 2 檢查

<Step n="2" kind="檢查" actor="me" />

<div class="cols" style="grid-template-columns:1.2fr 1fr;margin-top:-.2rem">
<div>
<ul class="check" style="font-size:1.08rem">
  <li><b>沒鑰匙</b>走到 🚪：<b>走不過去</b>，說「門鎖住了」，體力<b>不少</b></li>
  <li>走到 🔑：上方 <b>有</b>，🔑 不見了</li>
  <li><b>有鑰匙</b>走到 🚪：門<b>開了</b>，走得過去</li>
  <li>先拿鑰匙、再開門、再走到 🏁：<b>勝利</b></li>
  <li>STEP 1 的：<b>撞牆</b>、<b>體力</b>、失敗畫面還在</li>
</ul>
<div class="card green" style="font-size:1.05rem;margin-top:.4rem">🎉 5 項都打勾 → 按 <b>☁️ Save</b> → STEP 2 完成！</div>
<div class="small">😵 卡住了？<b>舉手</b></div>
</div>
<div>
  <table class="sym">
    <tr><th>你看到</th><th>這樣告訴 AI</th></tr>
    <tr><td>沒鑰匙也能開門</td><td>「我沒有鑰匙，門還是打開了」</td></tr>
    <tr><td>門開了還擋著</td><td>「有鑰匙的時候，門打開後我還是走不過去」</td></tr>
    <tr><td>鑰匙撿了還在地上</td><td>「撿到鑰匙後，🔑 還在地圖上」</td></tr>
    <tr><td>撞牆又不見了</td><td>「現在撞到牆會穿過去，之前不會」</td></tr>
  </table>
  <div class="card orange bug" style="margin-top:.5rem"><b>🪲 回報句：</b><br>「我<b>沒拿鑰匙就走到門</b>，<b>門打開了</b>，我<b>希望它擋住我</b>。」</div>
</div>
</div>

<!--
救援 2 [[fiddle:rescue2]]

⏱ 4 分鐘。請學生一項一項試。要照順序：先故意不拿鑰匙走去門（第 1 項），再去撿（第 2 項），再回來開門（第 3 項）。起始地圖：鑰匙在右邊，門在最下面。
最後一項要確認 STEP 1 的東西沒被弄壞：撞牆、體力，還有（用 maxEnergy 改 3 的方法）失敗畫面。這就是「③ 不能弄壞」：加新功能，要檢查舊功能。
全部打勾才 ☁️ Save。
卡住超過 10 分鐘：翻到第 29 頁，Fork 救援 2。
-->

---

# STEP 3 目標：下一關

<Step n="3" kind="目標" actor="me" />

<div class="cols" style="grid-template-columns:1.5fr 1fr;margin-top:-.3rem;gap:1rem;align-items:center">
<div>
  <div class="flow" style="gap:.35rem;align-items:center">
    <div class="shot fit" style="--h:7.5rem"><span class="label tag">第 1 關</span><img src="/img/real-key.png" alt="Level 1"></div>
    <div class="arrow-r">🏁➜</div>
    <div class="shot fit" style="--h:7.5rem"><span class="label tag">第 2 關</span><img src="/img/real-level2.png" alt="Level 2"></div>
    <div class="arrow-r">🏁➜</div>
    <div class="card pink center" style="font-size:1.5rem;padding:.2rem .6rem">第 3 關</div>
  </div>
  <div class="center" style="margin-top:.5rem"><span class="big yellow">🏁 ➜ 🏆</span><span class="small"> 最後一關走到 🏁 才贏</span></div>
</div>
<div>
  <div class="card orange" style="margin-top:0;font-size:1.05rem">🗺️ <b>先請 AI 畫 2 張新地圖</b>（資料）<br><span class="small">第 20 頁</span></div>
  <div class="card green" style="font-size:1.05rem">⚙️ <b>再換 movePlayer</b>（規則）：走到 E ，還有下一關就<b>載入下一關</b></div>
</div>
</div>

<div class="row" style="margin-top:.3rem;gap:.6rem;font-size:1.02rem;align-items:stretch">
  <div class="card" style="flex:1;margin:0"><b>🔥 挑戰</b>：一關比一關長，每一關<b>體力回到 40</b>、鑰匙<b>重新找</b></div>
  <div class="card pink" style="flex:1;margin:0"><b>❌ 不能發生</b>：第 1 關變了；鑰匙門、撞牆、體力壞掉</div>
</div>
<div class="small" style="margin-top:.2rem">圖是<b>真實畫面</b>（救援 3）· 程式已經有 <code>loadMap(n)</code>：載入第 n 關，體力和鑰匙會重來</div>

<!--
⏱ 2 分鐘。「現在走到 🏁 就贏了，一張地圖玩完就結束。STEP 3 要有三關：走到 🏁，還有下一張地圖就換過去；最後一張才贏。」
「地圖是資料，movePlayer 是規則。所以要做兩次換：先換資料（maps），再換規則（movePlayer）。」資料先做。
「老師已經寫好 loadMap(n)：叫它一聲就載入第 n 關，體力和鑰匙會自動重來。」所以規則只要加一句：走到 E，還有下一關就叫 loadMap。
這個遊戲設計叫「關卡」：一關比一關長，就是提高挑戰。
這一頁（再加上第 20 頁）就是 STEP 3 Prompt（第 21 頁）的答案。
-->

---

# STEP 3 步驟

<Step n="3" kind="步驟" actor="me" />

<div class="cols" style="grid-template-columns:1fr 1fr;margin-top:-.2rem">
<div>
  <div class="card yellow" style="margin:0 0 .4rem;font-size:1.05rem"><b>第一輪：地圖（資料）</b> 第 20 頁</div>
  <ol class="steps" style="font-size:1.05rem">
    <li>請 AI 畫 <b>2 張</b>新地圖，給你完整的 <code>const maps</code></li>
    <li><code>Ctrl+F</code> <code>const maps</code> → 整個換掉</li>
    <li>Run，<b>看一看</b>地圖有沒有歪（第 22 頁）→ ☁️ Save</li>
  </ol>
</div>
<div>
  <div class="card green" style="margin:0 0 .4rem;font-size:1.05rem"><b>第二輪：規則（函式）</b> 第 21 頁</div>
  <ol class="steps" style="font-size:1.05rem">
    <li>貼<b>最新</b>的 JavaScript，填 4 格，給 AI</li>
    <li><code>Ctrl+F</code> <code>function movePlayer</code> → 整個換掉</li>
    <li>照第 22、23 頁<b>走三關</b>檢查 → ☁️ Save</li>
  </ol>
</div>
</div>

<div class="challenge" style="margin-top:.5rem">
  <b class="yellow">🧪 測試小技巧：體力數字改小</b>
  <span style="font-size:1.05rem">　<code>Ctrl+F</code> <code>maxEnergy</code> → <code>40</code> 改 <code>3</code> → 測失敗 → <b class="pink">改回 40</b></span>
</div>

<!--
⏱ 1 分鐘。這次要換兩個地方：先 const maps，再 function movePlayer。兩次的方法都是 Ctrl+F → 選取 → 貼上（第 8 頁）。
const maps 是一個長長的清單，最後一行是 ];：選取時要選到那一行為止。請 AI「給完整的 const maps = [ … ];」就不會少。
左右兩輪各存一次：地圖換好、走過沒問題先 Save，再做規則。這樣規則弄壞了，可以回到有地圖的版本。
-->

---

# 請 AI 畫地圖

<Step label="STEP 3" kind="地圖" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 請 AI 畫新地圖">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲。程式最上面的 maps 是地圖清單：每一張地圖是 9 行字，每行 11 個字。# 是<Ph drop="牆|地板|玩家起點|出口|鑰匙|門" answer="牆" hover="看地圖符號 #：它在遊戲裡是什麼？" />，. 是<Ph drop="牆|地板|玩家起點|出口|鑰匙|門" answer="地板" hover="看地圖符號 .：它在遊戲裡是什麼？" />，P 是<Ph drop="牆|地板|玩家起點|出口|鑰匙|門" answer="玩家起點" hover="看地圖符號 P：它在遊戲裡是什麼？" />，E 是<Ph drop="牆|地板|玩家起點|出口|鑰匙|門" answer="出口" hover="看地圖符號 E：它在遊戲裡是什麼？" />，K 是<Ph drop="牆|地板|玩家起點|出口|鑰匙|門" answer="鑰匙" hover="看地圖符號 K：它在遊戲裡是什麼？" />，D 是<Ph drop="牆|地板|玩家起點|出口|鑰匙|門" answer="門" hover="看地圖符號 D：它在遊戲裡是什麼？" />。現在只有 1 張地圖。</p>
<p><b>① 加什麼：</b>再畫<Ph number>幾</Ph>張新地圖，加在 maps 裡。</p>
<p><b>② 怎麼動：</b>每張地圖都是 11 個字 × 9 行，最外面一圈全部是 #。每張只能有 1 個 P、1 個 E、1 個 K、1 個 D。一定要走得到 K，拿到 K 才能打開 D，D 的後面才是 E，不能繞過 D。新地圖要<Ph pick="比第 1 張難一點|比第 1 張長一點|死路多一點" />。</p>
<p><b>③ 不能弄壞：</b>第 1 張地圖不要改。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查地圖？</Ph></p>
<p>請給我「完整的 const maps = [ … ];」（從 const maps 到最後的 ];），其他程式不要給。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 填 9 格</b><br>
    <span class="n">0</span><b>拖字卡</b>到左邊 6 個格子<br>
    <Drag words="牆|地板|玩家起點|出口|鑰匙|門" />
    <span class="n">1</span>幾張？（數字）<br>
    <span class="n">2</span>難在哪？選一個<br>
    <span class="n">4</span>怎麼檢查？
    <Bank words="走一遍|數一數每行幾個字|找 P E K D 各一個" />
  </div>
  <div class="card green checks" style="font-size:1.02rem"><b>🔍 換好以後</b>（AI 的地圖常有錯，第 22 頁抓錯）
    <ol class="steps">
      <li><code>Ctrl+F</code> <code>const maps</code>：<b>只有 1 個</b></li>
      <li>第 1 張地圖<b>跟原本一樣</b></li>
    </ol>
  </div>
</div>
</div>

<!--
⏱ 5 分鐘。學生自己做。這是今天「請 AI 給內容」的部分，跟第 9 堂的題目一樣：AI 寫的內容也會錯，要你來檢查。
填空答案：最上面 6 個選單：# 牆、. 地板、P 玩家起點、E 出口、K 鑰匙、D 門（每個符號只有一個對，選對才會變綠色，這是在確認孩子知道每個字在地圖上是什麼）。① 2 ② 選一個（隨便，沒有標準答案）④ 點「走一遍、數一數每行幾個字、找 P E K D 各一個」。
老師寫的規則比較多：「11 個字 × 9 行、外面一圈 #、各一個 P E K D、不能繞過 D」。這些是地圖的格式，AI 不知道我們的遊戲怎麼讀地圖，所以要老師寫好。
AI 常見錯誤（第 22 頁會抓）：
・有一行 10 或 12 個字。・沒有 K 或有兩個 D。・最外面一圈有「.」（玩家走出地圖，遊戲會壞）。・K 在牆裡面走不到，或門可以繞過去。
・把第 1 張地圖也改掉了（③ 寫了不要改）。
貼回去：Ctrl+F → const maps → 選起整個清單（最後是 ];）→ 貼上。選歪了 Ctrl+Z。
-->

---

# STEP 3 Prompt

<Step n="3" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 STEP 3：走到出口，換下一關">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，現在有 3 張地圖，玩家會走、會撞牆、能用鑰匙開門、有體力。HTML 和 CSS 已經做好了，請只改 JavaScript。程式已經有：maps（地圖清單，maps.length 是有幾張）、level（現在是第幾關，從 0 開始數）、loadMap(n)（載入第 n 張地圖，體力和鑰匙會重來）、hasKey、energy、grid、px、py、showMessage(文字)、drawMap()、updateTop()、winGame()、loseGame()。玩家按方向鍵時會呼叫 movePlayer(dx, dy)。</p>
<p><b>① 加什麼：</b><Ph hover="範例：走到＿＿的話，就應該要換下一關">要加什麼？</Ph></p>
<p><b>② 怎麼動：</b><Ph hover="範例：玩家走到＿＿，如果還有下一關就要換到＿＿＿，如果沒有下一關才 winGame()">它怎麼動？</Ph></p>
<p><b>③ 不能弄壞：</b><Ph hover="範例：走路、撞牆、鑰匙、門、體力、輸">哪些不能壞？</Ph></p>
<p><b>④ 怎麼檢查：</b><Ph hover="範例：走完＿＿＿＿，看會不會有勝利畫面">怎麼檢查？</Ph></p>
<p>請只給我「完整的 movePlayer 函式」，並寫出函式的名字，不要給整份程式。</p>
<p><Ph code hover="先在 JS 窗格 Ctrl+A、Ctrl+C，再回到這裡 Ctrl+V（要貼最新的程式）">貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill" style="margin-top:0"><b>✏️ 四格都填</b>（看第 18 頁）<br>
    <span class="small">這次<b>沒有</b>字庫，用自己的話寫，短短的就好</span><br>
    <span class="n">1</span>要加什麼？<br>
    <span class="n">2</span>走到 E 會怎樣？最後一關呢？<br>
    <span class="n">3</span>哪些功能不能壞？<br>
    <span class="n">4</span>你會怎麼檢查？</div>
  <div class="card yellow" style="font-size:1.02rem"><b>💡 提示</b>：② 兩種情況：<br>還有下一關 → ？　最後一關 → ？</div>
  <div class="card green" style="font-size:.98rem">🔍 <code>Ctrl+F</code> 搜尋 <code>loadMap</code>：<b>movePlayer 裡</b>也找得到</div>
</div>
</div>

<!--
⏱ 5 分鐘。學生自己做。這次四格整格都是空的，也沒有字庫：學生第一次完全用自己的話寫四格（題目在第 18 頁）。
老師心裡的參考答案（學生卡住再說）：
① 走到出口就換下一關 ② 走到 E：如果還有下一張地圖就 loadMap(level + 1)，最後一關才 winGame() ③ 走路、撞牆、鑰匙、門、體力 ④ 走完三關，最後一關走到 🏁 要有勝利畫面。
寫短一點也可以（「走到 E 換下一關，最後一關才贏」AI 看得懂）。
老師巡堂：先看②有沒有「最後一關」。沒寫的話，AI 常常走到最後一關還在載入下一張，遊戲會壞。問：「走到第 3 關的 🏁 會發生什麼？」
AI 常見錯誤：
・最後一關的 🏁 也 loadMap：出現錯誤，或回到第 1 關（要贏）。
・換關後鑰匙還是「有」（loadMap 會重來，AI 若自己改就不用 loadMap 了）：提醒它「用 loadMap」。
・換關後畫面沒更新（忘了 drawMap；用 loadMap 就會自動畫）。
・STEP 1–2 的功能弄壞：把 ③ 補寫清楚再問一次。
-->

---

# 抓錯地圖偵探

<Step label="偵探" actor="pair" />

<div class="cols" style="grid-template-columns:1.5fr 1fr;margin-top:-.3rem;gap:1rem">
<div>
  <div style="font-weight:900;margin-bottom:.2rem">AI 畫的地圖，常見<b class="pink">四種錯</b>：</div>
  <div class="bad4">
    <div class="card pink"><b>① 一排長短不一樣</b>
      <pre class="mp">#########<br>#P.....E#<br>#.#####<mark>.</mark>.#<br>#########</pre>
      <span class="small">右邊歪了</span></div>
    <div class="card pink"><b>② 少了 P、E、K、D</b>
      <pre class="mp">##########<br>#P..#....#<br>#...#..K.#<br>##########</pre>
      <span class="small">沒有出口 E</span></div>
    <div class="card pink"><b>③ 外圈有洞</b>
      <pre class="mp">##########<br>#P..#....#<br>#...#..E<mark>.</mark><br>##########</pre>
      <span class="small">走出地圖，遊戲壞掉</span></div>
    <div class="card pink"><b>④ 走不通</b>
      <pre class="mp">#########<br>#P#K#D#E#<br>#.#.#.#.#<br>#########</pre>
      <span class="small">K 被牆圍住</span></div>
  </div>
  <div class="small">四張都是<b>示意圖</b>（故意畫錯的）</div>
</div>
<div>
  <div style="font-weight:900;margin-bottom:.2rem">🔎 怎麼查？三步：</div>
  <ol class="steps" style="font-size:1.08rem">
    <li>👀 <b>看</b>：右邊是不是整齊一條線？</li>
    <li>🔢 <b>找</b>：🧑 🔑 🚪 🏁 各<b>一個</b></li>
    <li>🚶 <b>走</b>：從頭走到 🏁</li>
  </ol>
  <div class="card yellow" style="font-size:1.05rem"><b>👫 交換玩</b><br>跟隔壁交換電腦，走<b>對方的新地圖</b><br>→ 指出<b>一處</b>怪怪的</div>
  <div class="card green" style="font-size:1.02rem">找到了？記住：<b>第幾張</b>、<b>哪裡怪</b>、<b>我看到什麼</b></div>
</div>
</div>

<style>
.bad4 { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
.bad4 .card { margin: 0; font-size: 1rem; line-height: 1.35; padding: .35rem .7rem; }
.bad4 pre.mp { margin: .2rem 0; font-family: ui-monospace, Consolas, monospace; font-size: 1.02rem; line-height: 1.15; background: #0a0f24; padding: .25rem .5rem; color: #fff; }
.bad4 pre.mp mark { background: var(--pink); color: #000; }
</style>

<!--
⏱ 4 分鐘。「第 9 堂我們抓過題目的錯。今天 AI 畫地圖，也會錯，而且畫地圖比出題更容易錯，因為要數字數、要想路能不能走通。」
先講四種錯（每種念一次）：① 有一排多一個或少一個字（等寬字下，右邊會歪）。② 少了出口或鑰匙，或多了一個。③ 最外面一圈有「.」：玩家走出地圖，遊戲會壞（程式去讀地圖外面的字）。④ 走不通：鑰匙被牆圍住，或門可以繞過去（那就不用鑰匙）。
三步查：看（右邊整齊嗎）、找（各一個）、走（真的走一遍）。「走」最準，因為有些錯用看的看不出來。
兩人交換電腦走對方的地圖（約 3 分鐘）。這一頁放在 STEP 3 Prompt（第 21 頁）後面：規則已經換好，走到 🏁 會到下一關，所以真的能走完新地圖（第 1 關約 20 步，後面的更長）。
還沒換好規則的學生：先用「看」和「找」兩步，「走」等規則換好再做。
修好：把「第幾張、哪裡怪」告訴 AI（用第 9 堂的方法一次只講一件事），拿回完整的 const maps，再換一次。
找不到錯也很好：「這張地圖沒有問題」。
-->

---

# STEP 3 檢查

<Step n="3" kind="檢查" actor="me" />

<div class="cols" style="grid-template-columns:1.35fr 1fr;margin-top:-.2rem">
<div>
<ul class="check" style="font-size:1.08rem">
  <li><b class="c-start">🏁 開始</b>：按「開始」才開始，第 <b>1</b> / <b>3</b> 關</li>
  <li><b class="c-play">🎮 遊玩</b>：撞牆、撿鑰匙、開門；🏁 把你送到<b>下一關</b>，⚡ 回到 40，🔑 變「沒有」</li>
  <li><b class="c-win">🏆 勝利</b>：走完<b>三關</b> → 勝利畫面</li>
  <li><b class="c-lose">💥 失敗</b>：（先改成 3）體力用完 → 失敗畫面</li>
  <li><b>↻ 重玩</b>：「再玩一次」→ 回到<b>第 1 關</b></li>
</ul>
<div class="warn" style="font-size:1.05rem;margin-top:.4rem">⚠️ 測完把 <code>3</code> 改回 <code>40</code>，再 <b>☁️ Save</b>！</div>
<div class="small" style="margin-top:.3rem">😵 卡住了？<b>舉手</b></div>
</div>
<div class="row" style="flex-wrap:nowrap;gap:.6rem">
  <div class="shot fit" style="--h:12rem;border-color:var(--c-win)"><span class="label tag" style="background:var(--c-win)">🏆</span><img src="/img/real-win.png" alt="Win screen"></div>
  <div class="shot fit" style="--h:12rem;border-color:var(--c-lose)"><span class="label tag" style="background:var(--c-lose)">💥</span><img src="/img/real-lose.png" alt="Lose screen"></div>
</div>
</div>
<div class="small" style="margin-top:.3rem">右圖是<b>真實畫面</b>（救援 3）· 完整遊戲五格都要試到</div>

<!--
救援 3 [[fiddle:rescue3]]

⏱ 4 分鐘。這是「完整遊戲」檢查表，顏色跟第 4 堂一樣：開始藍、遊玩綠、勝利橘、失敗紅。
勝利要真的走完三關（約 80 步，一分鐘多）；想快一點的學生可以先把 maxEnergy 改成 99 少一點壓力，但要記得改回 40。失敗用測試小技巧（maxEnergy 改 3）。重玩要在勝利畫面和失敗畫面各按一次。
地圖有錯的學生：走到壞掉的那張就停下來，用「我做了什麼＋看到什麼＋我期待什麼」告訴 AI。
5 項都過、3 改回 40，才按 ☁️ Save。
STEP 3 卡住的學生：翻到第 29 頁，Fork 救援 3（完整版），直接做第 24–26 頁「我的版本」和夥伴試玩（連結在最上面）。
-->

---

# 我的版本：選一個改

<Step label="我的版本" actor="me" />

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem;margin-top:-.1rem;font-size:1.02rem">
  <div class="card" style="margin:0"><div class="tag neon">目標</div><br>先撿到 <b>3 個 💎</b>，🏁 才會打開（沒撿完走過去要說話）</div>
  <div class="card green" style="margin:0"><div class="tag green">規則</div><br>・🌀 <b>傳送門</b>：走進去，出現在另一個 🌀<br>・🧊 冰面：滑到撞牆才停</div>
  <div class="card pink" style="margin:0"><div class="tag pink">挑戰</div><br>・👾 <b>敵人</b>在走廊來回走，碰到就輸<br>・每一關體力不一樣</div>
  <div class="card orange" style="margin:0"><div class="tag orange">回饋</div><br>・走過的地板留下 👣<br>・勝利畫面顯示<b>用了幾步</b><br>・撿鑰匙放音效（第 3 堂的 raw 網址）</div>
</div>

<div class="row" style="margin-top:.7rem;gap:.8rem;align-items:stretch">
  <div class="card yellow" style="flex:1;margin:0">🎨 用救援的同學也可以選：做完救援 3 就是完整版</div>
  <div class="card pink" style="flex:1;margin:0">☝️ 只選<b>一個</b>，做完、玩過、存好，再選下一個</div>
</div>
<div class="card" style="margin-top:.6rem;font-size:1.05rem">🧱 要<b>新的地圖字</b>（例如 💎 用 <code>G</code>、🌀 用 <code>T</code>）？記得三件事：<b>地圖寫進去</b>、<b>畫出來</b>（drawMap）、<b>走到會怎樣</b>（movePlayer）</div>

<!--
⏱ 2 分鐘。「用遊戲設計四個字想一想：你想改目標、規則、挑戰，還是回饋？選一個就好。」
這些都只改 JavaScript（HTML 已經夠用）。難度：回饋最容易（腳印、用了幾步），規則和目標中等（傳送門、💎），挑戰的敵人最難（要每隔一下自己動）。
不知道選什麼的學生：建議「勝利畫面顯示用了幾步」（id winText 已經有，可以改文字）或「走過留下 👣」。
新的地圖字：drawMap 裡每個字畫成什麼，movePlayer 裡走到會怎樣，maps 裡放在哪。請 AI 一次改三個地方時，要請它給「完整的 drawMap、movePlayer」兩個函式（兩個都要換）。
敵人：請 AI「每 0.5 秒動一次」，不用教語法。體力不一樣：改 maxEnergy 或在 loadMap 裡按關卡給。
音效：到自己的 GitHub 倉庫（第 3 堂）複製聲音的 raw 網址，網址在雲端，換電腦也找得到。
-->

---

# 寫我的 Prompt

<Step label="我的版本" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 我的 Prompt（四格自己寫）">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，現在玩家會走、會撞牆、能用鑰匙開門、有三關、體力用完會輸。HTML 和 CSS 已經做好了，請只改 JavaScript。地圖寫在 maps 裡：# 牆、. 地板、P 起點、E 出口、K 鑰匙、D 門。程式已經有：grid、px、py、hasKey、energy、level、maxEnergy、loadMap(n)、drawMap()、updateTop()、showMessage(文字)、winGame()、loseGame()，勝利畫面的文字是 id "winText"。</p>
<p><b>① 加什麼：</b><Ph>我要加的東西</Ph></p>
<p><b>② 怎麼動：</b><Ph>它怎麼動？數字是多少？</Ph></p>
<p><b>③ 不能弄壞：</b><Ph>哪些已經做好、不能壞？</Ph></p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請給我「完整的」要改的函式（每個都寫出函式的名字），沒改的函式不要給我。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card yellow" style="margin-top:0;font-size:1.02rem"><b>💡 提示</b><br>
  ① 第 24 頁選的那一個<br>
  ② 要有<b>數字</b>：幾個？幾秒？幾步？<br>
  ③ STEP 1–3 做好的<br>
  ④ 數字先改小再測？</div>
  <div class="card" style="font-size:.98rem"><b>🤖 AI 要換哪幾個函式？</b><br>
  畫面變了 → <code>drawMap</code><br>
  走路的規則 → <code>movePlayer</code><br>
  新的地圖字 → <code>maps</code></div>
  <div class="card pink" style="font-size:1.02rem">一次只改<b>一件事</b>　玩過才 <b>☁️ Save</b><br><span class="small">一次要換好幾個函式？一個一個換，每換一個就 Ctrl+F 確認只有 1 個</span></div>
</div>
</div>

<!--
⏱ 7 分鐘。這是學生第二次四格全部自己寫，這次沒有範例也沒有字庫，只有提示。
做法：把四個粉紅框填成自己的話（變綠色）→ 最後一個框 Ctrl+V 貼上程式 → 按「📋 複製」→ 到 AI Ctrl+V → 送出。每格打幾個字就好。
老師心裡的範例（學生卡住再說）：
・用了幾步：① 勝利畫面顯示用了幾步 ② 勝利時 winText 寫「你用了 N 步走出迷宮」（N＝全部走的步數，要記在新的變數 totalSteps，每次走路加 1，再玩一次歸零）③ 走路、撞牆、鑰匙門、三關、失敗 ④ 我會走完三關看勝利畫面。
・腳印：① 走過的地板留下 👣 ② 玩家離開的那一格畫 👣（不是牆、鑰匙、門）；換關和重玩要清掉 ③ 走路、撞牆、鑰匙門、三關 ④ 走幾步看有沒有 👣。
・傳送門：① 地圖字 T（🌀）② 走進 T 就出現在同一張地圖的另一個 T；地圖兩個 T ③ … ④ 走進去看看。
老師巡堂：先看②有沒有數字、③有沒有寫。寫得太模糊（「更好玩」）就問：「怎樣算更好玩？要多少？」
這次輸出形式是「要改的函式都完整給我，沒改的不要給」：一次可能要換兩三個函式，一個一個換。
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
  <li><b class="green">規則</b>：牆擋得住嗎？沒鑰匙打得開門嗎？（<b>不應該</b>）</li>
  <li><b class="pink">挑戰</b>：體力夠走完嗎？太難還是太簡單？</li>
  <li>🗺️ 新地圖<b>走得通</b>嗎？有沒有怪怪的地方？</li>
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
玩的人最後要說 ⭐ 一個喜歡的地方＋💡 一個點子。示範一次：「⭐ 我喜歡撿到鑰匙會說話。💡 如果走過的地方有腳印會更好玩。」
找到怪怪的地圖或規則：告訴對方「第幾關、我做了什麼、看到什麼」，請他下次用回報句問 AI。
提醒：點子是建議，不是批評；不要說「很爛」「好無聊」。
每個人還是改自己的遊戲，不要幫對方改。人數單數時，老師當其中一人的夥伴。
-->

---

# 存檔＋繳交

<Step label="交作業" actor="all" />

<div class="cols" style="grid-template-columns:1.3fr 1fr;margin-top:-.2rem">
<div>
  <ol class="steps" style="font-size:1.12rem">
    <li>按 <b class="neon">☁️ Save</b>（玩過、沒壞的版本；<code>maxEnergy</code> 是 <b>40</b>）</li>
    <li>看網址：<b>遊戲編號</b>是你自己的，<b>不是</b>起始遊戲的</li>
    <li><b>Google Classroom</b> → 課堂作業 → <b class="green">第 10 堂：迷宮尋寶</b></li>
    <li><b class="yellow">＋ 新增或建立</b> → <b class="yellow">連結</b> → 貼上網址 → <b>新增連結</b></li>
    <li>按 <b class="neon">繳交</b> ✅</li>
  </ol>
</div>
<div>
  <div class="card" style="margin-top:0"><span class="tag">示意圖</span> <b>設計卡（選填）</b>
    <div class="dcard">
      <div><b class="neon">目標</b> 走到 🏁</div>
      <div><b class="green">規則</b> 牆擋住、鑰匙開門</div>
      <div><b class="pink">挑戰</b> 體力 40、三關</div>
      <div><b class="orange">回饋</b> 撞牆會說話</div>
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
測完體力要改回 40：不然別人玩你的遊戲三步就輸了。
設計卡是 Classroom 作業裡選填的欄位，不寫不扣分。右邊是範例內容。
交完作業還有時間的同學：翻到第 30 頁「挑戰站」（藥水、怪物、傳送門、星星、冰），做好新版本再換新網址。
-->

---

# 分享：我怎麼請 AI 改？

<Step label="分享" actor="all" />

<div class="card orange" style="margin-top:.4rem;font-size:1.3rem;line-height:1.8">
🤖 我請 AI 做＿＿＿＿，它第一次給我的＿＿＿＿（哪裡不對），<br>
我用＿＿＿＿（🎮 玩玩看／🔍 Ctrl+F／👫 問夥伴）發現，<br>
我這樣告訴它：「＿＿＿＿＿」
</div>

<div class="card yellow" style="font-size:1.3rem">
🎨 我改了＿＿＿＿（<span class="neon">目標</span>／<span class="green">規則</span>／<span class="pink">挑戰</span>／<span class="orange">回饋</span>），因為＿＿＿＿
</div>

<div class="center q" style="margin-top:.8rem">✂️ 只換一個函式，🤖 AI 寫、🧑 你來檢查</div>

<!--
⏱ 3 分鐘。請 2–3 位同學用句型分享，老師把他們投影出來的遊戲玩一下也可以。
先問：「誰的 AI 給的函式（或地圖）一開始不對？你怎麼發現的？」稱讚用「玩玩看」或「Ctrl+F」發現的同學：這就是今天最重要的習慣。
再問：「你今天學到的新貼法是什麼？」（Ctrl+F 找到函式、Shift＋點選起來、整個換掉）
再問：「你改了四個字裡的哪一個？」
最後全班一起念下面那句。上一堂是「AI 寫內容，你來檢查」，今天多了「只換一個函式」。
-->

---

# 救援站：老師說了才打開

<div class="warn center" style="font-size:1.25rem;margin-top:-.1rem">⚠️ 這些是<b>老師的</b>遊戲。老師叫你打開哪一個，才 Fork 那一個；<br>Fork 之後按 <b>☁️ Save</b>，確認遊戲編號是<b>你自己的</b>。</div>

<div class="rescue" style="margin-top:.8rem">
  <div class="card yellow"><div class="tag">救援 1</div><div>STEP 1 做好的樣子<br><span class="small">會走、撞牆、體力、贏和輸</span></div><Fiddle k="rescue1" /></div>
  <div class="card yellow"><div class="tag">救援 2</div><div>STEP 2 做好的樣子<br><span class="small">＋鑰匙開門</span></div><Fiddle k="rescue2" /></div>
  <div class="card green"><div class="tag green">救援 3＝完整版</div><div>STEP 3 做好的樣子<br><span class="small">＋三張地圖、下一關</span></div><Fiddle k="rescue3" /></div>
</div>

<div class="small" style="margin-top:.7rem">做完 STEP 3 以後，可以到「我的版本」再改一個地方；還有時間再翻第 30 頁「挑戰站」；也可以在課後回來玩完整版。</div>

<style>
.rescue { display: grid; grid-template-columns: repeat(3, 1fr); gap: .7rem; }
.rescue .card { margin: 0; display: flex; flex-direction: column; gap: .4rem; font-size: 1.1rem; font-weight: 900; }
.rescue .card > :last-child { margin-top: auto; font-size: .85rem; word-break: break-all; }
</style>

<!--
救援 1 [[fiddle:rescue1]]

救援 2 [[fiddle:rescue2]]

救援 3（完整版） [[fiddle:rescue3]]

⏱ 0 分鐘（不用上；只在學生卡住時叫他翻到這一頁）。
這一頁放在最後，學生網站也看得到，所以學生不會在 STEP 頁面上誤點救援連結，跑進別的遊戲。
用法：「翻到第 29 頁，Fork 救援 2，再按 ☁️ Save。」確認他網址的遊戲編號已經變成自己的。
用救援的學生還是要請 AI 解釋（第 13 頁）、畫地圖（第 20 頁）：救援 3 的地圖是老師的，他們可以再請 AI 加新地圖。
-->

---

# 挑戰站：做完了？選一個挑戰

<div class="warn" style="font-size:1.05rem;margin-top:-.2rem;line-height:1.5">
✅ STEP 3 做完、交了作業才來　·　開始前先 <b>☁️ Save</b>　·　<b>一步</b>做完、玩過、存好，才做下一步<br>
😵 弄壞了？網址最後的<b>版本編號改小一號</b> → Enter，回到上一個好的版本
</div>

<div class="cmenu" style="margin-top:.7rem">
  <div class="card yellow">
    <div class="row" style="justify-content:space-between;margin:0"><b class="yellow" style="font-size:1.3rem">A 🧪 體力藥水</b><span>⭐</span></div>
    <div class="shot fit" style="--h:7.4rem;margin:.4rem auto"><img src="/img/real-c-potion.png" alt="Potion example"></div>
    <div>走到 🧪 體力 +10</div>
    <div class="go">1 步 · 第 31–32 頁</div>
  </div>
  <div class="card orange">
    <div class="row" style="justify-content:space-between;margin:0"><b class="orange" style="font-size:1.3rem">B 👻 怪物</b><span>⭐⭐</span></div>
    <div class="shot fit" style="--h:7.4rem;margin:.4rem auto"><img src="/img/real-c-monster-hit.png" alt="Monster example"></div>
    <div>怪物巡邏、追人，要找劍打牠</div>
    <div class="go">2 步 · 第 33–36 頁</div>
  </div>
  <div class="card pink">
    <div class="row" style="justify-content:space-between;margin:0"><b class="pink" style="font-size:1.3rem">C 🌀 魔法地圖</b><span>⭐⭐⭐</span></div>
    <div class="shot fit" style="--h:7.4rem;margin:.4rem auto"><img src="/img/real-c-ice.png" alt="Magic map example"></div>
    <div>傳送門、星星鎖住出口、冰</div>
    <div class="go">4 步 · 第 37–43 頁</div>
  </div>
</div>
<div class="card green" style="margin-top:.5rem;font-size:1.05rem;text-align:center">🎨 想不到要做什麼？翻到<b>第 44 頁點子庫</b>　·　<b>新的格子</b>要三件事：<b>寫進地圖</b>、<b>畫出來</b>、<b>走到會怎樣</b></div>
<div class="small" style="margin-top:.3rem">圖都是<b>真實畫面</b>（老師做的範例）· 做好、Save 了，在 Classroom 換成新的網址（第 27 頁）</div>

<style>
.cmenu { display: grid; grid-template-columns: repeat(3, 1fr); gap: .8rem; }
.cmenu .card { margin: 0; display: flex; flex-direction: column; font-size: 1.05rem; text-align: center; }
.cmenu .go { margin-top: .3rem; font-weight: 900; color: var(--neon); }
</style>

<!--
⏱ 0 分鐘（不用上；給做完 STEP 3、交了作業、還有時間的同學，自己照頁碼往下做）。
「做完的同學翻到第 30 頁挑戰站，選一個。⭐ 越多越難。」不知道選哪個：先做 A（一步就好），做完再挑 B 或 C。
三個挑戰都只改 JavaScript：新的格子（藥水、怪物、傳送門…）都請 AI 用 JavaScript 做出來，HTML 和 CSS 不用動。
今天挑戰站的目的不是「做得出來」，是練習想：「我的遊戲裡，還可以放什麼？」每一頁的「🎨 設計想一想」就是在練這個，請巡堂時問學生那一題。
每個挑戰老師都做過一次（starter/challenge-a.html、challenge-b1.html、challenge-b2.html、challenge-c1.html、challenge-c2.html、challenge-c3.html，每個都是能玩的完整遊戲，也用程式自動玩過三張地圖），確定做得出來；圖片是這些範例的真實畫面。
程式越來越長（C-3 做完約 270 行）：免費 AI 可能只給一半。程式變短很多就不要貼，回 AI：「請給我完整的 JavaScript，一行都不要省略」。
挑戰 C-4 沒有填空，要自己想點子（第 44 頁有點子庫）。學生想出來的好點子，請他在「分享」時展示。
做完挑戰要交新版本：Save → Classroom 按「取消繳交」→ 換新網址 → 再繳交。
-->

---

# 挑戰 A 目標：體力藥水

<Step label="挑戰 A" kind="目標" actor="me" />

<div class="cgoal">
  <div class="shot fit" style="--h:17rem"><span class="label tag">真實畫面</span><img src="/img/real-c-potion.png" alt="Drinking a potion"></div>
  <div>
    <div class="card yellow"><b class="yellow">👀 會看到</b>：地圖上有幾瓶 <b>🧪</b>。走過去：體力 <b>+10</b>、藥水不見、寫「喝了藥水」<br><b class="pink">🚫 不能發生</b>：體力超過 40；藥水放在牆裡；地圖走不通</div>
    <div class="card orange"><b class="orange">🎨 設計想一想</b>：藥水放哪裡才<b>有趣</b>？<br>放在路上（順便喝）還是放在<b>要繞遠路</b>才拿得到？繞路要花體力，值得嗎？</div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>走到 🧪：體力變多，藥水不見</li>
        <li>體力已經滿了還喝：<b>不會超過 40</b></li>
        <li>3 張地圖都有藥水，都走得到</li>
        <li>撞牆、鑰匙、門、輸贏都還可以</li>
      </ul>
    </div>
  </div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
這是最簡單的挑戰：一個新的地圖字（H）＋一條規則。用「遊戲設計四個字」說：藥水是讓「挑戰」變簡單一點的道具；放在哪裡是「設計」。
「設計想一想」是重點：藥水放在路上，玩家一定會喝，等於沒什麼意義；放在要繞遠路的地方，玩家要自己算：繞 6 步換 10 點體力，值不值得？這就是遊戲設計。請巡堂時問學生：「你的藥水放在哪裡？為什麼？」
做法跟 STEP 一樣：下一頁填好 Prompt → 貼程式 → 📋 複製 → 貼給 AI → JS 整段換掉 → 照這頁的 🔍 玩過 → ☁️ Save。
一個新的地圖字要改三個地方：maps（放 H）、drawMap（H 畫成 🧪）、movePlayer（走到 H 會怎樣）。AI 給整份 JavaScript 就會一次改好；如果有一處沒改，通常是 🧪 沒有畫出來，或走過去沒反應。
AI 常見錯誤：藥水喝完還在地圖上（那一格要變成地板 "."）；體力超過 40（要 Math.min(maxEnergy, ...)）；3 張地圖只有第 1 張有藥水。
-->

---

# 挑戰 A：Prompt

<Step label="挑戰 A" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 A：體力藥水">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，現在有 3 張地圖，玩家會走、會撞牆、能用鑰匙開門、有體力、走到 🏁 換下一關。HTML 和 CSS 已經做好了，請只改 JavaScript。地圖寫在 maps 裡：# 牆、. 地板、P 起點、E 出口、K 鑰匙、D 門。</p>
<p><b>① 加什麼：</b>地圖上的體力藥水<Ph>藥水 emoji</Ph>，用地圖字 H 代表。</p>
<p><b>② 怎麼動：</b>走到 H 就喝掉，體力加<Ph number>幾</Ph>點，但不能超過 maxEnergy，那一格變成地板，畫面寫「喝了藥水」。請在 3 張地圖裡各放<Ph number>幾</Ph>瓶，放在<Ph pick="路上順便喝的地方|要繞遠路才拿到的地方" />，每一瓶都要走得到，不能放在牆裡。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 6 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>藥水：<Bank words="🧪|🍎|💊|⚡|🍖" />
    <span class="n">2</span>加幾點：建議 <b>10</b><br>
    <span class="n">3</span>每張幾瓶：建議 <b>2</b>　<span class="n">4</span>放哪裡：自選<br>
    <span class="n">5</span>不能壞的：
    <Bank words="走路和撞牆|鑰匙開門|體力|三關|勝利和失敗" />
    <span class="n">6</span>怎麼檢查？
    <Bank words="走到藥水看體力|體力滿了再喝|3 張地圖都找藥水" />
  </div>
  <div class="card green" style="font-size:1.05rem">🔍 <code>Ctrl+F</code> 搜尋 <code>藥水</code>：找得到<br>再照第 31 頁玩一次</div>
  <div class="card pink" style="font-size:1.05rem">⚠️ 程式<b>變很短</b>？<b>別貼</b>，請 AI 給完整的</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案（照右邊的卡片編號）：1 任一個 emoji　2 加幾點：5–15 都可以，建議 10　3 每張 1–3 瓶　4 放哪裡：兩個都對（自己選，問他為什麼）　5「走路和撞牆、鑰匙開門、體力、三關、勝利和失敗」　6「走到藥水看體力、體力滿了再喝、3 張地圖都找藥水」。
範例：starter/challenge-a.html（老師做的；程式約 220 行）。
貼程式：整個 JS 窗格 Ctrl+A、Ctrl+C 貼進最後一個粉紅框。AI 給的程式如果比原本短很多，就不要貼，回 AI：「請給我完整的 JavaScript，一行都不要省略」。
AI 常見錯誤：藥水放進牆裡或放在玩家起點；放太多瓶，遊戲變太簡單（建議每張 1–3 瓶）。
-->

---

# 挑戰 B-1 目標：怪物來了

<Step label="挑戰 B-1" kind="目標" actor="me" />

<div class="cgoal">
  <div class="row" style="flex-wrap:nowrap;gap:.6rem;margin:0">
    <div class="shot fit" style="--h:16rem"><span class="label tag">真實畫面</span><img src="/img/real-c-monster.png" alt="A monster patrols"></div>
  </div>
  <div>
    <div class="card orange"><b class="orange">👀 會看到</b>：地圖上有 <b>👻</b>。你<b>每走一步</b>，牠<b>走一格</b>：一直往右，走不動就轉身往左<br><b class="pink">💥 碰到牠</b>：體力 <b>-10</b>、<b>回到這一關的起點</b>（鑰匙還在）</div>
    <div class="card yellow"><b class="yellow">🎨 設計想一想</b>：怪物放在<b>哪一條走廊</b>？放在<b>一定要走的路</b>上，玩家要<b>算時間</b>；放在旁邊，玩家可以<b>不理牠</b>。哪個比較好玩？</div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>走一步：怪物也動一格，到了牆會<b>轉身</b></li>
        <li>故意碰牠：體力 -10、回起點</li>
        <li>3 張地圖都有怪物，都<b>不被碰到也走得完</b></li>
        <li>怪物不會穿牆、不會走進門</li>
      </ul>
    </div>
  </div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
這一步新東西有三個：新的地圖字 M、怪物會自己動（每走一步動一格）、碰到的懲罰。重點是「回合制」：玩家走一步，怪物走一步，所以不用計時器，AI 比較不會寫錯。
用「遊戲設計四個字」說：怪物是「挑戰」。怪物放哪裡是設計：放在必經的走廊，玩家要等牠走開（可以來回走一步等時間）；放在旁邊，玩家根本不用理牠。
怪物的位置和數字：老師的範例每張地圖 1 隻，一定有一條「不被碰到」的走法（老師用程式確認過三張地圖的最短走法是 32、34、32 步，體力 40 夠用）。學生自己放的怪物，請他一定要自己走一遍。
AI 常見錯誤：怪物走進牆裡；怪物穿過玩家沒有碰到判定（玩家走進怪物和怪物走進玩家，兩種都要算碰到）；碰到後沒有回起點；換關後怪物還在上一關的位置（loadMap 要重新找 M）。
-->

---

# 挑戰 B-1 Prompt

<Step label="挑戰 B-1" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 B-1：巡邏的怪物">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，現在有 3 張地圖，玩家會走、會撞牆、能用鑰匙開門、有體力、走到 🏁 換下一關。HTML 和 CSS 已經做好了，請只改 JavaScript。地圖寫在 maps 裡：# 牆、. 地板、P 起點、E 出口、K 鑰匙、D 門。</p>
<p><b>① 加什麼：</b>會巡邏的怪物<Ph>怪物 emoji</Ph>，地圖字 M（那一格是地板），每張地圖 1 隻，放在<Ph pick="一定要走的路|旁邊的路" />上。</p>
<p><b>② 怎麼動：</b>玩家每走一步，怪物也走一格：一直往右，走不動（牆、門、別隻怪物）就轉身往左，再走不動又轉回來。碰到怪物（誰走過去都算），體力少<Ph number>幾</Ph>點，玩家<Ph pick="回到這一關的起點|留在原地" />，鑰匙和開過的門不變，寫「被怪物撞到」。換關和重玩，怪物回到 M 的位置。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 6 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>怪物：<Bank words="👻|👾|🦇|🐍|🕷️" />
    <span class="n">2</span>放哪條路：看第 33 頁想一想<br>
    <span class="n">3</span>扣幾點：建議 <b>10</b>　<span class="n">4</span>自己選<br>
    <span class="n">5</span>不能壞的：
    <Bank words="走路和撞牆|鑰匙開門|體力和輸|三關|勝利畫面" />
    <span class="n">6</span>怎麼檢查？
    <Bank words="故意碰怪物|看怪物會不會轉身|不被碰到走完三關" />
  </div>
  <div class="card green" style="font-size:1.05rem">🔍 <code>Ctrl+F</code> 搜尋 <code>怪物</code>：找得到<br>再照第 33 頁玩一次</div>
  <div class="card pink" style="font-size:1.05rem">⚠️ 程式<b>變很短</b>？<b>別貼</b>，請 AI 給完整的</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案（照右邊的卡片編號）：1 任一個 emoji　2 放哪條路：兩個都可以（必經的路比較刺激，旁邊的路比較簡單；問他為什麼）　3 扣 5–15 點，建議 10（扣太多一碰就輸）　4 回起點／留在原地都可以（留在原地玩家可能一直被碰，要提醒）　5「走路和撞牆、鑰匙開門、體力和輸、三關、勝利畫面」　6「故意碰怪物、看怪物會不會轉身、不被碰到走完三關」。
範例：starter/challenge-b1.html（老師做的；程式約 270 行）。
怪物程式是這個挑戰最長的一段，AI 常給半份程式：程式變短很多就不要貼。
卡住的學生：用「我做了什麼＋看到什麼＋我期待什麼」告訴 AI，例如「我走到怪物旁邊，怪物穿過我走過去了，我期待這樣也算碰到」。
-->

---

# 挑戰 B-2 目標：怪物追人

<Step label="挑戰 B-2" kind="目標" actor="me" />

<div class="cgoal">
  <div class="row" style="flex-wrap:nowrap;gap:.6rem;margin:0">
    <div class="shot fit" style="--h:12.5rem"><span class="label tag">拿到劍</span><img src="/img/real-c-sword.png" alt="Player has the sword"></div>
    <div class="shot fit" style="--h:12.5rem;border-color:var(--c-win)"><span class="label tag" style="background:var(--c-win)">打倒了</span><img src="/img/real-c-monster-dead.png" alt="Monster beaten"></div>
  </div>
  <div>
    <div class="card orange"><b class="orange">😱 怪物追人</b>：不再來回走，<b>朝你走過來</b>（你走兩步，牠走一格）<br><b class="pink">🚫 不能</b>走進牆和門</div>
    <div class="card yellow"><b class="yellow">🗡️ 劍</b>：撿到後上方顯示 🗡️，<b>碰到怪物就打倒牠</b>，劍用掉</div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>站著不動走來走去：怪物<b>靠過來</b></li>
        <li>有劍碰到怪物：怪物消失；沒劍：-10、回起點</li>
        <li>劍放哪？拿得到、不拿也有辦法嗎？</li>
        <li>3 張地圖都走得完</li>
      </ul>
    </div>
  </div>
</div>
<div class="small" style="margin-top:.4rem">兩張都是<b>真實畫面</b>（老師做的範例）· ⚠️ 要<b>先做完 B-1</b>（Prompt 說「已經有巡邏的怪物」）</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
這一步的設計重點是「怪物變強了，所以要給玩家一個辦法」：追人的怪物沒辦法躲，所以給劍。這個想法很多遊戲都有（吃了大力丸才能打怪）。
問學生：「劍放哪裡？放在離起點很近，玩家一開始就有劍，怪物就不可怕；放得很遠，玩家要冒險去拿。你想要哪一種？」
怪物為什麼「玩家走兩步才走一格」：每走一步都追會追不完，玩家一定被抓到，不好玩。這叫「平衡」。
追人的做法：怪物看玩家在左邊還是右邊、上面還是下面，往那個方向走（走不動就試另一個方向）。老師不用教，AI 會寫；要檢查的是「怪物不會走進牆和門」。
AI 常見錯誤：怪物卡在牆角不動（這其實是正常的，牠不會繞路；可以讓學生想：要不要讓牠更聰明？）；有劍碰到怪物，劍沒用掉；上方沒顯示 🗡️。
-->

---

# 挑戰 B-2 Prompt

<Step label="挑戰 B-2" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 B-2：追人的怪物和劍">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，每張地圖有一隻巡邏的怪物（地圖字 M），碰到怪物體力 -10、回到起點。HTML 和 CSS 已經做好了，請只改 JavaScript。顯示鑰匙的地方 id 是 "keyStat"。</p>
<p><b>① 加什麼：</b>怪物改成追玩家，地圖上多一把劍<Ph>劍 emoji</Ph>（地圖字 S），每張 1 把。</p>
<p><b>② 怎麼動：</b>怪物改成追玩家：<Ph pick="玩家走兩步，怪物走一格|玩家每走一步，怪物走一格" answer="玩家走兩步，怪物走一格" />，往玩家的方向走，不能走進牆和門。玩家走到 S 撿起劍（變地板），畫面寫「拿到劍了」，keyStat 後面加 🗡️。有劍碰到怪物，怪物消失，劍<Ph pick="用掉|還能再用" />；沒劍還是 -10、回起點。劍放在<Ph pick="離起點很近的地方|離怪物很近的地方" />。換關和重玩，怪物和劍都回來。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 6 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>劍：<Bank words="🗡️|⚔️|🔪|🪄" />
    <span class="n">2</span>追的速度：選<b>第一個</b>（每步都追會追不完）<br>
    <span class="n">3</span><span class="n">4</span>自己選，想一想為什麼<br>
    <span class="n">5</span>不能壞的：
    <Bank words="走路和撞牆|鑰匙開門|體力和輸|三關|勝利畫面" />
    <span class="n">6</span>怎麼檢查？
    <Bank words="站著不動看怪物靠過來|有劍去碰怪物|沒劍去碰怪物" />
  </div>
  <div class="card green" style="font-size:1.05rem">🔍 <code>Ctrl+F</code> 搜尋 <code>拿到劍了</code>：找得到<br>⚠️ 程式<b>變很短</b>？<b>別貼</b>，請 AI 給完整的</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案：① 任一個 emoji ② 追的速度選「玩家走兩步，怪物走一格」（選另一個會變橘色：每步都追，玩家一定被抓到，要先討論再決定）③ ④ 用完或還能再用、劍放哪裡都可以（問他為什麼）⑤「走路和撞牆、鑰匙開門、體力和輸、三關、勝利畫面」⑥「站著不動看怪物靠過來、有劍去碰怪物、沒劍去碰怪物」。
範例：starter/challenge-b2.html（老師做的；程式約 290 行，三張地圖都用程式確認不被碰到也走得完）。
這一頁要先做完 B-1：Prompt 說「現在有巡邏的怪物」。
AI 常見錯誤：怪物沒有碰到判定；撿了劍之後上方沒有 🗡️；「再玩一次」劍沒回來；怪物走進門。
-->

---

# 挑戰 C-1 目標：傳送門

<Step label="挑戰 C-1" kind="目標" actor="me" />

<div class="cgoal">
  <div class="shot fit" style="--h:17rem"><span class="label tag">真實畫面</span><img src="/img/real-c-portal.png" alt="Teleported to the other portal"></div>
  <div>
    <div class="card pink"><b class="pink">🌀 傳送門</b>：地圖字 <b>T</b>，每張地圖<b>兩個</b>一組。走進一個，<b>馬上出現在另一個</b>上面，寫「傳送」<br><b class="pink">🚫 不能</b>：一直來回傳；只有一個 T 就當地板</div>
    <div class="card orange"><b class="orange">🎨 設計想一想</b>：兩個 🌀 放<b>哪裡</b>？放在地圖<b>兩端</b>＝<b>捷徑</b>；放在一條<b>走不通的死路</b>後面＝<b>驚喜</b>；放在 🚪 的兩邊會怎樣？（想一想會不會破壞鑰匙門）</div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>走進 🌀：出現在另一個 🌀</li>
        <li>再往別的方向走：<b>不會</b>被傳回去</li>
        <li>3 張地圖都有一組，鑰匙門、體力、輸贏沒壞</li>
      </ul>
    </div>
  </div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。挑戰 C 有四步，每一步做完都是一個能玩的遊戲：先有傳送門，再有星星鎖住出口，再有冰，最後加自己的點子。
這一步：新的地圖字 T，規則是「成對」。成對是資料的設計：地圖上要放兩個 T，AI 才找得到「另一個」。
設計問題：傳送門是「規則」。兩個 🌀 放哪裡會改變整張地圖怎麼走。如果把傳送門直接放在 🚪 後面，玩家就不用鑰匙了，鑰匙門的規則就被破壞了：這是「不能弄壞」要想到的。
老師的範例（starter/challenge-c1.html）：第 1 張地圖的 🌀 放在起點下面的走廊和右邊走廊，是捷徑；三張地圖用程式確認過一定走得完。
AI 常見錯誤：傳送後馬上又傳回去（要站在出口 🌀 上而不是再傳送一次）；兩個 T 傳到同一個。
-->

---

# 挑戰 C-1 Prompt

<Step label="挑戰 C-1" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 C-1：傳送門">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，現在有 3 張地圖，玩家會走、會撞牆、能用鑰匙開門、有體力、走到 🏁 換下一關。HTML 和 CSS 已經做好了，請只改 JavaScript。地圖寫在 maps 裡：# 牆、. 地板、P 起點、E 出口、K 鑰匙、D 門。</p>
<p><b>① 加什麼：</b>傳送門<Ph>傳送門 emoji</Ph>，用地圖字 T 代表，每張地圖放<Ph number>幾</Ph>組，每一組有 2 個 T，放在<Ph pick="地圖兩端，當捷徑|死路的盡頭，當驚喜" />。</p>
<p><b>② 怎麼動：</b>玩家走進一個 T，就出現在同一張地圖的另一個 T 上面，畫面寫「傳送」。傳過去以後不會馬上又傳回去，往別的方向走才離開。走進傳送門<Ph pick="會少 1 點體力|不扣體力" />。傳送門要放在能走到的地板上，而且不能讓玩家不用鑰匙就走過門 D。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 6 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>傳送門：<Bank words="🌀|🕳️|🔮|🚇" />
    <span class="n">2</span>幾組：建議 <b>1</b>　<span class="n">3</span>放哪裡：看第 37 頁<br>
    <span class="n">4</span>體力：自己選<br>
    <span class="n">5</span>不能壞的：
    <Bank words="走路和撞牆|鑰匙開門|體力和輸|三關|勝利畫面" />
    <span class="n">6</span>怎麼檢查？
    <Bank words="走進傳送門|傳過去再往旁邊走|三張地圖都走完" />
  </div>
  <div class="card green" style="font-size:1.05rem">🔍 <code>Ctrl+F</code> 搜尋 <code>傳送</code>：找得到<br>再照第 37 頁玩一次</div>
  <div class="card pink" style="font-size:1.05rem">⚠️ 程式<b>變很短</b>？<b>別貼</b>，請 AI 給完整的</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案（照右邊的卡片編號）：1 任一個 emoji　2 每張 1 組（2 組也可以，3 組就太亂）　3 放哪裡：兩端＝捷徑、死路盡頭＝驚喜，兩個都對（問他為什麼）　4 傳送要不要扣體力都可以　5「走路和撞牆、鑰匙開門、體力和輸、三關、勝利畫面」　6「走進傳送門、傳過去再往旁邊走、三張地圖都走完」。
範例：starter/challenge-c1.html（老師做的；程式約 230 行）。
AI 常見錯誤：傳送後又傳回去；地圖上只放了一個 T；傳送門放進牆裡。
測傳送門很快：走進去看一下就知道。
-->

---

# 挑戰 C-2 目標：星星鎖住出口

<Step label="挑戰 C-2" kind="目標" actor="me" />

<div class="cgoal">
  <div class="row" style="flex-wrap:nowrap;gap:.6rem;margin:0">
    <div class="shot fit" style="--h:12.5rem;border-color:var(--c-lose)"><span class="label tag" style="background:var(--c-lose)">出口鎖住</span><img src="/img/real-c-locked-exit.png" alt="Exit is locked"></div>
    <div class="shot fit" style="--h:12.5rem;border-color:var(--c-win)"><span class="label tag" style="background:var(--c-win)">過關</span><img src="/img/real-c-star-win.png" alt="Win screen counts stars"></div>
  </div>
  <div>
    <div class="card yellow"><b class="yellow">⭐ 星星</b>：地圖字 <b>*</b>，撿起來 +1。上方多一格「⭐ 0 / 2」<br><b class="pink">🔒 出口鎖住</b>：<b>還有 ⭐ 沒撿</b>，走到 🏁 只會說「還要拿幾顆」，不能過去</div>
    <div class="card orange"><b class="orange">🎨 設計想一想</b>：這就是<b>目標</b>變了：以前是「走到 🏁」，現在是「<b>先收集，再走到 🏁</b>」。⭐ 放在<b>哪裡</b>，玩家就會<b>走哪裡</b>：你想讓玩家走過哪些路？</div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>撿星星：⭐ 數量 +1</li>
        <li>沒撿完走到 🏁：被擋住，說還要幾顆</li>
        <li>撿完：🏁 可以過；勝利畫面寫拿了幾顆</li>
      </ul>
    </div>
  </div>
</div>
<div class="small" style="margin-top:.4rem">兩張都是<b>真實畫面</b>（老師做的範例）· ⚠️ 要<b>先做完 C-1</b>；沒做 C-1，Prompt 裡「有傳送門」那一句刪掉</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
這一步改的是「目標」：過關的條件變成「先收集完星星」。玩家就會想「我還有哪一顆沒拿？」。
設計重點：星星放在哪裡，等於決定玩家的路線。老師的範例每張地圖 2 顆星星；第 3 張走完最短要 32 步（體力 40），所以星星不要放太遠，否則走不完。
上方多一格「⭐ 0 / 2」：這是 JavaScript 做出來的（HTML 沒有），AI 會用程式在上方那一排多放一格。這是「回饋」。
AI 常見錯誤：星星撿了還在地圖上；🏁 沒鎖住；星星放在要繞很遠的角落，體力不夠走完；換關後上方數字沒歸零。
-->

---

# 挑戰 C-2 Prompt

<Step label="挑戰 C-2" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 C-2：星星鎖住出口">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，現在有 3 張地圖，有傳送門（地圖字 T），玩家會走、會撞牆、能用鑰匙開門、有體力、走到 🏁 換下一關。HTML 和 CSS 已經做好了，請只改 JavaScript。</p>
<p><b>① 加什麼：</b>星星<Ph>星星 emoji</Ph>，用地圖字 * 代表，每張地圖放<Ph number>幾</Ph>顆，放在<Ph pick="要繞路才拿到的地方|順路就拿到的地方" />；上方那一排多一格，寫「⭐ 拿了幾顆 / 這張地圖一共幾顆」。</p>
<p><b>② 怎麼動：</b>走到 * 就撿起來，那一格變地板，畫面寫「拿到星星了」。還有星星沒撿的時候，走到出口 E <Ph pick="會被擋住，說還要拿幾顆|可以走過去" answer="會被擋住，說還要拿幾顆" />。星星撿完才能走到出口。勝利畫面寫「拿了幾顆星星」。換關後上方數字重來。每顆星星都要走得到。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 6 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>星星：<Bank words="⭐|💎|🪙|🍎" />
    <span class="n">2</span>幾顆：建議 <b>2</b>　<span class="n">3</span>放哪裡：自己選<br>
    <span class="n">4</span>出口會不會鎖住：看第 39 頁<br>
    <span class="n">5</span>不能壞的：
    <Bank words="走路和撞牆|鑰匙開門|傳送門|體力和輸|三關" />
    <span class="n">6</span>怎麼檢查？
    <Bank words="沒撿完走到出口|撿完再走到出口|看上方數字" />
  </div>
  <div class="card green" style="font-size:1.05rem">🔍 <code>Ctrl+F</code> 搜尋 <code>拿到星星了</code>：找得到</div>
  <div class="card pink" style="font-size:1.05rem">⚠️ 程式<b>變很短</b>？<b>別貼</b>，請 AI 給完整的</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案（照右邊的卡片編號）：1 任一個 emoji　2 每張 1–3 顆，建議 2　3 放哪裡：兩個都對（繞路＝要選擇，問他為什麼）　4 選「會被擋住，說還要拿幾顆」（選「可以走過去」會變橘色：那星星就沒有意義了）　5「走路和撞牆、鑰匙開門、傳送門、體力和輸、三關」　6「沒撿完走到出口、撿完再走到出口、看上方數字」。
範例：starter/challenge-c2.html（老師做的；程式約 260 行，每張地圖 2 顆星星，三張地圖用程式確認過走得完）。
這一頁要先做完 C-1（Prompt 說「現在有傳送門」）。不想做傳送門的學生可以把那句換成「現在有 3 張地圖」。
AI 常見錯誤：星星撿了還在；🏁 沒鎖住；上方數字換關後沒歸零；星星放在牆裡。
-->

---

# 挑戰 C-3 目標：冰面

<Step label="挑戰 C-3" kind="目標" actor="me" />

<div class="cgoal">
  <div class="shot fit" style="--h:17rem"><span class="label tag">真實畫面</span><img src="/img/real-c-ice.png" alt="Ice tiles on map 1"></div>
  <div>
    <div class="card pink"><b class="pink">🧊 冰</b>：地圖字 <b>I</b>。走上去<b>就停不下來</b>，往<b>同一個方向</b>一直滑，滑到撞牆或踩到不是冰的格子才停。<b>滑的時候不扣體力</b>，只扣你按的那一步</div>
    <div class="card orange"><b class="orange">🎨 設計想一想</b>：冰是<b>規則</b>。滑過去會<b>衝過頭</b>，還是正好<b>滑到鑰匙上</b>？冰放<b>哪裡</b>，是在<b>幫玩家</b>還是在<b>整玩家</b>？</div>
    <div class="small" style="margin-bottom:.3rem">⚠️ 要<b>先做完 C-1、C-2</b>；沒做就刪掉 Prompt 的「有傳送門…」那句</div>
    <div class="card green" style="margin-bottom:0"><b class="green">🔍 做完檢查</b>
      <ul class="check">
        <li>按一下方向：一次滑好幾格，體力只少 1</li>
        <li>滑到牆前面：停下來，<b>不說撞牆</b></li>
        <li>傳送門、星星、鑰匙門都沒壞；3 張地圖走得完</li>
      </ul>
    </div>
  </div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
這是 C 裡最特別的規則：「走一步」的意思變了。以前按一下走一格，現在在冰上按一下可能走很多格。
老師的範例（starter/challenge-c3.html）：movePlayer 多一個參數 sliding（true＝正在滑，不是玩家按的），在冰上就再呼叫自己一次（這叫「函式叫自己」，學生不用懂，AI 會寫）；滑的時候不扣體力、撞牆不說話。三張地圖用程式確認過走得完（29、31、34 步）。
老師可以示範：在冰上按一下，看玩家一次滑好幾格，但 ⚡ 只少 1。問：「這樣冰是在幫玩家還是整玩家？」（兩個都對：在一條長走廊上它在幫玩家；滑過頭會整玩家。）
AI 常見錯誤：滑的時候每格都扣體力；滑到牆前面跳出「撞到牆了」；冰上傳送門／星星沒作用。
-->

---

# 挑戰 C-3 Prompt

<Step label="挑戰 C-3" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 C-3：冰面">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，現在有 3 張地圖，有傳送門（T）和星星（*），玩家會走、會撞牆、能用鑰匙開門、有體力、走到 🏁 換下一關。HTML 和 CSS 已經做好了，請只改 JavaScript。</p>
<p><b>① 加什麼：</b>冰<Ph>冰 emoji</Ph>，用地圖字 I 代表，每張地圖放<Ph number>幾</Ph>段（每段 3 格連在一起），放在<Ph pick="長走廊|鑰匙前面|轉角" />。</p>
<p><b>② 怎麼動：</b>玩家走上冰，就會一直往同一個方向滑，<Ph pick="滑到撞牆或踩到不是冰的格子才停|每次只滑一格" answer="滑到撞牆或踩到不是冰的格子才停" />。滑的時候<Ph pick="不扣體力，只扣玩家按的那一步|每滑一格都扣體力" />。滑到牆前面停下來，不要寫「撞到牆了」；滑到鑰匙、星星、傳送門要照原本的規則。畫面把冰畫成不同顏色的格子。每張地圖都要走得完。</p>
<p><b>③ 不能弄壞：</b><Ph>哪些不能壞？</Ph>都要跟原本一樣。</p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card pink fill cfill" style="margin-top:0"><b>✏️ 填 7 格</b><span class="small">　先點框框，再點字</span><br>
    <span class="n">1</span>冰：<Bank words="🧊|❄️|💧|🌨️" />
    <span class="n">2</span>幾段：建議 <b>1</b>　<span class="n">3</span>放哪裡：自己選<br>
    <span class="n">4</span><span class="n">5</span>看第 41 頁：選<b>第一個</b>滑得最像冰<br>
    <span class="n">6</span>不能壞的：
    <Bank words="走路和撞牆|鑰匙開門|傳送門和星星|體力和輸|三關" />
    <span class="n">7</span>怎麼檢查？
    <Bank words="在冰上按一下看體力|滑到牆前面|三張地圖都走完" />
  </div>
  <div class="card green" style="font-size:1.05rem">🔍 在冰上按一下：滑好幾格，⚡ 少 1</div>
  <div class="card pink" style="font-size:1.05rem">⚠️ 程式<b>變很短</b>？<b>別貼</b>，請 AI 給完整的</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。
填空答案（照右邊的卡片編號，共 7 格）：1 任一個 emoji　2 每張 1 段（每段 3 格）　3 放哪裡：三個都可以（問他為什麼）　4 選「滑到撞牆或踩到不是冰的格子才停」（選「只滑一格」會變橘色：那就不是冰了）　5 選「不扣體力，只扣玩家按的那一步」（另一個也可以，但每格都扣就沒有「滑」的快樂）　6「走路和撞牆、鑰匙開門、傳送門和星星、體力和輸、三關」　7「在冰上按一下看體力、滑到牆前面、三張地圖都走完」。
範例：starter/challenge-c3.html（老師做的；程式約 270 行，是 C-1、C-2、C-3 加起來的完整遊戲）。
冰的程式最容易錯：請學生先用「在冰上按一下」測，只看有沒有滑、體力少多少，再測別的。
這一頁要先做完 C-1、C-2。
-->

---

# 挑戰 C-4：加上我的點子

<Step label="挑戰 C-4" kind="Prompt" actor="me" />

<div class="cols" style="grid-template-columns:3fr 2fr;margin-top:-.3rem">
<PromptBox title="🤖 挑戰 C-4：我的格子點子">
<p>我在 JSFiddle 做「迷宮尋寶」遊戲，現在有 3 張地圖，地圖字有：# 牆、. 地板、P 起點、E 出口、K 鑰匙、D 門、T 傳送門、* 星星、I 冰。玩家會走、會撞牆、能用鑰匙開門、有體力、走到 🏁 換下一關。HTML 和 CSS 已經做好了，請只改 JavaScript。</p>
<p><b>① 加什麼：</b><Ph>我要加的新東西（用哪個地圖字？）</Ph></p>
<p><b>② 怎麼動：</b><Ph>走到它會怎樣？數字是多少？</Ph></p>
<p><b>③ 不能弄壞：</b><Ph>哪些已經做好、不能壞？</Ph></p>
<p><b>④ 怎麼檢查：</b>我會<Ph>怎麼玩來檢查？</Ph></p>
<p>請給我「完整」的 JavaScript，不要省略任何部分，並告訴我改了哪裡。</p>
<p><Ph code>貼上 JSFiddle 最新的 JavaScript</Ph></p>
</PromptBox>
<div>
  <div class="card yellow" style="margin-top:0;font-size:1.05rem;line-height:1.35"><b>💡 選一個點子</b><br>
    🔥 <b>陷阱</b> ⭐：踩到體力 -5<br>
    ⏱ <b>限時</b> ⭐⭐：每關 60 秒<br>
    🔦 <b>迷霧</b> ⭐⭐：只看身邊 2 格<br>
    💣 <b>炸彈</b> ⭐⭐⭐：按 B 鍵炸牆<br>
    🪨 <b>石頭</b> ⭐⭐⭐：走進去推一格
  </div>
  <div class="card pink fill cfill" style="font-size:1.05rem"><b>✏️ 填 4 格</b>　用自己的話寫<br>② 要寫：<b>哪個字母</b>？走到會怎樣？<b>數字</b>？<br>一次只加<b>一個</b>　玩過才 <b>☁️ Save</b><br>想法更多：第 44 頁<br><b>⚠️ 要先做完 C-1～C-3</b>；只做 A、B 的人，刪掉 Prompt 裡沒有的地圖字</div>
  <div class="card pink" style="font-size:1.05rem">⚠️ 程式<b>變很短</b>？<b>別貼</b>，請 AI 給完整的</div>
</div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做）。最後一步沒有填空，四格自己寫（跟第 25 頁一樣），右邊只有點子；想要更多點子翻第 44 頁。
這是整個挑戰站最難的一步：學生要自己決定「新的格子」是什麼，這就是遊戲設計。
老師心裡的範例（學生卡住再說；右邊的五個點子老師沒有全部做過，只有想過做法，不是都測試過）：
・🔥 陷阱：① 地圖字 X（🔥）② 走到 X 體力 -5，那一格變地板，畫面寫「燒到了」③ 地圖、走路、鑰匙門、體力、三關、傳送、星星、冰 ④ 故意走進去看體力。
・💣 炸彈：要新增「有沒有炸彈」和「按 B 鍵」，比較難。
・🪨 石頭：要檢查石頭前面的格子是不是空的（不是牆、不是另一顆石頭），最難。
・🔦 迷霧：只改 drawMap（遠的格子畫成黑色），不難但很酷。
・⏱ 限時：HTML 沒有計時的地方，請 AI 用 JavaScript 在上方多放一格；每換一關重來。
一次只加一個、玩過再存。做完的同學請他在「分享」時展示。
-->

---

# 點子庫：我的遊戲還能放什麼？

<div class="center" style="font-size:1.1rem;margin-top:-.2rem">每個點子都在回答一個問題：<b class="yellow">玩家為什麼要玩下去？</b>　用<b>遊戲設計四個字</b>想一想</div>

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem;margin-top:.5rem;font-size:1rem;line-height:1.5">
  <div class="card" style="margin:0"><div class="tag neon">目標</div><br>🧩 找齊 3 個<b>碎片</b>才開門<br>🐱 把迷路的<b>小動物</b>帶到出口<br>🏆 用<b>最少步</b>走出去</div>
  <div class="card green" style="margin:0"><div class="tag green">規則</div><br>🪨 <b>推石頭</b>擋住路<br>💣 <b>炸彈</b>炸開牆<br>🔘 踩<b>開關</b>，另一邊的牆消失</div>
  <div class="card pink" style="margin:0"><div class="tag pink">挑戰</div><br>🔥 <b>陷阱</b>，看得到但很難繞<br>⏱ <b>限時</b>，一關 60 秒<br>🔦 <b>迷霧</b>，只看得到身邊</div>
  <div class="card orange" style="margin:0"><div class="tag orange">回饋</div><br>👣 走過的路<b>留下腳印</b><br>🔊 撿東西有<b>音效</b><br>🏅 勝利畫面<b>用了幾步</b>、幾顆 ⭐</div>
</div>

<div class="card yellow" style="margin-top:.6rem;font-size:1.1rem;line-height:1.7">
🎨 <b>寫一張「新格子設計卡」</b>（想好再請 AI 做）<br>
我的格子叫＿＿＿，地圖字是＿，畫成＿；玩家走到它會＿＿＿＿＿，數字是＿＿；<br>
它會讓遊戲更<span class="neon">好玩</span>，因為＿＿＿＿＿＿
</div>

<div class="row" style="margin-top:.5rem;gap:.8rem;align-items:stretch;font-size:1rem">
  <div class="card" style="flex:1;margin:0">✅ <b>好設計</b>：玩家<b>有選擇</b>（要繞路嗎？要冒險嗎？）</div>
  <div class="card pink" style="flex:1;margin:0">⚠️ <b>要小心</b>：不能讓地圖<b>走不通</b>、不能讓<b>鑰匙門失效</b></div>
</div>

<!--
⏱ 0 分鐘（挑戰站，自己做；給想不到點子的同學翻來看）。
這一頁的目的：讓跑得快的同學練習想「我的遊戲裡，還可以放什麼？」而不是只照著做。
用法：先看四個格子的點子，選一個，寫「新格子設計卡」（口頭說或寫在紙上都可以），再回到第 43 頁寫 Prompt。
問學生三個問題：① 玩家走到它會怎樣？② 要加什麼數字？③ 它會不會讓遊戲變得走不通、或讓別的規則失效？
好設計的標準：玩家要「有選擇」。例如藥水放在要繞遠路的地方，玩家要選「繞不繞」；怪物放在必經的路，玩家要選「什麼時候衝過去」。沒有選擇的東西（一直接就能拿的藥水）比較無聊。
這些點子老師沒有全部做過；做不出來的時候請學生先換一個比較簡單的，或把它切成更小的一步。
-->

---
hostOnly: true
---

# 下一堂預告

<div class="cols" style="grid-template-columns:1fr 1fr;margin-top:.4rem;align-items:center">
<div class="card" style="margin:0">
  <span class="tag">示意圖</span>
  <div class="plat">
    <div class="sky"><span class="p">🧑</span><span class="c1">🪙</span><span class="c2">🪙</span><span class="fl">🚩</span></div>
    <div class="ground"><span>🟫</span><span>🟫</span><span>🟫</span><span class="gap"></span><span class="gap"></span><span>🟫</span><span>🟫</span><span>🟫</span></div>
  </div>
</div>
<div>
  <div class="big yellow">跳跳平台 🦘</div>
  <div style="font-size:1.2rem;line-height:1.7;margin-top:.4rem">
    🎮 角色要<b>跳</b>、會<b>掉下來</b>，還有金幣和旗子<br>
    🤖 要學：用<b>感覺</b>告訴 AI<br>
    <span class="small">「跳太低了」「掉太快了」→ 請 AI 調數字</span>
  </div>
</div>
</div>

<style>
.plat { margin-top: .3rem; background: #0b1b3a; padding: .3rem; }
.plat .sky { position: relative; height: 5.5rem; font-size: 1.8rem; }
.plat .sky span { position: absolute; }
.plat .p { left: 8%; bottom: 0; } .plat .c1 { left: 35%; top: 10%; } .plat .c2 { left: 52%; top: 0; } .plat .fl { right: 6%; bottom: 0; }
.plat .ground { display: flex; font-size: 1.8rem; line-height: 1.1; }
.plat .ground span { width: 12.5%; text-align: center; }
</style>

<!--
⏱ 1 分鐘。老師頁（學生網站看不到）。
「下一堂做跳跳平台：像瑪利歐一樣會跳、會掉下來。這是整個課程裡最難的一堂，因為要加『重力』。」
預告 AI 的新技巧：不用打數字，說感覺（「跳太低了」「掉得太快」），AI 去調數字；然後我們用 Ctrl+F 找到那個數字，看看它改了什麼。
請大家回家想：你最喜歡的平台遊戲是什麼？
也請提醒：今天的作業要在 Classroom 繳交，maxEnergy 記得改回 40。
-->
