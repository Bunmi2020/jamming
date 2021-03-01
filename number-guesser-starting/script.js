let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
const generateTarget = () => {
    let randomNum = Math.floor(Math.random () * 10);
    return randomNum;
 }
 const compareGuesses = (currentHumanGuess, computerGuess, generateTarget) => {
 if(Math.abs(generateTarget - computerGuess) < Math.abs(generateTarget - currentHumanGuess)) {
 return false;
 } else {
   return true;
 }
 }
 const updateScore = (winner) => {
   if(winner === 'human'){
     return humanScore++;
   } else {
      return computerScore++;
   }
 };
 
 const advanceRound = (winner) => {
     if(winner === 'human'){
         return currentRoundNumber++;
     } else {
      return currentRoundNumber++;
     }
 }