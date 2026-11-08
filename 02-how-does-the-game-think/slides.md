---
theme: default
title: How Does a Game Think?
colorSchema: dark
transition: slide-left
mdc: true
aspectRatio: 16/9
---

# 🧠 How Does a Game Think?

<div class="big">Programming concepts through our Space Shooter</div>

<div class="huge center" style="margin-top:2rem">
<span class="float">🚀</span> <span class="shoot">🔫</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 👾 👾 👾
</div>

---

# 🎮 從我們的遊戲開始

<div class="q">我們的遊戲裡，電腦需要記住什麼？</div>

<div class="row" style="margin-top:2rem">
  <div v-click class="card">⭐ 分數</div>
  <div v-click class="card pink">❤️ 生命</div>
  <div v-click class="card green">🚀 玩家位置</div>
  <div v-click class="card yellow">👾 敵人位置</div>
  <div v-click class="card">🔫 子彈</div>
</div>

---

# 🧩 遊戲的記憶

<div class="row">
  <div class="box"><small>Score</small><b>10</b></div>
  <div class="box"><small>Lives</small><b>❤️❤️❤️</b></div>
  <div class="box"><small>Player X</small><b>225</b></div>
  <div class="box"><small>Enemy Speed</small><b>2</b></div>
</div>

<div v-click class="q" style="margin-top:2.5rem">
如果電腦不記得這些東西，<br>遊戲還能正常運作嗎？ 🤔
</div>

<div v-click class="big center neon" style="margin-top:1rem">不行！所以我們需要…</div>

---

# ① Variable：📦 電腦的記憶盒

<div class="big" style="font-size:2rem">變數 = 一個存放資訊的盒子</div>

<div class="row" style="margin-top:0">
  <div v-click class="box"><small>score</small><b>📦 0</b></div>
  <div v-click class="box"><small>lives</small><b>📦 3</b></div>
  <div v-click class="box"><small>speed</small><b>📦 6</b></div>
</div>

<div class="cols">
<div>

<Loc l="13–14" />

```js {13|14}{lines:true,startLine:13}
let score = 0;
let lives = 3;
```

</div>
<div>

<Loc l="18–24" />

```js {23}{lines:true,startLine:18}
const player = {
  x: 225,
  y: 520,
  width: 50,
  height: 50,
  speed: 6
};
```

</div>
</div>

---

# 📦 變數會改變！

<div class="cols">
<div>

<ScoreDemo />

</div>
<div v-click>

<Loc l="184" />

```js {*}{lines:true,startLine:184}
score++;
```

<div class="yellow" style="font-size:1.2rem">score++ = score 盒子裡的數字加 1</div>

</div>
</div>

<div v-click class="q center" style="margin-top:1.2rem">打敗 3 個敵人，score 會是多少？ <span v-click class="green">3 ！🎉</span></div>

---

# 🎯 Challenge：Hack the Variables

<div class="challenge">

1. 🚀 讓太空船**更快**
2. ❤️ 一開始就有 **5 條命**
3. ⭐ 每個敵人值 **10 分**

</div>

<div class="row" style="margin-top:.8rem">
<div>

<Loc l="23" />

```js {*}{lines:true,startLine:23}
speed: 6
```

</div>
<div>

<Loc l="14 和 381" />

```js {*}{lines:true,startLine:14}
let lives = 3;
```

</div>
<div>

<Loc l="184" />

```js {*}{lines:true,startLine:184}
score++;
```

</div>
</div>

<div class="center" style="font-size:1.2rem">💡 第 381 行「重新開始」也有 <code>lives = 3;</code> · 加 10 分可以試 <code>score = score + 10;</code></div>

<div class="big center yellow">改改看數字，看看會發生什麼事！</div>

---

# 💥 應該發生什麼事？

<div class="huge center"><span class="float">🚀</span> 🔫 → 👾</div>

<div class="q center">子彈打到敵人時，應該發生什麼事？</div>

<div class="row" style="margin-top:1.5rem">
  <div v-click class="card pink">💥 敵人消失</div>
  <div v-click class="card yellow">⭐ 分數增加</div>
  <div v-click class="card green">🔫 子彈消失</div>
</div>

<div v-click class="big center neon" style="margin-top:1rem">遊戲一直在問問題！</div>

---

# ② Condition：❓ 如果……就……

<div class="cols" style="grid-template-columns:2fr 3fr">
<div>
  <div class="card center"><b class="yellow">IF</b> 發生某件事<div class="arrow">↓</div><b class="green">DO</b> 做某件事</div>
  <div v-click class="card pink center">🔫 子彈打到 👾<div class="arrow">↓</div>⭐ 加分</div>
</div>
<div class="cond-code">

<Loc l="182–189" />

```js {182|184|187-188|all}{lines:true,startLine:182}
if (isColliding(bullet, enemy)) {

  score++;
  scoreText.textContent = score;

  bullet.y = -100;
  enemy.y = -100;
}
```

<div style="font-size:1rem">❓ 如果子彈碰到敵人 ➜ ⭐ 加分 ➜ 🔫👾 移出畫面</div>

</div>
</div>

<style>
.cond-code .slidev-code { font-size: .95rem !important; line-height: 1.45 !important; }
</style>

---

# 📜 遊戲規則 = 條件

<div v-click class="card pink">IF 👾 撞到 🚀 &nbsp;➜&nbsp; ❤️ 少 1 條命 &nbsp;<Loc l="197–200" /></div>
<div v-click class="card yellow">IF ❤️ ≤ 0 &nbsp;➜&nbsp; 💀 GAME OVER &nbsp;<Loc l="204–205" /></div>
<div v-click class="card green">IF ⭐ ≥ 10 &nbsp;➜&nbsp; 🏆 YOU WIN &nbsp;<span class="tag">🆕 遊戲裡還沒有！</span></div>

<div v-click class="big center neon" style="margin-top:1.5rem">遊戲規則，變成程式裡的「條件」</div>

---

# 🎯 Challenge：發明一條新規則

<div class="challenge">

<div style="line-height:1.4;padding:.4rem 0">
  <div><b>當</b> ＿＿＿＿ 發生（WHEN）</div>
  <div><b>如果</b> ＿＿＿＿（IF）</div>
  <div><b>就</b> ＿＿＿＿（THEN）</div>
</div>

</div>

<div class="row" style="margin-top:.6rem;font-size:1.2rem;gap:.8rem">
  <div class="card green">⭐ 吃到能量 ➜ 太空船變快</div>
  <div class="card pink">💣 撞到炸彈 ➜ 少 1 條命</div>
  <div class="card yellow">🏆 分數到 20 ➜ 獲勝</div>
</div>

<div class="big center yellow">想好了就叫 AI 幫你做出來！</div>

---

# ⌨️ 電腦怎麼知道？

<div class="row big" style="margin-top:2rem">
  <div class="box"><small>你按下</small><b>⬅️</b></div>
  <div class="huge neon">➜</div>
  <div class="box"><small>太空船</small><b>🚀 ←</b></div>
</div>

<div v-click class="q center" style="margin-top:2rem">電腦怎麼知道你按了按鍵？</div>

<div v-click class="big center neon">Event = 發生了一件事！</div>

---

# ③ Event：⚡ 發生了一件事情

<div class="cols" style="grid-template-columns:2fr 3fr">
<div class="event-cards">
  <div class="card">⌨️ 方向鍵 <span class="yellow">➜</span> 🚀 移動<br><Loc l="38, 61–67" /></div>
  <div v-click class="card pink">🔫 空白鍵 <span class="yellow">➜</span> 💥 發射<br><Loc l="41–43" /></div>
  <div v-click class="card green">🖱️ Restart <span class="yellow">➜</span> 🎮 重來<br><Loc l="378–393" /></div>
</div>
<div class="event-code">

<Loc l="36–45" />

```js {36|38|41-43|all}{lines:true,startLine:36}
document.addEventListener("keydown", function(event) {

  keys[event.key] = true;

  // Shoot
  if (event.code === "Space") {
    shoot();
  }

});
```

<div style="font-size:1rem">👂 一聽到「按下按鍵」⚡ 就執行裡面的程式</div>

</div>
</div>

<style>
h1 { margin-bottom: .5rem !important; }
.event-cards .card { font-size: 1.2rem; padding: .4rem .8rem; margin: .4rem 0; }
.event-code .slidev-code { font-size: .95rem !important; line-height: 1.45 !important; }
</style>

---

# 🎯 Challenge：⬆️ 也能發射！

<div class="cols" style="grid-template-columns:1fr 1fr;align-items:start">
<div>
  <div class="card yellow">⚡ 按 <b>⬆️</b> <span class="yellow">➜</span> 💥 發射</div>
  <div class="tag" style="margin-top:.6rem">🤖 跟 AI 說</div>
  <div class="challenge prompt">
    「請幫我修改太空射擊遊戲：<br>
    按下 <b class="yellow">上方向鍵</b> 時，<br>
    太空船也要 <b class="yellow">發射子彈</b>，<br>
    就像按空白鍵一樣。」
  </div>
</div>
<div>
  <div class="tag">🔍 測試看看</div>
  <div class="card green check">
    ✅ 按 ⬆️ 會發射嗎？<br>
    ✅ 按空白鍵還能發射嗎？<br>
    ✅ ⬅️ ➡️ 還能移動嗎？
  </div>
  <div v-click>
    <div class="tag" style="margin-top:.4rem">💡 AI 可能改了這裡</div>
    <Loc l="41" />

```js {41}{lines:true,startLine:41}
if (event.code === "Space" || event.key === "ArrowUp") {
  shoot();
}
```

  <div style="font-size:1rem"><code>||</code> 的意思是「或者」：空白鍵 <b>或者</b> ⬆️ 都會發射</div>
  </div>
</div>
</div>

<style>
h1 { margin-bottom: .5rem !important; }
.prompt { font-size: 1.25rem; line-height: 1.7; }
.check { font-size: 1.2rem; line-height: 1.8; }
.slidev-code { font-size: .85rem !important; }
</style>

---
layout: center
---

# 🎓 今天學到的

<div class="row" style="margin-top:1rem">
  <div class="card center">📦<br>Variables<br><b class="neon">Remember</b><br>記住</div>
  <div class="card pink center">❓<br>Conditions<br><b class="pink">Decide</b><br>決定</div>
  <div class="card yellow center">⚡<br>Events<br><b class="yellow">React</b><br>反應</div></div>

<div v-click class="big center" style="margin-top:1.5rem">
程式 = 我們告訴電腦遊戲規則的方法 ✨
</div>

---

# 🚀 Become the Game Designer

<div class="cols designer" style="align-items:start">
<div>
  <div class="tag">① 先想好規則</div>
  <div class="card">
    ⚡ 什麼事情發生了？<small>（Event）</small><br>
    ❓ 遊戲要檢查什麼？<small>（Condition）</small><br>
    📦 哪個變數要改變？<small>（Variable）</small>
  </div>
  <div class="tag">③ 小技巧</div>
  <div class="card pink">
    🎯 一次只改 <b>一件事</b><br>
    🎮 改完 <b>先玩玩看</b><br>
    🔁 不對？告訴 AI <b>哪裡怪怪的</b>
  </div>
</div>
<div>
  <div class="tag">② 跟 AI 說</div>
  <div class="challenge">
    <b>步驟 1</b> ➕ 「請加一個 <span class="yellow">＿＿＿</span>」<br>
    <b>步驟 2</b> ❓ 「當 <span class="yellow">＿＿＿</span> 的時候，<br>
    &emsp;&emsp;&emsp;&emsp;就讓 <span class="yellow">＿＿＿</span> 改變」 <small>📦</small>
  </div>
  <div v-click class="card green">
    <b>例如：</b><br>
    <b>1.</b> 「請加一個會往下掉的 ⭐ 速度道具。」<br>
    <b>2.</b> 「當太空船碰到它的時候，<br>
    &emsp;&ensp;就讓太空船的速度加 3。」<br>
    <span class="yellow">❓ 「當…的時候」就是 <code>if</code>！</span>
  </div>
</div>
</div>

<div class="big center yellow" style="font-size:1.8rem;margin-top:.4rem">現在，叫 AI 把你的規則做出來！ 🤖</div>

<style>
h1 { margin-bottom: .5rem !important; }
.designer { font-size: 1.15rem; line-height: 1.6; }
.designer .card, .designer .challenge { margin: .3rem 0 .6rem; padding: .5rem 1rem; }
.designer small { opacity: .7; font-size: .85rem; }
</style>
