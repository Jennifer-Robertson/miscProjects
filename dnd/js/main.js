populateClasses()

//populates dropdown list from array
function populateClasses() {
    const classes = ["bard" , "cleric" , "druid" , "paladin" , "ranger" , "sorcerer" , "warlock" , "wizard"]
    let classList = document.querySelector("#classList")

    classes.forEach(c => {
        let opt = document.createElement("option");
        opt.innerHTML = c;
        opt.value = c;
         classList.appendChild(opt)
    })
}

const select = document.querySelector("#classList")
select.addEventListener('change', event => {

    const className = event.target.value;
    getSpells(className)
})

// document.querySelector("#classBtn").addEventListener("click", getSpells)
document.querySelector("#spellBtn").addEventListener("click", getInfoForSpell)


//gets the list of spells available to the class and populates the spell dropdown
function getSpells(className) {
    resetOptions()
    // const selectedClass = document.querySelector("#classList")

    // const chosenClass = selectedClass.options[selectedClass.selectedIndex].text
    
    let spellList = document.querySelector("#spellList") 
    fetch(`https://www.dnd5eapi.co/api/classes/${className}/spells`)
    .then(res => res.json())
    .then(data => {
        //populates a secondary dropdown with spells for the chosen class
        data.results.forEach(spell => {
            let opt = document.createElement("option");
            opt.innerHTML = spell.name;
            opt.value = spell.index;
            spellList.appendChild(opt)
        })     
    })
}

//removes options from the spell list
function resetOptions() {
    let listParent = document.querySelector("#spellList")
    while(listParent.firstChild) {
        listParent.removeChild(listParent.firstChild)
    }
}

function getInfoForSpell() {
    const selectedSpell = document.querySelector("#spellList")
    const chosenSpell = selectedSpell.options[selectedSpell.selectedIndex].value
    console.log(chosenSpell)
    fetch(`https://www.dnd5eapi.co/api/spells/${chosenSpell}`)
    .then(res => res.json())
    .then(data => {
        document.querySelector("#sName").innerText = data.name
        document.querySelector("#sDesc").innerText = data.desc[0]
        document.querySelector("#sLevel").innerText = data.level
        document.querySelector("#sRange").innerText = data.range
        document.querySelector("#sDuration").innerText = data.duration
        document.querySelector("#sSubclasses").innerText = data.subclasses.map(s => s.name).join(", ");
    
    })
}

// function populateInfoOnPage(name, description, level, range, duration, subclasses) {

// }