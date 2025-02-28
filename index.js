
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let checkBtn = document.getElementById("checkBtn");
let guessInput = document.getElementById("guess");

guessInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkGuess();
        checkBtn.classList.add("active"); // Hover effect on Enter
        setTimeout(() => checkBtn.classList.remove("active"), 200);
    }
});

function checkGuess() {
    let userGuess = Number(guessInput.value);
    let message = document.getElementById("message");
    let attemptsText = document.getElementById("attempts");
    let resetBtn = document.getElementById("reset");

    if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
        message.innerHTML = "⚠️ Enter a valid number between 1 and 100!";
        message.className = "warning";
        guessInput.value = ""; // **Input field clear hoga**
        return;
    }

    attempts++;

    if (userGuess === secretNumber) {
        message.innerHTML = `🎉 Congratulations! You guessed it in ${attempts} tries!`;
        message.className = "correct";
        checkBtn.classList.add("disabled");
        checkBtn.disabled = true;
        guessInput.disabled = true;
        resetBtn.classList.remove("hidden");

        // 🎉 Background Animation
        document.body.style.background = "linear-gradient(to right, #00ff6a, #ffcc00)";

        // 🎉 Confetti Effect
        createConfetti();
    } else if (Math.abs(userGuess - secretNumber) <= 5) {
        message.innerHTML = "🔥 You're very close! Try again!";
        message.className = "warning";
        guessInput.value = ""; // **Wrong guess pe input clear**
    } else {
        message.innerHTML = userGuess < secretNumber ? "⬆️ Try a bigger number!" : "⬇️ Try a smaller number!";
        message.className = "wrong";
        guessInput.value = ""; // **Wrong guess pe input clear**
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

    // Reset background
    document.body.style.background = "linear-gradient(to right, #0194b9, #8abdff, #ffdefb, hsl(308, 100%, 94%), #9ccaff, #0194b9)";
}
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // Set random RGB color for confetti
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
