  /*----- CONSTANTS -----*/
/*
const MAX_GUESSES = 10; // 1 guess = a set of 4 pegs
const MAX_PEGS_PER_GUESS = 4; // guess = single row filled with pegs

*/

  /*----- STATE VARIABLES -----*/
/*
- guessesSquares: array[null, ..., null]
- clueSquares: array[null, ..., null]
- outcome: array[null, win, loose]
- solution: array = []
- check button, since this will be enabled only if a guess is complete 
(4 pegs selected in 1 row): boolean false
*/


  /*----- CACHED ELEMENTS  -----*/
/*
- pegs
- guesses squares
- clue squares
- solution pegs
- ... add all buttons

*/

  /*----- EVENT LISTENERS -----*/
/*
  Add event listeners for the following actions  
  - click on any peg 'square' ... for now
  - click on check button
  - click on clear button
  - clck on reset game button 
*/

  /*----- FUNCTIONS -----*/
/*
init(){
    - call initial state of all variables
}

handlePegSelection()
  
handleGuessCheck() // <---- hardest part
- compare row of pegs against solution pegs
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