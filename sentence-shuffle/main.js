import {
    WORDS
} from "./sentences.js";


    
const radioButtons = Array.from(document.querySelectorAll('input'));
radioButtons.forEach(button => {
  button.addEventListener("click", getNumberOfSentences)
})
function getNumberOfSentences(){
  let boxCheck = document.querySelector("#placeForWords");
  // if(boxCheck.hasChildNodes()) {
  //   console.log("top")
  //   return

  // }

  playGame()
}



//creates empty guess boxes and populates shuffled words in guess boxes
function playGame() {
  let numOfWords
  radioButtons.forEach(button => {
    if(button.checked){
      numOfWords = button.value}})
      console.log(numOfWords)
let correctSentence = [];
let currentGuess = [];
let correctSentenceObj = new Object();
let currentGuessObj = new Object();
let sentenceLength;
let attemptNumber=0;



pickSentence(WORDS[numOfWords])
initBoard()

function initBoard() {
  if(correctSentence.length == 0) {
    pickSentence(WORDS[numOfWords])
  }
    let randomSentence = randomizeSentence(correctSentence)
    makeUserGuessBoxes(sentenceLength)
    
    makeShuffleSentenceBoxes(randomSentence)

}


//creates the boxes for the shuffled sentence words to appear in
function makeShuffleSentenceBoxes(randomSentence) {
  let placeForRandomWords = document.getElementById("placeForWords");
  let randomRow = document.createElement("div");
  randomRow.className = "random-row";

  for (let i = 0; i < randomSentence.length; i++) {     

    let randBox = document.createElement("div");
    randBox.className = "rand-box";
    randBox.innerText = randomSentence[i];
    const word = randomSentence[i];
    randBox.addEventListener("click", () => {
      collectUserGuess(word, correctSentence);
    })
    randomRow.appendChild(randBox);
    placeForRandomWords.appendChild(randomRow);
}
}


//creates the boxes for the user guesses to appear in
function makeUserGuessBoxes(sentenceLength) {
  let placeForUserGuess = document.getElementById("placeForUserGuess");
  let guessRow = document.createElement("div");
  guessRow.className = "guess-row";

  for (let i = 0; i < sentenceLength; i++) {
    let box = document.createElement("div");
    box.className = "word-box";
    guessRow.appendChild(box);
    placeForUserGuess.appendChild(guessRow);

}  
}


//returns a random sentence array
function pickSentence(arr) {
  const randomNumber = Math.floor(Math.random()*arr.length);
  correctSentence = arr[randomNumber].split(" ");
  //creates word objects to keep track of the number of times each word is used
  correctSentence.forEach(word => correctSentenceObj[word] = 0);
  correctSentence.forEach(word=> correctSentenceObj[word]++);
  correctSentence.forEach(word => currentGuessObj[word] = 0);
  sentenceLength = correctSentence.length;
}


//returns a shuffled sentence array
function randomizeSentence(arr){
  let randomSentence = arr.slice(0);
  randomSentence.sort(() => Math.random() - 0.5)
  checkForDup(arr, randomSentence)  
  return randomSentence
}


//checks to make sure the sentence is shuffled
//DOESN"T WORK!!!
function checkForDup(arr, random) {
  let count = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i]==random[i]) {
      count++
    }
  }
  if(count==arr.length) {
    randomizeSentence(arr)
  }
}

document.querySelector("#deleteBtn").addEventListener("click", deleteWord)

//deletes the previous user guess
function deleteWord() {
  if(currentGuess.length > 0 && currentGuess.length < sentenceLength) {
    currentGuess.pop();
    populateGuessBoxes();
  }
}


//takes the user guesses and puts them in the guess boxes
function populateGuessBoxes() {
  let wordBox = Array.from(document.querySelectorAll(".guess-row")[attemptNumber].children);

  wordBox.forEach((box, index) => {
    if(currentGuess[index]) {
      box.innerText = currentGuess[index]
    }
    else {
      box.innerText = ""
    }
  })
}


//puts user guess in an array
function collectUserGuess(word, correctSentence) {
    // if(!currentGuess.includes(word)) {
    //   currentGuess.push(word)
    // }
    if(currentGuessObj[word]<correctSentenceObj[word]){
      currentGuessObj[word]++
      currentGuess.push(word)
    }
    populateGuessBoxes()


    if(currentGuess.length==correctSentence.length) {
      checkGuess(currentGuess, correctSentence)
    }
  }


//checks user guess against correct guess
function checkGuess(guess, correctSentence) {
  let rightWords = 0;
  let wordsInCorrectPosition = [];
  for(let i=0; i<guess.length; i++) {
    let wordBox = Array.from(document.querySelectorAll(".guess-row")[attemptNumber].children);
    if(guess[i] == correctSentence[i]) {    
      wordBox[i].classList.add("correct")  
      wordsInCorrectPosition.push([guess[i], i])
      rightWords++
    }
    if(rightWords == guess.length) {
      alert("You got the sentence right!")
    }

  }
}

//creates a new row for the user to guess again
document.querySelector("#guessAgainBtn").addEventListener("click", guessAgain);

function guessAgain() {
  if(currentGuess.length < sentenceLength) {
    return
  }

  attemptNumber++
  currentGuess = [];
  correctSentence.forEach(word => currentGuessObj[word] = 0);
  makeUserGuessBoxes(sentenceLength)

}

//restarts the game board
document.querySelector("#restartBtn").addEventListener("click", restartGame)

function restartGame() {
  correctSentence = [];
  currentGuess = [];
  attemptNumber=0;

  let userGuessBoxes = document.querySelector("#placeForUserGuess")
  let randomWordBoxes = document.querySelector("#placeForWords")

    while(userGuessBoxes.hasChildNodes()) {
      userGuessBoxes.removeChild(userGuessBoxes.firstChild);
    }

    while(randomWordBoxes.hasChildNodes()) {
      randomWordBoxes.removeChild(randomWordBoxes.firstChild);
    }
  
  pickSentence(WORDS[numOfWords])
  initBoard()
}

radioButtons.forEach(button => {
  button.addEventListener("click", () => {
    numOfWords = button.value;
    restartGame()
    })
})
}

























// if ('speechSynthesis' in window) {
//     // Speech Synthesis supported 🎉
//    }else{
//      // Speech Synthesis Not Supported 😣
//      alert("Sorry, your browser doesn't support text to speech!");
//    }

// var msg = new SpeechSynthesisUtterance();
// msg.rate = .5; // From 0.1 to 10
// msg.text = WORDS[numOfWords][0];
// speechSynthesis.speak(msg);

// let button1 = document.querySelector("button")
// button1.addEventListener('click', () => speechSynthesis.speak(msg))