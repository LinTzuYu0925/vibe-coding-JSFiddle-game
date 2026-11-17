// ===== 問答闖關：挑戰 B 範例（🐉 魔王對決：血條、攻擊、生氣）=====

/*QUESTIONS*/

// ===== 遊戲規則 =====
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("loseScreen");
const loseText = document.getElementById("loseText");
const questionText = document.getElementById("question");
const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const scoreText = document.getElementById("score");
const heartsText = document.getElementById("hearts");
const feedback = document.getElementById("feedback");
const stars = document.getElementById("stars");
const winText = document.getElementById("winText");
const answerButtons = document.querySelectorAll(".answer");
const game = document.getElementById("game");

const maxHearts = 3;     // 我的愛心
const bossMaxHp = 7;     // 魔王有幾滴血（測試時可以先改成 2）

let current = 0;
let score = 0;
let hearts = maxHearts;
let bossHp = bossMaxHp;
let waiting = false;

// ===== 魔王：用 JavaScript 做出來，放在題目上面 =====
const bossBox = document.createElement("div");
bossBox.style.cssText = "display:flex;align-items:center;gap:14px;margin-bottom:8px;";
const bossFace = document.createElement("div");
bossFace.style.cssText = "font-size:58px;line-height:1;transition:transform .2s;";
const bossRight = document.createElement("div");
bossRight.style.cssText = "flex:1;";
const bossName = document.createElement("div");
bossName.style.cssText = "font-weight:900;font-size:18px;color:#ffa8a8;";
const bossBarBack = document.createElement("div");
bossBarBack.style.cssText = "height:18px;margin-top:6px;background:#0b1222;border:2px solid #ffa8a8;border-radius:9px;overflow:hidden;";
const bossBar = document.createElement("div");
bossBar.style.cssText = "height:100%;background:linear-gradient(90deg,#ff6b6b,#ffa94d);transition:width .3s;";
bossBarBack.appendChild(bossBar);
bossRight.appendChild(bossName);
bossRight.appendChild(bossBarBack);
bossBox.appendChild(bossFace);
bossBox.appendChild(bossRight);
document.getElementById("quiz").prepend(bossBox);

// 魔王剩一半血以下就生氣
function bossAngry() {
  return bossHp <= bossMaxHp / 2;
}

function updateBoss() {
  bossFace.textContent = bossAngry() ? "👹" : "🐉";
  bossName.textContent = (bossAngry() ? "魔王生氣了！" : "魔王") + "　血 " + bossHp + " / " + bossMaxHp;
  bossBar.style.width = (bossHp / bossMaxHp * 100) + "%";
}

// 晃一下（CSS 已經有 class "shake"）
function shake(el) {
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
}

// 魔王攻擊：遊戲外框閃紅光，魔王變成 🔥
function bossAttack() {
  bossFace.style.transform = "scale(1.4)";
  game.style.background = "#5a1620";
  game.style.borderColor = "#ff3b3b";
  bossFace.textContent = "🔥";
  setTimeout(function () {
    bossFace.style.transform = "scale(1)";
    game.style.background = "";
    game.style.borderColor = "";
    updateBoss();
  }, 500);
}

function updateTop() {
  scoreText.textContent = score;
  heartsText.textContent = "❤️".repeat(hearts) + "🤍".repeat(maxHearts - hearts);
}

function showQuestion() {
  const q = questions[current];
  qNum.textContent = current + 1;
  qTotal.textContent = questions.length;
  questionText.textContent = q.question;
  feedback.textContent = "";
  feedback.className = "";
  answerButtons.forEach(function (btn, i) {
    btn.textContent = q.choices[i];
    btn.classList.remove("correct", "wrong");
  });
}

function checkAnswer(btn) {
  if (waiting) return;
  waiting = true;
  const q = questions[current];

  if (btn.textContent === q.answer) {          // 答對：打魔王一下
    btn.classList.add("correct");
    score = score + 1;
    bossHp = bossHp - 1;
    shake(bossFace);
    feedback.textContent = "⚔️ 打中魔王！";
    feedback.className = "good";
    updateBoss();
  } else {                                     // 答錯：魔王攻擊我
    btn.classList.add("wrong");
    answerButtons.forEach(function (b) {
      if (b.textContent === q.answer) b.classList.add("correct");
    });
    hearts = hearts - 1;
    feedback.textContent = "🔥 魔王攻擊！答案是「" + q.answer + "」";
    feedback.className = "bad";
    bossAttack();
  }
  updateTop();
  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  if (hearts <= 0) {
    loseText.textContent = "魔王贏了，再試一次吧！";
    loseScreen.classList.remove("hidden");
    return;
  }
  if (bossHp <= 0) {                           // 魔王沒血了：過關
    showWin();
    return;
  }
  current = current + 1;
  if (current < questions.length) {
    waiting = false;
    showQuestion();
  } else {                                     // 題目用完，魔王還有血：魔王逃走了
    loseText.textContent = "題目用完了，魔王逃走了！";
    loseScreen.classList.remove("hidden");
  }
}

function showWin() {
  let n = 1;
  if (hearts >= 3) n = 3;
  else if (hearts === 2) n = 2;
  stars.textContent = "⭐".repeat(n);
  winText.textContent = "你打倒魔王了！還剩 " + hearts + " 顆愛心";
  winScreen.classList.remove("hidden");
}

function startGame() {
  current = 0;
  score = 0;
  hearts = maxHearts;
  bossHp = bossMaxHp;
  waiting = false;
  updateTop();
  updateBoss();
  showQuestion();
  startScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  loseScreen.classList.add("hidden");
}

answerButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    checkAnswer(btn);
  });
});
startBtn.addEventListener("click", startGame);
document.querySelectorAll(".againBtn").forEach(function (btn) {
  btn.addEventListener("click", startGame);
});

updateTop();
updateBoss();
showQuestion();
