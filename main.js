// Variables
const cells = Array.from(document.querySelectorAll(".cell"));
const turnIndicator = document.getElementById("turn-indicator");
const restartButton = document.getElementById("restart-btn");
const modal = document.getElementById("modal");
const playButton = document.getElementById("play-btn");

const playerSymbol = "X";
const computerSymbol = "O";

let currentPlayer = playerSymbol;
let gameActive = false;
let winner = null;
let movesCount = 0;

// Event Listeners
cells.forEach((cell) =>
  cell.addEventListener("click", () => handleCellClick(cell))
);
restartButton.addEventListener("click", restartGame);
playButton.addEventListener("click", startGame);

// Funciones
function handleCellClick(cell) {
  if (!gameActive || !cell.classList.contains("empty")) return;

  cell.textContent = currentPlayer;
  cell.classList.remove("empty");
  cell.classList.add(currentPlayer);
  checkWinConditions();
  if (gameActive) {
    currentPlayer =
      currentPlayer === playerSymbol ? computerSymbol : playerSymbol;
    turnIndicator.textContent = `Turno: ${currentPlayer}`;
    if (currentPlayer === computerSymbol) {
      setTimeout(makeComputerMove, 500);
    }
  }
  movesCount++;
  if (movesCount === 9 && gameActive) {
    endGame("draw");
  }
}

function makeComputerMove() {
  const emptyCells = cells.filter((cell) => cell.classList.contains("empty"));
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const selectedCell = emptyCells[randomIndex];
  handleCellClick(selectedCell);
}

function checkWinConditions() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // filas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columnas
    [0, 4, 8],
    [2, 4, 6], // Diagonales
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameActive = false;
      winner = currentPlayer;
      endGame("win", winner);
      break;
    }
  }
}

function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.add("empty");
    cell.classList.remove(playerSymbol, computerSymbol);
  });

  currentPlayer = playerSymbol;
  gameActive = false;
  winner = null;
  movesCount = 0;
  turnIndicator.textContent = `Turno: ${currentPlayer}`;
  modal.style.display = "block";
}

function startGame() {
  modal.style.display = "none";
  gameActive = true;
  turnIndicator.textContent = `Turno: ${currentPlayer}`;
}

function endGame(result, winner = "") {
  gameActive = false;
  if (result === "draw") {
    turnIndicator.textContent = "Empate";
  } else if (result === "win") {
    turnIndicator.textContent = `Winner: ${winner}`;
  }
}

restartGame();
