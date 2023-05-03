const gameStart = () => {
  let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  let clickCount = 0;
  let currentPlayer = 1;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.querySelector(`.cell_${i}_${j}`);
      cell.innerText = board[i][j];
      cell.addEventListener("click", function () {
        changeColor(cell);
      });
    }
  }

  function changeColor(element) {
    if (clickCount % 2 === 0) {
      element.classList.add("player1");
    } else {
      element.classList.add("player2");
    }
    clickCount++;
  }
    function changeColor(element, player) {
      if (currentPlayer === 1) {
        element.classList.add("player1");
      } else {
        element.classList.add("player2");
      }
    }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.querySelector(`.cell_${i}_${j}`);
      cell.addEventListener("click", function () {
        if (board[i][j] === 0) {
          board[i][j] = currentPlayer;
          changeColor(cell, currentPlayer);
          if (checkWin()) {
            showWinner(currentPlayer);
          } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
          }
        }
      });
    }
  }

  function showWinner(player) {
    const messageContainer = document.getElementById("message-container");
    const message = document.getElementById("message");

    message.textContent = `¡El ganador es el jugador ${player}!`;
    messageContainer.style.display = "block";
  }


  function checkWin() {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length - 3; col++) {
        if (
          board[row][col] === currentPlayer &&
          board[row][col + 1] === currentPlayer &&
          board[row][col + 2] === currentPlayer &&
          board[row][col + 3] === currentPlayer
        ) {
          return true;
        }
      }
    }

    for (let row = 0; row < board.length - 3; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (
          board[row][col] === currentPlayer &&
          board[row + 1][col] === currentPlayer &&
          board[row + 2][col] === currentPlayer &&
          board[row + 3][col] === currentPlayer
        ) {
          return true;
        }
      }
    }

    for (let row = 0; row < board.length - 3; row++) {
      for (let col = 0; col < board[row].length - 3; col++) {
        if (
          board[row][col] === currentPlayer &&
          board[row + 1][col + 1] === currentPlayer &&
          board[row + 2][col + 2] === currentPlayer &&
          board[row + 3][col + 3] === currentPlayer
        ) {
          return true;
        }
      }
    }

    for (let row = 0; row < board.length - 3; row++) {
      for (let col = 3; col < board[row].length; col++) {
        if (
          board[row][col] === currentPlayer &&
          board[row + 1][col - 1] === currentPlayer &&
          board[row + 2][col - 2] === currentPlayer &&
          board[row + 3][col - 3] === currentPlayer
        ) {
          return true;
        }
      }
    }

    return false;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  let resetButton = document.querySelector(".reset-game");
  resetButton.addEventListener("click", function () {
    gameStart();
  });
});

gameStart();
