// ===== 問答闖關：挑戰 C 範例（🗺️ 冒險地圖：走到關卡才答題，四步都做完）=====

/*QUESTIONS*/

// ===== 地圖（資料）=====
// 🧙 = 玩家起點　1 2 3 = 三個關卡 🏰　# = 樹 🌲（不能走）　G = 寶箱 🎁（+1 顆愛心）　. = 空地
const mapRows = [
  "P..#....",
  ".#.#.1#.",
  ".#...#..",
  "..##.#.2",
  "...G.##.",
  "3#......",
];
// 每一關考哪幾題（從 0 開始數）：第 1 關考第 1–3 題，第 2 關第 4–6 題，第 3 關第 7–10 題
const stages = { "1": [0, 1, 2], "2": [3, 4, 5], "3": [6, 7, 8, 9] };

// ===== 遊戲規則 =====
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("loseScreen");
const quiz = document.getElementById("quiz");
const questionText = document.getElementById("question");
const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const scoreText = document.getElementById("score");
const heartsText = document.getElementById("hearts");
const feedback = document.getElementById("feedback");
const stars = document.getElementById("stars");
const winText = document.getElementById("winText");
const answerButtons = document.querySelectorAll(".answer");
const brand = document.querySelector(".brand");   // 左上角的標題

const maxHearts = 3;

let score = 0;
let hearts = maxHearts;
let waiting = false;
let px = 0, py = 0;          // 玩家在第幾格（左右 x、上下 y）
let stage = "";              // 現在在哪一關（"" = 在地圖上走）
let stageList = [];          // 這一關的題號
let stageStep = 0;           // 這一關答到第幾題
let done = {};               // 哪幾關過了
let chestTaken = false;

// ===== 地圖畫面：用 JavaScript 做出來，跟題目區輪流出現 =====
const mapBox = document.createElement("div");
mapBox.id = "map";
mapBox.style.cssText = "padding:16px 22px;text-align:center;";
const mapGrid = document.createElement("div");
mapGrid.style.cssText = "display:inline-grid;grid-template-columns:repeat(8,52px);gap:3px;";
const mapMsg = document.createElement("div");
mapMsg.style.cssText = "margin-top:12px;font-size:20px;font-weight:900;color:#ffe45e;min-height:30px;";
mapBox.appendChild(mapGrid);
mapBox.appendChild(mapMsg);
quiz.before(mapBox);

function cellAt(x, y) {
  return mapRows[y][x];
}

function drawMap() {
  mapGrid.innerHTML = "";
  for (let y = 0; y < mapRows.length; y++) {
    for (let x = 0; x < mapRows[y].length; x++) {
      const c = cellAt(x, y);
      const cell = document.createElement("div");
      cell.style.cssText = "height:52px;display:flex;align-items:center;justify-content:center;" +
        "font-size:32px;border-radius:8px;background:#21436b;";
      let face = "";
      if (c === "#") { face = "🌲"; cell.style.background = "#173a2a"; }
      if (c === "G" && !chestTaken) face = "🎁";
      if (stages[c]) face = done[c] ? "✅" : "🏰";
      if (x === px && y === py) face = "🧙";
      cell.textContent = face;
      mapGrid.appendChild(cell);
    }
  }
}

// 顯示地圖（藏起題目）
function showMap(msg) {
  stage = "";
  brand.textContent = "🗺️ 冒險地圖";
  quiz.style.display = "none";
  mapBox.style.display = "block";
  mapMsg.textContent = msg;
  drawMap();
}

// 方向鍵走一格：不能走出地圖、不能穿過樹
document.addEventListener("keydown", function (e) {
  const moves = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
  if (!moves[e.key]) return;
  e.preventDefault();                          // 方向鍵不要捲動網頁
  if (stage !== "" || !startScreen.classList.contains("hidden")) return;
  if (!winScreen.classList.contains("hidden") || !loseScreen.classList.contains("hidden")) return;
  const nx = px + moves[e.key][0];
  const ny = py + moves[e.key][1];
  if (ny < 0 || ny >= mapRows.length || nx < 0 || nx >= mapRows[0].length) return;
  if (cellAt(nx, ny) === "#") return;
  px = nx;
  py = ny;
  stepOn(cellAt(px, py));
});

// 走到某一格會發生什麼事
function stepOn(c) {
  if (c === "G" && !chestTaken) {             // 寶箱：+1 顆愛心
    chestTaken = true;
    if (hearts < maxHearts) hearts = hearts + 1;
    updateTop();
    showMap("🎁 打開寶箱：愛心 +1！");
    return;
  }
  if (stages[c] && !done[c]) {                 // 還沒過的關卡：開始答題
    startStage(c);
    return;
  }
  drawMap();
}

function startStage(c) {
  stage = c;
  stageList = stages[c];
  stageStep = 0;
  waiting = false;
  brand.textContent = "🏰 第 " + c + " 關";
  mapBox.style.display = "none";
  quiz.style.display = "block";
  showQuestion();
}

function updateTop() {
  scoreText.textContent = score;
  heartsText.textContent = "❤️".repeat(hearts) + "🤍".repeat(maxHearts - hearts);
}

function showQuestion() {
  const q = questions[stageList[stageStep]];
  qNum.textContent = stageStep + 1;
  qTotal.textContent = stageList.length;
  questionText.textContent = q.question;
  feedback.textContent = "";
  feedback.className = "";
  answerButtons.forEach(function (btn, i) {
    btn.textContent = q.choices[i];
    btn.classList.remove("correct", "wrong");
  });
}

function checkAnswer(btn) {
  if (waiting || stage === "") return;
  waiting = true;
  const q = questions[stageList[stageStep]];

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
  stageStep = stageStep + 1;
  if (stageStep < stageList.length) {
    waiting = false;
    showQuestion();
    return;
  }
  // 這一關答完了：變成 ✅，回到地圖
  done[stage] = true;
  if (Object.keys(done).length === Object.keys(stages).length) {
    showWin();
  } else {
    showMap("🏰 第 " + stage + " 關過了！去找下一個 🏰");
  }
}

function showWin() {
  let n = 1;
  if (score >= 9) n = 3;
  else if (score >= 6) n = 2;
  stars.textContent = "⭐".repeat(n);
  winText.textContent = "三關都過了！你答對了 " + score + " 題";
  winScreen.classList.remove("hidden");
}

// 開新的一局：回到起點，關卡和寶箱都恢復
function startGame() {
  score = 0;
  hearts = maxHearts;
  waiting = false;
  done = {};
  chestTaken = false;
  for (let y = 0; y < mapRows.length; y++) {
    const x = mapRows[y].indexOf("P");
    if (x >= 0) { px = x; py = y; }
  }
  updateTop();
  startScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  loseScreen.classList.add("hidden");
  showMap("用方向鍵走到 🏰 開始闖關");
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
showMap("用方向鍵走到 🏰 開始闖關");
