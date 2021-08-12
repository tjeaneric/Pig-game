'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, playerActive, playing;
// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playerActive = 0;
  playing = true;

  score1El.textContent = 0;
  score0El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${playerActive}`).textContent = 0;
  currentScore = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling dice functionalities
btnRoll.addEventListener('click', function () {
  //Generate a random dice roll\
  const dice = Math.trunc(Math.random() * 6) + 1;
  if (playing) {
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check for rolled 1, if it's true switch player

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to the player's score
    scores[playerActive] += currentScore;
    document.getElementById(`score--${playerActive}`).textContent =
      scores[playerActive];

    //2.check if player's score >= 100
    if (scores[playerActive] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${playerActive}`)
        .classList.remove('player--active');
    } else {
      //3.Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
