// ===== 問答闖關：起始遊戲 =====
// 現在：按「開始」會出現題目，按任何一個答案就跳到下一題。
// 還不會：說對錯、加分、星星、扣愛心、贏或輸。

/*QUESTIONS*/

// ===== 遊戲規則 =====
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const questionText = document.getElementById("question");
const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const answerButtons = document.querySelectorAll(".answer");

// 現在是第幾題（從 0 開始數）
let current = 0;

// 把第 current 題放到畫面上
function showQuestion() {
  const q = questions[current];
  qNum.textContent = current + 1;
  qTotal.textContent = questions.length;
  questionText.textContent = q.question;
  answerButtons.forEach(function (btn, i) {
    btn.textContent = q.choices[i];
  });
}

// 按一個答案：現在只會跳到下一題
answerButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    current = current + 1;
    if (current < questions.length) {
      showQuestion();
    } else {
      current = 0;
      showQuestion();   // 題目做完了，又從第 1 題開始
    }
  });
});

// 按「開始」：關掉開始畫面
startBtn.addEventListener("click", function () {
  startScreen.classList.add("hidden");
});

showQuestion();
