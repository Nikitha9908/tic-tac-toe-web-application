const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

let currentPlayer = "X";
let gameState = Array(9).fill("");
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", handleReset);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    if (gameState[cellIndex] !== "" || !isGameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== "")) {
        message.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== "" && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function handleReset() {
    gameState.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
    });
    currentPlayer = "X";
    isGameActive = true;
    message.textContent = "";
}
