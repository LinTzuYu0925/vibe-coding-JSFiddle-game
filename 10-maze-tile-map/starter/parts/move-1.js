// 移動玩家：dx、dy 是這一步要走的方向（往右 1,0　往左 -1,0　往下 0,1　往上 0,-1）
function movePlayer(dx, dy) {
  const nx = px + dx;                 // 想走去的那一格
  const ny = py + dy;
  const tile = grid[ny][nx];          // 那一格是什麼字

  if (tile === "#") {                 // 牆：走不過去
    showMessage("🧱 撞到牆了");
    return;
  }

  px = nx;                            // 走過去
  py = ny;
  energy = energy - 1;                // 每走一步少 1 點體力
  showMessage("");
  drawMap();
  updateTop();

  if (tile === "E") {                 // 走到出口：贏了
    winGame();
  } else if (energy <= 0) {           // 體力用完：輸了
    loseGame();
  }
}
