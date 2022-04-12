import {
    WORDS5
} from "./sentences.js";
import {
    WORDS6
} from "./sentences.js";

let sentenceLength = 6;
let currentGuess = [];
let nextWord = 0;

function initBoard() {
    let placeForUserGuess = document.getElementById("placeForUserGuess");
    let guessRow = document.createElement("div");
    guessRow.className = "guess-row";

    let placeForRandomWords = document.getElementById("placeForWords");
    let randomRow = document.createElement("div");
    randomRow.className = "random-row";

    for (let i = 0; i < sentenceLength; i++) {
        let box = document.createElement("div");
        box.className = "word-box";
        box.innerText = WORDS6[0].split(" ")[i];
        guessRow.appendChild(box);

        let randBox = document.createElement("div");
        randBox.className = "rand-box";
        randomRow.appendChild(randBox);

        placeForUserGuess.appendChild(guessRow);
        placeForRandomWords.appendChild(randomRow);
    }


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

function placeRandomWords() {



}

console.log(randArray())
function insertWord() {
    let guessRow = document.getElementsByClassName("guess-row");
    let box = guessRow.children[nextWord]
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextWord += 1;
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