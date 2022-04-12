//set variables to get access to HTML elements

var toDoItem = document.getElementById("userInput");
var enterButton = document.getElementById("enter");
var ul = document.querySelector("ul");
var li = document.querySelector("li");

var toDoList = JSON.parse(localStorage.getItem("toDo"));
console.log(toDoList)



//can populate to-dos based on an existing array

if (toDoList != null) {
    toDoList.forEach(item => createNewElements(item));
}
else {
    toDoList=[];
}

// //check to see if user input is empty
function taskNameLength() {
    return toDoItem.value.length > 0;
}

//creates new elements to add to ul

function createNewElements(item = toDoItem.value) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(item));

    ul.appendChild(li)
    if (toDoList.includes(item) === false) {
        toDoList.push(item);
        localStorage.setItem("toDo", JSON.stringify(toDoList));
    }

    toDoItem.value = "";

    let dBtn = document.createElement("a");
    dBtn.innerHTML = "<img src='fire.png'>";
    li.appendChild(dBtn);


    //deletes list item to clear task    
    dBtn.addEventListener("click", deleteFromList)

    //removes from page and deletes from to do list array
    function deleteFromList() {
        li.classList.add("delete");
        for(var i = 0; i < toDoList.length; i++) {
            if(toDoList[i] === li.innerText) {
                toDoList.splice(i, 1);
                localStorage.setItem("toDo", JSON.stringify(toDoList));
            }
        }
    }
    //adds green background to completed tasks and a fire extinguisher :)
    li.addEventListener("click", () => {
        li.classList.toggle("done");
        if (li.classList.contains("done")) {
            dBtn.innerHTML = "<img src='nofire.png'>";
            li.style.color = "green";
        } else {
            dBtn.innerHTML = "<img src='fire.png'>";
            li.style.color = "white";
        }
    });
}

function addToList() {
    if (taskNameLength()) {
        createNewElements();
    }

}
//enter Button event listener
enterButton.addEventListener("click", addToList);


//functionality for enter keypress


toDoItem.addEventListener("keypress", (event) => {
    if (taskNameLength() && event.keyCode == 13) {
        event.preventDefault();
        createNewElements();
    }

});