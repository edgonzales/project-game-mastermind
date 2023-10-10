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
let enableCheckButton = false; // may not need this??


  /*----- CACHED ELEMENTS  -----*/

const gameBoard = document.querySelector('#game-board');
const pegs = document.querySelectorAll('.peg-btn');
const checkGuessBtn = document.querySelector('#checkGuessBtn');
const clearGuessBtn = document.querySelector('#clearGuessBtn');
const resetGameBtn = document.querySelector('#resetGameBtn');
const guessesGridSquares = document.querySelectorAll('#guesses-grid tr td');
const cluesGridSquares = document.querySelectorAll('#clues-grid tr td');
const solutionsGridSquares = document.querySelectorAll('#solutions-grid tr td');
const mssgEl = document.querySelector('#msg');


  /*----- EVENT LISTENERS -----*/
/*
  Add event listeners for the following actions  
  - REFINE. click on any peg btn
  - REFINE. click on check button
  - REFINE. click on clear button
  - DONE. clck on reset game button
*/

// for every i, assign it a color based according to the PEG_COLORS array, based on the position 
for (i of pegs) {
    i.addEventListener('click', handlePegSelection)
}

checkGuessBtn.addEventListener('click', handleGuessCheck);

clearGuessBtn.addEventListener('click', function(){
    guessesBoardState[0] = Array(4).fill(INITIALVALUE);
    console.log(guessesBoardState[0]);
})

resetGameBtn.addEventListener('click', init)


  /*----- FUNCTIONS -----*/

init()

function init(){
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
    
    // select 4 random peg colors and store them in an array
    for(let i = 0; i < 4; i++){
        let randomPegColor = PEG_COLORS[(Math.floor(Math.random() * PEG_COLORS.length))];
        solutionBoardState.push(randomPegColor);
    }
    console.log(solutionBoardState);

    render();
}

function handlePegSelection(e){
// update guessesBoardState. if the e.target id includes red, then update the guessesBoardState with that color
// limit to 4 peg selections per guess


    if(e.target.id === PEG_COLORS[0]){
        guessesBoardState[0].shift();
        guessesBoardState[0].push(PEG_COLORS[0]);
    }
    if(e.target.id === PEG_COLORS[1]){
        guessesBoardState[0].shift();
        guessesBoardState[0].push(PEG_COLORS[1]);
    }
    if(e.target.id === PEG_COLORS[2]){
        guessesBoardState[0].shift();
        guessesBoardState[0].push(PEG_COLORS[2]);
    }
    if(e.target.id === PEG_COLORS[3]){
        guessesBoardState[0].shift();
        guessesBoardState[0].push(PEG_COLORS[3]);
    }
    if(e.target.id === PEG_COLORS[4]){
        guessesBoardState[0].shift();
        guessesBoardState[0].push(PEG_COLORS[4]);
    }
    if(e.target.id === PEG_COLORS[5]){
        guessesBoardState[0].shift();
        guessesBoardState[0].push(PEG_COLORS[5]);
    }
    console.log(guessesBoardState[0]);
    console.log(cluesBoardState[0]);

    render();
}

// currently only checks if there's an exact match
function handleGuessCheck(){
    const compareGuessWithSolution = (a, b) =>
        a.length === b.length &&
        a.every((element, index) => element === b[index])

    compareGuessWithSolution(guessesBoardState[0], solutionBoardState)
    cluesBoardState[0] = Array(4).fill(CLUE_COLORS[0]);
    console.log(cluesBoardState[0]);
    
    render();
}


function render() {    
    renderSelectedPegOnGuessRow();
    renderClues();
}

function renderSelectedPegOnGuessRow(){ 
    guessesGridSquares.forEach((squareEl, idx) => {
        if(guessesBoardState[0][idx] === 'red'){
            squareEl.className = 'red';
        } else if(guessesBoardState[0][idx] === 'pink'){
            squareEl.className = 'pink';
        } else if(guessesBoardState[0][idx] === 'green'){
            squareEl.className = 'green';
        }else if(guessesBoardState[0][idx] === 'blue'){
            squareEl.className = 'blue';
        } else if(guessesBoardState[0][idx] === 'purple'){
            squareEl.className = 'purple';
        } else if(guessesBoardState[0][idx] === 'yellow'){
            squareEl.className = 'yellow';
        } else if(guessesBoardState[0][idx] === null) {
            squareEl.className = '';
        }
    })
}
    
// rename to renderOutcome or extract renderOutcome (separation of concerns?)
function renderClues() {
    cluesGridSquares.forEach((squareEl, idx) => {
        if(cluesBoardState[0][idx] === 'black'){
            squareEl.className = 'black';
            renderSolution();
            renderMessage('Your guess is correct! You Win!')
        } else if(cluesBoardState[0][idx] === 'white'){
            squareEl.className = 'white';
            renderMessage('Your guess is incorrect, you lose.')
        } 
        else if(cluesBoardState[0][idx] === null){
            squareEl.className = '';
            renderMessage('');
        } 
    })
}

function renderMessage(msg){
    mssgEl.innerText = msg;
}

// 
function renderSolution(){
    solutionsGridSquares.forEach((squareEl, idx) => {
        if(solutionBoardState[idx] === 'red'){
            squareEl.className = 'red';
        } else if(solutionBoardState[idx] === 'pink'){
            squareEl.className = 'pink';
        } else if(solutionBoardState[idx] === 'green'){
            squareEl.className = 'green';
        }else if(solutionBoardState[idx] === 'blue'){
            squareEl.className = 'blue';
        } else if(solutionBoardState[idx] === 'purple'){
            squareEl.className = 'purple';
        } else if(solutionBoardState[idx] === 'yellow'){
            squareEl.className = 'yellow';
        } else if(solutionBoardState[idx] === null){
            squareEl.className = '';
        }
    })
}

function renderClearGuess(){
    guessesGridSquares.forEach((squareEl, idx) => {
        if(guessesBoardState[idx] === null){
            squareEl.className = '';
        }
    })
}
    /*
~~~~~~~~~~~USER STORIES~~~~~~~~~~~~~~~~~~
MM-1 | As a Player, I want to see the board so that I can begin the game
- CSS
    - freeze cells when btn/img changes
        - option: don't use btns, simply change the color of the cell/square
    - Move 'Outcome' to the bottom of the screen
    - Check btn, Clear btn, Reset Game btn display as a column
        - display: flex | flex-flow: column?
    - Non header text should be larger
    - Set peg background-color to their actual title (i.e. red, green...)

MM-2 | As a Player, I want to select a peg to add to a guess row
- DONE. Display 6 peg options of different colors
- DONE. When peg is selected, it shall display as part of a single guess in the guesses grid
- When clicked, the peg color should display in the next available Guesses cell
    - if first cell doesn't have a null, then add it there, else if cell has null, the add it on a cell 
    with a null

MM-3 | As a Player, I want to check my guess so that I may gather clues for the solution
- Limit 4 pegs per guess
    -DONE. Front end
    - Back end
    - If guess is correct, then show the solution, else keep the solution hidden
- Compare row of pegs against solution pegs
    - Display white if peg color is correct but position is not
    - maybe by using the every() method or an algorithm where each corresponding element is compared based on
        - a. Postion
        - b. Color 
- Only make check button clickable if guess is complete (4 pegs are selected) 
- Keep 'Check' button disabled until 4 pegs are selected

MM-4 | As a Player, I want to clear my guess so that I can add new pegs
- Get renderClearGuess() to work

MM-5 | As a Player, I want to reset the game so that I can start a new game
- DONE. Reset 1 row + no clues
- DONE. Reset 1 row + clues
- Reset 1 row + clues + solution

MM-6 | As a Player, I want to be able to guess no more than 10 times so that I can guess enough tries to gues the solution 
- Refine logic to allow more than 1 guess

MM-7 | As a Player, I want to see a message whether I guessed correctly so that I know when the game ends
-   Display Outcome message after each check
    - Incorrect: 'Keep trying!'
    - Correct: 'You guessed correctly!'
*/