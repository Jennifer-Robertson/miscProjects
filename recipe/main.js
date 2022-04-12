const select = document.querySelector("#recipeList");
const key = config.API_KEY;

//populate options
function createDropDown() {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}`)
        .then(res => res.json())
        .then(data => {

            for (let i = 0; i < data.results.length; i++) {
                const option = document.createElement("option")
                option.value = data.results[i].id
                option.innerText = data.results[i].title
                document.querySelector("#recipeList").appendChild(option)
            }
        })
}

createDropDown()

//trigger new API request to get recipe once dropdown item is selected
select.addEventListener('change', event => {

    const foodID = event.target.value;

    //removes the hidden class so that instructions and ingredients are shown
    let unhide = Array.from(document.querySelectorAll('.hidden'))
    for(let item of unhide) {
        item.classList.remove('hidden')
    }

    fetch(`https://api.spoonacular.com/recipes/${foodID}/information?apiKey=${key}`)
        .then(res => res.json())
        .then(data => {
            let ingLength = data.extendedIngredients.length
            document.querySelector("#placeForIngredients").innerText = [...Array(ingLength)].map((el, i) => data.extendedIngredients[i].original).join(",  ");

            //checks if instructions are available for the recipe
            if (data.instructions !== null) {
                document.querySelector("#placeForSteps").innerHTML = data.instructions
            } else {
                document.querySelector("#placeForSteps").innerHTML = "No instructions currently available for this recipe"
            }

            document.querySelector("#placeForFoodName").innerText = data.title;
            document.querySelector("#placeForImg").src = data.image;

        })
})