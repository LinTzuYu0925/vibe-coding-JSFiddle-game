// ===== 記憶翻牌：救援 2（STEP 2 完成：翻兩張，比一比）=====

const board = document.getElementById("board");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

// 6 種 emoji，每種會放兩張
const emojis = ["🐱", "🐶", "🐸", "🦊", "🐼", "🐵"];

// 按了「開始」才是 true
let playing = false;

// 遊戲要記住：第一張翻開的牌；是不是正在等 1 秒
let firstCard = null;
let waiting = false;

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

// 點一張牌：翻開它，翻到第二張就比一比
function flipCard(card) {
  if (!playing || waiting) return;                 // 還沒開始、或正在等 1 秒：不能翻
  if (card.classList.contains("flipped")) return;  // 已經翻開：不理它
  card.classList.add("flipped");

  if (firstCard === null) {                        // 這是第一張：先記住
    firstCard = card;
    return;
  }

  const secondCard = card;                         // 這是第二張：比一比
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");            // 一樣：留著
    secondCard.classList.add("matched");
    firstCard = null;
  } else {
    waiting = true;                                // 不一樣：等 1 秒再蓋回去
    setTimeout(function () {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      waiting = false;
    }, 1000);
  }
}

// 按「開始」：關掉開始畫面，開始玩
startBtn.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  playing = true;
});

buildBoard();
