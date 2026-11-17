// ===== 問答闖關：救援 3（STEP 3 完成：三顆愛心、失敗、再玩一次）=====

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

// 現在是第幾題（從 0 開始數）、答對幾題、剩幾顆愛心
let current = 0;
let score = 0;
let hearts = maxHearts;

// 答完一題要等 1 秒：等的時候按答案沒有反應
let waiting = false;

// 更新上方的分數和愛心
function updateTop() {
  scoreText.textContent = score;
  heartsText.textContent = "❤️".repeat(hearts) + "🤍".repeat(maxHearts - hearts);
}

// 把第 current 題放到畫面上
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

// 按一個答案：比一比對不對
function checkAnswer(btn) {
  if (waiting) return;                       // 正在等 1 秒、或遊戲結束了：不理它
  waiting = true;
  const q = questions[current];

  if (btn.textContent === q.answer) {        // 答對了
    btn.classList.add("correct");
    score = score + 1;
    feedback.textContent = "✔ 答對了！";
    feedback.className = "good";
  } else {                                   // 答錯了：少一顆愛心，正確答案亮綠色
    btn.classList.add("wrong");
    answerButtons.forEach(function (b) {
      if (b.textContent === q.answer) b.classList.add("correct");
    });
    hearts = hearts - 1;
    feedback.textContent = "✘ 答錯了，答案是「" + q.answer + "」";
    feedback.className = "bad";
  }
  updateTop();

  setTimeout(nextQuestion, 1000);            // 等 1 秒再往下走
}

// 下一題；愛心用完就輸，題目做完就過關
function nextQuestion() {
  if (hearts <= 0) {
    loseScreen.classList.remove("hidden");
    return;                                  // waiting 還是 true：結束後按答案沒反應
  }
  current = current + 1;
  if (current < questions.length) {
    waiting = false;
    showQuestion();
  } else {
    showWin();
  }
}

// 過關畫面：9–10 分 3 顆星，6–8 分 2 顆，其他 1 顆
function showWin() {
  let n = 1;
  if (score >= 9) n = 3;
  else if (score >= 6) n = 2;
  stars.textContent = "⭐".repeat(n);
  winText.textContent = "你答對了 " + score + " 題！";
  winScreen.classList.remove("hidden");
}

// 開新的一局：回到第 1 題，分數歸零，愛心回到 3 顆
function startGame() {
  current = 0;
  score = 0;
  hearts = maxHearts;
  waiting = false;
  updateTop();
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

// 按「開始」
startBtn.addEventListener("click", startGame);

// 按「再玩一次」（過關畫面和失敗畫面各有一個）
document.querySelectorAll(".againBtn").forEach(function (btn) {
  btn.addEventListener("click", startGame);
});

updateTop();
showQuestion();
