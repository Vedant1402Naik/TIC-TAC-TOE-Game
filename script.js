let currentPlayer = 'X';
let cells = Array.from(document.querySelectorAll('.cell'));
let message = document.getElementById('message');

function playMove(index) {
    if (!cells[index].textContent) {
        cells[index].textContent = currentPlayer;
        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            disableBoard();
        } else if (checkDraw()) {
            message.textContent = "It's a draw!";
            disableBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
}

function checkDraw() {
    return cells.every(cell => cell.textContent !== '');// not empty element means board is full    
}

function disableBoard() {
    cells.forEach(cell => (cell.onclick = null));
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.onclick = () => playMove(cells.indexOf(cell));
    });
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}
