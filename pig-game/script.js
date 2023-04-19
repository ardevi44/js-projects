"use strict";

// DOM Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Global variables
let currentScore = 0;
const scores = [0, 0];
let activePlayer = 0;
let playing = true;

// Start a new Game
const startGame = function () {
  currentScore = 0;
  scores[0] = currentScore;
  scores[1] = currentScore;
  activePlayer = 0;
  playing = true;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  score0El.textContent = currentScore;
  score1El.textContent = currentScore;
  diceEl.classList.add("hidden");
  player1El.classList.remove("player--active");
  const players = document.querySelectorAll(".player");
  if (!player0El.classList.contains("player--active")) {
    player0El.classList.add("player--active");
  }
  players.forEach((player) => {
    if (player.classList.contains("player--winner"))
      player.classList.remove("player--winner");
  });
  console.log({
    scores,
    activePlayer,
    playing,
    current0El: current0El.textContent,
    current1El: current1El.textContent,
    score0El: score0El.textContent,
    score1El: score1El.textContent,
  });
};

// Switch the actual player 1 o 0
const switchPlayer = () => {
  diceEl.classList.add("hidden");
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Restart the game
btnNew.addEventListener("click", startGame);

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");
    // Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

// Hold the current score to the TOTAL SCORE PLAYER
btnHold.addEventListener("click", () => {
  if (playing) {
    // 1. Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player score is >= 50
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 3. If not, Switch to the next player
      switchPlayer();
    }
  }
});
