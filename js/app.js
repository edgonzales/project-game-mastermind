  /*----- CONSTANTS -----*/
const MAX_GUESSES = 10; // 1 guess = a set of 4 pegs
const MAX_PEGS_PER_GUESS = 4; // guess = single row filled with pegs
const RED = 1;
const PINK = 2;
const GREEN = 3;
const BLUE = 4;
const PURPLE = 5;
const YELLOW = 6;
const BLACK = 15;
const WHITE = 10;
const PEG_COLORS = [RED, PINK, GREEN, BLUE, PURPLE, YELLOW];


  /*----- STATE VARIABLES -----*/
/*
- DONE. guessesBoardState: array[null, ..., null]
- DONE. clueSquares: array[null, ..., null]
- outcome: array[null, win, loose]
- DONE. solution: array = []
- DONE. check button, since this will be enabled only if a guess is complete 
(4 pegs selected in 1 row): boolean false
*/
let guessesBoardState = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
]

let clueSquares = [
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
]

let solution; // random set of pegs the user is trying to guess
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
const guessesGridSquares = document.querySelectorAll('#guesses-grid tr td'); // I may need selected pegs
const cluesGridSquares = document.querySelectorAll('#clues-grid tr td');
const solutionsGridSquares = document.querySelectorAll('#solutions-grid tr td');

  /*----- EVENT LISTENERS -----*/
/*
  Add event listeners for the following actions  
  - click on any peg 'square' ... for now
  - click on check button
  - click on clear button
  - clck on reset game button
*/

// pegs.addEventListener('click', handlePegsSelection);


  /*----- FUNCTIONS -----*/

init()

function init(){
    guessesBoardState;
    clueSquares;
    secretSolution = []; 
    // select 4 random peg colors and store them in an array
    for(let i = 0; i < PEG_COLORS.length; i++){
        let randomPegColor = PEG_COLORS[(Math.floor(Math.random() * PEG_COLORS.length))];
        secretSolution.push(randomPegColor);
    }
    console.log(secretSolution);
}

/*
handlePegSelection()
  
handleGuessCheck() // <---- hardest part
- compare row of pegs against solution pegs by using the every() method
    - if a peg and peg position matches solution pegs, then update a clue cell to 'black'
    - if a peg matches a solution peg, then update a clue cell to 'white'

handleRowGuessClear()

handleGameReset()


render() {
    renderBoard();
    renderSelectedPegOnGuesses();
    renderClues();
    renderOutcomeMessages();
    renderSolution()
}

renderBoard(){

}

renderSelectedPegOnGuesses(){
    - 
}

renderClues() {

}
renderOutcomeMessages(){
    - if(lose) return message '...'
    - if (win) return message '...'
}

renderSolution()


*/
/*
~~~~~~~~~QUESTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~


~~~~~~~~~TO-DO~~~~~~~~~~~~~~~~~~~~~~~~~~
- CSS
    - freeze cells when btn/img changes
        - option: don't use btns, simply change the color of the cell/square
    - Outcome to the bottom of the screen
    - Check btn, Clear btn, Reset Game btn display as a column
        - display: flex | flex-flow: column?
    - Non header text should be larger
-


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
- 

As a Player, I want to clear my guess so that I can add new pegs

As a Player, I want to reset the game so that I can start a new game

As a Player, I want to know the outcome of the game so that I know if I won
*/