  /*----- CONSTANTS -----*/
const MAX_GUESSES = 10; // 1 guess = a set of 4 pegs
const MAX_PEGS_PER_GUESS = 4; // guess = single row filled with pegs
const PEG_COLORS = ['red', 'pink', 'green', 'blue', 'purple', 'yellow'];
const CLUE_COLORS = ['black', 'white'];
const ROWS = 10;
const COLUMNS = 4;
const INITIALVALUE = null;


  /*----- STATE VARIABLES -----*/
/*
- DONE. guessesBoardState: array[null, ..., null]
- DONE. clueSquares: array[null, ..., null]
- outcome: array[null, win, loose]
- DONE. solution: array = []
- DONE. check button, since this will be enabled only if a guess is complete 
(4 pegs selected in 1 row): boolean false
*/
let guessesBoardState;
let cluesBoardState;
let solutionBoardState;
let enableCheckButton = false; // may not need this??


  /*----- CACHED ELEMENTS  -----*/
/*
- DONE. gameboard
- DONE. peg btns
- DONE. guesses squares
- DONE. clue squares
- DONE. solution pegs
- DONE. Check button
- DONE. Clear button
- DONE. Reset Game button
- selected pegs???
*/
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

resetGameBtn.addEventListener('click', function(){
    init();
})

  /*----- FUNCTIONS -----*/

init()

function init(){    
    guessesBoardState = Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
        guessesBoardState[i] = Array(COLUMNS).fill(INITIALVALUE);
    }

    cluesBoardState = Array(ROWS);
    for (let j = 0; j < ROWS; j++) {
        cluesBoardState[j] = Array(COLUMNS).fill(INITIALVALUE);
    }

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
 // change the board state array and push peg color to state
// if the e.target id includes red
// limit to 4 peg selections per guess | keep track of clicks or keep track of how many
// guesses have been made?


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


// - compare row of pegs against solution pegs by using the every() method
//     - if a peg and peg position matches solution pegs, then update a clue array element to '15' (BLACK)
//     - if a peg matches a solution peg, then update a clue array element to '10' (WHITE)
function handleGuessCheck(){
    const compareGuessWithSolution = (a, b) =>
        a.length === b.length &&
        a.every((element, index) => element === b[index])

    compareGuessWithSolution(guessesBoardState[0], solutionBoardState)
    cluesBoardState[0] = Array(4).fill(CLUE_COLORS[0]);
    console.log(cluesBoardState[0]);
    
    render();
}

// iterate through guessesGridSquares. for each squareEl, if it's red, then add .red class etc...
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
        }
    })
}
    
// combined with renderOutcome | separate them
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
    })
}

function renderMessage(msg){
    mssgEl.innerText = msg;
}

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
        }
    })
}


/*
~~~~~~~~~TO-DO~~~~~~~~~~~~~~~~~~~~~~~~~~
- CSS
    - freeze cells when btn/img changes
        - option: don't use btns, simply change the color of the cell/square
    - Outcome to the bottom of the screen
    - Check btn, Clear btn, Reset Game btn display as a column
        - display: flex | flex-flow: column?
    - Non header text should be larger
- JS
    - refine handlePegSelection() to place selected peg color at the beginning, and then add to the following 
    position


~~~~~~~~~~~USER STORIES~~~~~~~~~~~~~~~~~~
As a Player, I want to select a peg to add to a guess row
- Display 6 peg options of different colors
- When clicked, the peg color should display in the next available Guesses cell
  - next available Guesses cell
    - if first cell doesn't have a null, then add it there, else if cell has null, the add it on a cell 
    with a null

As a Player, I want to check my guess so that I may gather clues for the solution
- Limit 4 pegs per guess
  - Keep 'Check' button disabled until 4 pegs are selected
- If guess is correct, then show the solution


As a Player, I want to clear my guess so that I can add new pegs

As a Player, I want to reset the game so that I can start a new game

As a Player, I want to know the outcome of the game so that I know if I won
-   Display Outcome message after each check
    - Incorrect: 'Keep trying!'
    - Correct: 'You guessed correctly!'
*/