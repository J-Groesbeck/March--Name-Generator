// Array to store names
const nameArray = [];

// Function to add a name to the list
function addName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim(); // Get trimmed name from input
    if (!nameInput.value.trim()) { // If name is empty, alert user
        alert("Enter a Valid Name!");
    } else {
        nameArray.push(name); // Add name to array
        displayNames(); // Update displayed names
        nameInput.value = ''; // Clear input field
    }
}

// Event listeners for add button and Enter key
document.getElementById('addNameBtn').addEventListener("click", addName);
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addName();
    }
});

// Function to display names in the list
function displayNames() {
    const nameList = document.getElementById('nameList'); // Get ul element
    nameList.innerHTML = ''; // Clear the list
    for (let i = 0; i < nameArray.length; i++) {
        const name = nameArray[i];

        // Create li element
        const li = document.createElement('li');
        li.classList = 'row mb-2 p-1 border';

        // Create div element
        const div = document.createElement('div');
        div.classList = 'col-8';

        // Create h3 element
        const h3 = document.createElement('h3');
        h3.textContent = name;
        h3.classList = 'mb-0';

        // Append elements
        div.appendChild(h3);
        li.appendChild(div);
        nameList.appendChild(li);

        // Create button element
        const button = document.createElement('button');
        button.setAttribute('onclick', `removeListItem(${i})`);
        button.textContent = "Remove";
        button.classList = 'col-4 btn btn-danger';
        li.appendChild(button);
    }
}

// Function to remove a name from the list
function removeListItem(listItemNum) {
    for (let i = 0; i < nameArray.length; i++) {
        if (listItemNum === i) {
            nameArray.splice(listItemNum, 1); // Remove name from array
            break;
        }
    }
    displayNames(); // Update displayed names
}

// Variables for the slot machine effect
const reelElement = document.querySelector('.reel');
const spinButton = document.getElementById('spinButton');
let currentIndex = 0;
let spinning = false;

// Function to get the next name in the array
function getNextName() {
    currentIndex++;
    if (currentIndex >= nameArray.length) {
        currentIndex = 0;
    }
    return nameArray[currentIndex];
}

let lightsOn = true
let lightsArray = document.querySelectorAll('.lights');

// Function to generate a name with slot machine effect
function generateName() {
    if (!nameArray[0]) {
        alert("There are no names left to pick from!");
    } else {
        if (!spinning) {
            spinning = true;
            const spins = Math.floor(Math.random() * 11) + 20; // Random number of spins between 20 and 30
            let spinCount = 0;

            // Recursive function to spin the reel
            function doSpin() {
                const currentName = getNextName();
                const nextName = currentName;

                let animationDuration = 500; // Default duration

                if (spinCount < spins - 15) {
                    animationDuration = 50; // Speed up at the start
                } else if (spinCount < spins - 7) {
                    animationDuration = 150; // Slow down a bit
                } else if (spinCount < spins - 3) {
                    animationDuration = 300; // Slow down a bit
                }

                // Animation for moving name up
                const upAnimation = reelElement.children[0].animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-100%)' }
                ], { duration: animationDuration, fill: 'forwards' });

                // Update name and move it back down
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
                            nameArray.splice(currentIndex, 1); // Remove selected name from array
                            displayNames(); // Update displayed names
                            winSoundEffect(); // Play win sound effect
                            // Blink lights before returning to original state
                            clearInterval(lightsInterval);
                            for (let i = 0; i < 3; i++) {
                                setTimeout(() => {
                                    for (let j = 0; j < lightsArray.length; j++) {
                                        lightsArray[j].src = 'imgs/light-4.png';
                                    }
                                    setTimeout(() => {
                                        for (let j = 0; j < lightsArray.length; j++) {
                                            lightsArray[j].src = 'imgs/light-1.png';
                                        }
                                    }, 500);
                                }, i * 1000);
                            }
                            if (lightsOn) {
                                setTimeout(reactivateLights, 3000); // Reactivate lights after blinking
                            }
                        }
                    };
                };
            }
            doSpin(); // Start the first spin
        }
    }
}

// Function to play win sound effect
function winSoundEffect() {
    let snd = new Audio("sfx/win-sfx.mp3");
    snd.play();
}

// Variables for lever animation
let lever = document.getElementById("lever");
let topLever = document.querySelector(".top");
let isDragging = false;

// Functions for lever animation
function initializePull() {
    isDragging = true;
}
function startPull() {
    if (isDragging) {
        topLever.classList.add("pull");
    }
}
function endPull() {
    if (isDragging) {
        isDragging = false;
        topLever.classList.remove("pull");
        generateName(); // Generate name after releasing lever
    }
}

// Event listeners for lever animation
lever.addEventListener("mousedown", initializePull);
document.addEventListener("mousemove", startPull);
document.addEventListener("mouseup", endPull);

// Function to create a blinking effect for lights
let lightsInterval; // Interval ID
function lightsLoop() {
    let i = 0;
    lightsInterval = setInterval(() => {
        for (let j = 0; j < lightsArray.length; j++) {
            let imageIndex = (4 - i + j) % 4 + 1; // Calculate image index from 1 to 4
            lightsArray[j].src = `imgs/light-${imageIndex}.png`;
        }
        i = (i + 1) % 4; // Increment i for the next iteration
    }, 50);
}
lightsLoop(); // Start the lights loop

// Function to deactivate lights
function deactivateLights() {
    if (document.getElementById('reactivateLightsBtn').classList.contains('d-none')) {
        document.getElementById('deactivateLightsBtn').classList.add('d-none');
        document.getElementById('reactivateLightsBtn').classList.remove('d-none');
    }
    lightsOn = false;
    clearInterval(lightsInterval); // Stop the interval
    for (let i = 0; i < lightsArray.length; i++) {
        setTimeout(() => {
            lightsArray[i].src = `imgs/light-1.png`;
        }, i * 15); // Wait 15ms before setting each light
    }
}

// Event listener for deactivating lights
document.getElementById('deactivateLightsBtn').addEventListener("click", deactivateLights);

// Function to reactivate lights
function reactivateLights() {
    document.getElementById('deactivateLightsBtn').classList.remove('d-none');
    document.getElementById('reactivateLightsBtn').classList.add('d-none');
    lightsOn = true;
    for (let i = 0; i < lightsArray.length; i++) {
        setTimeout(() => {
            let imageIndex = (i % 4) + 1; // Calculate image index from 1 to 4
            lightsArray[i].src = `imgs/light-${imageIndex}.png`;
        }, i * 15); // Wait 15ms before setting each light
    }
    lightsLoop(); // Restart the lights loop
}

// Event listener for reactivating lights
document.getElementById('reactivateLightsBtn').addEventListener("click", reactivateLights);
