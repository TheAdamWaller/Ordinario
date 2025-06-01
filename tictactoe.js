const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell'); // Seleccionar todas las celdas
const display = document.getElementById('winner');
const restartButton = document.getElementById('restart'); // Botón de reinicio

let currentPlayer = "X";
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

function hayGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

function cellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (!gameActive || boardState[index]) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken'); // Marcar la celda como ocupada

    const winner = hayGanador();

    if (winner) {
        display.textContent = `El ganador es ${winner}`;
        gameActive = false;
    } else if (!boardState.includes('')) {
        display.textContent = `X y O han empatado`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Asignar eventos a todas las celdas
cells.forEach(cell => cell.addEventListener('click', cellClick));

// Función para reiniciar el juego
function reiniciarJuego() {
    boardState = ['', '', '', '', '', '', '', '', '']; // Reiniciar el estado del tablero
    currentPlayer = "X"; // El jugador inicial vuelve a ser "X"
    gameActive = true; // Reactivar el juego
    display.textContent = ""; // Limpiar el mensaje del ganador

    // Limpiar visualmente las celdas y eliminar la clase 'taken'
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('taken');
    });
}

// Agregar evento al botón de reinicio
restartButton.addEventListener('click', reiniciarJuego);
