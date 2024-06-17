let currentPlayer = 'player1';
let playersCount = 2;

function startGame(players) {
    playersCount = players;
    resetGame();
    initializeBoard(players);
    addClickListeners();
}

function resetGame() {
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = ''; // Clear the board
}

function initializeBoard(players) {
    const boardContainer = document.getElementById('board-container');
    const initialPositions = {
        2: [[0, 2, 4, 6, 8, 10, 12], [72, 74, 76, 78, 80, 82, 84]],
        3: [[0, 2, 4, 6, 8, 10, 12], [24, 26, 28, 30, 32, 34, 36], [48, 50, 52, 54, 56, 58, 60]]
    };

    for (let i = 0; i < 121; i++) {
        const hole = document.createElement('div');
        hole.classList.add('hole');
        hole.dataset.index = i; // Store index for reference
        boardContainer.appendChild(hole);

        // Fill initial positions
        if (players === 2 && initialPositions[2][0].includes(i)) {
            hole.classList.add('player1');
        } else if (players === 2 && initialPositions[2][1].includes(i)) {
            hole.classList.add('player2');
        } else if (players === 3 && initialPositions[3][0].includes(i)) {
            hole.classList.add('player1');
        } else if (players === 3 && initialPositions[3][1].includes(i)) {
            hole.classList.add('player2');
        } else if (players === 3 && initialPositions[3][2].includes(i)) {
            hole.classList.add('player3');
        }
    }
}

function addClickListeners() {
    const holes = document.querySelectorAll('.hole');
    holes.forEach(hole => {
        hole.addEventListener('click', handleHoleClick);
    });
}

function handleHoleClick(event) {
    const hole = event.target;
    const currentPlayerHole = document.querySelector(`.selected.${currentPlayer}`);

    if (currentPlayerHole) {
        movePiece(currentPlayerHole, hole);
        currentPlayerHole.classList.remove('selected');
    } else if (hole.classList.contains(currentPlayer)) {
        hole.classList.add('selected');
    }
}

function movePiece(fromHole, toHole) {
    if (isValidMove(fromHole, toHole)) {
        toHole.classList.add(currentPlayer);
        fromHole.classList.remove(currentPlayer);
        switchPlayer();
    }
}

function isValidMove(fromHole, toHole) {
    const fromIndex = parseInt(fromHole.dataset.index);
    const toIndex = parseInt(toHole.dataset.index);

    // Allow only adjacent moves or valid jumps (basic validation)
    const validMoves = [fromIndex - 13, fromIndex + 13, fromIndex - 1, fromIndex + 1, fromIndex - 12, fromIndex + 12, fromIndex - 14, fromIndex + 14];
    const validJumps = [fromIndex - 26, fromIndex + 26, fromIndex - 2, fromIndex + 2, fromIndex - 24, fromIndex + 24, fromIndex - 28, fromIndex + 28];
    if (validMoves.includes(toIndex)) {
        return true;
    } else if (validJumps.includes(toIndex)) {
        const middleIndex = (fromIndex + toIndex) / 2;
        const middleHole = document.querySelector(`.hole[data-index="${middleIndex}"]`);
        return middleHole && middleHole.classList.contains(currentPlayer === 'player1' ? 'player2' : 'player1') || middleHole.classList.contains(currentPlayer === 'player2' ? 'player1' : 'player2');
    }
    return false;
}

function switchPlayer() {
    if (playersCount === 2) {
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    } else if (playersCount === 3) {
        currentPlayer = currentPlayer === 'player1' ? 'player2' : currentPlayer === 'player2' ? 'player3' : 'player1';
    }
}
