const nameArray = [] //create a list to store names

function addName() {
    //grab a trimmed version of the name in the input
    const nameInput = document.getElementById('nameInput')
    const name = nameInput.value.trim()
    if (!nameInput.value.trim()) { //if value is empty with spaces removed, alert user
        alert("Enter a Valid Name!")
    } else {
        nameArray.push(name)
        displayNames()
        nameInput.value = ''
    }
}

document.getElementById('addNameBtn').addEventListener("click", addName)

function displayNames() {
    const nameList = document.getElementById('nameList') //get ul element
    nameList.innerHTML = '' //clear the list
    for (let i = 0; i < nameArray.length; i++) {
        const name = nameArray[i]

        const li = document.createElement('li')
        li.className = 'list-group-item'

        const span = document.createElement('span')
        span.textContent = name

        li.appendChild(span)
        nameList.appendChild(li)
    }
}

function generateName() {
    const randomName = document.getElementById('randomName')
    if (!nameArray[0]) {
        alert("There are no names left to pick from!")
    } else {
        let randomNumber = Math.floor(Math.random() * nameArray.length)
        randomName.innerText = nameArray[randomNumber]
        nameArray.splice(randomNumber, 1)
        displayNames()
    }
}

document.getElementById('pickRandomBtn').addEventListener("click", generateName)