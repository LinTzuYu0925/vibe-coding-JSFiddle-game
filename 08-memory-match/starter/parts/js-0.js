// ===== 記憶翻牌：起始遊戲 =====
// 現在：按「開始」會進入遊戲，牌會洗好排出來。
// 還不會：點牌翻開、比對、算步數、贏或輸。

const board = document.getElementById("board");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

// 6 種 emoji，每種會放兩張
const emojis = ["🐱", "🐶", "🐸", "🦊", "🐼", "🐵"];

// 按了「開始」才是 true
let playing = false;

// 洗牌：把牌的順序打亂（每次都不一樣）
function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

// 排出 12 張蓋著的牌
function buildBoard() {
  board.innerHTML = "";
  const cards = shuffle([...emojis, ...emojis]);
  cards.forEach(function (emoji) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.emoji = emoji;
    card.innerHTML = '<span class="face">' + emoji + "</span>";
    board.appendChild(card);
  });
}

// 按「開始」：關掉開始畫面，開始玩
startBtn.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  playing = true;
});

buildBoard();
