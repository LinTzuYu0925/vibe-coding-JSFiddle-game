// 移動玩家：dx、dy 是這一步要走的方向（往右 1,0　往左 -1,0　往下 0,1　往上 0,-1）
function movePlayer(dx, dy) {
  const nx = px + dx;                 // 想走去的那一格
  const ny = py + dy;
  const tile = grid[ny][nx];          // 那一格是什麼字

  if (tile === "#") {                 // 牆：走不過去
    showMessage("🧱 撞到牆了");
    return;
  }
  if (tile === "D" && !hasKey) {      // 門：沒有鑰匙就走不過去
    showMessage("🔒 門鎖住了，先找鑰匙");
    return;
  }

  px = nx;                            // 走過去
  py = ny;
  energy = energy - 1;                // 每走一步少 1 點體力
  showMessage("");

  if (tile === "K") {                 // 鑰匙：撿起來，那一格變地板
    hasKey = true;
    grid[ny][nx] = ".";
    showMessage("🔑 拿到鑰匙了！");
  }
  if (tile === "D") {                 // 有鑰匙的門：打開，那一格變地板
    grid[ny][nx] = ".";
    showMessage("🔓 門開了！");
  }

  if (tile === "E") {                 // 走到出口：還有下一關就載入，沒有了就贏
    if (level + 1 < maps.length) {
      loadMap(level + 1);
      showMessage("🎉 過關！第 " + (level + 1) + " 關");
    } else {
      drawMap();
      updateTop();
      winText.textContent = "你走出了 " + maps.length + " 座迷宮！";
      winGame();
    }
    return;
  }

  drawMap();
  updateTop();
  if (energy <= 0) {                  // 體力用完：輸了
    loseGame();
  }
}
