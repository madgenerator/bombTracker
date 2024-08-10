const boardSize = 10;
const mineCount = 2;
let board = [];

function initializeGame() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('button');
      cell.dataset.x = i;
      cell.dataset.y = j;
      cell.addEventListener('click', handleCellClick);
      cell.addEventListener('contextmenu', handleCellRightClick);
      gameBoard.appendChild(cell);
    }
  }
  for (let i = 0; i < mineCount; i++) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    if (board[row][col] === 'mine') {
      i--;
    } else {
      board[row][col] = 'mine';
    }
  }
}

function handleCellClick(event) {
  const row = parseInt(event.target.dataset.x);
  const col = parseInt(event.target.dataset.y);
  if (board[row][col] === 'mine') {
    event.target.innerText = '';
    event.target.classList.add('mine');
    gameOver();
  }
  else {
    const count = countMinesAroundCell(row, col);
    if (count === 0) {
      event.target.innerText = '';
      event.target.className = "blackbutton";//  .classList.add('blank');
      revealBlankCells(row, col);
    } else {
      event.target.innerText = count;
    }
    event.target.removeEventListener('click', handleCellClick);
  }
}

function handleCellRightClick(event) {
  event.preventDefault();

  console.log("RIGHT");
  const row = parseInt(event.target.dataset.x);
  const col = parseInt(event.target.dataset.y);
  if (!event.target.classList.contains('flag')) {
    event.target.classList.add('flag');
  } else {
    event.target.classList.remove('flag');
  }
}

function countMinesAroundCell(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const r = row + i;
      const c = col + j;
      if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === 'mine') {
        count++;
      }
    }
  }
  return count;
}

function gameOver() {
  alert('게임 오버');
  initializeGame();
}

function revealBlankCells(row, col) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const r = row + i;
      const c = col + j;
      if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
        const cell = document.querySelector(`[data-x="${r}"][data-y="${c}"]`);
        console.log(cell);
        if (!cell.innerText) {
          cell.click();
        }
      }
    }
  }
}

document.getElementById('start-button').addEventListener('click', initializeGame);
initializeGame();