const boxes = document.querySelectorAll(".box");
const restartBtn = document.querySelector(".restart-btn");
const winningText = document.querySelector(".winning-text");
const model = document.querySelector(".model");
const playerTurn = document.querySelector(".player-turn");
const CLASS_X = "X";
const CLASS_O = "O";
let currentPlayer = CLASS_X;
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
    currentPlayer = CLASS_X;
    playerTurn.textContent = `Player ${
      currentPlayer === "X" ? "X" : "O"
    }'s turn`;
    model.classList.remove("show");
    box.classList.remove(CLASS_X);
    box.classList.remove(CLASS_O);
    winningText.textContent = "";
    box.removeEventListener("click", handleClick);
    box.addEventListener("click", handleClick, { once: true });
  });
};
const handleClick = (e) => {
  e.target.classList.add(currentPlayer);

  if (checkForWinner()) {
    isWinner(true);
  } else if (checkDraw()) {
    isWinner(false);
  }
  currentPlayer = currentPlayer === "X" ? CLASS_O : CLASS_X;

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
  let boxesArray = Array.from(boxes);
  return boxesArray.every((box) => {
    if (box.classList.contains(CLASS_X) || box.classList.contains(CLASS_O)) {
      return box;
    }
    return;
  });
}
function checkForWinner() {
  let checkWinner = winningArray.some((arr) => {
    const checkWin = arr.every((index) => {
      if (boxes[index].classList.contains(currentPlayer)) {
        return boxes[index];
      }
      return;
    });
    return checkWin;
  });
  return checkWinner;
}
