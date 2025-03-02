// Random Secret Number
let secretNumber = Math.floor(Math.random() * 2) + 59;
let attempts = 0;

// Get Elements
let checkBtn = document.getElementById("checkBtn");
let guessInput = document.getElementById("guess");
let resetBtn = document.getElementById("reset");
let message = document.getElementById("message");
let attemptsText = document.getElementById("attempts");

// Background Music
let bgMusic = new Audio("Free_Fire_All.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;
bgMusic.play();

// Victory Sounds
let victorySounds = [
    "song20.mp3", "song21.mp3", "song22.mp3", "song23.mp3", "song24.mp3",
    "song25.mp3", "song26.mp3"
];

// Special Victory Sounds
let jethalalSound = "songjethalal.mp3"; // 70 Lakh Sound
let popatlalSound = "songpopatlal.mp3"; // 60 Lakh Sound

// Funny Sounds
let funnySounds = { 15: "funny1.mp3", 20: "funny2.mp3", 25: "funny3.mp3" };
let isFunnyPlaying = false;

// Play background music on first input
guessInput.addEventListener("input", () => {
    if (bgMusic.paused) bgMusic.play();
});

// Enter Key Event
guessInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkGuess();
        checkBtn.classList.add("active");
        setTimeout(() => checkBtn.classList.remove("active"), 200);
    }
});

// Check Button Event
checkBtn.addEventListener("click", checkGuess);

function checkGuess() {
    let userGuess = Number(guessInput.value);
    if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
        message.innerHTML = "⚠️ Enter a valid number between 1 and 100!";
        message.className = "warning";
        guessInput.value = "";
        return;
    }

    attempts++;
    attemptsText.innerHTML = `Attempts: ${attempts}`;

    // Play Funny Sound if matches attempt count
    if (funnySounds[attempts] && !isFunnyPlaying) {
        isFunnyPlaying = true;
        let funnySound = new Audio(funnySounds[attempts]);
        bgMusic.volume = 0.2;
        funnySound.play();
        funnySound.onended = () => {
            isFunnyPlaying = false;
            bgMusic.volume = 0.5; // Restore full volume after funny sound ends
        };
    }

    if (userGuess === secretNumber) {
        message.innerHTML = `🎉 Congratulations! You guessed it in ${attempts} tries!`;
        message.className = "correct";
        checkBtn.classList.add("disabled");
        checkBtn.disabled = true;
        guessInput.disabled = true;
        resetBtn.classList.remove("hidden");

        bgMusic.volume = 0.2; // Lower volume when victory sound plays

        let victorySound;
        if (secretNumber === 70 && userGuess === 70) {
            victorySound = new Audio(jethalalSound); // Play Jethalal's sound
        } else if (secretNumber === 60 && userGuess === 60) {
            victorySound = new Audio(popatlalSound); // Play Popatlal's sound
        } else {
            victorySound = new Audio(victorySounds[Math.floor(Math.random() * victorySounds.length)]);
        }

        victorySound.play();
        victorySound.onended = () => {
            bgMusic.volume = 0.5; // Restore original volume after victory sound
        };
        createConfetti();
    } else {
        if (Math.abs(userGuess - secretNumber) <= 5) {
            message.innerHTML = "🔥 You're very close! Try again!";
            message.className = "close";
        } else {
            message.innerHTML = userGuess < secretNumber ? "⬆️ Try a bigger number!" : "⬇️ Try a smaller number!";
            message.className = "wrong";
        }
        guessInput.value = "";
    }
}

// Reset Game Function
resetBtn.addEventListener("click", resetGame);
function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    message.innerHTML = "";
    message.className = "";
    guessInput.value = "";
    guessInput.disabled = false;
    attemptsText.innerHTML = "";
    checkBtn.classList.remove("disabled");
    checkBtn.disabled = false;
    resetBtn.classList.add("hidden");

    bgMusic.volume = 0.5; // Restore Original Volume
    bgMusic.play();
}

// Confetti Effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        confetti.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.animationDuration = (Math.random() * 4 + 5) + "s";

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 12000);
    }
}
