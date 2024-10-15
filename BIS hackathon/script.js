// Function to show alert when earning rewards
function earnRewards() {
    alert("Congratulations! You've earned some rewards! Check your rewards section for more details.");
}

// Function to handle game interactions
function interactWithGame(gameName) {
    alert(`You've selected the ${gameName}. Good luck and have fun!`);
}

// Function to handle activity interactions
function interactWithActivity(activityName) {
    alert(`You've selected the ${activityName}. Get ready to learn and participate!`);
}

// Adding event listeners to buttons and game/activity options
document.addEventListener("DOMContentLoaded", () => {
    // Rewards button
    const rewardsButton = document.querySelector('.rewards-details button');
    if (rewardsButton) {
        rewardsButton.addEventListener('click', earnRewards);
    }

    // Game options
    const games = document.querySelectorAll('.game');
    games.forEach(game => {
        game.addEventListener('click', () => {
            const gameName = game.querySelector('h3').innerText;
            interactWithGame(gameName);
        });
    });

    // Activity options
    const activities = document.querySelectorAll('.activity');
    activities.forEach(activity => {
        activity.addEventListener('click', () => {
            const activityName = activity.querySelector('h3').innerText;
            interactWithActivity(activityName);
        });
    });
});

const words = ['BUSINESS', 'ANALYSIS', 'STRATEGY', 'DATA', 'MODEL', 'DECISION', 'PROCESS', 'SYSTEM', 'RESEARCH', 'MARKET'];

const wordGrid = document.getElementById('wordGrid');
const feedback = document.getElementById('feedback');

let selectedCells = [];
let foundWords = [];

function generateGrid() {
    const gridSize = 10; // Size of the grid
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

    // Place words in the grid
    words.forEach(word => {
        placeWordInGrid(word, grid);
    });

    // Fill remaining cells with random letters
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === '') {
                grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
            }
        }
    }

    // Render the grid
    renderGrid(grid);
}

function placeWordInGrid(word, grid) {
    const gridSize = grid.length;
    const wordLength = word.length;
    let placed = false;

    while (!placed) {
        const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(word, row, col, direction, grid)) {
            for (let i = 0; i < wordLength; i++) {
                if (direction === 0) grid[row][col + i] = word[i]; // Horizontal
                else if (direction === 1) grid[row + i][col] = word[i]; // Vertical
                else grid[row + i][col + i] = word[i]; // Diagonal
            }
            placed = true;
        }
    }
}

function canPlaceWord(word, row, col, direction, grid) {
    const wordLength = word.length;
    const gridSize = grid.length;

    if (direction === 0 && col + wordLength <= gridSize) {
        for (let i = 0; i < wordLength; i++) {
            if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) return false;
        }
        return true;
    }
    if (direction === 1 && row + wordLength <= gridSize) {
        for (let i = 0; i < wordLength; i++) {
            if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) return false;
        }
        return true;
    }
    if (direction === 2 && row + wordLength <= gridSize && col + wordLength <= gridSize) {
        for (let i = 0; i < wordLength; i++) {
            if (grid[row + i][col + i] !== '' && grid[row + i][col + i] !== word[i]) return false;
        }
        return true;
    }
    return false;
}

function renderGrid(grid) {
    wordGrid.innerHTML = ''; // Clear existing grid

    grid.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const cell = document.createElement('div');
            cell.className = 'word-cell';
            cell.innerText = letter;
            cell.dataset.row = rowIndex;
            cell.dataset.col = colIndex;

            cell.addEventListener('click', () => selectCell(cell));
            wordGrid.appendChild(cell);
        });
    });
}

function selectCell(cell) {
    if (selectedCells.includes(cell)) {
        cell.classList.remove('highlight');
        selectedCells = selectedCells.filter(c => c !== cell);
    } else {
        cell.classList.add('highlight');
        selectedCells.push(cell);
    }
}

function checkAnswers() {
    const selectedWords = selectedCells.map(cell => cell.innerText).join('');
    const foundWord = words.find(word => word === selectedWords);

    if (foundWord) {
        feedback.innerText = `Congratulations! You found the word: ${foundWord}`;
        foundWords.push(foundWord);
        selectedCells.forEach(cell => cell.classList.add('highlight'));
    } else {
        feedback.innerText = 'Try again!';
    }
}

function resetGame() {
    selectedCells = [];
    foundWords = [];
    feedback.innerText = '';
    generateGrid();
}

document.getElementById('submitBtn').addEventListener('click', checkAnswers);
document.getElementById('resetBtn').addEventListener('click', resetGame);

// Generate grid on page load
window.onload = generateGrid;
function checkAnswers() {
    const selectedWords = selectedCells.map(cell => cell.innerText).join('');
    const foundWord = words.find(word => word === selectedWords);

    if (foundWord) {
        feedback.innerText = `Congratulations! You found the word: ${foundWord}`;
        feedback.classList.add('highlight'); // Highlight feedback
        foundWords.push(foundWord);
        selectedCells.forEach(cell => cell.classList.add('highlight'));
    } else {
        feedback.innerText = 'Try again!';
        feedback.classList.remove('highlight');
    }

    // Animate feedback
    setTimeout(() => {
        feedback.classList.add('fade-out');
        setTimeout(() => feedback.classList.remove('fade-out'), 1000);
    }, 2000); // Fade out after 2 seconds
}
