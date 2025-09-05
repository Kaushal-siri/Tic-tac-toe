(() => {
  const boardEl = document.getElementById("board");
  const statusEl = document.getElementById("status");
  const playerEl = document.getElementById("player");
  const resetBtn = document.getElementById("reset");
  const cells = Array.from(document.querySelectorAll(".cell"));

  let board;
  let currentPlayer;
  let isGameOver;

  const WIN_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function initGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    isGameOver = false;
    playerEl.textContent = currentPlayer;
    updateStatus(`Player ${badge(currentPlayer)}'s turn`, true);

    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o", "win");
      cell.disabled = false;
    });
  }

  function badge(p) {
    return p;
  }

  function updateStatus(message, replace = false) {
    statusEl.textContent = message.replace(/<[^>]+>/g, "");

    playerEl.textContent = currentPlayer;
  }

  function handleCellClick(e) {
    const idx = Number(e.currentTarget.dataset.index);

    if (isGameOver || board[idx]) {
      return;
    }
    board[idx] = currentPlayer;
    e.currentTarget.textContent = currentPlayer;
    e.currentTarget.classList.add(currentPlayer.toLowerCase());

    const winInfo = getWinInfo();
    if (winInfo) {
      endGame(`${currentPlayer} wins!`, winInfo.line);
      return;
    }

    if (board.every((v) => v !== null)) {
      endGame("It's a tie!");
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`Player ${badge(currentPlayer)}'s turn`);
  }

  function getWinInfo() {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { player: board[a], line: pattern };
      }
    }
    return null;
  }

  function endGame(message, winLine = null) {
    isGameOver = true;
    updateStatus(message);

    if (winLine) {
      winLine.forEach((i) => cells[i].classList.add("win"));
    }

    cells.forEach((cell) => (cell.disabled = true));
  }

  function resetGame() {
    initGame();
  }

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetBtn.addEventListener("click", resetGame);

  initGame();
})();
