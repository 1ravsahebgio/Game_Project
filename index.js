let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let checkBtn = document.getElementById("checkBtn");
let guessInput = document.getElementById("guess");
let resetBtn = document.getElementById("reset");

let soundFiles = [
    "01 - Free Fire Lobby Original.mp3",
    "02 - Free Fire Lobby Electronic Guitar.mp3",
    "03 - Free Fire Lobby Winterlands I.mp3",
    "04 - Free Fire Lobby World Cup I.mp3",
    "05 - Free Fire Lobby Winterlands II.mp3",
    "06 - Free Fire Lobby World Series I.mp3",
    "free_fire.mp3",
    "08 - Free Fire Booyah!.mp3"
];

let currentSoundIndex = 0;
let soundPlaying = false;  // Flag to check if a sound is playing

// Play sounds in sequence without overlap
function playSound() {
    if (soundPlaying) return;  // Prevent overlapping sounds

    soundPlaying = true; // Set flag to true indicating a sound is playing

    let sound = new Audio(soundFiles[currentSoundIndex]);
    sound.play();

    sound.onended = function () {
        soundPlaying = false; // Reset flag after the sound finishes
        currentSoundIndex++;

        if (currentSoundIndex >= soundFiles.length) {
            currentSoundIndex = 0; // Reset to the beginning of the sound list
        }

        playSound(); // Play the next sound
    };
}

function playVictorySound() {
    let victorySound = new Audio("08 - Free Fire Booyah!.mp3");
    victorySound.play();
}

guessInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkGuess();
        checkBtn.classList.add("active"); // Hover effect on Enter
        setTimeout(() => checkBtn.classList.remove("active"), 200);
    }
});

checkBtn.addEventListener("click", checkGuess);

function checkGuess() {
    let userGuess = Number(guessInput.value);
    let message = document.getElementById("message");
    let attemptsText = document.getElementById("attempts");

    if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
        message.innerHTML = "⚠️ Enter a valid number between 1 and 100!";
        message.className = "warning";
        guessInput.value = ""; // Clear input field
        return;
    }

    attempts++;

    // Play the sound for each guess (one sound per guess)
    playSound();

    if (userGuess === secretNumber) {
        message.innerHTML = `🎉 Congratulations! You guessed it in ${attempts} tries!`;
        message.className = "correct";
        checkBtn.classList.add("disabled");
        checkBtn.disabled = true;
        guessInput.disabled = true;
        resetBtn.classList.remove("hidden");

        // Play victory sound
        playVictorySound();

        // Background Animation when guessed correctly
        document.body.style.animation = "bgAnimation 10s ease infinite";

        // Confetti Effect
        createConfetti();
    } else if (Math.abs(userGuess - secretNumber) <= 5) {
        message.innerHTML = "🔥 You're very close! Try again!";
        message.className = "warning";
        guessInput.value = ""; // Clear wrong guess
    } else {
        message.innerHTML = userGuess < secretNumber ? "⬆️ Try a bigger number!" : "⬇️ Try a smaller number!";
        message.className = "wrong";
        guessInput.value = ""; // Clear wrong guess
    }

    attemptsText.innerHTML = `Attempts: ${attempts}`;
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById("message").innerHTML = "";
    document.getElementById("message").className = "";
    guessInput.value = "";
    guessInput.disabled = false;
    document.getElementById("attempts").innerHTML = "";
    checkBtn.classList.remove("disabled");
    checkBtn.disabled = false;
    document.getElementById("reset").classList.add("hidden");

    // Reset background animation
    document.body.style.animation = "bgAnimation 10s ease infinite"; // Restart background animation when the game resets
}

// Confetti Effect Function
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        confetti.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s"; // Random animation duration
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 7000); // Set to 7 seconds for the confetti to stay
    }
}

