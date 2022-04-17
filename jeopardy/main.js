//INITIALIZE GAME BOARD ON PAGE LOAD
initBoard()
initCatRow()

document.querySelector('button').addEventListener('click', buildCategories)


function initCatRow() {
    let catRow = document.querySelector("#category-row")

    for(let b=0; b<6; b++) {
        let box = document.createElement("div");
        box.className = "category-box clue-box";
        catRow.appendChild(box)
    }
}

function initBoard() {
    let board = document.querySelector("#clue-board")
//GENERATE 5 ROWS, THEN PLACE 6 BOXES IN EACH ROW
    for(let r = 0; r < 5; r++){
        let row = document.createElement("div");
        let boxValue = (r+1) * 200;
        row.className = "clue-row";

        for(let b=0; b<6; b++) {
            let box = document.createElement("div");
            box.className = "clue-box";
            box.innerText = `$${boxValue}`
            box.addEventListener("click", getClue, false)
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function randInt() {
    return Math.floor(Math.random() * 18418 + 1)
}

let catArray = [];
function buildCategories() {
    if(!(document.getElementById("category-row").firstChild.innerText == "")) {
        resetBoard()
    }
    
    const fetchReq1 =  fetch(`https://jservice.io/api/category?&id=${randInt()}`)
    .then(res => res.json())

    const fetchReq2 =  fetch(`https://jservice.io/api/category?&id=${randInt()}`)
    .then(res => res.json())

    const fetchReq3 =  fetch(`https://jservice.io/api/category?&id=${randInt()}`)
    .then(res => res.json())

    const fetchReq4 =  fetch(`https://jservice.io/api/category?&id=${randInt()}`)
    .then(res => res.json())

    const fetchReq5 =  fetch(`https://jservice.io/api/category?&id=${randInt()}`)
    .then(res => res.json())

    const fetchReq6 =  fetch(`https://jservice.io/api/category?&id=${randInt()}`)
    .then(res => res.json())

    const allData = Promise.all([fetchReq1, fetchReq2, fetchReq3, fetchReq4, fetchReq5, fetchReq6 ])

    allData.then(res => {
        catArray = res
        setCategories(catArray)
    })
}

//RESET BOARD AND $$ AMOUNT IF NEEDED

function resetBoard() {
    let clueParent = document.querySelector("#clue-board")
    while(clueParent.firstChild) {
        clueParent.removeChild(clueParent.firstChild)
    }
    let catParent = document.querySelector("#category-row")
    while(clueParent.firstChild) {
        catParent.removeChild(catParent.firstChild)
    }
    document.querySelector("#score").innerHTML = 0;
    initBoard()
}
function setCategories(arr) {
    let titleBoxes = Array.from(document.querySelectorAll(".category-box"))
    titleBoxes.forEach((box, i) => {
        box.innerHTML = arr[i].title
    })
}
//FIGURE OUT WHICH ITEM WAS CLICKED

function getClue(event) {
    let child = event.currentTarget
    child.classList.add('clicked-box');
    let boxValue = child.innerHTML.slice(1)
    let parent = child.parentNode
    let index = Array.prototype.findIndex.call(parent.children, (c) => c === child)
    let cluesList = catArray[index].clues
    let clue = cluesList.find(obj => obj.value == boxValue)

    showQuestion(clue, child, boxValue)

}

//SHOW QUESTION TO USER AND GET THEIR ANSWER

function showQuestion(clue, target, value) {
    let userAnswer = prompt(clue.question).toLowerCase();
    let correctAnswer = clue.answer.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "")
    let possiblePoints = +(value)
    target.innerHTML = clue.answer
    target.removeEventListener("click", getClue, false)

    checkAnswer(userAnswer, correctAnswer, possiblePoints)
}
//EVAL ANSWER AND SHOW TO USER TO CONFIRM
function checkAnswer(userAnswer, correctAnswer, possiblePoints) {

    let checkAnswer = (userAnswer == correctAnswer) ? 'correct' : 'incorrect'
    let confirmAnswer = confirm(`For ${possiblePoints}, you answered "${userAnswer}", and the correct answer is "${correctAnswer}". Your answer appears to be ${checkAnswer}. Click OK to accept or click Cancel if the answer was not properly evaluated`);

    awardPoints(checkAnswer, confirmAnswer, possiblePoints)

}

function awardPoints(checkAnswer, confirmAnswer, possiblePoints) {
    let currentScore = +(document.querySelector("#score").innerHTML)
    if(!(checkAnswer == 'incorrect' && confirmAnswer == true)) {
        currentScore += possiblePoints;
    }
    else {
        currentScore -= possiblePoints;
    }

    document.querySelector("#score").innerHTML = currentScore
}