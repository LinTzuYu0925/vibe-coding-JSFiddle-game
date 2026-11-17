// ===== 問答闖關：救援 2（STEP 2 完成：答對答錯的回饋、分數、星星）=====

/*QUESTIONS*/

// ===== 遊戲規則 =====
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const winScreen = document.getElementById("winScreen");
const questionText = document.getElementById("question");
const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const scoreText = document.getElementById("score");
const feedback = document.getElementById("feedback");
const stars = document.getElementById("stars");
const winText = document.getElementById("winText");
const answerButtons = document.querySelectorAll(".answer");

// 現在是第幾題（從 0 開始數）、答對幾題
let current = 0;
let score = 0;

// 答完一題要等 1 秒：等的時候按答案沒有反應
let waiting = false;

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
  if (waiting) return;                       // 正在等 1 秒：不理它
  waiting = true;
  const q = questions[current];

  if (btn.textContent === q.answer) {        // 答對了
    btn.classList.add("correct");
    score = score + 1;
    scoreText.textContent = score;
    feedback.textContent = "✔ 答對了！";
    feedback.className = "good";
  } else {                                   // 答錯了：正確答案亮綠色
    btn.classList.add("wrong");
    answerButtons.forEach(function (b) {
      if (b.textContent === q.answer) b.classList.add("correct");
    });
    feedback.textContent = "✘ 答錯了，答案是「" + q.answer + "」";
    feedback.className = "bad";
  }

  setTimeout(nextQuestion, 1000);            // 等 1 秒，下一題
}

// 下一題；題目做完就過關
function nextQuestion() {
  waiting = false;
  current = current + 1;
  if (current < questions.length) {
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

answerButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    checkAnswer(btn);
  });
});

// 按「開始」：關掉開始畫面
startBtn.addEventListener("click", function () {
  startScreen.classList.add("hidden");
});

showQuestion();
