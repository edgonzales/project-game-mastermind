/*----- CONSTANTS -----*/

const MAX_GUESSES = 10; // 1 guess = a set of 4 pegs
const MAX_PEGS_PER_GUESS = 4; // guess = single row filled with pegs
const PEG_COLORS = ['red', 'pink', 'green', 'blue', 'purple', 'yellow'];
const CLUE_COLORS = ['black', 'white'];
const ROWS = 10;
const COLUMNS = 4;
const INITIALVALUE = null;


/*----- STATE VARIABLES -----*/

let guessesBoardState;
let cluesBoardState;
let solutionBoardState;
let clueOutcome;


/*----- CACHED ELEMENTS  -----*/

const gameBoard = document.querySelector('#game-board'); //so far, not using. remove?
const pegs = document.querySelectorAll('.peg-btn');
const checkGuessBtn = document.querySelector('#checkGuessBtn');
const clearGuessBtn = document.querySelector('#clearGuessBtn');
const resetGameBtn = document.querySelector('#resetGameBtn');
const guessesGridSquares = document.querySelectorAll('#guesses-grid tr td');
const cluesGridSquares = document.querySelectorAll('#clues-grid tr td');
const solutionsGridSquares = document.querySelectorAll('#solutions-grid tr td');
const mssgEl = document.querySelector('#msg');


/*----- EVENT LISTENERS -----*/
// for every i, assign it a color based according to the PEG_COLORS array, based on the position 
for (i of pegs) {
    i.addEventListener('click', handlePegSelection)
}

checkGuessBtn.addEventListener('click', handleGuessCheck);
clearGuessBtn.addEventListener('click', handleClearGuess);
resetGameBtn.addEventListener('click', handleResetGame);


/*----- FUNCTIONS -----*/

init()

function init() {
    // set the state to null for all 40 td
    guessesBoardState = Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
        guessesBoardState[i] = Array(COLUMNS).fill(INITIALVALUE);
    }

    // set the state to null for all 40 td
    cluesBoardState = Array(ROWS);
    for (let j = 0; j < ROWS; j++) {
        cluesBoardState[j] = Array(COLUMNS).fill(INITIALVALUE);
    }

    // set the state to empty
    solutionBoardState = [];

    clueOutcome = [0, 0, 0];

    // select 4 random peg colors and store them in an array
    for (let i = 0; i < 4; i++) {
        let randomPegColor = PEG_COLORS[(Math.floor(Math.random() * PEG_COLORS.length))];
        solutionBoardState.push(randomPegColor);
    }

    checkGuessBtn.disabled = true;

    render();
    console.log(solutionBoardState);
}

function handlePegSelection(e) {
    const rowIdx = guessesBoardState[0];
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

    console.log(rowIdx);
    render();
}

// YOU ARE HERE. MAKE SURE DUPLICATES ARE ACCOUNTED FOR
function handleGuessCheck() {
    previouslyGuessed = [];
    guessesBoardState[0].forEach((guess, idx) => {
        if (guess === solutionBoardState[idx]) {
            clueOutcome[0]++;
            cluesBoardState[0].shift();
            cluesBoardState[0].push(CLUE_COLORS[0]);
            //rowIdxClueBoard.splice(cellIdxClueBoard, 1, CLUE_COLORS[0])
        } else if (solutionBoardState.includes(guess) && !(previouslyGuessed.includes(guess))) {
            previouslyGuessed.push(guess);
            clueOutcome[1]++;
            cluesBoardState[0].shift();
            cluesBoardState[0].push(CLUE_COLORS[1]);
            //rowIdxClueBoard.splice(cellIdxClueBoard, 1, CLUE_COLORS[1])
        } else {
            cluesBoardState[0].shift();
            cluesBoardState[0].push(null);
            clueOutcome[2]++
        }
        console.log(clueOutcome);
        console.log(cluesBoardState[0]);
    })
    render();
}

function handleClearGuess() {
    guessesBoardState[0] = Array(4).fill(INITIALVALUE);
    render();
    console.log(guessesBoardState[0]);
}

function handleResetGame() {
    solutionsGridSquares.forEach((squareEl) => {
        squareEl.className = '';
    })
    init();
}

function render() {
    renderSelectedPegOnGuessRow();
    renderClues();
    renderGameOutcome();
}

function renderSelectedPegOnGuessRow() {
    guessesGridSquares.forEach((squareEl, idx) => {
        if (guessesBoardState[0][idx] === 'red') {
            squareEl.className = 'red';
        } else if (guessesBoardState[0][idx] === 'pink') {
            squareEl.className = 'pink';
        } else if (guessesBoardState[0][idx] === 'green') {
            squareEl.className = 'green';
        } else if (guessesBoardState[0][idx] === 'blue') {
            squareEl.className = 'blue';
        } else if (guessesBoardState[0][idx] === 'purple') {
            squareEl.className = 'purple';
        } else if (guessesBoardState[0][idx] === 'yellow') {
            squareEl.className = 'yellow';
        } else if (guessesBoardState[0][idx] === null) {
            squareEl.className = '';
        }
    })
}

// rename to renderOutcome or extract renderOutcome (separation of concerns?)
function renderClues() {
    cluesGridSquares.forEach((squareEl, idx) => {
        if (cluesBoardState[0][idx] === 'black') {
            squareEl.className = 'black';

        } else if (cluesBoardState[0][idx] === 'white') {
            squareEl.className = 'white';
        }
        else if (cluesBoardState[0][idx] === null) {
            squareEl.className = '';
        }
    })
}

function renderMessage(msg) {
    mssgEl.innerText = msg;
}

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

function renderGameOutcome() {
    if (clueOutcome[0] === 4) {
        renderSolution();
        renderMessage('Your guess is correct! You Win!');
        clearGuessBtn.disabled = true;
        checkGuessBtn.disabled = true;
    } else if (clueOutcome[1] >= 1) {
        renderMessage('Hmm, almost got it. Try again!');
    } else {
        renderMessage('')
    }
}

/*
~~~~~~~~~~~USER STORIES~~~~~~~~~~~~~~~~~~
MM-1 | As a Player, I want to see the board so that I can begin the game
- CSS/FE
    - Move 'Outcome' to the bottom of the screen
    - Check btn, Clear btn, Reset Game btn display as a column
        - display: flex | flex-flow: column?
    - Non header text should be larger
    - Set peg background-color to their actual title (i.e. red, green...)
    - freeze cells when btn/img changes
        - option: don't use btns, simply change the color of the cell/square

DONE. MM-2 | As a Player, I want to select a peg to add to a guess row
- DONE. Display 6 peg options of different colors
- DONE. When peg is selected, it shall display as part of a single guess in the guesses grid
- DONE. Display selected peg sequentially

DONE. MM-3 | As a Player, I want to check my guess so that I may gather clues for the solution
- DONE. Limit 4 pegs per guess
    - DONE. Front end
    - DONE. Back end
- DONE. If guess is correct, then show the solution, else keep the solution hidden
- DONE. Compare row of pegs against solution pegs
    - Display white in a clues box if peg color is correct but position is not
    - Display black in a clues box if peg color and position is correct
- DONE. If 4 pegs are selected, enable Check button, otherwise disable it. 

MM-4 | As a Player, I want to clear my guess so that I can add new pegs
- DONE. Clear a guess
- Restrict: to only clearing 1 guess at a time
- If clues are either black, white, or checked when Player clicks on Clear, then it shall be applied to the 
    following guess row

MM-5 | As a Player, I want to reset the game so that I can start a new game
- DONE. Reset 1 row + no clues
- DONE. Reset 1 row + clues
- DONE. Reset 1 row + clues + solution

MM-6 | As a Player, I want to be able to guess no more than 10 times so that I can guess enough tries to gues the solution 
- Refine logic to allow more than 1 guess

DONE. MM-7 | As a Player, I want to see a message whether I guessed correctly so that I know when the game ends
-   Display Outcome message after each check
    - Incorrect: 'Keep trying!'
    - Correct: 'You guessed correctly!'
*/