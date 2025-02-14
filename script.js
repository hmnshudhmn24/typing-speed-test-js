const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const errorsDisplay = document.getElementById("errors");
const restartButton = document.getElementById("restart");

const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests measure your words per minute.",
    "JavaScript is a powerful language for web development."
];

let timer;
let timeLeft = 60;
let errors = 0;
let wpm = 0;
let started = false;
let textToType = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

textDisplay.textContent = textToType;

function startTimer() {
    if (!started) {
        started = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeDisplay.textContent = timeLeft;
            } else {
                clearInterval(timer);
                textInput.disabled = true;
                calculateWPM();
            }
        }, 1000);
    }
}

function calculateWPM() {
    const wordsTyped = textInput.value.trim().split(/\s+/).length;
    wpm = Math.round((wordsTyped / 60) * (60 - timeLeft));
    wpmDisplay.textContent = wpm;
}

textInput.addEventListener("input", () => {
    startTimer();
    let typedText = textInput.value;
    let correctText = textToType.substring(0, typedText.length);

    if (typedText !== correctText) {
        errors++;
        errorsDisplay.textContent = errors;
    }

    calculateWPM();
});

restartButton.addEventListener("click", () => {
    clearInterval(timer);
    textInput.disabled = false;
    textInput.value = "";
    timeLeft = 60;
    errors = 0;
    wpm = 0;
    started = false;
    textToType = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textDisplay.textContent = textToType;
    timeDisplay.textContent = "60";
    wpmDisplay.textContent = "0";
    errorsDisplay.textContent = "0";
});
