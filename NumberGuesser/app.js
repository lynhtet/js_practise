let min = 1;
let max = 10;
let winningNum = getRandomNum();
let numberOfGuess = 3;

const game = document.querySelector("#game");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const guessInput = document.querySelector("#guess-input");
const guessBtn = document.querySelector("#guess-submit");
const message = document.querySelector("#message");

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", (e) => {
    if (e.target.className == "play-again") {
        window.location.reload();
    }
});

guessBtn.addEventListener("click", (e) => {
    let guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number betwee ${min} and ${max}.`, "red");
    }

    if (guess == winningNum) {
        gameOver(true,`${winningNum} is correct! YOU WIN.`);
    } else {
        numberOfGuess -= 1;

        if (numberOfGuess === 0) {
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        } else {
            guessInput.style.borderColor = "red";
            setMessage(`Guess is not correct! You have ${numberOfGuess} guesses left.`, "red");
            guessInput.value = "";
        }
    }
})

function gameOver(won, msg) {
    let color;
    won === true ? color = "green" : color = "red";

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    guessBtn.value = "Play Again";
    guessBtn.className += "play-again";
}

function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

function getRandomNum() {
    return Math.floor((Math.random() * (max - min + 1) + min));
}