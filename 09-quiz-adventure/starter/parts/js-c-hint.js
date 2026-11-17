// ===== 問答闖關：挑戰 A 範例（💡 提示道具：刪掉兩個錯的答案）=====

/*QUESTIONS*/

// ===== 遊戲規則 =====
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("loseScreen");
const questionText = document.getElementById("question");
const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const scoreText = document.getElementById("score");
const heartsText = document.getElementById("hearts");
const feedback = document.getElementById("feedback");
const stars = document.getElementById("stars");
const winText = document.getElementById("winText");
const answerButtons = document.querySelectorAll(".answer");

// 一開始有幾顆愛心（測試時可以先改成 1）
const maxHearts = 3;
// 一局可以用幾次提示
const maxHints = 2;

let current = 0;
let score = 0;
let hearts = maxHearts;
let hints = maxHints;
let waiting = false;

// 提示按鈕：用 JavaScript 做出來，放在四個答案下面
const hintBtn = document.createElement("button");
hintBtn.id = "hintBtn";
hintBtn.style.cssText = "display:block;margin:14px auto 0;padding:8px 22px;font-size:20px;font-weight:900;" +
  "color:#10182b;background:#ffe45e;border:none;border-radius:999px;cursor:pointer;";
document.getElementById("answers").after(hintBtn);

function updateHintBtn() {
  hintBtn.textContent = "💡 刪掉兩個錯的（剩 " + hints + " 次）";
  hintBtn.disabled = hints <= 0;
  hintBtn.style.opacity = hints <= 0 ? "0.4" : "1";
}

// 按提示：藏起兩個錯的答案
function useHint() {
  if (waiting || hints <= 0) return;
  const q = questions[current];
  let hidden = 0;
  answerButtons.forEach(function (btn) {
    if (hidden < 2 && btn.textContent !== q.answer) {
      btn.style.visibility = "hidden";
      hidden = hidden + 1;
    }
  });
  hints = hints - 1;
  updateHintBtn();
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
    btn.style.visibility = "visible";          // 新的一題：四個答案都回來
  });
}

function checkAnswer(btn) {
  if (waiting) return;
  waiting = true;
  const q = questions[current];

  if (btn.textContent === q.answer) {
    btn.classList.add("correct");
    score = score + 1;
    feedback.textContent = "✔ 答對了！";
    feedback.className = "good";
  } else {
    btn.classList.add("wrong");
    answerButtons.forEach(function (b) {
      if (b.textContent === q.answer) b.classList.add("correct");
    });
    hearts = hearts - 1;
    feedback.textContent = "✘ 答錯了，答案是「" + q.answer + "」";
    feedback.className = "bad";
  }
  updateTop();
  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  if (hearts <= 0) {
    loseScreen.classList.remove("hidden");
    return;
  }
  current = current + 1;
  if (current < questions.length) {
    waiting = false;
    showQuestion();
  } else {
    showWin();
  }
}

function showWin() {
  let n = 1;
  if (score >= 9) n = 3;
  else if (score >= 6) n = 2;
  stars.textContent = "⭐".repeat(n);
  winText.textContent = "你答對了 " + score + " 題！";
  winScreen.classList.remove("hidden");
}

function startGame() {
  current = 0;
  score = 0;
  hearts = maxHearts;
  hints = maxHints;                            // 提示次數也回來
  waiting = false;
  updateTop();
  updateHintBtn();
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
hintBtn.addEventListener("click", useHint);
startBtn.addEventListener("click", startGame);
document.querySelectorAll(".againBtn").forEach(function (btn) {
  btn.addEventListener("click", startGame);
});

updateTop();
updateHintBtn();
showQuestion();
