document.querySelector(".enterButton").addEventListener('click', checkGuessAgainstWord);

const placeForLetters = document.querySelector("#placeForLetters");

let guessedCorrectLetters = [];
let lives = 6;
const randomWord = "cashed";
blankWordSpaces(randomWord);
// placeForLetters.innerText = emptyWord;


function checkGuessAgainstWord() {
let userGuess = document.querySelector(".userInput").value;

if(validateUserGuess(userGuess)) {
    //checks user guess against random word
    for(let i=1; i <= randomWord.length; i++){
        //selects the right div and if the letter is correct, fills the correct letter in the div
        let currentLetterBox = document.querySelector(`#placeForLetters :nth-child(${i}`);
            if(userGuess===randomWord[i-1]) {
                currentLetterBox.innerText = userGuess;
                //puts correct letters in an array
                guessedCorrectLetters.push(userGuess);
            }
        }
    //if letter is not in the correct letter list, lose a life
    if(!guessedCorrectLetters.includes(userGuess)) {
        lives -= 1;
        if(lives===0) {
            alert("You lose")
        }
    }
    userGuess = " ";
    console.log(lives);
    
}

else {
    alert("Please only enter 1 letter")
}
console.log(userGuess)

}

//checks to see if user guess is the  right number of letters
function validateUserGuess(guess) {
    if(guess.length===1 && isNaN(Number(guess))) {
        return true;
    }
    return false;
}

//creates blank divs equal to the length of the random word
function blankWordSpaces(randomWord) {
    // let blankWord = [];
        for(let i=0; i<randomWord.length; i++) {
        // blankWord.push("_");
        letterDiv = document.createElement("div");
        letterDiv.classList.add("letterBox");
        placeForLetters.appendChild(letterDiv);
        
}
}