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
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addName()
    }
});

function displayNames() {
    const nameList = document.getElementById('nameList') //get ul element
    nameList.innerHTML = '' //clear the list
    for (let i = 0; i < nameArray.length; i++) {
        const name = nameArray[i]

        const li = document.createElement('li')
        li.classList = 'row mb-2 p-1 border'

        const div = document.createElement('div')
        div.classList = 'col-10'

        const h3 = document.createElement('h3')
        h3.textContent = name
        h3.classList = 'mb-0'

        div.appendChild(h3)
        li.appendChild(div)
        nameList.appendChild(li)

        const button = document.createElement('button')
        button.setAttribute('onclick', `removeListItem(${i})`);
        button.textContent = "Remove"
        button.classList = 'col-2 btn btn-primary'
        li.appendChild(button)
    }
}

function removeListItem(listItemNum) {
    for (let i = 0; i < nameArray.length; i++) {
        if (listItemNum === i) {
            nameArray.splice(listItemNum, 1)
            break;
        }
    }
    displayNames()
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