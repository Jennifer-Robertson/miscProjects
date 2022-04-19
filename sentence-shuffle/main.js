import {
    WORDS5
} from "./sentences.js";
import {
    WORDS6
} from "./sentences.js";


let currentGuess = [];
let correctSentence = pickSentence(WORDS5);


//creates empty guess boxes and populates shuffled words in guess boxes
function initBoard() {

    let randomSentence = randomizeSentence(correctSentence)
    let placeForUserGuess = document.getElementById("placeForUserGuess");
    let guessRow = document.createElement("div");
    guessRow.className = "guess-row";

    let placeForRandomWords = document.getElementById("placeForWords");
    let randomRow = document.createElement("div");

    randomRow.className = "random-row";


    for (let i = 0; i < randomSentence.length; i++) {
        let box = document.createElement("div");
        box.className = "word-box";
        guessRow.appendChild(box);
        

        let randBox = document.createElement("div");
        randBox.className = "rand-box";
        randBox.innerText = randomSentence[i];
        const word = randomSentence[i];
        randBox.addEventListener("click", () => {
          collectUserGuess(word);
        })
        randomRow.appendChild(randBox);

        placeForUserGuess.appendChild(guessRow);
        placeForRandomWords.appendChild(randomRow);
    }


}
//returns a random sentence array
function pickSentence(arr) {
  const randomNumber = Math.floor(Math.random()*arr.length);
  const sentence = arr[randomNumber].split(" ");
  return sentence
}
//returns a shuffled sentence array
function randomizeSentence(arr){
  const randomSentence = shuffle(arr);
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
//puts user guess in an array
function collectUserGuess(word) {
    if(!currentGuess.includes(word)) {
      currentGuess.push(word)
      console.log(currentGuess)
    }
    let wordBox = Array.from(document.querySelectorAll(".word-box"))
    currentGuess.forEach((guess, i) => {
      wordBox[i].innerText = guess;

    })
    if(currentGuess.length==correctSentence.length) {
      checkGuess(currentGuess, correctSentence)
    }
  }
//checks user guess against correct guess
function checkGuess(guess, sentence) {
  for(let i=0; i<guess.length; i++) {
    console.log(guess[i])
      console.log(sentence[i])
    if(guess[i] == sentence[i]) {
      console.log(correct)
    }
  }
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