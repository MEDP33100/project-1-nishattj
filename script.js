let storyText = document.getElementById("story-text");
let startButton = document.getElementById("start-button");
let buttonsContainer = document.querySelector(".buttons");
let emoji = document.getElementById("emoji");
let tickingSound = document.getElementById("clock-ticking-sound");
let footstepsSound = document.getElementById("footsteps-sound"); 

tickingSound.volume = 1.0; 
footstepsSound.volume = 0.2; 

function playSounds() {
    tickingSound.play().catch(error => {
        console.log('Clock ticking sound failed to load', error);
    });
    footstepsSound.play().catch(error => {
        console.log('Footsteps sound failed to load', error);
    });
}

gsap.from('.emoji', 
    {
        y: -30, 
        duration: 1.5, 
        repeat: -1, 
        yoyo: true, 
        ease: 'power1.out', 
        });

gsap.to(".arrow", {
    rotation: 360,
    repeat: -1,
    duration: 5,
    ease: "linear"
  });

startButton.addEventListener("click", function() {
    startButton.style.display = 'none'; 
    playSounds();  
    showChoices("Lena stands at the entrance of the tunnel, a dark and foreboding place known to hold the Artifact of Time. What will she do?");
    createChoiceButton("Use the secret entrance", "useSecretEntrance");
    createChoiceButton("Enter the main entrance", "useMainEntrance");
});

function showChoices(text) {
    storyText.innerText = text;
    buttonsContainer.innerHTML = ""; 
}

function createChoiceButton(choiceText, choiceType) {
    let button = document.createElement("button");
    button.innerText = choiceText;
    button.addEventListener("click", function() {
        makeChoice(choiceType);
    });
    buttonsContainer.appendChild(button);
}

function resetGame() {
    buttonsContainer.innerHTML = '';
    makeChoice('start');
}

function makeChoice(choice) {
    if (choice === 'start') {
        showChoices("Lena, an archaeologist, discovers a mysterious tunnel where she finds the Artifact of Time, which can alter the past. Her adventure begins here...");
        createChoiceButton("Use the secret entrance", "useSecretEntrance");
        createChoiceButton("Enter through the main entrance", "useMainEntrance");
    }
    else if (choice === "useSecretEntrance" || choice === "useMainEntrance") {
        showChoices("Lena enters the tunnel, but a heavy iron gate blocks her path, testing her intelligence or strength.");
        createChoiceButton("Attempt to pick the lock", "pickLock");
        createChoiceButton("Search for another way around", "findAlternative");
    }
    else if (choice === "pickLock" || choice === "findAlternative") {
        showChoices("The Artifact of Time is ahead, but her rival Victor is here.");
        createChoiceButton("Fight Victor", "fightVictor");
        createChoiceButton("Make a deal with Victor", "dealVictor");
    }
    else if (choice === "fightVictor" || choice === "dealVictor") {
        showChoices("Lena was able to reach the Artifact of Time and now she must decide its fate.");
        createChoiceButton("Use the artifact to save the world", "saveWorld");
        createChoiceButton("Destroy the artifact to prevent misuse", "destroyWorld");
    }
    else if (choice === "saveWorld" || choice === "destroyWorld") {
        showChoices("The world’s fate is sealed");
        createChoiceButton("The End", "endQuest");
        createChoiceButton("Start Again", "start");
    }
    else if (choice === "endQuest") {
        storyText.innerText = "Thank you for playing The Artifact of Time Quest!";
        buttonsContainer.innerHTML = "";
    }
}

