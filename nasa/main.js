const key = config.API_KEY;

//date must be later than 06/16/1995 to get pictures/data

document.querySelector("#btn").addEventListener("click", getInfo)

function getInfo () {
    let date1 = document.querySelector("input").value;
    console.log(date1)

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date1}`)
.then(res => res.json())
.then(data => {
    console.log(data)
    document.querySelector("#placeForImg").src = data.url
});


}

