// ===== 記憶翻牌：救援 1（STEP 1 完成：點一下就翻牌）=====

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
    card.addEventListener("click", function () {
      flipCard(card);
    });
    board.appendChild(card);
  });
}

// 點一張牌：翻開它
function flipCard(card) {
  if (!playing) return;                            // 還沒按開始：不能翻
  if (card.classList.contains("flipped")) return;  // 已經翻開：不理它
  card.classList.add("flipped");
}

// 按「開始」：關掉開始畫面，開始玩
startBtn.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  playing = true;
});

buildBoard();
