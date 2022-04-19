import {
    WORDS5
} from "./sentences.js";
import {
    WORDS6
} from "./sentences.js";


let currentGuess = [];
let currentIndexes = [];
let correctSentence;

//creates empty guess boxes and populates shuffled words in guess boxes
function initBoard() {

    let randomSentence = pickRandomSentence(WORDS6)
    let placeForUserGuess = document.getElementById("placeForUserGuess");
    let guessRow = document.createElement("div");
    guessRow.className = "guess-row";

    let placeForRandomWords = document.getElementById("placeForWords");
    let randomRow = document.createElement("div");

    randomRow.className = "random-row";


    for (let i = 0; i < randomSentence.length; i++) {
        let box = document.createElement("div");
        guessRow.appendChild(box);
        

        let randBox = document.createElement("div");
        randBox.className = "rand-box";
        randBox.className = "word-box";
        randBox.innerText = randomSentence[i];
        const word = randomSentence[i];
        randBox.addEventListener("click", () => {
          insertWord(word);
        })
        randomRow.appendChild(randBox);

        placeForUserGuess.appendChild(guessRow);
        placeForRandomWords.appendChild(randomRow);
    }


}
//returns a random, shuffled sentence array
function pickRandomSentence(arr) {
  const randomNumber = Math.floor(Math.random()*arr.length);
  correctSentence = WORDS6[randomNumber].split(" ");
  const randomSentence = shuffle(correctSentence);
  return randomSentence;
}



//shuffles array

function shuffle(array) {
    var copy = [], n = array.length, i;
  
    // While there remain elements to shuffle…
    while (n) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);
  
      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
  
    return copy;
  }

function insertWord(word) {

    const userGuess = word;

    // if(!currentGuess.includes(word) && (!currentIndexes.includes(correctSentence.indexOf(word)))) {
    //   currentGuess.push(word)
    //   currentIndexes.push(correctSentence.indexOf(word))
    //   console.log(currentIndexes)
    // }
    



}

function checkWordLocation(word, correctSentence) {

}



initBoard()

























// if ('speechSynthesis' in window) {
//     // Speech Synthesis supported 🎉
//    }else{
//      // Speech Synthesis Not Supported 😣
//      alert("Sorry, your browser doesn't support text to speech!");
//    }

// var msg = new SpeechSynthesisUtterance();
// msg.rate = .5; // From 0.1 to 10
// msg.text = WORDS5[0];
// speechSynthesis.speak(msg);

// let button1 = document.querySelector("button")
// button1.addEventListener('click', () => speechSynthesis.speak(msg))