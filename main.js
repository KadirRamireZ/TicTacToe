// Variables
const cells = Array.from(document.querySelectorAll('.cell'));
const turnIndicator = document.getElementById('turn-indicator');
const restartButton = document.getElementById('restart-btn');
const modal = document.getElementById('modal');
const playButton = document.getElementById('play-btn');

const playerSymbol = 'X';
const computerSymbol = 'O';

let currentPlayer = playerSymbol;
let gameActive = false;
let winner = null;

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', () => handleCellClick(cell)));
restartButton.addEventListener('click', restartGame);
playButton.addEventListener('click', startGame);

// Functions
function handleCellClick(cell) {
  if (!gameActive || !cell.classList.contains('empty')) return;

  cell.textContent = currentPlayer;
  cell.classList.remove('empty');
  cell.classList.add(currentPlayer);
  checkWinConditions();
  if (gameActive) {
    currentPlayer = currentPlayer === playerSymbol ? computerSymbol : playerSymbol;
    turnIndicator.textContent = `Turn: ${currentPlayer}`;
    if (currentPlayer === computerSymbol) {
      setTimeout(makeComputerMove, 500);
    }
  }
}

function makeComputerMove() {
  const emptyCells = cells.filter(cell => cell.classList.contains('empty'));
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const selectedCell = emptyCells[randomIndex];
  handleCellClick(selectedCell);
}

function checkWinConditions() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
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
      turnIndicator.textContent = `Winner: ${winner}`;
      break;
    }
  }

  if (!gameActive && !winner) {
    turnIndicator.textContent = 'It\'s a draw!';
  }
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.add('empty');
    cell.classList.remove(playerSymbol, computerSymbol);
  });

  currentPlayer = playerSymbol;
  gameActive = false;
  winner = null;
  turnIndicator.textContent = `Turn: ${currentPlayer}`;
  modal.style.display = 'block';
}

function startGame() {
  modal.style.display = 'none';
  gameActive = true;
  turnIndicator.textContent = `Turn: ${currentPlayer}`;
}

// Initial Setup
restartGame();
