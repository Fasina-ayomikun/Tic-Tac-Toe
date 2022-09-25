const boxes = document.querySelectorAll(".box");
const restartBtn = document.querySelector(".restart-btn");
const winningText = document.querySelector(".winning-text");
const model = document.querySelector(".model");
const playerTurn = document.querySelector(".player-turn");
let currentPlayer = "X";
const X_CLASS = "X";
const O_CLASS = "O";
const winningArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const startGame = () => {
  boxes.forEach((box) => {
    currentPlayer = X_CLASS;
    playerTurn.textContent = `Player ${
      currentPlayer === "X" ? "X" : "O"
    }'s turn`;
    model.classList.remove("show");
    box.classList.remove(X_CLASS);
    box.classList.remove(O_CLASS);
    winningText.textContent = "";
    box.removeEventListener("click", handleClick);
    box.addEventListener("click", handleClick, { once: true });
  });
};
const handleClick = (e) => {
  e.target.classList.add(currentPlayer);

  if (checkForWinner(currentPlayer)) {
    isWinner(true);
  } else if (checkDraw()) {
    isWinner(false);
  }
  currentPlayer = currentPlayer === "X" ? O_CLASS : X_CLASS;

  playerTurn.textContent = `Player ${currentPlayer === "X" ? "X" : "O"}'s turn`;
};
restartBtn.addEventListener("click", startGame);
startGame();
function isWinner(win) {
  model.classList.add("show");
  if (win) {
    winningText.textContent = `Player ${currentPlayer} won`;
  } else {
    winningText.textContent = `Draw!`;
  }
}
function checkDraw() {
  return [...boxes].every((box) => {
    return box.classList.contains(X_CLASS) || box.classList.contains(O_CLASS);
  });
}
function checkForWinner(currentPlayer) {
  return winningArray.some((arr) => {
    return arr.every((item) => {
      return boxes[item].classList.contains(currentPlayer);
    });
  });
}
