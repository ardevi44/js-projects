'use strict';

// Global functions

const getRandom = () => Math.trunc(Math.random() * 20) + 1;

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

let secretNumber = getRandom();
let score = 20;
let highScore = 0;

// Selected elements from the DOM.
const scoreStatus = document.querySelector('.score');
const number = document.querySelector('.number');
const checkButton = document.querySelector('.check');
const guessNumber = document.querySelector('.guess');
const gameBg = document.querySelector('.game-bg');
const againBtn = document.querySelector('.again');
const highscoreBoard = document.querySelector('.highscore');

scoreStatus.textContent = score;
highscoreBoard.textContent = highScore;

const disabledInputs = () => {
  checkButton.disabled = true;
  guessNumber.readOnly = true;
};

checkButton.addEventListener('click', () => {
  const guess = Number(guessNumber.value);

  // In case the value of the input is falsy, (No input content)
  if (!guess) {
    displayMessage('⛔ No number');
  } else if (guess === secretNumber) {
    // If I win
    number.textContent = secretNumber;
    displayMessage('🎉 Correct Number, You Win!');
    disabledInputs();
    if (score > highScore) {
      highScore = score;
      highscoreBoard.textContent = highScore;
    }
    gameBg.classList.add('winner-bg');
    number.style.width = '30rem';
  } else if (guess !== secretNumber) {
    // If I fail
    score -= 1;
    scoreStatus.textContent = score;
    if (score <= 0) {
      // If I lose
      displayMessage('💥 You lost the game');
      disabledInputs();
    } else {
      displayMessage(guess > secretNumber ? '📈 too hight!' : '📉 too low!');
    }
  }
});

againBtn.addEventListener('click', () => {
  secretNumber = getRandom();
  score = 20;
  scoreStatus.textContent = score;
  number.textContent = '?';
  guessNumber.value = '';
  displayMessage('Start guessing...');
  gameBg.classList.remove('winner-bg');
  checkButton.disabled = false;
  guessNumber.readOnly = false;
});
