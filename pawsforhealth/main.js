async function populatePetNames(){
    const res = await fetch('/getPetNames');
    const data = await res.json();
    console.log(data)
}

