let statusText = document.querySelector(".status");
const gameBoard = document.querySelector(".game-board");
let currentPlayer = "";
let board = [];
let hasWinner = false;

const init = () => {
  board = [];
  for (let i = 0; i < 9; i++) {
    board.push(undefined);
  }

  currentPlayer = "X";
  hasWinner = false;
  statusText.textContent = "X: Your Turn";
  box.forEach((cell) => (cell.textContent = ""));
  box.forEach((field) => {
    field.classList.remove("deactivate");
  });
};

const setArray = (index, currentPlayer) => {
  board[index] = currentPlayer;

  updateBoard(index, currentPlayer);
};

const getCurrentPlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  return currentPlayer;
};

const updateStatus = () => {
  if (!hasWinner) {
    statusText.textContent = `${currentPlayer}: Your Turn`;
  }
};

const deactivate = () => {
  box.forEach((field) => {
    field.classList.add("deactivate");
  });
};

const checkForRows = () => {
  const row1 = [];
  const row2 = [];
  const row3 = [];
  for (let i = 0; i < 3; i++) {
    row1.push(board[i]);
  }
  if (
    row1.every((field) => field == "X") ||
    row1.every((field) => field == "O")
  ) {
    return true;
  }
  for (let i = 3; i < 6; i++) {
    row2.push(board[i]);
  }
  if (
    row2.every((field) => field == "X") ||
    row2.every((field) => field == "O")
  ) {
    return true;
  }
  for (let i = 6; i < 9; i++) {
    row3.push(board[i]);
  }
  if (
    row3.every((field) => field == "X") ||
    row3.every((field) => field == "O")
  ) {
    return true;
  }
  return false;
};

const checkForColumns = () => {
  const col1 = [];
  const col2 = [];
  const col3 = [];
  col1.push(board[0]);
  col1.push(board[3]);
  col1.push(board[6]);
  if (
    col1.every((field) => field == "X") ||
    col1.every((field) => field == "O")
  ) {
    return true;
  }
  col2.push(board[1]);
  col2.push(board[4]);
  col2.push(board[7]);
  if (
    col2.every((field) => field == "X") ||
    col2.every((field) => field == "O")
  ) {
    return true;
  }
  col3.push(board[2]);
  col3.push(board[5]);
  col3.push(board[8]);
  if (
    col3.every((field) => field == "X") ||
    col3.every((field) => field == "O")
  ) {
    return true;
  }
  return false;
};

const checkForDiagonals = () => {
  const dig1 = [];
  const dig2 = [];
  dig1.push(board[0]);
  dig1.push(board[4]);
  dig1.push(board[8]);
  dig2.push(board[2]);
  dig2.push(board[4]);
  dig2.push(board[6]);
  if (
    dig1.every((field) => field == "X") ||
    dig1.every((field) => field == "O")
  ) {
    return true;
  }

  if (
    dig2.every((field) => field == "X") ||
    dig2.every((field) => field == "O")
  ) {
    return true;
  }
  return false;
};

const checkDraw = () => {
  if (
    board.every((field) => field !== undefined) &&
    !checkForColumns() &&
    !checkForRows() &&
    !checkForDiagonals()
  ) {
    deactivate();
    return true;
  }
  return false;
};

const checkWinner = () => {
  if (checkForRows() || checkForColumns() || checkForDiagonals()) {
    hasWinner = true;
  }
  if (hasWinner) {
    deactivate();
    statusText.textContent = `${currentPlayer} is winner`;
  } else {
    getCurrentPlayer();
    updateStatus();
    checkDraw();
  }
  if (checkDraw() && !hasWinner) {
    statusText.textContent = "It is a draw!";
  }
};

const updateBoard = (currentIndex, currentPlayer) => {
  box.forEach((cell) => {
    if (cell.dataset.index == currentIndex) {
      cell.textContent = `${currentPlayer}`;
    }
  });

  checkWinner();
};

const reset = document.getElementById("reset");
reset.addEventListener("click", init);

const box = document.querySelectorAll(".cell");
box.forEach((cell) =>
  cell.addEventListener("click", function () {
    let index = Number(this.dataset.index);
    const field = board[index];
    if (field == undefined) {
      board[index] = currentPlayer;
      updateBoard(index, currentPlayer);
    }
  })
);

init();
