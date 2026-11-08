---
theme: default
title: 從瑪利歐到完整的足球遊戲
info: |
  國小程式課（2 小時）：用 Super Mario Bros. 學「完整遊戲」的設計，再用 AI 一步一步把足球遊戲加上開始畫面、勝利、Game Over 和重新開始。
colorSchema: light
layout: default
transition: slide-left
mdc: true
aspectRatio: 16/9
fonts:
  provider: none
---

# ⚽ 今天，我們要讓足球遊戲變成真正的遊戲！

<div class="cols wide-left" style="align-items:center;margin-top:2rem">
<div>
  <div class="big">從 <span class="blue">瑪利歐</span> 學設計，<br>讓 <span class="orange">AI</span> 幫我們寫程式</div>
  <div class="row" style="justify-content:flex-start;margin-top:1.5rem;gap:.6rem;font-size:1.15rem">
    <span class="stage start">🏁 開始</span>
    <span class="stage play">⚽ 遊戲中</span>
    <span class="stage win">🏆 勝利</span>
    <span class="stage lose">💥 Game Over</span>
  </div>
  <p class="small" style="margin-top:1.5rem">國小 Vibe Coding 課 · 2 小時 · JSFiddle + AI</p>
</div>
<div class="shot"><span class="label tag zh play">實際截圖：我們的起點</span><img src="/img/real-playing.png" /></div>
</div>

<!--
⏱ 2 分鐘（Part A 共 15 分鐘）。
開場：「上次我們讓足球遊戲動起來。今天要讓它變成一個『真的遊戲』——有開始、有贏、有輸、可以再玩。」
右邊是用原始足球遊戲真實截圖（public/img/real-playing.png）。
-->

---

# 🗺️ 今天的路線圖：一步一步改我們的遊戲

<div style="display:flex;align-items:stretch;gap:.5rem;margin-top:.6rem">
  <div style="flex:1">
    <div class="tag zh" style="background:#4a5875">起點 · 15 分鐘</div>
    <ScreenMock kind="now" small />
    <div class="small" style="margin-top:.5rem;line-height:1.35">能玩，但<b>沒有開始畫面、沒有輸贏</b></div>
  </div>
  <div class="big soft" style="align-self:center">→</div>
  <div style="flex:1">
    <div class="tag zh start">STEP 1 · 25 分鐘</div>
    <ScreenMock kind="start" small />
    <div class="small" style="margin-top:.5rem;line-height:1.35"><b class="blue">開始畫面</b><br>遊戲先等你按「開始」</div>
  </div>
  <div class="big soft" style="align-self:center">→</div>
  <div style="flex:1.7">
    <div class="tag zh lose">STEP 2 · 35 分鐘</div>
    <div style="display:flex;gap:.3rem"><div style="flex:1"><ScreenMock kind="win" small /></div><div style="flex:1"><ScreenMock kind="over" small /></div></div>
    <div class="small" style="margin-top:.5rem;line-height:1.35"><b class="orange">勝利</b> / <b class="red">Game Over</b><br>＋ 可以重新開始</div>
  </div>
  <div class="big soft" style="align-self:center">→</div>
  <div style="flex:1">
    <div class="tag zh win">STEP 3 · 25 分鐘</div>
    <ScreenMock kind="mine" small />
    <div class="small" style="margin-top:.5rem;line-height:1.35"><b class="orange">我的版本</b><br>自己選一個改變</div>
  </div>
</div>

<div class="card orange center" style="margin-top:1.1rem;font-size:1.25rem"><b>每一步都一樣：</b>看目標 → 照步驟做 → 問 AI → 檢查有沒有做到。　<span class="small">（最後有 20 分鐘緩衝）</span></div>

<!--
⏱ 3 分鐘。這是整堂課的地圖，老師和學生都先看懂這一頁。
・起點：現在的足球遊戲能玩，但沒有真正的開始畫面，也沒有「贏」。
・STEP 1：加開始畫面。STEP 2：加勝利／Game Over／重新開始。STEP 3：學生選一個自己的改變。
・每一個 STEP 都有四類投影片：目標（會變成什麼樣子）→ 步驟（我要做什麼）→ Prompt（要問 AI 的話）→ 檢查（怎麼知道做對了）。
・畫面皆為示意圖，不是真的遊戲截圖。
・總時間：起點 15 + STEP1 25 + STEP2 35 + STEP3 25 = 100，緩衝 20 分鐘。
-->

---

# 🎮 什麼讓一個遊戲「好玩」又「完整」？

<div class="q" style="margin-top:2rem;font-size:2.3rem">想一想：你最愛的遊戲是什麼？</div>

<div class="row" style="margin-top:2.6rem;flex-wrap:nowrap;gap:.9rem">
  <div v-click class="card blue big" style="font-size:1.55rem;padding:1.2rem .9rem;margin:0;flex:1;text-align:center">它怎麼<b>開始</b>？</div>
  <div v-click class="card green big" style="font-size:1.55rem;padding:1.2rem .9rem;margin:0;flex:1;text-align:center">你要<b>做什麼</b>？</div>
  <div v-click class="card orange big" style="font-size:1.55rem;padding:1.2rem .9rem;margin:0;flex:1;text-align:center">怎樣算<b>贏</b>？</div>
  <div v-click class="card red big" style="font-size:1.55rem;padding:1.2rem .9rem;margin:0;flex:1;text-align:center">輸了<b>怎麼辦</b>？</div>
</div>

<div v-click class="center soft" style="margin-top:2.6rem;font-size:1.5rem">請 3 位同學說說看，老師把答案和這四個問題連起來。</div>

<!--
⏱ 2 分鐘。讓學生舉手說喜歡的遊戲。每個答案都問：「它怎麼開始？怎樣算贏？輸了會怎樣？」
點擊逐步出現四個問題，這就是今天的主軸，也對應路線圖的 STEP 1（開始）、STEP 2（贏、輸）。
-->

---

# 🍄 看看 Super Mario Bros.：它在「教」你玩

<div style="padding:0 11rem"><MarioLevel /></div>

<div class="row" style="margin-top:1.1rem;gap:.5rem;font-size:1.05rem;line-height:1.35">
  <div class="card blue center" style="flex:1;margin:0;padding:.4rem .5rem"><span class="stage start">1</span><br><b>開始</b><br>標題畫面，按開始</div>
  <div class="card green center" style="flex:1;margin:0;padding:.4rem .5rem"><span class="stage play">2</span><br><b>玩</b><br>走、跳、頂方塊，馬上有回應</div>
  <div class="card red center" style="flex:1;margin:0;padding:.4rem .5rem"><span class="stage lose">3</span><br><b>挑戰</b><br>敵人和坑洞</div>
  <div class="card orange center" style="flex:1;margin:0;padding:.4rem .5rem"><span class="stage win">4</span><br><b>目標</b><br>走到終點旗桿</div>
  <div class="card red center" style="flex:1;margin:0;padding:.4rem .5rem"><span class="stage lose">5</span><br><b>失敗再來</b><br>掉進坑裡 → 再試一次</div>
</div>

<div class="center soft" style="margin-top:.8rem;font-size:1.1rem">沒有人唸說明書，但你知道要往哪裡走、什麼會受傷、怎樣過關。<b>這就是遊戲設計！</b></div>

<!--
⏱ 3 分鐘。圖是原創示意圖（不是任何遊戲的截圖），只用來指出五個設計重點。
問學生：「第一次玩馬力歐，沒人教你，你怎麼知道要往右走？」（因為右邊有路、有東西，畫面在引導）
重點：Mario 用「畫面」教玩家，我們的遊戲也需要清楚的開始、目標和結果。
提醒：不使用 Nintendo 的圖片或角色。
-->

---

# 🔁 遊戲的四個階段，對應我們的足球遊戲

<div class="row" style="margin-top:.6rem;flex-wrap:nowrap;align-items:stretch;gap:.6rem">
  <div class="card blue center" style="flex:1;margin:0"><div style="font-size:2.4rem">🏁</div><b class="blue">開始 Start</b><div class="small">Mario：標題畫面</div><div style="margin-top:.4rem;font-size:1rem">⚽ <b>開始畫面</b><br>標題、說明、開始按鈕</div><div class="tag zh start" style="margin-top:.4rem">STEP 1</div></div>
  <div class="card green center" style="flex:1;margin:0"><div style="font-size:2.4rem">⚽</div><b class="green">玩 Play</b><div class="small">Mario：走、跳、躲敵人</div><div style="margin-top:.4rem;font-size:1rem">⚽ 移動、射門<br>躲<b>守門員和防守球員</b><br>看<b>時間和進球數</b></div><div class="tag zh play" style="margin-top:.4rem">已經有了</div></div>
  <div class="card orange center" style="flex:1;margin:0"><div style="font-size:2.4rem">🏆</div><b class="orange">贏 Win</b><div class="small">Mario：碰到旗桿</div><div style="margin-top:.4rem;font-size:1rem">⚽ 進球數 <b>≥ 5</b><br>顯示勝利畫面</div><div class="tag zh win" style="margin-top:.4rem">STEP 2</div></div>
  <div class="card red center" style="flex:1;margin:0"><div style="font-size:2.4rem">💥</div><b class="red">輸 Lose</b><div class="small">Mario：失去生命</div><div style="margin-top:.4rem;font-size:1rem">⚽ 時間到、沒達標<br>顯示 <b>Game Over</b></div><div class="tag zh lose" style="margin-top:.4rem">STEP 2</div></div>
</div>

<div class="center" style="margin-top:.9rem"><span class="stage play">↻ 再玩一次：回到「玩」，分數、時間、球員全部歸零（STEP 2）</span></div>

<div class="center big" style="margin-top:.8rem;font-size:1.5rem">好遊戲 ＝ <span class="orange">目標</span> ＋ <span class="orange">回饋</span> ＋ <span class="orange">轉場</span> ＋ <span class="orange">想再玩的理由</span></div>

<div class="small center" style="margin-top:.3rem">「5 球」是設計師的選擇，你可以改成 3 球或 8 球！（STEP 3）</div>

<!--
⏱ 3 分鐘。這四個顏色會在整堂課一直出現：藍＝開始、綠＝玩、橘＝勝利、紅＝輸。
左邊寫 Mario 的例子，下面寫足球遊戲要做的事，右下角標籤告訴學生哪一步會做到它。
遊戲設計概念對照：開始畫面＝標題＋說明＋按鈕；遊戲過程＝移動／射門／躲避；HUD＝剩餘時間＋進球數；挑戰＝守門員＋防守球員；勝利＝達到目標分數；Game Over＝時間到；重玩＝全部重來；下一關（選修）＝更多防守球員或更快的守門員。
-->

---

# ⚽ 我們的足球遊戲現在是這樣

<div class="cols wide-left" style="align-items:center">
<div class="shot">
  <span class="label tag zh play">實際截圖（原始遊戲，尚未修改）</span>
  <img src="/img/real-before-start.png" />
  <div class="note" style="top:41%;left:34%">只有 GET READY!</div>
  <div class="note" style="top:90%;left:5%">按鈕藏在球場下面</div>
</div>
<div style="font-size:1.1rem">
  <div class="card green" style="margin-top:0"><b>✅ 已經有</b><br>移動、射門、守門員、防守球員、分數、60 秒</div>
  <div class="card red"><b>❓ 還缺</b>
    <ul style="margin:.2rem 0 0 1.2rem;line-height:1.55">
      <li>像樣的開始畫面 <span class="tag zh start">STEP 1</span></li>
      <li>要進幾球才算贏 <span class="tag zh win">STEP 2</span></li>
      <li>勝利畫面、Game Over <span class="tag zh win">STEP 2</span></li>
      <li>重新開始 <span class="tag zh win">STEP 2</span></li>
    </ul>
  </div>
</div>
</div>

<!--
⏱ 3 分鐘。這是用真實的原始遊戲（index-jsfiddle-d0svjbn1-0.html）以 Playwright 截的圖。
讓學生先自己說「少了什麼」，再對應到路線圖：缺開始畫面 → STEP 1；缺輸贏與重玩 → STEP 2。
現在的 "START GAME" 按鈕在球場下方，沒有標題與目標說明；時間到只顯示得分，沒有「贏」的概念。
-->

---

# ✏️ 先設計，再寫程式：填寫「遊戲計畫卡」

<Step n="0" kind="規劃" actor="me" />

<div class="cols wide-left" style="margin-top:.3rem;align-items:center">
<div>
  <StateFlow :code-names="false" />
</div>
<div style="font-size:1.1rem">
  <div class="tag zh" style="margin-bottom:.3rem">📝 你的計畫卡（寫在紙上）</div>
  <div class="card blue" style="margin:.25rem 0;padding:.3rem .8rem">① 遊戲名字：<b>足球大師</b> <span class="small">（可以換）</span></div>
  <div class="card blue" style="margin:.25rem 0;padding:.3rem .8rem">② 時間：<b>60</b> 秒</div>
  <div class="card orange" style="margin:.25rem 0;padding:.3rem .8rem">③ 目標：進 <b>5</b> 球 <span class="small">（可以改）</span></div>
  <div class="card orange" style="margin:.25rem 0;padding:.3rem .8rem">④ 贏：進球數 <b>≥ 5</b></div>
  <div class="card red" style="margin:.25rem 0;padding:.3rem .8rem">⑤ 輸：時間到，進球數 <b>&lt; 5</b></div>
</div>
</div>

<div class="center" style="margin-top:.4rem;font-size:1.15rem">左圖是遊戲的<b>地圖</b>。先想清楚，AI 才不會猜錯。<b class="orange">寫完 5 行，舉手給老師看，再進入 STEP 1。</b></div>

<!--
⏱ 3 分鐘（Part A 累計 15 分鐘）。這是學生的第一個動作：在紙上寫下計畫卡的 5 行（名字、時間、目標球數、贏、輸）。
老師先在白板手畫一次流程：開始畫面 → 遊戲中 → 勝利／Game Over → 重新開始。
「5 球」是設計選擇：太簡單會無聊，太難會生氣。學生可以改成 3 球或自己的名字，後面的 Prompt 把數字換成自己的就行。
-->

---

# 🏁 STEP 1 目標：讓遊戲先等你按「開始」

<Step n="1" kind="目標" actor="all" />

<div style="display:flex;align-items:center;gap:.8rem;margin-top:.4rem">
  <div style="flex:1"><ScreenMock kind="now" label="現在" /></div>
  <div class="big soft">→</div>
  <div style="flex:1.25"><ScreenMock kind="start" numbered label="STEP 1 完成" /></div>
</div>

<div class="row" style="margin-top:1rem;gap:.7rem;align-items:stretch;font-size:1.05rem">
  <div class="card blue" style="flex:1;margin:0"><b>完成時你會看到</b><br>① 標題 ② 目標 ③ 操作說明 ④ 開始按鈕</div>
  <div class="card green" style="flex:1;margin:0"><b>按「開始」之前</b><br>球員不能動、不能射門、時間不跑</div>
  <div class="card orange" style="flex:1;margin:0"><b>按「開始」之後</b><br>和原來一樣好玩，時間才開始倒數</div>
</div>

<div class="small" style="margin-top:.5rem">左：現在的遊戲　右：我們要做出來的樣子（皆為<b>示意圖</b>，不是真的截圖）</div>

<!--
⏱ 3 分鐘。先講「目標」再講怎麼做。指著右圖四個編號：標題、目標、操作、按鈕，這就是 Mario 的「標題畫面」。
重點三句：開始前不能動 → 按開始 → 才開始玩、才倒數。
-->

---

# 📋 STEP 1 步驟：照著做 6 件事

<Step n="1" kind="步驟" actor="me" />

<div class="cols" style="margin-top:.3rem;grid-template-columns:1.3fr 1fr">
<div style="font-size:1.3rem">
  <ol class="steps">
    <li><b>存一份</b>：在 JSFiddle 按 <b>Fork</b>，這一版是你的「Step 1」</li>
    <li><b>複製</b>：到下一頁，按 Prompt 的「📋 複製」</li>
    <li><b>貼給 AI</b>：貼上，送出</li>
    <li><b>讀計畫</b>：AI 有說「要改哪些函式與變數」嗎？不是整個重寫？</li>
    <li><b>貼上程式</b>：照 AI 說的，貼到 HTML / CSS / JavaScript</li>
    <li><b>按 Run</b>：畫面和上一頁右圖一樣嗎？</li>
  </ol>
</div>
<div>
  <div class="card blue" style="margin-top:0"><b>🚦 這一步只要懂一件事：遊戲狀態</b>
    <div style="font-size:1rem;margin:.3rem 0">現在是「menu」還是「playing」，決定<b>什麼可以做</b>。</div>

```js
let gameState = "menu";
// 按下開始按鈕後：
// gameState = "playing";
```

  </div>
  <div class="small">你的遊戲原本用 <code>running</code> 當開關，AI 可能沿用它，也沒關係。</div>
</div>
</div>

<!--
⏱ 4 分鐘（老師示範第 1–3 步，全班照做）。JSFiddle 的 HTML / CSS / JavaScript 是三個窗格，AI 可能要你改不只一個，提醒學生每個窗格都要貼對位置。
第 4 步很重要：要求 AI「先說要改哪些函式與變數」，學生才知道 AI 動了什麼；若 AI 想重寫整個遊戲，請它「不要重寫，只改必要的地方」。
右邊的程式碼是示意（語法正確，但沒有在你的遊戲裡實際執行過）。
-->

---

# 🤖 STEP 1 Prompt：複製這段話給 AI

<Step n="1" kind="Prompt" actor="me" />

<div class="cols wide-left" style="margin-top:.2rem">
<PromptBox title="🤖 Prompt A：開始畫面">

<p>請先閱讀我目前的 HTML、CSS 和 JavaScript 程式碼，幫我加入一個遊戲開始畫面。</p>
<p>需求：</p>
<ol>
<li>顯示遊戲標題『足球大師』。</li>
<li>顯示操作說明：方向鍵或 WASD 移動，空白鍵射門。</li>
<li>顯示開始按鈕。</li>
<li>遊戲開始前，角色不能移動、不能射門，倒數計時也不能開始。</li>
<li>按下開始按鈕後，才正式開始遊戲。</li>
<li>保留原本的球員移動、射門、守門員、防守球員和進球機制。</li>
<li>不要直接重寫整個遊戲。請先指出需要修改的函式與變數，再提供修改方式。</li>
</ol>
<p>完成後，請解釋每一項修改的用途。</p>

</PromptBox>
<div style="font-size:1.02rem;line-height:1.4">
  <div class="tiny" style="margin:.1rem 0 .3rem">好 Prompt 的四個部分：</div>
  <div class="card blue" style="margin:.3rem 0"><b>① 加什麼</b><br>需求 1–3：標題、說明、按鈕</div>
  <div class="card green" style="margin:.3rem 0"><b>② 怎麼動</b><br>需求 4–5：開始前不能動</div>
  <div class="card red" style="margin:.3rem 0"><b>③ 不能弄壞</b><br>需求 6–7：保留原本玩法</div>
  <div class="card orange" style="margin:.3rem 0"><b>④ 怎麼檢查</b><br>「解釋每項修改」＋下一頁清單</div>
</div>
</div>

<!--
⏱ 12 分鐘（含學生操作）。示範：老師全程投影，點「📋 複製」→ 貼到 AI。
把標題「足球大師」換成你計畫卡上的名字也可以。
引導學生看 AI 的第一個回覆：它有列出要修改的函式與變數嗎？有沒有想重寫整個遊戲？
每個 AI 寫出來的程式都會不同，不要期待和老師的畫面一模一樣；只要通過下一頁的檢查就算成功。
-->

---

# ✅ STEP 1 檢查：你做到了嗎？

<Step n="1" kind="檢查" actor="me" />

<div class="cols" style="margin-top:.3rem;grid-template-columns:1.25fr 1fr">
<div>
<ul class="check" style="font-size:1.3rem">
  <li>打開遊戲，<b>會停在開始畫面</b>嗎？</li>
  <li>按「開始」<b>之前</b>，球員能移動嗎？（應該不能）</li>
  <li>按「開始」<b>之前</b>，空白鍵能射門嗎？（應該不能）</li>
  <li>倒數計時是在按「開始」<b>之後</b>才跑嗎？</li>
  <li>按「開始」後，移動、射門、守門員還正常嗎？</li>
</ul>
<div class="card green" style="font-size:1.05rem;margin-top:.5rem">🎉 5 項都打勾 → <b>STEP 1 完成！</b>　進入 STEP 2</div>
</div>
<div>
  <div style="display:flex;gap:.4rem;align-items:center"><div style="flex:1"><ScreenMock kind="start" small label="按之前" /></div><div class="soft big" style="font-size:1.4rem">→</div><div style="flex:1"><ScreenMock kind="play" small label="按之後" /></div></div>
  <div class="card orange" style="margin-top:.6rem;font-size:1rem"><b>🪲 壞掉了？這樣告訴 AI：</b>
    <div style="line-height:1.45;margin-top:.2rem">
    ❌ 「壞了，幫我修好」<br>
    ✅ 「我還沒按開始，按空白鍵球就飛出去了。請在遊戲開始前，讓空白鍵無效。」
    </div>
    <div class="small" style="margin-top:.2rem">＝ 我做了什麼 ＋ 看到什麼 ＋ 我期待什麼</div>
  </div>
</div>
</div>

<!--
⏱ 6 分鐘（Step 1 累計 25 分鐘）。
原始遊戲的 running 開關本來就讓球員在按開始前不能動，這是「保留原本行為」的好範例：AI 改完以後要檢查它有沒有被弄壞。
讓學生兩兩互相檢查，用打勾的方式逐項測。卡關的學生：回到 JSFiddle 的上一個版本重新開始。
-->

---

# 🏆 STEP 2 目標：有輸、有贏、可以再玩

<Step n="2" kind="目標" actor="all" />

<div style="display:flex;align-items:center;gap:.5rem;margin-top:.4rem">
  <div style="flex:1"><ScreenMock kind="play" label="遊戲中" /></div>
  <div class="big soft" style="font-size:1.6rem">→</div>
  <div style="flex:1"><ScreenMock kind="win" label="進 5 球" /></div>
  <div class="big soft" style="font-size:1.6rem">或</div>
  <div style="flex:1"><ScreenMock kind="over" label="時間到" /></div>
</div>
<div class="center" style="margin:.5rem 0 .2rem"><span class="stage play">↻ 按「再玩一次」→ 回到遊戲中，一切歸零</span></div>

<div class="row" style="margin-top:.6rem;gap:.6rem;font-size:1.05rem;align-items:stretch">
  <div class="card blue" style="flex:1;margin:0;padding:.4rem .8rem">⏱ 時間 <b>60 秒</b></div>
  <div class="card orange" style="flex:1;margin:0;padding:.4rem .8rem">🎯 目標 <b>5 球</b></div>
  <div class="card green" style="flex:1.2;margin:0;padding:.4rem .8rem">進球 <b>≥ 5</b> → <b>勝利</b></div>
  <div class="card red" style="flex:1.4;margin:0;padding:.4rem .8rem">時間到、沒達標 → <b>Game Over</b></div>
</div>

<div class="small" style="margin-top:.5rem">三張都是<b>示意圖</b>。對照現在：時間到只出現兩行疊在一起的字，也不知道算贏還是輸。</div>

<!--
⏱ 4 分鐘。先講規則（與計畫卡相同）：時間 60 秒、目標 5 球；≥5 勝利，否則 Game Over。
真實的原始遊戲在時間到時，HTML 的「TIME UP!」和 canvas 畫的「FULL TIME!」會疊在一起（public/img/real-full-time.png 可投影給學生看）。
問：贏和輸的感覺應該一樣嗎？勝利要讓人開心、想再玩；Game Over 要說清楚原因，並讓人立刻能再試。
-->

---

# 📋 STEP 2 步驟：照著做，再懂一個重點

<Step n="2" kind="步驟" actor="me" />

<div class="cols" style="margin-top:.2rem;grid-template-columns:1fr 1.15fr">
<div style="font-size:1.25rem">
  <ol class="steps">
    <li><b>確認</b>：Step 1 的遊戲能正常玩</li>
    <li><b>存一份</b>：按 <b>Fork</b>，這一版是「Step 2」</li>
    <li><b>複製 Prompt B</b>（下一頁）貼給 AI</li>
    <li><b>讀計畫</b>：AI 列出要改的函式與變數了嗎？</li>
    <li><b>貼上程式</b>，按 <b>Run</b></li>
    <li><b>玩一局</b>，進到「勝利」或「Game Over」</li>
  </ol>
</div>
<div class="tight">
  <div class="card red" style="margin-top:0;padding:.4rem .8rem"><b>🔒 結束只能做一次</b>，結束後什麼都不能動

```js
function finishGame(won) {
  if (gameState !== "playing") return;
  gameState = won ? "victory" : "gameover";
}
```

  </div>
  <div class="card green" style="padding:.4rem .8rem"><b>↻ 重來要全部歸零</b>

```js
function resetGame() {
  score = 0;
  timeLeft = GAME_SECONDS;
  ball.moving = false;
  // …球員、守門員、防守球員也放回起點
  gameState = "playing";
}
```

  </div>
</div>
</div>

<!--
⏱ 5 分鐘。右邊兩段程式碼是「示意」，語法正確但沒有在你的遊戲裡實際執行；AI 會用不同的名字，只要規則做對。
GAME_SECONDS 是 60 的常數（原始遊戲直接寫 60）。
原始遊戲的 endGame() 一開頭就用 gameEnded 擋住重複結束，resetGame() 已重設 score、timeLeft、elapsed、shotCooldown、goalFlash、球、球員、守門員、防守球員；AI 新增「目標分數、關卡」等變數時，要記得也加進 reset。
-->

---

# 🤖 STEP 2 Prompt：複製這段話給 AI

<Step n="2" kind="Prompt" actor="me" />

<PromptBox title="🤖 Prompt B：勝利 + Game Over + 重新開始">

<p>請在我現有的足球遊戲中加入勝利和 Game Over 機制。</p>
<p>需求：</p>
<ol style="columns:2;column-gap:1.4rem">
<li>遊戲時間為 60 秒。</li>
<li>進球數達到 5 球時，顯示勝利畫面。</li>
<li>時間歸零且未達到 5 球時，顯示 Game Over。</li>
<li>遊戲結束後，角色不能移動、不能射門，球也不能繼續造成新的進球。</li>
<li>結束畫面要顯示最後得分。</li>
<li>加入重新開始按鈕。</li>
<li>重新開始時，分數、時間、球的位置、球員位置、守門員、防守球員和遊戲狀態都必須正確重設。</li>
<li>保留原有的遊戲機制與視覺風格。</li>
</ol>
<p>請先檢查原始程式碼，列出準備修改的函式與變數，再實作。最後提供測試清單。</p>

</PromptBox>

<div class="row" style="margin-top:.7rem;gap:.7rem;font-size:.95rem">
  <div class="card blue" style="flex:1;margin:0"><b>① 加什麼</b>：需求 2、3、5、6</div>
  <div class="card green" style="flex:1;margin:0"><b>② 怎麼動</b>：需求 1、4</div>
  <div class="card red" style="flex:1;margin:0"><b>③ 不能弄壞</b>：需求 7、8</div>
  <div class="card orange" style="flex:1;margin:0"><b>④ 怎麼檢查</b>：最後的測試清單</div>
</div>

<!--
⏱ 12 分鐘（含學生操作）。建議流程：複製 Prompt → 貼給 AI → 一起讀 AI 列出的「準備修改的函式與變數」→ 貼上程式 → 玩一局。
如果 AI 的回覆很長：請學生先找出「它說要改哪些函式」，確認沒有整個重寫。
目標球數若在計畫卡上改成 3 球，把 Prompt 裡的「5 球」換成自己的數字。
-->

---

# 🧪 STEP 2 檢查：像遊戲開發者一樣測試

<Step n="2" kind="檢查" actor="me" />

<div style="margin-top:.2rem;font-size:1.08rem">

| ☐ | 測試 | 怎麼做 | 應該看到 |
|---|---|---|---|
| ☐ | 🏆 測試贏 | 進 5 球（可暫時把目標改成 1） | 勝利畫面＋最後得分 |
| ☐ | 💥 測試輸 | 不做事等時間到（可暫時改成 10 秒） | Game Over＋最後得分 |
| ☐ | 🧊 結束後亂按 | 方向鍵、空白鍵 | 什麼都不會動 |
| ☐ | ↻ 重新開始 | 按重新開始 | 分數 0、時間重來、球員回原位 |
| ☐ | 🔁 連續重來 | 連續重來 3 次 | 每次都一樣正常 |

</div>

<div class="row" style="margin-top:.6rem;gap:.7rem;align-items:stretch">
  <div class="card green" style="flex:1.2;margin:0;font-size:1.05rem">🛠️ <b>小技巧：測試時暫時把數字改小</b>（60 秒 → 10 秒，5 球 → 1 球），<b>測完要改回來！</b></div>
  <div class="card orange" style="flex:1;margin:0;font-size:1.05rem">🎉 5 項都打勾 → <b>STEP 2 完成！</b></div>
</div>

<!--
⏱ 8 分鐘。這是真正的測試時間：兩兩一組，一人操作、一人勾選。
特別提醒測完要把暫時改小的數字改回來（常見的遺忘）。
有問題就看下一頁的「壞掉了怎麼辦」。
-->

---

# 🪲 STEP 2 壞掉了？對照症狀，告訴 AI

<Step n="2" kind="檢查" actor="me" />

<div class="compact" style="margin-top:.2rem">

| 你看到 | 可能的原因 | 這樣告訴 AI |
|---|---|---|
| ⏱ 結束後，時間還在跑 | 結束時沒有停止計時 | 「遊戲結束後，倒數計時必須停止。」 |
| 🏃 結束後球員還能動、能射門 | 移動和射門沒檢查狀態 | 「只有在遊戲進行中，球員才能移動和射門。」 |
| 🔁 勝利畫面一直重複、分數一直加 | 結束處理重複執行 | 「結束只能處理一次，之後不能再進球。」 |
| 📉 重來後分數沒歸零 | reset 漏掉變數 | 「重新開始時，分數、時間、球、球員、守門員、防守球員、遊戲狀態都要重設。」 |
| 🏁 還沒按開始，時間就在倒數 | 計時器在開始畫面就跑了 | 「按下開始之後，才可以開始倒數。」 |

</div>

<div class="card blue center" style="margin-top:.6rem;font-size:1.1rem">每次只告訴 AI <b>一個</b>問題：<b>我做了什麼 ＋ 看到什麼 ＋ 我期待什麼</b></div>

<!--
⏱ 6 分鐘（Step 2 累計 35 分鐘）。
這五個症狀的共同原因：遊戲「結束」只是改了畫面，沒有讓其他部分（計時、移動、射門、球）一起停下來，或重來時漏掉某個變數。
讓學生猜原因，再對照右欄。
-->

---

# 🎨 STEP 3 目標：做一個「你的」版本

<Step n="3" kind="目標" actor="me" />

<div class="cols" style="grid-template-columns:1fr 1.5fr;margin-top:.3rem;align-items:start">
<div>
  <ScreenMock kind="mine" label="例：海灘主題 · 3 球" />
  <div class="small" style="margin-top:.5rem">示意圖：這位同學把名字、顏色、目標球數改成自己的。</div>
</div>
<div style="font-size:1.02rem">
  <div class="tag zh" style="margin-bottom:.2rem">任務：從下面選 <b>1 個</b>，完成後再選下一個</div>
  <div class="card green" style="margin:.3rem 0;padding:.3rem .8rem"><b>🎯 3 球就贏</b> → 畫面顯示「進球 x/3」，進 3 球就勝利</div>
  <div class="card red" style="margin:.3rem 0;padding:.3rem .8rem"><b>🧤 更快的守門員</b> → 守門員更難被射進</div>
  <div class="card blue" style="margin:.3rem 0;padding:.3rem .8rem"><b>🎨 新標題和主題</b> → 名字、顏色、背景是你的</div>
  <div class="card" style="margin:.3rem 0;padding:.3rem .8rem"><b>🔊 倒數或勝利音效</b>（選修）→ 開始、勝利時有聲音</div>
  <div class="card orange" style="margin:.3rem 0;padding:.3rem .8rem"><b>⭐ 第二關（挑戰）</b> → 過關畫面 →「進入第二關」</div>
</div>
</div>

<!--
⏱ 3 分鐘。建議：較慢的同學 → 3 球就贏、改標題與主題；中等 → 更快的守門員、音效；較快的同學 → 第二關（Prompt C 在下下頁）。
原則：先做一件事，做完、測過，再做第二件。
-->

---

# ✍️ STEP 3 步驟：寫出你自己的 Prompt

<Step n="3" kind="步驟" actor="me" />

<div class="cols" style="margin-top:.3rem;grid-template-columns:1fr 1.1fr">
<div style="font-size:1.1rem">
  <ol class="steps">
    <li><b>選</b> 1 個改變</li>
    <li><b>寫</b> Prompt：填右邊四格</li>
    <li><b>問</b> AI，讀它的計畫</li>
    <li><b>貼上</b>、按 Run</li>
    <li><b>測</b>：下一頁的清單</li>
  </ol>
  <div class="warn small" style="margin-top:.5rem">🚫 不要只說「讓遊戲更好玩」。要說「好玩」是什麼。</div>
</div>
<div style="font-size:1.0rem">
  <div class="card blue" style="margin:.3rem 0;padding:.35rem .8rem"><b>① 加什麼？</b>　我想加 <span class="orange">＿＿＿＿＿</span></div>
  <div class="card green" style="margin:.3rem 0;padding:.35rem .8rem"><b>② 怎麼運作？</b>　規則是 <span class="orange">＿＿＿＿＿</span></div>
  <div class="card red" style="margin:.3rem 0;padding:.35rem .8rem"><b>③ 不能弄壞什麼？</b>　請保留 <span class="orange">＿＿＿＿＿</span></div>
  <div class="card orange" style="margin:.3rem 0;padding:.35rem .8rem"><b>④ 怎麼檢查？</b>　我會測 <span class="orange">＿＿＿＿＿</span></div>
  <div class="small" style="margin-top:.3rem">例：「我想加『3 球就贏』。進 3 球顯示勝利。請保留原本的 Game Over 和重新開始。我會測：進 3 球會贏嗎？」</div>
</div>
</div>

<!--
⏱ 7 分鐘。學生用右邊四格寫自己的 Prompt；老師巡視，看 Prompt 有沒有四個部分。常見問題：只寫了①。請他們補上③和④。
範例句只是示範，每個學生的改變不同。
-->

---

# ⭐ STEP 3 挑戰範例：第二關的 Prompt

<Step n="3" kind="Prompt" actor="me" />

<div class="cols" style="margin-top:.2rem;grid-template-columns:1.5fr 1fr">
<PromptBox title="🤖 Prompt C（選修）：第二關">

<p>請在目前的足球遊戲加入第二關。</p>
<p>需求：</p>
<ol>
<li>第一關進 3 球即可過關。</li>
<li>通過第一關後，顯示過關畫面和『進入第二關』按鈕。</li>
<li>第二關需要進 5 球。</li>
<li>第二關的守門員速度更快。</li>
<li>進入下一關時，正確重設每關的計時、分數或關卡進度，並保留必要的總進度。</li>
<li>不要破壞原有的移動、射門和碰撞機制。</li>
</ol>
<p>請先說明如何管理關卡狀態，再逐步修改程式碼。</p>

</PromptBox>
<div style="font-size:1.02rem;line-height:1.4">
  <div class="card blue" style="margin:0 0 .4rem"><b>① 加什麼</b><br>需求 1–3：過關畫面和第二關</div>
  <div class="card green" style="margin:.4rem 0"><b>② 怎麼動</b><br>需求 3–5：5 球、更快、重設</div>
  <div class="card red" style="margin:.4rem 0"><b>③ 不能弄壞</b><br>需求 6：移動、射門、碰撞</div>
  <div class="card orange" style="margin:.4rem 0"><b>④ 怎麼檢查</b><br>先說明關卡狀態，再逐步改</div>
  <div class="small">這個比較難，可以分兩步：先做「第一關過關畫面」，再做「第二關更難」。</div>
</div>
</div>

<!--
⏱ 給較快的同學使用（併入 STEP 3 的 7 分鐘動手時間）。這是「怎麼把想法寫清楚」的示範：四個部分一個都沒少。
注意：關卡是比較難的功能，AI 一次可能做不好，請學生分成「先做關卡狀態，再做第二關的難度」兩步。
-->

---

# ✅ STEP 3 檢查：找夥伴試玩

<Step n="3" kind="檢查" actor="me" />

<div class="cols" style="margin-top:.3rem">
<div>
  <div class="tag zh play" style="margin-bottom:.4rem">試玩（7 分鐘）：一人玩，一人檢查</div>
  <div class="card green" style="font-size:1.05rem;margin-top:.2rem">
    <ul class="check" style="font-size:1.05rem;margin:0">
      <li>你改的東西<b>看得到</b>嗎？</li>
      <li>有開始畫面嗎？</li>
      <li>勝利和 Game Over 都出得來嗎？</li>
      <li>重新開始會歸零嗎？</li>
      <li>有東西壞掉嗎？</li>
    </ul>
  </div>
  <div class="small">寫下 1 個「很棒」＋ 1 個「可以更好」</div>
</div>
<div>
  <div class="card orange" style="font-size:1.05rem;margin-top:2.1rem"><b>🪲 壞掉了？</b>用這一句問 AI：<br><b>我做了什麼 ＋ 看到什麼 ＋ 我期待什麼</b></div>
  <div class="card blue" style="font-size:1.05rem"><b>↩ 實在修不好？</b>回到 JSFiddle 的上一個版本（Step 2），再試一次。</div>
</div>
</div>

<!--
⏱ 7 分鐘。試玩者玩、檢查者勾選；交換角色。
重點：不只檢查自己改的功能，也要確認原本的開始、勝利、Game Over、重玩沒有被弄壞。
-->

---

# 🎤 發表與回顧：你今天完成了什麼？

<Step n="3" kind="發表" actor="all" />

<div class="cols" style="margin-top:.3rem">
<div>
  <div class="tag zh win" style="margin-bottom:.4rem">發表（8 分鐘）</div>
  <div class="card orange" style="font-size:1.15rem">
    <ol class="steps" style="margin:0">
      <li>你<b>改了什麼</b>？</li>
      <li>什麼<b>壞掉</b>了？</li>
      <li>你怎麼<b>修好</b>它？</li>
    </ol>
  </div>
</div>
<div>
  <div class="tag zh" style="margin-bottom:.4rem">今天的路線圖：全部完成 ✔</div>
  <div style="font-size:1.1rem;line-height:1.9">
    <span class="stage start">✔ 開始畫面</span><br>
    <span class="stage win">✔ 勝利 / Game Over</span><br>
    <span class="stage lose">✔ 重新開始</span><br>
    <span class="stage play">✔ 我的版本</span>
  </div>
</div>
</div>

<div class="center big" style="font-size:1.5rem;margin-top:.8rem">🎉 你不只是在玩遊戲，你<span class="orange">設計</span>了一個遊戲！</div>

<!--
⏱ 8 分鐘（STEP 3 累計 25 分鐘；其餘 20 分鐘為機動緩衝：JSFiddle 或 AI 卡關、延長動手或發表）。
發表請 4–5 位自願者（或每組 1 位），每人約 1–2 分鐘。重點是「壞掉了怎麼修」的故事，不只是展示成果。
結尾回到四階段：「你今天的遊戲有開始、玩、贏、輸、再玩，完整了！」
-->
