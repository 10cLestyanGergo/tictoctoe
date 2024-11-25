// Tic Tac Toe játék JavaScriptben
function bot(){
    const PLAYER_X = 'X';
    const PLAYER_O = 'O';
    const EMPTY = '';
    
    let board = [
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY]
    ];
    
    let currentPlayer = PLAYER_X;
    let gameOver = false;
    
    // HTML elemek
    const boardElement = document.getElementById('board');
    const messageElement = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    
    // Inicializálja a játéktáblát
    function createBoard() {
      boardElement.innerHTML = '';
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = row;
          cell.dataset.col = col;
          cell.addEventListener('click', handleCellClick);
          boardElement.appendChild(cell);
        }
      }
    }
    
    // Frissíti a táblát
    function renderBoard() {
      const cells = boardElement.querySelectorAll('.cell');
      cells.forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        cell.textContent = board[row][col];
        if (board[row][col] !== EMPTY) {
          cell.classList.add('taken');
        } else {
          cell.classList.remove('taken');
        }
      });
    }
    
    // Kezeli a kattintásokat a táblán
    function handleCellClick(event) {
      if (gameOver) return;
    
      const row = event.target.dataset.row;
      const col = event.target.dataset.col;
    
      if (board[row][col] === EMPTY) {
        board[row][col] = currentPlayer;
        renderBoard();
        
        if (checkWin(currentPlayer)) {
          gameOver = true;
          messageElement.textContent = `${currentPlayer} nyert!`;
        } else if (board.flat().every(cell => cell !== EMPTY)) {
          gameOver = true;
          messageElement.textContent = 'Döntetlen!';
        } else {
          currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
          if (currentPlayer === PLAYER_O) {
            computerMove(); // Ha a gép jön
          }
        }
      }
    }
    
    // Ellenőrzi, hogy egy játékos nyert-e
    function checkWin(player) {
      // Sorok, oszlopok és átlók ellenőrzése
      for (let i = 0; i < 3; i++) {
        if (board[i].every(cell => cell === player)) return true;
        if (board.every(row => row[i] === player)) return true;
      }
      if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
      if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
      return false;
    }
    
    // A minimax algoritmus
    function minimax(board, depth, isMaximizing) {
      const winner = checkWinner(board);
      if (winner === PLAYER_X) return -10 + depth;
      if (winner === PLAYER_O) return 10 - depth;
      if (board.flat().every(cell => cell !== EMPTY)) return 0;
    
      if (isMaximizing) {
        let best = -Infinity;
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (board[row][col] === EMPTY) {
              board[row][col] = PLAYER_O;
              best = Math.max(best, minimax(board, depth + 1, false));
              board[row][col] = EMPTY;
            }
          }
        }
        return best;
      } else {
        let best = Infinity;
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (board[row][col] === EMPTY) {
              board[row][col] = PLAYER_X;
              best = Math.min(best, minimax(board, depth + 1, true));
              board[row][col] = EMPTY;
            }
          }
        }
        return best;
      }
    }
    
    // Kiválasztja a legjobb mozdulatot a gép számára
    function computerMove() {
      let bestScore = -Infinity;
      let move = null;
    
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === EMPTY) {
            board[row][col] = PLAYER_O;
            let score = minimax(board, 0, false);
            board[row][col] = EMPTY;
    
            if (score > bestScore) {
              bestScore = score;
              move = { row, col };
            }
          }
        }
      }
    
      if (move) {
        board[move.row][move.col] = PLAYER_O;
        renderBoard();
        if (checkWin(PLAYER_O)) {
          gameOver = true;
          messageElement.textContent = 'A gép nyert!';
        } else if (board.flat().every(cell => cell !== EMPTY)) {
          gameOver = true;
          messageElement.textContent = 'Döntetlen!';
        } else {
          currentPlayer = PLAYER_X;
        }
      }
    }
    
    // Ellenőrzi, hogy nyert-e valaki
    function checkWinner(board) {
      for (let row = 0; row < 3; row++) {
        if (board[row].every(cell => cell === PLAYER_X)) return PLAYER_X;
        if (board[row].every(cell => cell === PLAYER_O)) return PLAYER_O;
      }
    
      for (let col = 0; col < 3; col++) {
        if (board.every(row => row[col] === PLAYER_X)) return PLAYER_X;
        if (board.every(row => row[col] === PLAYER_O)) return PLAYER_O;
      }
    
      if (board[0][0] === PLAYER_X && board[1][1] === PLAYER_X && board[2][2] === PLAYER_X) return PLAYER_X;
      if (board[0][0] === PLAYER_O && board[1][1] === PLAYER_O && board[2][2] === PLAYER_O) return PLAYER_O;
      if (board[0][2] === PLAYER_X && board[1][1] === PLAYER_X && board[2][0] === PLAYER_X) return PLAYER_X;
      if (board[0][2] === PLAYER_O && board[1][1] === PLAYER_O && board[2][0] === PLAYER_O) return PLAYER_O;
    
      return null;
    }
    
    // Játék újraindítása
    resetButton.addEventListener('click', () => {
      board = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
      ];
      currentPlayer = PLAYER_X;
      gameOver = false;
      messageElement.textContent = '';
      createBoard();
      renderBoard();

    });
    
    createBoard();
    renderBoard();
    
}
function jatekos(){
    // Tic Tac Toe game - Player vs Player

const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = '';

let board = [
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY]
];

let currentPlayer = PLAYER_X;
let gameOver = false;

// HTML elements
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

// Create the game board
function createBoard() {
  boardElement.innerHTML = ''; // Clear the board for a new game
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }
}

// Render the current state of the board
function renderBoard() {
  const cells = boardElement.querySelectorAll('.cell');
  cells.forEach(cell => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    cell.textContent = board[row][col];
    if (board[row][col] !== EMPTY) {
      cell.classList.add('taken');
    } else {
      cell.classList.remove('taken');
    }
  });
}

// Handle cell click events
function handleCellClick(event) {
  if (gameOver) return;

  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  if (board[row][col] === EMPTY) {
    board[row][col] = currentPlayer;
    renderBoard();
    
    if (checkWin(currentPlayer)) {
      gameOver = true;
      messageElement.textContent = `${currentPlayer} nyert!`;
    } else if (board.flat().every(cell => cell !== EMPTY)) {
      gameOver = true;
      messageElement.textContent = 'Döntetlen!';
    } else {
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      messageElement.textContent = `Következő játékos: ${currentPlayer}`;
    }
  }
}

// Check if the current player has won
function checkWin(player) {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (board[i].every(cell => cell === player)) return true;
    if (board.every(row => row[i] === player)) return true;
  }
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
  return false;
}

// Restart the game
resetButton.addEventListener('click', () => {
  board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
  ];
  currentPlayer = PLAYER_X;
  gameOver = false;
  messageElement.textContent = `Következő játékos: ${currentPlayer}`;
  createBoard();
  renderBoard();
});

createBoard();
renderBoard();

}