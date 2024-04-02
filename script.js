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
        div.classList = 'col-8'

        const h3 = document.createElement('h3')
        h3.textContent = name
        h3.classList = 'mb-0'

        div.appendChild(h3)
        li.appendChild(div)
        nameList.appendChild(li)

        const button = document.createElement('button')
        button.setAttribute('onclick', `removeListItem(${i})`);
        button.textContent = "Remove"
        button.classList = 'col-4 btn btn-primary'
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

const reelElement = document.querySelector('.reel');
const spinButton = document.getElementById('spinButton');
let currentIndex = 0;
let spinning = false;

function getNextName() {
    currentIndex++;
    if (currentIndex >= nameArray.length) {
        currentIndex = 0;
    }
    return nameArray[currentIndex];
}

function generateName() {
    if (!nameArray[0]) {
        alert("There are no names left to pick from!")
    } else {
        if (!spinning) {
            spinning = true;
            const spins = Math.floor(Math.random() * 11) + 20; // Random number of spins between 20 and 30
            let spinCount = 0;
    
            function doSpin() {
                const currentName = getNextName();
                const nextName = currentName;
    
                let animationDuration = 500; // Default duration
    
                if (spinCount < spins - 15) {
                    // Speed up at the start
                    animationDuration = 50;
                } else if (spinCount < spins - 7) {
                    // Slow down a bit
                    animationDuration = 150;
                } else if (spinCount < spins - 3) {
                    // Slow down a bit
                    animationDuration = 300;
                }
    
                const upAnimation = reelElement.children[0].animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-100%)' }
                ], { duration: animationDuration, fill: 'forwards' });
    
                upAnimation.onfinish = () => {
                    reelElement.children[0].textContent = nextName;
                    reelElement.children[0].style.transform = 'translateY(100%)';
                    reelElement.children[0].animate([
                        { transform: 'translateY(100%)' },
                        { transform: 'translateY(0)' }
                    ], { duration: animationDuration, fill: 'forwards' }).onfinish = () => {
                        spinCount++;
                        if (spinCount < spins) {
                            doSpin(); // Repeat the spin if spinCount is less than spins
                        } else {
                            spinning = false; // Set spinning to false after all spins are completed
                            nameArray.splice(currentIndex, 1)
                            displayNames()
                            //add sound effect
                            //if get casino lights working then make them all blink before returning to before
                        }
                    };
                };
            }
    
            doSpin(); // Start the first spin
        }
    }
}

document.getElementById('pickRandomBtn').addEventListener("click", generateName)