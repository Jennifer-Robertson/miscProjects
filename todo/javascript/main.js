var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.querySelector("li");

function createListElement() {
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(input.value));
    ul.appendChild(listItem);
    input.value = "";


    const dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"))
    listItem.appendChild(dBtn);
}

function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}

function addItemToList() {
    if (inputLength() > 0) {
        createListElement();
    }
}


// dBtn.addEventListener("click", deleteListItem);

enterButton.addEventListener('click', addItemToList);