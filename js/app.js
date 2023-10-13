/*----- CONSTANTS -----*/

const PEG_COLORS = ['red', 'pink', 'green', 'blue', 'purple', 'yellow'];
const CLUE_COLORS = ['black', 'white'];
const ROWS = 10; // Guesses and Clues grid rows 
const COLUMNS = 4; // Guesses and Clues grid rows
const CLUES_OUTCOME_COLUMNS = 3;
const INITIAL_VALUE = null;


/*----- STATE VARIABLES -----*/

let guessesBoardState;
let cluesBoardState;
let solutionBoardState;
let cluesOutcome;
let currentBoardRow;


/*----- CACHED ELEMENTS  -----*/

const pegs = document.querySelectorAll('.peg-btn');
const checkGuessBtn = document.querySelector('#checkGuessBtn');
const clearGuessBtn = document.querySelector('#clearGuessBtn');
const resetGameBtn = document.querySelector('#resetGameBtn');
const guessesGridSquares = document.querySelectorAll('#guesses-grid tr td');
const guesesGridRows = document.querySelectorAll('#guesses-grid .row')
const cluesGridRows = document.querySelectorAll('#clues-grid .row');
const cluesGridSquares = document.querySelectorAll('#clues-grid tr td');
const solutionsGridSquares = document.querySelectorAll('#solutions-grid tr td');
const mssgEl = document.querySelector('#msg');


/*----- EVENT LISTENERS -----*/

// Event listens for click performed on any of the 6 pegs
for (i of pegs) {
    i.addEventListener('click', handlePegSelection)
}

// Event listener for each of the buttons
checkGuessBtn.addEventListener('click', handleGuessCheck);
clearGuessBtn.addEventListener('click', handleClearGuess);
resetGameBtn.addEventListener('click', handleResetGame);


/*----- FUNCTIONS -----*/

// Initialize the browser game and sets the initial values for the state variables, then renders accordingly.
init();

function init() {
    currentBoardRow = 0;

    // set the state to null for all 40 td
    guessesBoardState = Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
        guessesBoardState[i] = Array(COLUMNS).fill(INITIAL_VALUE);
    }

    // set the state to null for all 40 td
    cluesBoardState = Array(ROWS);
    for (let j = 0; j < ROWS; j++) {
        cluesBoardState[j] = Array(COLUMNS).fill(INITIAL_VALUE);
    }

    // Set the state to 0 for all 30 arrays
    cluesOutcome = Array(ROWS);
    for (let j = 0; j < ROWS; j++) {
        cluesOutcome[j] = Array(CLUES_OUTCOME_COLUMNS).fill(0);
    }

    // set the solution state to empty
    solutionBoardState = [];

    // select 4 random peg colors and store them in an array
    for (let i = 0; i < 4; i++) {
        let randomPegColor = PEG_COLORS[(Math.floor(Math.random() * PEG_COLORS.length))];
        solutionBoardState.push(randomPegColor);
    }

    checkGuessBtn.disabled = true;

    render();
}

// Looks at the id of what was clicked and updates the corresponding guessesBoardState row
function handlePegSelection(e) {
    const rowIdx = guessesBoardState[currentBoardRow];
    const cellIdx = rowIdx.indexOf(null);

    if (e.target.id === PEG_COLORS[0]) {
        rowIdx.splice(cellIdx, 1, PEG_COLORS[0]);
    }
    if (e.target.id === PEG_COLORS[1]) {
        rowIdx.splice(cellIdx, 1, PEG_COLORS[1]);
    }
    if (e.target.id === PEG_COLORS[2]) {
        rowIdx.splice(cellIdx, 1, PEG_COLORS[2]);
    }
    if (e.target.id === PEG_COLORS[3]) {
        rowIdx.splice(cellIdx, 1, PEG_COLORS[3]);
    }
    if (e.target.id === PEG_COLORS[4]) {
        rowIdx.splice(cellIdx, 1, PEG_COLORS[4]);
    }
    if (e.target.id === PEG_COLORS[5]) {
        rowIdx.splice(cellIdx, 1, PEG_COLORS[5]);
    }

    // limit to the first 4 peg selections per guess
    if (!(rowIdx.includes(null))) {
        checkGuessBtn.disabled = false;
    }

    clearGuessBtn.disabled = false;

    render();
}

// Compares the guess against the solution and outputs a clue
function handleGuessCheck() {
    previouslyGuessed = [];
    guessesBoardState[currentBoardRow].forEach((guess, idx) => {
        if (guess === solutionBoardState[idx]) {
            cluesOutcome[currentBoardRow][0]++;
            cluesBoardState[currentBoardRow].shift();
            cluesBoardState[currentBoardRow].push(CLUE_COLORS[0]);
        } else if (solutionBoardState.includes(guess) && !(previouslyGuessed.includes(guess))) {
            previouslyGuessed.push(guess);
            cluesOutcome[currentBoardRow][1]++;
            cluesBoardState[currentBoardRow].shift();
            cluesBoardState[currentBoardRow].push(CLUE_COLORS[1]);
        } else {
            cluesBoardState[currentBoardRow].shift();
            cluesBoardState[currentBoardRow].push(null);
            cluesOutcome[currentBoardRow][2]++
        }
    })
    currentBoardRow++;
    render();
}

// Clears the guess if it has not been checked against the solution
function handleClearGuess() {
    if (cluesOutcome[currentBoardRow][0] === 0 &&
        cluesOutcome[currentBoardRow][1] === 0 &&
        cluesOutcome[currentBoardRow][2] === 0) {
        guessesBoardState[currentBoardRow] = Array(4).fill(INITIAL_VALUE);
    } 

    render();
}

// No matter what state the board is in, this resets the game by clearing the classes in the HTML and
// invoking the init function.
function handleResetGame() {
    solutionsGridSquares.forEach((squareEl) => {
        squareEl.className = '';
    })
    init();
}

// Renders the board according to the state variables.
function render() {
    renderMessage('');
    renderSelectedPegOnGuessRow();
    renderClues();
    if (currentBoardRow > 0) renderGameOutcome();
}

// Loops through the guesses grid row and squares and updates the class name according to what the
// guess board state
function renderSelectedPegOnGuessRow() {
    guesesGridRows.forEach((gridRow, idx) => {
        [...gridRow.children].forEach((square, squareIdx) => {
            square.className = guessesBoardState[idx][squareIdx];
        })
    })
}

// Loops through the clues grid row and squares and updates the class name according to what the
// clues board state
function renderClues() {
    cluesGridRows.forEach((gridRow, idx) => {
        [...gridRow.children].forEach((square, squareIdx) => {
            square.className = cluesBoardState[idx][squareIdx];
        })
    })
}

// Generic message render
function renderMessage(msg) {
    mssgEl.innerText = msg;
}

// Renders the solution based on the solution state
function renderSolution() {
    solutionsGridSquares.forEach((squareEl, idx) => {
        if (solutionBoardState[idx] === 'red') {
            squareEl.className = 'red';
        } else if (solutionBoardState[idx] === 'pink') {
            squareEl.className = 'pink';
        } else if (solutionBoardState[idx] === 'green') {
            squareEl.className = 'green';
        } else if (solutionBoardState[idx] === 'blue') {
            squareEl.className = 'blue';
        } else if (solutionBoardState[idx] === 'purple') {
            squareEl.className = 'purple';
        } else if (solutionBoardState[idx] === 'yellow') {
            squareEl.className = 'yellow';
        } else if (solutionBoardState[idx] === null) {
            squareEl.className = '';
        }
    })
}

// Renders the messages and solution according to whether the player won the game.
function renderGameOutcome() {
    if (cluesOutcome[currentBoardRow - 1][0] === 4) {
        renderSolution();
        renderMessage('Your guess is correct! You Win!');
        clearGuessBtn.disabled = true;
        checkGuessBtn.disabled = true;
    } else if (cluesOutcome[currentBoardRow - 1][1] >= 1) {
        renderMessage('Hmm, almost got it. Try again!');
    } else {
        renderMessage('');
    }
}