// ===== /*TITLE*/ =====
/*STATUS*/

/*MAPS*/

// ===== 遊戲規則 =====
const board = document.getElementById("board");
const message = document.getElementById("message");
const levelNum = document.getElementById("levelNum");
const levelTotal = document.getElementById("levelTotal");
const keyStat = document.getElementById("keyStat");
const energyText = document.getElementById("energy");
const startScreen = document.getElementById("startScreen");
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("loseScreen");
const winText = document.getElementById("winText");

// 每一關開始時有幾點體力（測試時可以先改成 3）
const maxEnergy = 40;

// 遊戲現在的樣子
let level = 0;          // 第幾關（從 0 開始數）
let grid = [];          // 這一關的地圖，grid[y][x] 是一個字，例如 "#"
let px = 0;             // 玩家在第幾欄 x（從 0 開始數）
let py = 0;             // 玩家在第幾排 y（從 0 開始數）
let hasKey = false;     // 有沒有鑰匙
let energy = maxEnergy; // 剩幾點體力
let playing = false;    // 遊戲正在進行嗎

// 載入第 n 關：把 maps[n] 的文字變成 grid，找到 P 放玩家
function loadMap(n) {
  level = n;
  grid = maps[n].map(function (row) {
    return row.split("");
  });
  hasKey = false;
  energy = maxEnergy;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "P") {
        px = x;
        py = y;
        grid[y][x] = ".";      // 起點變成地板
      }
    }
  }
  showMessage("");
  drawMap();
  updateTop();
}

// 把 grid 畫到畫面上：每個字畫成一格
function drawMap() {
  board.innerHTML = "";
  board.style.gridTemplateColumns = "repeat(" + grid[0].length + ", 1fr)";
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      const c = grid[y][x];
      if (c === "#") tile.classList.add("wall");
      if (c === "E") { tile.classList.add("exit"); tile.textContent = "🏁"; }
      if (c === "K") tile.textContent = "🔑";
      if (c === "D") { tile.classList.add("door"); tile.textContent = "🚪"; }
      if (x === px && y === py) { tile.classList.add("player"); tile.textContent = "🧑"; }
      board.appendChild(tile);
    }
  }
}

// 更新上方的第幾關、鑰匙、體力
function updateTop() {
  levelNum.textContent = level + 1;
  levelTotal.textContent = maps.length;
  keyStat.textContent = hasKey ? "有" : "沒有";
  energyText.textContent = energy;
}

// 在地圖下面顯示一句話（空字串就是清掉）
function showMessage(text) {
  message.textContent = text;
}

/*MOVE*/

// 過關：顯示勝利畫面
function winGame() {
  playing = false;
  winScreen.classList.remove("hidden");
}

// 輸了：顯示失敗畫面
function loseGame() {
  playing = false;
  loseScreen.classList.remove("hidden");
}

// 開新的一局：回到第 1 關
function startGame() {
  loadMap(0);
  playing = true;
  startScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  loseScreen.classList.add("hidden");
}

// 鍵盤方向鍵（要先用滑鼠點一下遊戲視窗）
document.addEventListener("keydown", function (e) {
  if (!playing) return;
  if (e.key === "ArrowUp") { e.preventDefault(); movePlayer(0, -1); }
  if (e.key === "ArrowDown") { e.preventDefault(); movePlayer(0, 1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); movePlayer(-1, 0); }
  if (e.key === "ArrowRight") { e.preventDefault(); movePlayer(1, 0); }
});

// 畫面上的四個方向按鈕（用滑鼠點）
document.getElementById("btnUp").addEventListener("click", function () { if (playing) movePlayer(0, -1); });
document.getElementById("btnDown").addEventListener("click", function () { if (playing) movePlayer(0, 1); });
document.getElementById("btnLeft").addEventListener("click", function () { if (playing) movePlayer(-1, 0); });
document.getElementById("btnRight").addEventListener("click", function () { if (playing) movePlayer(1, 0); });

// 按「開始」和「再玩一次」
document.getElementById("startBtn").addEventListener("click", startGame);
document.querySelectorAll(".againBtn").forEach(function (btn) {
  btn.addEventListener("click", startGame);
});

// 一打開網頁就先畫出第 1 關
loadMap(0);
