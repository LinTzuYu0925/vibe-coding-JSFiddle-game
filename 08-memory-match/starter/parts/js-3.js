// ===== 記憶翻牌：救援 3（STEP 3 完成：步數、勝利、失敗、再玩一次）=====

const board = document.getElementById("board");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("loseScreen");
const movesText = document.getElementById("moves");
const maxMovesText = document.getElementById("maxMoves");

// 6 種 emoji，每種會放兩張
const emojis = ["🐱", "🐶", "🐸", "🦊", "🐼", "🐵"];

// 最多可以走幾步（測試時可以先改成 3）
const maxMoves = 20;

// 按了「開始」才是 true
let playing = false;

// 遊戲要記住：第一張翻開的牌；是不是正在等 1 秒
let firstCard = null;
let waiting = false;

// 走了幾步、配對成功幾對
let moves = 0;
let pairsFound = 0;

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

// 更新上方的「步數 0 / 20」
function updateMoves() {
  movesText.textContent = moves;
  maxMovesText.textContent = maxMoves;
}

// 點一張牌：翻開它，翻到第二張就比一比
function flipCard(card) {
  if (!playing || waiting) return;                 // 還沒開始、或正在等 1 秒：不能翻
  if (card.classList.contains("flipped")) return;  // 已經翻開：不理它
  card.classList.add("flipped");

  if (firstCard === null) {                        // 這是第一張：先記住
    firstCard = card;
    return;
  }

  const secondCard = card;                         // 這是第二張：算一步，比一比
  moves = moves + 1;
  updateMoves();

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");            // 一樣：留著
    secondCard.classList.add("matched");
    firstCard = null;
    pairsFound = pairsFound + 1;
    if (pairsFound === emojis.length) {
      endGame(winScreen);                          // 全部配對：贏了
    } else if (moves >= maxMoves) {
      endGame(loseScreen);                         // 步數用完：輸了
    }
  } else {
    waiting = true;                                // 不一樣：等 1 秒再蓋回去
    setTimeout(function () {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      waiting = false;
      if (moves >= maxMoves) {
        endGame(loseScreen);                       // 步數用完：輸了
      }
    }, 1000);
  }
}

// 遊戲結束：停下來，顯示勝利或失敗畫面
function endGame(screen) {
  playing = false;
  screen.classList.remove("hidden");
}

// 開新的一局：步數歸零、重新洗牌
function startGame() {
  moves = 0;
  pairsFound = 0;
  firstCard = null;
  waiting = false;
  updateMoves();
  buildBoard();
  startScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  loseScreen.classList.add("hidden");
  playing = true;
}

// 按「開始」
startBtn.addEventListener("click", startGame);

// 按「再玩一次」（勝利畫面和失敗畫面各有一個）
document.querySelectorAll(".againBtn").forEach(function (btn) {
  btn.addEventListener("click", startGame);
});

updateMoves();
buildBoard();
