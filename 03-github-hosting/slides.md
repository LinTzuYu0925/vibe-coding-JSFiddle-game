---
theme: default
title: 用 GitHub 幫太空船換裝＆加音效
info: |
  國小程式課：把太空船 GIF 和音效放到 GitHub，再接回 JSFiddle 的 Space Shooter 遊戲。
colorSchema: dark
transition: slide-left
mdc: true
aspectRatio: 16/9
fonts:
  provider: none
---

# 🚀 我的太空船，閃亮登場！

<div class="cols wide-left" style="align-items:center;margin-top:1.5rem">
<div>
  <div class="big">用 <span class="neon">GitHub</span> 放圖片和音效</div>
  <div class="big">讓遊戲 <span class="yellow">看得見</span>、<span class="pink">聽得到</span>！</div>
  <div style="margin-top:1.5rem" class="row" >
    <span class="tag neon">🖼️ 太空船 GIF</span>
    <span class="tag">🎵 BGM</span>
    <span class="tag green">⚽ 踢球音效</span>
    <span class="tag pink">⏰ 時間到</span>
  </div>
</div>
<div class="center">
  <PixelShip :size="22" />
  <div class="huge" style="font-size:2.5rem;margin-top:.6rem">🎵 ⚽ ⏰</div>
</div>
</div>

<!--
⏱ 3 分鐘。開場：「今天要讓你自己畫的太空船飛進遊戲，還要讓遊戲有聲音！」
-->

---

# 🗺️ 今天的任務

<div class="row" style="margin-top:.6rem;gap:.9rem;font-size:1.2rem">
  <div class="card orange" style="flex:1"><div class="tag" style="background:var(--orange)">QUEST 0</div><br>🔑 註冊帳號<br>📦 建立<b>倉庫</b><div class="small">SETUP 1 – 6</div></div>
  <div class="card" style="flex:1"><div class="tag neon">QUEST 1</div><br>🖼️ 換<b>太空船</b><br>📤 交作業<div class="small">STEP 1 – 4</div></div>
  <div class="card yellow" style="flex:1"><div class="tag">QUEST 2</div><br>⚽ 新遊戲<br>🎵 加上 <b>BGM</b><div class="small">STEP 5 – 7</div></div>
  <div class="card green" style="flex:1"><div class="tag green">QUEST 3</div><br>⚽ 踢球時<br><b>「碰！」</b><div class="small">STEP 8</div></div>
  <div class="card pink" style="flex:1"><div class="tag pink">QUEST 4</div><br>⏰ 時間到音效<br>📤 交作業<div class="small">STEP 9</div></div>
</div>

<div class="challenge" style="margin-top:1rem">
<b class="yellow">🎒 開始前，先準備好：</b>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:.2rem 2rem;margin-top:.3rem">
  <span>✅ Email 信箱（註冊用）</span>
  <span>✅ 你的太空船 GIF</span>
  <span>✅ AI 工具（ChatGPT / Gemini）</span>
  <span>✅ Google Classroom 帳號</span>
</div>
</div>

<!--
⏱ 3 分鐘。確認每位學生都有可收信的 Email、找得到自己的 JSFiddle 遊戲。
聲音檔：請事先準備 bgm.mp3、kick.wav 給學生下載（例如 mixkit.co 的免費音效）。
-->

---

# 🤔 為什麼要用 GitHub？

<div class="cols" style="align-items:center;margin-top:1rem">
<div>
  <div class="card pink">😢 JSFiddle 只能放<b>程式碼</b><br>不能直接放圖片、音樂檔</div>
  <div class="center huge" style="font-size:2.4rem">⬇️</div>
  <div class="card green">😄 把檔案放到 <b>GitHub</b><br>GitHub 會給每個檔案一個<b class="yellow">網址</b></div>
  <div class="center huge" style="font-size:2.4rem">⬇️</div>
  <div class="card">🎮 遊戲用這個<b class="yellow">網址</b>，就能找到檔案！</div>
</div>
<div class="center">
  <div class="huge">☁️🗄️</div>
  <div class="big" style="font-size:1.8rem">GitHub = 雲端置物櫃</div>
  <div class="q" style="font-size:1.4rem;margin-top:1rem">網址 = 置物櫃的「地址」📍</div>
  <div style="margin-top:1rem">只要有地址，<br>全世界都找得到這個檔案</div>
</div>
</div>

<!--
⏱ 5 分鐘。比喻：網址就像寄信的地址，地址寫錯一個字，信就送不到。
-->

---

# 🔑 註冊 GitHub 帳號（1/2）
<Step label="SETUP" n="1" quest="🔑 帳號" />

<div class="cols wide-left" style="margin-top:.2rem">
<div>
  <ol class="steps" style="font-size:1.15rem">
    <li>打開 <code>github.com/signup</code></li>
    <li><b class="pink">Email</b>：輸入你的 Email 信箱</li>
    <li><b class="neon">Password</b>：密碼<br><span class="small">至少 15 個字，或 8 個字＋數字＋小寫英文</span></li>
    <li><b class="yellow">Username</b>：你的帳號名稱<br><span class="small">只能用 英文、數字、<code>-</code>（例如 <code>space-pilot-0925</code>）</span></li>
    <li><b>Country/Region</b>：選 <b>Taiwan</b></li>
    <li>按綠色 <b class="green">Create account</b></li>
  </ol>
  <div class="card yellow" style="font-size:1rem">⭐ Username 會變成<b>網址的一部分</b>，想一個好記的！<br><code>github.com/<span class="pink">space-pilot-0925</span></code></div>
</div>
<div>
  <GhSignup :step="1" />
</div>
</div>

<!--
⏱ 8 分鐘。⚠️ GitHub 服務條款規定使用者須年滿 13 歲。國小學生請改用：老師建立的班級帳號，或由家長以自己的帳號協助。請課前確認學校的做法。
GitHub 會擋自動截圖，所以右邊是依照目前註冊頁重畫的示意圖；欄位名稱與實際畫面相同。
-->

---

# 📧 註冊 GitHub 帳號（2/2）
<Step label="SETUP" n="2" quest="🔑 帳號" />

<div class="cols wide-left" style="margin-top:.2rem">
<div>
  <ol class="steps">
    <li>完成 <b>驗證小遊戲</b> 🧩<br><span class="small">照畫面的指示點選圖片，證明你不是機器人</span></li>
    <li>打開你的 <b>Email 信箱</b>，找 GitHub 寄來的信 📬</li>
    <li>把信裡的 <b class="pink">8 位數驗證碼</b> 輸入格子裡</li>
    <li>回到 GitHub 按 <b>Sign in</b>，用帳號密碼<b>登入</b></li>
  </ol>
  <div class="card green" style="font-size:1.05rem">📝 把 <b>Username</b> 和 <b>密碼</b> 寫在小本子上，<br>下次上課還要用！</div>
  <div class="small">📭 沒收到信？看看「垃圾郵件」，或按 <u>Resend the code</u></div>
</div>
<div>
  <GhSignup :step="2" />
</div>
</div>

<!--
⏱ 7 分鐘。驗證碼信件有時要等 1～2 分鐘。之後的問卷（團隊人數、興趣等）可以直接按 Skip / Continue 跳過，選 Free 方案。
-->

---

# 📦 建立新倉庫（1/3）
<Step label="SETUP" n="3" quest="📦 倉庫" />

<div class="cols" style="align-items:center;margin-top:.6rem">
<div class="shot">
  <span class="label tag neon">真實畫面 · GitHub Docs</span>
  <img src="/img/docs-new-menu.png" alt="GitHub menu with New repository highlighted">
</div>
<div>
  <ol class="steps">
    <li>確定你已經 <b>登入</b> GitHub</li>
    <li>按畫面<b>右上角</b>的 <b class="yellow">＋ ▾</b></li>
    <li>選 <b class="yellow">New repository</b></li>
  </ol>
  <div class="card" style="margin-top:1rem">📦 <b>Repository（倉庫）</b><br>= 放你遊戲檔案的<b class="neon">專屬置物櫃</b></div>
</div>
</div>

<!--
⏱ 3 分鐘。截圖來自 GitHub 官方說明文件（docs.github.com）。
-->

---

# 📦 建立新倉庫（2/3）：取名字
<Step label="SETUP" n="4" quest="📦 倉庫" />

<div class="shot" style="margin-top:.4rem">
  <span class="label tag neon">真實畫面 · GitHub Docs</span>
  <img src="/img/docs-repo-name.png" alt="Owner and Repository name fields on the new repository form">
  <div class="hl-note" style="left:46%;top:3%">👇 輸入 space_shooter</div>
</div>

<div class="cols" style="margin-top:1rem">
<div>
  <ol class="steps">
    <li><b>Owner</b>：會自動顯示<b>你的帳號</b> 👤</li>
    <li><b class="yellow">Repository name</b>：輸入 <code>space_shooter</code></li>
    <li>看到綠色 <b class="green">✓ space_shooter is available.</b> 就對了</li>
  </ol>
</div>
<div>
  <div class="card yellow" style="font-size:1.05rem">📛 名字規則：英文、數字、<code>-</code> <code>_</code><br>❌ 不要空格、不要中文</div>
  <div class="small">Description（說明）可以空白，不用填 🙆</div>
</div>
</div>

<!--
⏱ 3 分鐘。官方截圖裡範例名稱是 hello，學生要輸入 space_shooter（底線不是空格）。
-->

---

# 📦 建立新倉庫（3/3）：重要設定！
<Step label="SETUP" n="5" quest="📦 倉庫" />

<div class="cols wide-right" style="margin-top:.2rem">
<div>
  <ol class="steps">
    <li><b>Choose visibility</b><br>選 <b class="green">🌐 Public</b>（公開）</li>
    <li><b>Add README</b><br>打開成 <b class="green">On</b> 🟢</li>
    <li>按綠色 <b class="green">Create repository</b></li>
  </ol>
  <div class="warn" style="font-size:.95rem;margin-top:.4rem">⚠️ 選 <b>Private</b>（私人）的話，<br>遊戲就<b>讀不到</b>你的圖片和聲音！</div>
</div>
<div style="padding-left:2.4rem">
  <GhNewRepo />
  <div class="card green" style="font-size:1rem;margin-top:1rem">❓ 為什麼要 README？<br>它會幫倉庫放進 <b>第一個檔案</b>，<br>倉庫才會出現 <b class="yellow">Add file</b> 按鈕！</div>
</div>
</div>

<!--
⏱ 4 分鐘。沒開 README 的倉庫會是空的「Quick setup」頁面，沒有 Add file 按鈕，學生容易卡住。
.gitignore 和 license 保持預設（No）即可。
-->

---

# 🎉 倉庫建立好了！
<Step label="SETUP" n="6" quest="📦 倉庫" />

<div class="cols wide-left">
<div class="shot">
  <span class="label tag neon">真實畫面 · 範例倉庫</span>
  <img src="/img/gh-repo.png" alt="GitHub repository page for space_shooter with README.md">
  <div class="hl" style="left:4%;top:25%;width:16.5%;height:7%"></div>
  <div class="hl" style="left:2.3%;top:43%;width:71%;height:25.5%"></div>
</div>
<div>
  <div class="tag">✅ 檢查看看</div>
  <ol class="steps" style="font-size:1.15rem">
    <li>名字旁邊寫 <b class="green">Public</b></li>
    <li>檔案清單裡有 <b class="neon">README.md</b></li>
    <li>右上方有 <b class="yellow">Add file</b> 按鈕 👇</li>
  </ol>
  <div style="margin-top:1.4rem"><GhUpload :step="0" /></div>
</div>
</div>

<div class="center small" style="margin-top:.8rem">你的倉庫網址：<code>github.com/<span class="pink">你的帳號</span>/space_shooter</code> — 下一步就用 <b class="yellow">Add file</b> 上傳太空船！🚀</div>

<!--
⏱ 2 分鐘。左邊截圖是「未登入」看到的樣子，所以沒有 Add file；學生登入後看自己的倉庫就會有（如右邊示意圖）。
-->

---

# ⤒ 上傳檔案到 GitHub
<Step n="1" quest="🖼️ 太空船" />

<div class="cols" style="margin-top:.4rem">
<div>
  <ol class="steps">
    <li>打開<b>你自己的</b>倉庫</li>
    <li>按 <b class="yellow">Add file</b> ▾</li>
    <li>選 <b class="yellow">Upload files</b></li>
    <li>把 GIF <b>拖進</b>虛線框（或按 <u>choose your files</u>）</li>
    <li>等檔名出現 ✓</li>
    <li>按綠色 <b class="green">Commit changes</b></li>
  </ol>
  <div class="card yellow" style="font-size:1.05rem">
    📛 檔名規則：<b>英文小寫</b>、<b>不要空格</b>、<b>不要中文</b><br>
    ✅ <code>my-ship.gif</code> &nbsp; ❌ <code>我的 船.GIF</code>
  </div>
</div>
<div>
  <GhUpload :step="1" />
  <div style="height:.8rem"></div>
  <GhUpload :step="3" />
</div>
</div>

<!--
⏱ 10 分鐘。上傳前先幫檔案改好名字。GitHub 檔名分大小寫：Ship.gif 和 ship.gif 是不同的檔案。
-->

---

# 🔗 複製圖片網址
<Step n="2" quest="🖼️ 太空船" />

<div class="cols wide-left">
<div class="shot">
  <span class="label tag neon">真實畫面 · 範例倉庫</span>
  <img src="/img/gh-file-image.png" alt="GitHub file page showing the uploaded GIF">
  <div class="hl" style="left:24%;top:37%;width:52%;height:62%"></div>
  <div class="hl-note" style="left:58%;top:62%;font-size:1.3rem">🖱️ 在圖片上按右鍵</div>
</div>
<div>
  <ol class="steps">
    <li>在檔案清單<b>點你的 GIF</b></li>
    <li>在<b>圖片上</b>按 <b class="pink">滑鼠右鍵</b> 🖱️</li>
    <li>選 <b class="yellow">複製圖片網址</b></li>
    <li>貼到記事本存起來 📝</li>
  </ol>
  <div class="card green" style="font-size:.95rem">
    ✅ 圖片網址長這樣：<br><code style="font-size:.8rem;word-break:break-all">https://github.com/帳號/倉庫/blob/main/檔名.gif<b class="pink">?raw=true</b></code>
  </div>
  <div class="warn" style="font-size:.95rem;margin-top:.5rem">
    ❌ 最後沒有 <code>?raw=true</code>？<br>那是「網頁」，不是「圖片」
  </div>
</div>
</div>

<!--
⏱ 7 分鐘。圖片檔的頁面已經沒有 Raw 按鈕，要在圖片上按右鍵。
選單名稱依瀏覽器不同：Chrome「複製圖片網址」、Edge「複製影像連結」。
複製出來的網址會自動帶 ?raw=true，GitHub 會把它轉到真正的圖片檔。
-->

---

# 🧩 拆解檔案網址

<p>網址就像地址，有 <b>4 個部分</b>。試著換成<b class="yellow">你自己的</b>（圖片、聲音的格式不一樣喔）：</p>

<RawUrl />

<div class="row" style="margin-top:1rem;font-size:1.1rem">
  <div class="card">👤 <b class="neon">帳號</b> = 誰的置物櫃</div>
  <div class="card green">📦 <b class="green">倉庫</b> = 哪一個櫃子</div>
  <div class="card orange">🌿 <b class="orange">分支</b> = 通常是 <code>main</code></div>
  <div class="card pink">📄 <b class="pink">檔名</b> = 哪一個檔案</div>
</div>

<!--
⏱ 5 分鐘。可以現場打字示範：把檔名改成 .wav，網址格式會自動換成聲音的寫法；檔名加空格或中文時，會出現紅色提示。
中文檔名其實也能用，但複製出來會變成 %E7%A8%8B… 一長串，學生很難檢查打錯的地方。
大小寫要和 GitHub 上的檔名「一模一樣」。
-->

---

# 🔍 先測試網址！
<Step n="2½" quest="🖼️ 太空船" />

<div class="cols" style="margin-top:.4rem">
<div>
  <ol class="steps">
    <li>開一個<b>新分頁</b></li>
    <li>貼上複製的網址，按 <b>Enter</b></li>
    <li>看結果 👉</li>
  </ol>
  <div class="card green">🖼️ 只看到你的太空船 → <b class="green">成功！</b></div>
  <div class="card yellow">🎵 聲音檔：會播放或下載 → <b class="green">成功！</b></div>
  <div class="card pink">😵 <code>404 - page not found</code> → <b class="pink">網址有錯</b><br><span class="small">檢查：拼字、大小寫、檔案有沒有 Commit</span></div>
</div>
<div>
  <div class="shot">
    <span class="label tag green">✅ 成功：只有圖片本身</span>
    <img src="/img/gh-raw.png" alt="The example GIF opened on its own from its ?raw=true URL">
  </div>
  <div style="height:1.4rem"></div>
  <div class="shot">
    <span class="label tag pink">❌ 失敗：檔案找不到</span>
    <img src="/img/gh-404.png" alt="GitHub 404 - page not found">
  </div>
</div>
</div>

<div class="center small" style="margin-top:.6rem">⏳ 剛上傳就 404？等 1～2 分鐘再重新整理一次</div>

<style>
.shot img[src*="gh-raw"], .shot img[src*="gh-404"] { height: 7.5rem; object-fit: cover; object-position: top left; }
</style>

<!--
⏱ 5 分鐘。先測網址、再改程式，可以省下大部分的除錯時間。
-->

---

# 🍴 複製一份自己的遊戲（Fork）
<Step n="3" quest="🎮 JSFiddle" />

<div class="cols wide-right" style="margin-top:.2rem">
<div>
  <ol class="steps" style="font-size:1.15rem">
    <li>打開老師的遊戲：<br><code style="font-size:.9rem">jsfiddle.net/pt7hyo8a/2</code></li>
    <li>按上方 <b class="yellow">Fork</b> 圖示 <span class="small">（分岔箭頭）</span></li>
    <li>網址變了 = <b class="green">你自己的</b>遊戲 🎉</li>
  </ol>
  <div class="card yellow" style="font-size:1rem">🔑 要你登入？<br>選 <b>GitHub</b> 登入，用今天註冊的帳號</div>
  <div class="small">💾 改好要存檔：按 <b>雲朵 ☁️ 圖示</b>（Save）</div>
</div>
<div class="shot">
  <span class="label tag neon">真實畫面 · 老師的遊戲</span>
  <img src="/img/fiddle-original.png" alt="The original Space Shooter fiddle on JSFiddle">
  <div class="hl" style="left:57.4%;top:1.4%;width:5.2%;height:6%"></div>
  <div class="hl-note" style="left:52%;top:9.5%">👆 Fork</div>
  <div class="hl" style="left:53.7%;top:1.4%;width:3.7%;height:6%;border-color:var(--neon);box-shadow:0 0 14px var(--neon);animation:none"></div>
  <div class="hl-note" style="left:38%;top:9.5%;background:var(--neon)">☁️ Save</div>
</div>
</div>

<!--
⏱ 5 分鐘。Fork 會在 JSFiddle 建立一份學生自己的複本，之後怎麼改都不會動到老師的原版。
課前請先自己試一次 Fork：確認目前是否需要登入（JSFiddle 支援用 GitHub 帳號登入）。
JSFiddle 介面語言跟著瀏覽器，「Run」可能顯示成「运行」或「執行」。
-->

---

# 🤖 Vibe Coding：請 AI 幫你改程式

<div class="flow">
  <div class="card"><div class="tag neon">① 複製</div><br>在 JSFiddle 的<br><b class="neon">JavaScript</b> 區<br><code>Ctrl+A</code> 全選<br><code>Ctrl+C</code> 複製</div>
  <div class="arrow-r">➜</div>
  <div class="card yellow"><div class="tag">② 問 AI</div><br>打開 <b>ChatGPT</b>、<b>Gemini</b><br>或其他 AI<br>貼上<b class="yellow">老師給的話</b><br>＋ 你的程式碼</div>
  <div class="arrow-r">➜</div>
  <div class="card pink"><div class="tag pink">③ 檢查</div><br>用每一頁的<br><b class="pink">🔍 檢查清單</b><br>看 AI 有沒有<br>改對、改完整</div>
  <div class="arrow-r">➜</div>
  <div class="card green"><div class="tag green">④ 貼回去</div><br>JavaScript 區<br><code>Ctrl+A</code> 全選<br><code>Ctrl+V</code> 貼上<br>按 <b class="orange">Run</b> 試玩</div>
</div>

<div class="challenge" style="margin-top:.8rem;font-size:1.05rem">
<b class="yellow">⭐ Vibe Coding 四個好習慣</b>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:.1rem 2rem;margin-top:.2rem">
  <span>🎯 一次只請 AI 改 <b>一件事</b></span>
  <span>📄 每次都貼 JSFiddle <b>最新</b>的程式碼</span>
  <span>📏 要 AI 給「<b>完整</b>」程式碼，不要省略</span>
  <span>💾 改好、玩過，就按 <b>☁️ Save</b></span>
</div>
</div>

<style>
.flow { display: flex; align-items: stretch; gap: .4rem; margin-top: .4rem; }
.flow .card { flex: 1; text-align: center; font-size: 1.05rem; line-height: 1.5; margin: 0; }
.arrow-r { align-self: center; font-size: 1.8rem; color: var(--yellow); }
</style>

<!--
⏱ 5 分鐘。強調「最新的程式碼」：第二次問 AI 時，要貼已經換好太空船的那一份，不然前面改的會不見。
學校若有指定的 AI 工具（或年齡限制），請改用學校允許的工具。
-->

---

# 🖼️ 請 AI 換上我的太空船
<Step n="4" quest="🖼️ 太空船" />

<div class="cols" style="grid-template-columns:11fr 9fr;gap:1rem">
<div>
<PromptBox>
我在做一個 JavaScript 太空射擊遊戲，想把玩家的飛船換成我自己的 GIF 圖片。<br>
圖片已經存在 GitHub 上，網址是：<Ph>貼上你的圖片網址</Ph><br>
請幫我修改下面的程式碼，把飛船換成這張圖片，改完之後告訴我網址貼在哪一行。<br>
請給我「完整」的 JavaScript 程式碼，不要省略任何部分。<br>
<Ph>貼上 JSFiddle 的 JavaScript</Ph>
</PromptBox>
  <div class="small" style="margin-top:.6rem">💡 圖片網址：GitHub 上圖片按<b>右鍵</b> → <b>複製圖片網址</b>（STEP 2）</div>
</div>
<div class="checks">
  <div class="tag pink">🔍 檢查 AI 有沒有改對</div>
  <ol class="steps">
    <li><code>Ctrl+F</code> 搜尋 <code>spaceshipImage.src</code><br>引號裡是<b>你的網址</b>，結尾是 <code>?raw=true</code></li>
    <li>JSFiddle 左邊的行號：大約 <b>450 行</b><br><span class="small">（短很多 = AI 偷懶省略了）</span></li>
    <li>AI 的程式裡<b>沒有</b>「其餘程式碼不變」這種字</li>
    <li>按 <b class="orange">Run</b> → 看到<b class="green">你的太空船</b> 🚀</li>
  </ol>
</div>
</div>

<!--
⏱ 10 分鐘。原始程式第 35 行是 spaceshipImage.src = "PASTE_YOUR_GIF_URL_HERE"; 這一步其實只要換這一行。
AI 若只回答「改第 35 行」而沒給完整程式碼也沒關係，學生可以只改那一行；重點是會用檢查清單確認。
-->

---

# 🎉 檢查點 1：太空船換好了嗎？
<Step n="✓" quest="🖼️ 太空船" />

<div class="cols" style="grid-template-columns:3fr 1.3fr;align-items:start;gap:1.2rem">
<div>
  <div class="row" style="justify-content:flex-start;gap:.5rem;font-size:1.05rem">
    <div class="card green check" style="margin:0;flex:1">☐ 看到<b>我的太空船</b><br>☐ ⬅️ ➡️ 會動、空白鍵能發射<br>☐ 按 ☁️ <b>Save</b> 存檔</div>
    <div class="warn" style="margin:0;flex:1.2;font-size:.95rem">😵 還是 🚀？→ 網址貼到新分頁測試<br>😵 什麼都沒有？→ 請 AI 給完整程式</div>
  </div>
  <div class="tag" style="margin-top:.8rem">🎞️ GIF 不會動？請 AI 幫你！</div>
<PromptBox>
我的 JavaScript 太空射擊遊戲用 canvas 畫飛船，換成 GIF 之後，飛船的動畫不會動。<br>
請幫我修改下面的程式碼，讓飛船 GIF 一開始就自動播放動畫，並且跟著飛船一起移動。<br>
請給我「完整」的 JavaScript 程式碼，不要省略任何部分，並告訴我改了哪裡。<br>
<Ph>貼上 JSFiddle 最新的 JavaScript</Ph>
</PromptBox>
  <div class="small" style="margin-top:.5rem">🔍 檢查：按 Run → GIF <b>一開始就會動</b> · 按 ⬅️ ➡️ GIF <b>跟著走</b> · 子彈還是從飛船射出</div>
</div>
<div class="shot">
  <span class="label tag neon">真實畫面</span>
  <img src="/img/game-result.png" alt="The Space Shooter game showing the example GIF as the player ship">
  <div class="hl" style="left:43%;top:76%;width:14%;height:9%"></div>
</div>
</div>

<!--
⏱ 5 分鐘緩衝。右邊截圖是把範例 GIF 網址放進原始遊戲後實際跑出來的畫面。
canvas 的 drawImage 只畫 GIF 的單一畫格（已實測），所以太空船不會動。
AI 常見的解法：用一個 <img> 疊在 canvas 上、每一格跟著 player.x / player.y 移動。改完請確認子彈和碰撞仍然正常。
-->

---

# 🔢 看懂 JSFiddle 網址的密碼

<div class="jsf-url">
  <span class="base">https://jsfiddle.net/</span><span class="id">pt7hyo8a</span><span class="base">/</span><span class="ver">2</span>
</div>
<div class="jsf-legend">
  <div class="card"><b class="neon">pt7hyo8a</b> = 遊戲的<b>編號</b> 🆔<br><span class="small">每一個遊戲都有自己的編號，像身分證</span></div>
  <div class="card yellow"><b class="yellow">2</b> = 第幾個<b>版本</b> 📚<br><span class="small">每按一次 ☁️ Save，數字就會變大</span></div>
</div>

<div class="timeline">
  <div class="card"><div class="tag neon">老師的遊戲</div><br><code>pt7hyo8a/2</code></div>
  <div class="arrow-r">🍴 Fork ➜</div>
  <div class="card green"><div class="tag green">你的遊戲</div><br><code><b>k3x9ab2q</b></code><br><span class="small">編號變了！</span></div>
  <div class="arrow-r">☁️ Save ➜</div>
  <div class="card yellow"><div class="tag">又存了一次</div><br><code>k3x9ab2q/<b>3</b></code><br><span class="small">版本變大了！</span></div>
</div>

<div class="warn" style="font-size:1.05rem;margin-top:.8rem">⚠️ 交作業前看一下：編號<b>不是</b> <code>pt7hyo8a</code>（那是老師的！）· 版本是你<b>最後</b> Save 的那個</div>

<style>
.jsf-url { font-family: ui-monospace, Consolas, monospace; font-size: 2rem; text-align: center; background: #000; border: 4px solid var(--neon); box-shadow: 6px 6px 0 #000; padding: .4rem; margin: .2rem 0 .6rem; }
.jsf-url .base { color: #aaa; } .jsf-url .id { color: var(--neon); font-weight: 900; } .jsf-url .ver { color: var(--yellow); font-weight: 900; }
.jsf-legend { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 1.15rem; }
.jsf-legend .card { margin: 0; }
.timeline { display: flex; align-items: stretch; gap: .5rem; margin-top: .8rem; }
.timeline .card { flex: 1; text-align: center; margin: 0; font-size: 1.05rem; }
.timeline .arrow-r { align-self: center; font-weight: 900; color: var(--yellow); white-space: nowrap; }
</style>

<!--
⏱ 5 分鐘。範例中的 k3x9ab2q 是假的編號，每位學生 Fork 後拿到的編號都不一樣。
最常見的錯誤：交了老師原版的網址（pt7hyo8a），老師就看不到學生改過的遊戲。
請學生交「按完 Save 之後」網址列上的網址，版本號碼才會是最新的。
-->

---

# 📤 交作業：打造你的專屬戰機!
<Step label="HOMEWORK" n="1" quest="📤 交作業" />

<div class="cols" style="grid-template-columns:1fr 1.15fr;gap:1.2rem">
<div>
  <ol class="steps" style="font-size:1.1rem">
    <li>在 JSFiddle 按 <b>☁️ Save</b></li>
    <li>複製<b>網址列</b>的網址 <span class="small">（檢查編號不是老師的）</span></li>
    <li>打開 <b>Google Classroom</b> → 課堂作業<br>→ <b class="green">打造你的專屬戰機!</b></li>
    <li>在「你的作業」按 <b class="yellow">＋ 新增或建立</b> → <b class="yellow">連結</b></li>
    <li>貼上 JSFiddle 網址 → 按 <b>新增連結</b></li>
    <li>按藍色 <b class="neon">繳交</b> ✅</li>
  </ol>
  <div class="card yellow" style="font-size:.95rem">🔁 交完又改了？再按一次 Save，<br>按「取消繳交」→ 換成新網址 → 再繳交</div>
</div>
<div>
  <GcSubmit :step="1" />
  <div style="height:1rem"></div>
  <GcSubmit :step="3" />
</div>
</div>

<!--
⏱ 5 分鐘。Classroom 需要學校帳號登入，右邊是示意圖；選單文字以學生畫面為準（「新增或建立」→「連結」）。
老師在 Classroom 看到的會是學生最後交的那個版本號碼。
-->

---

# ⚽ 第二個遊戲：SUPER STRIKER
<Step n="5" quest="⚽ 新遊戲" />

<div class="cols wide-right" style="margin-top:.2rem">
<div>
  <ol class="steps" style="font-size:1.15rem">
    <li>打開第二個遊戲：<br><code style="font-size:.9rem">jsfiddle.net/d0svjbn1</code></li>
    <li>按上方 <b class="yellow">Fork</b> → 變成<b class="green">你的</b></li>
    <li>按 <b class="yellow">▶ START GAME</b> 玩玩看</li>
  </ol>
  <div class="card" style="font-size:1rem;line-height:1.7">
    ⬆️⬇️⬅️➡️ 移動 · <b>空白鍵</b> 射門 ⚽<br>
    ⏱️ <b>60 秒</b>內踢進越多球越好<br>
    🧤 小心守門員和紅衣防守員！
  </div>
  <div class="small">🎵 接下來要幫這個遊戲加上 <b>音樂</b> 和 <b>音效</b></div>
</div>
<div class="shot">
  <span class="label tag neon">真實畫面 · 第二個遊戲</span>
  <img src="/img/game-soccer.png" alt="The SUPER STRIKER soccer game">
</div>
</div>

<!--
⏱ 5 分鐘。第二個遊戲是 2.5D 足球射門遊戲：60 秒倒數、空白鍵射門、時間到顯示 FULL TIME!。
一樣要先 Fork，之後的聲音任務都改這個遊戲的 JavaScript。
-->

---

# 🎧 準備聲音檔
<Step n="6" quest="🎵 聲音" />

<div class="cols wide-left">
<div>
  <ol class="steps">
    <li>用 <b>STEP 1</b> 的方法，上傳 <b>2 個</b>聲音檔</li>
    <li>每一個都用<b>下一頁</b>的方法複製網址 🔗</li>
    <li>先把網址<b>貼在記事本</b>裡備用 📝</li>
  </ol>

  <div class="sound-list">
    <div class="card"><span>🎵 背景音樂</span><code>bgm.mp3</code><span class="yellow">你要上傳</span></div>
    <div class="card yellow"><span>⚽ 踢球音效</span><code>kick.wav</code><span class="yellow">你要上傳</span></div>
    <div class="card pink"><span>⏰ 時間到</span><code style="font-size:.7rem">mixkit-arcade-retro-game-over-213.wav</code><span class="green">範例檔</span></div>
  </div>

  <div class="small">🎼 格式用 <b>.mp3</b> 或 <b>.wav</b>；音效要<b>短</b>（1 秒以內最好）</div>

<style>
.sound-list .card { display: grid; grid-template-columns: 8.5rem 1fr 6rem; align-items: center; gap: .5rem; font-size: 1.05rem; padding: .3rem .8rem; margin: .35rem 0; }
</style>
</div>
<div>
  <div class="tag">🔊 先聽聽看</div>
  <SoundPad />
  <div class="small" style="margin-top:.6rem">💡 前兩個是老師用瀏覽器做的「示範聲音」，<br>你要換成自己上傳的檔案。</div>
</div>
</div>

<!--
⏱ 10 分鐘。範例倉庫 LinTzuYu0925/space_shooter 已經有 mixkit 的 wav，「時間到」可以直接用範例網址。
-->

---

# 🔗 複製聲音網址
<Step n="6" quest="🎵 聲音" />

<div class="cols wide-left">
<div class="shot">
  <span class="label tag neon">真實畫面 · 範例倉庫</span>
  <img src="/img/gh-file-audio.png" alt="GitHub file page for the WAV file with the View raw link">
  <div class="hl" style="left:45.8%;top:35.5%;width:8.6%;height:7.6%"></div>
  <div class="hl-note" style="left:38%;top:47%;font-size:1.3rem">🖱️ 在 View raw 上按右鍵</div>
</div>
<div>
  <ol class="steps">
    <li>在檔案清單<b>點你的聲音檔</b></li>
    <li>找到中間的 <b class="neon">View raw</b> 連結</li>
    <li>在 View raw 上按 <b class="pink">右鍵</b></li>
    <li>選 <b class="yellow">複製連結網址</b></li>
  </ol>
  <div class="card green" style="font-size:.95rem">
    ✅ 聲音網址長這樣：<br><code style="font-size:.8rem;word-break:break-all">https://github.com/帳號/倉庫<b class="pink">/raw/refs/heads/</b>main/檔名.wav</code>
  </div>
  <div class="warn" style="font-size:.95rem;margin-top:.5rem">
    ❌ 不要直接點 View raw<br>那樣會<b>下載</b>檔案，不是複製網址
  </div>
</div>
</div>

<!--
⏱ 5 分鐘。聲音檔的頁面沒有預覽，中間只有 View raw 連結。
選單名稱依瀏覽器不同：Chrome「複製連結網址」、Edge「複製連結」。
這個網址 GitHub 會轉到真正的聲音檔（已實測範例 wav：200、audio/wav）。
-->

---

# 🎵 請 AI 加上背景音樂
<Step n="7" quest="🎵 BGM" />

<div class="cols" style="grid-template-columns:11fr 9fr;gap:1rem">
<div>
<PromptBox>
請幫我在下面的 JavaScript 足球射門遊戲加入背景音樂：<br>
1. 音樂網址：<Ph>貼上 bgm 的網址</Ph><br>
2. 音樂要一直重複播放，音量 0.4<br>
3. 用 JavaScript 在「START GAME」按鈕旁邊加一個「🎵 音樂：關」按鈕，按一下播放、再按一下停止（我不想改 HTML）<br>
4. 按過這個按鈕之後，按空白鍵射門時不可以觸發它<br>
請給我「完整」的 JavaScript 程式碼，不要省略任何部分，並告訴我改了哪裡。<br>
<Ph>貼上 JSFiddle 最新的 JavaScript</Ph>
</PromptBox>
  <div class="small" style="margin-top:.5rem">🤫 為什麼要按鈕？瀏覽器規定：玩家<b>先點一下</b>，網頁才能播音樂</div>
</div>
<div class="checks">
  <div class="tag pink">🔍 檢查 AI 有沒有改對</div>
  <ol class="steps">
    <li><code>Ctrl+F</code> 搜尋 <code>new Audio</code><br>網址中間有 <code>/raw/refs/heads/</code></li>
    <li>搜尋 <code>loop</code> → 後面是 <code>true</code> 🔁</li>
    <li>Run → 按按鈕：音樂 <b class="green">開</b>，再按：<b class="pink">關</b></li>
    <li>音樂開著時按空白鍵射門 → 音樂<b>不會</b>被關掉</li>
    <li>START GAME 按鈕<b>還能</b>開始遊戲</li>
  </ol>
</div>
</div>

<!--
⏱ 12 分鐘。要求 AI「用 JavaScript 建立按鈕」，學生就只需要在 JavaScript 一個地方複製貼上。
第 4 點：按鈕被點過會留著焦點，之後按空白鍵可能同時「按」到它。這個遊戲的 keydown 已經對空白鍵 preventDefault()，通常不會出問題，但請 AI 確認比較保險。
-->

---

# ⚽ 請 AI 加上踢球音效
<Step n="8" quest="⚽ 踢球" />

<div class="cols" style="grid-template-columns:11fr 9fr;gap:1rem">
<div>
<PromptBox>
請幫我在下面的 JavaScript 足球射門遊戲加入踢球音效：<br>
1. 音效網址：<Ph>貼上 kick 的網址</Ph><br>
2. 每次真的把球踢出去時都要播放，每次都從頭開始播<br>
3. 球還在飛、或時間到之後按空白鍵，不要有聲音<br>
請給我「完整」的 JavaScript 程式碼，不要省略任何部分，並告訴我改了哪裡。<br>
<Ph>貼上 JSFiddle 最新的 JavaScript</Ph>
</PromptBox>
  <div class="tag" style="margin-top:.8rem">🔊 聽聽看</div>
  <SoundPad only="kick" />
</div>
<div class="checks">
  <div class="tag pink">🔍 檢查 AI 有沒有改對</div>
  <ol class="steps">
    <li><code>Ctrl+F</code> 搜尋 <code>function shoot</code><br>裡面有 <code>.play()</code></li>
    <li>附近有 <code>currentTime = 0</code> ⏪</li>
    <li>Run → START → 射門：<b>每一腳</b>都有聲音</li>
    <li>球還在飛時狂按空白鍵：<b>沒有</b>多的聲音</li>
    <li>音樂按鈕<b>還在</b>、還能用</li>
  </ol>
</div>
</div>

<!--
⏱ 10 分鐘。原始的 shoot() 第一行是 if (!running || gameEnded || ball.moving || shotCooldown > 0) return;
播放音效要放在這行「後面」，第 3 點就會自動成立。
-->

---

# ⏰ 請 AI 加上「時間到」音效
<Step n="9" quest="⏰ 時間到" />

<div class="cols" style="grid-template-columns:11fr 9fr;gap:1rem">
<div>
<PromptBox>
請幫我在下面的 JavaScript 足球射門遊戲加入「時間到」音效：<br>
1. 音效網址：<span style="font-size:.75rem;word-break:break-all">https://github.com/LinTzuYu0925/space_shooter/raw/refs/heads/main/mixkit-arcade-retro-game-over-213.wav</span><br>
2. 60 秒時間到、畫面出現 FULL TIME 的時候播放一次<br>
3. 時間到時，背景音樂要停止<br>
4. 按「PLAY AGAIN」重新開始後，下一次時間到還要能再播放<br>
請給我「完整」的 JavaScript 程式碼，不要省略任何部分，並告訴我改了哪裡。<br>
<Ph>貼上 JSFiddle 最新的 JavaScript</Ph>
</PromptBox>
  <div class="tag pink" style="margin-top:.6rem">🔊 聽聽看（範例檔）</div>
  <SoundPad only="over" />
</div>
<div class="checks">
  <div class="tag pink">🔍 檢查 AI 有沒有改對</div>
  <ol class="steps">
    <li><code>Ctrl+F</code> 搜尋 <code>mixkit</code> → 網址正確</li>
    <li>Run → 開音樂 → START → 等到 <b>FULL TIME</b></li>
    <li>聲音<b>只響一次</b>，不會一直重複</li>
    <li>背景音樂<b>停了</b> 🔇</li>
    <li>按 PLAY AGAIN → 再等時間到 → 聲音<b>又會</b>響</li>
  </ol>
  <div class="small">⏩ 不想等 60 秒？請 AI「先把時間改成 10 秒」，測完再改回來</div>
</div>
</div>

<!--
⏱ 10 分鐘。這個遊戲的 endGame() 第一行是 if (gameEnded) return;，所以只要把 play() 放在這行後面，就只會響一次。
想用自己的音效：把第 1 點換成自己的聲音網址。
-->

---

# ✅ 全部測試一次！

<div class="cols">
<div class="card green check" style="font-size:1.2rem;line-height:1.9">
  <b class="neon">🎵 BGM</b><br>
  ☐ 按按鈕：音樂開始，文字變「開」<br>
  ☐ 再按一次：音樂停止，文字變「關」<br>
  ☐ 音樂結束會自己重新開始 🔁<br>
  <b class="yellow">⚽ 踢球</b><br>
  ☐ 每一腳都有「碰！」
</div>
<div class="card yellow check" style="font-size:1.2rem;line-height:1.9">
  <b class="pink">⏰ 時間到</b><br>
  ☐ FULL TIME：BGM 停止、音效只響一次<br>
  ☐ PLAY AGAIN 後還會再響<br>
  <b class="green">💾 存檔</b><br>
  ☐ 按 ☁️ <b>Save</b>，網址版本變大了<br>
  ☐ 編號是<b>你的</b>，不是 <code>d0svjbn1</code>
</div>
</div>

<div class="center q" style="margin-top:.6rem">全部打勾？給隔壁同學玩玩看，然後交作業！🎮</div>

<!--
⏱ 10 分鐘。讓學生兩兩交換測試，請對方唸出還沒打勾的項目。
-->

---

# 📤 交作業：幫你的遊戲增加音效！
<Step label="HOMEWORK" n="2" quest="📤 交作業" />

<div class="cols" style="grid-template-columns:1fr 1.15fr;gap:1.2rem">
<div>
  <ol class="steps" style="font-size:1.1rem">
    <li>在 JSFiddle 按 <b>☁️ Save</b></li>
    <li>複製<b>網址列</b>的網址<br><span class="small">編號不是 <code>d0svjbn1</code>（老師的足球遊戲）</span></li>
    <li>打開 <b>Google Classroom</b> → 課堂作業<br>→ <b class="green">幫你的遊戲增加音效！</b></li>
    <li>在「你的作業」按 <b class="yellow">＋ 新增或建立</b> → <b class="yellow">連結</b></li>
    <li>貼上 JSFiddle 網址 → 按 <b>新增連結</b></li>
    <li>按藍色 <b class="neon">繳交</b> ✅</li>
  </ol>
  <div class="warn" style="font-size:.95rem">⚠️ 這次交的是<b>足球遊戲</b>的網址，<br>不是第一份作業的太空船網址！</div>
</div>
<div>
  <GcSubmit :step="1" title="幫你的遊戲增加音效！" link="m7p2qz5c/4" />
  <div style="height:1rem"></div>
  <GcSubmit :step="3" title="幫你的遊戲增加音效！" link="m7p2qz5c/4" />
</div>
</div>

<!--
⏱ 5 分鐘。第二份作業交的是 Fork 第二個遊戲（d0svjbn1）之後、加好音效並 Save 的網址。
m7p2qz5c 是示意用的假編號。兩份作業的編號一定不一樣：太空船是一個、足球遊戲是另一個。
-->

---

# 🕵️ 除錯小偵探

<div class="cols" style="font-size:1rem;gap:.8rem">
<div>
  <div class="card pink"><b>① AI 給的程式很短，或寫「其餘不變」</b><br>跟 AI 說：「請給我<b>完整</b>的程式碼，不要省略」</div>
  <div class="card pink"><b>② 按 Run 之後什麼都沒有</b><br>按 F12 → <b>Console</b> → 複製<span class="pink">紅字</span>貼給 AI：<br>「執行後出現這個錯誤，請幫我修好」</div>
  <div class="card pink"><b>③ 上一步改的東西不見了</b><br>你貼了<b>舊的</b>程式碼！複製 JSFiddle <b>最新</b>的再問一次</div>
  <div class="card pink"><b>④ 圖片或聲音沒出來</b><br>網址貼到新分頁測試 · 圖片要有 <code>?raw=true</code>、聲音要有 <code>/raw/refs/heads/</code></div>
</div>
<div>
  <div class="card yellow"><b>⑤ 改壞了，想回到上一版</b><br>在 JavaScript 區按 <code>Ctrl+Z</code> 復原<br>或打開舊版本的網址（把<b>版本數字</b>改小）</div>
  <div class="card yellow"><b>⑥ 音效一直重複</b><br>跟 AI 說：「這個音效一直重複，請讓它只播一次」</div>
  <div class="card yellow"><b>⑦ 按空白鍵，音樂也跟著開關</b><br>跟 AI 說：「按過音樂按鈕後，空白鍵不要觸發按鈕」</div>
  <div class="card yellow"><b>⑧ 剛上傳的檔案找不到</b><br>GitHub 要等 1～5 分鐘才會更新</div>
</div>
</div>

<!--
⏱ 隨時使用。原則：把「你看到的問題」用一句話描述給 AI，比自己猜哪裡錯更快。
⑤ JSFiddle 每次 Save 都會留下一個版本，網址最後的數字改小就能看到之前的版本。
-->

---
layout: center
---

# 🏆 任務完成！挑戰關卡

<div class="cols" style="margin-top:.6rem">
<div>
  <div class="tag">🎓 今天學到的</div>
  <div class="card" style="line-height:1.8">
    ☁️ GitHub 是<b>雲端置物櫃</b><br>
    🔗 檔案網址 = 檔案的<b>地址</b><br>
    🖱️ 圖片按右鍵 · 聲音找 <b class="neon">View raw</b><br>
    🤖 Vibe Coding：<b>說清楚</b> → <b>檢查</b> → <b>試玩</b><br>
    🔢 JSFiddle 網址 = <b>編號</b> / <b>版本</b>
  </div>
</div>
<div>
  <div class="tag green">⭐ 還有時間？請 AI 幫你</div>
  <div class="challenge" style="line-height:1.8">
    🎉 進球時播<b>歡呼聲</b><br>
    🧤 被守門員擋下時播「<b>噢～</b>」<br>
    ⏱️ 最後 10 秒，音樂<b>變快</b><br>
    ⌨️ 按 <b>M</b> 鍵也能開關音樂
  </div>
</div>
</div>

<div class="center big" style="margin-top:1rem;font-size:1.8rem">你的遊戲，現在有<span class="neon">你的樣子</span>和<span class="yellow">你的聲音</span>了！🎉</div>

<!--
⏱ 剩下的時間。每個挑戰都用同樣的流程：上傳檔案 → 複製網址 → 寫清楚的提示給 AI → 檢查 → 試玩 → Save。
-->
