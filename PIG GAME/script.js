'use strict';

//selecting elements

const playerActive0El = document.querySelector('.player--0');
const playerActive1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const hideDieEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

score0EL.textContent = 0;
score1EL.textContent = 0;
hideDieEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. declare a variable with a function expression that will roll the die
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display the die and add an expression that flips the images
    hideDieEl.classList.remove('hidden');
    hideDieEl.src = `dice-${dice}.png`;

    //Check if the player rolled a one
    if (dice !== 1) {
      //add dice to the currentScore
      currentScore = currentScore + dice;
      //current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0; //setting the current score back to zero
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      playerActive0El.classList.toggle('player--active');
      playerActive1El.classList.toggle('player--active'); //white background switches positions
    }
  }
});
//Hold button

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    //scores[1]=score[1]+currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      hideDieEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      document.getElementById(`current--${activePlayer}`).textContent = 0; //setting the current score back to zero
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      playerActive0El.classList.toggle('player--active');
      playerActive1El.classList.toggle('player--active'); //white background switches positions
    }
  }
});

//Resetting the game

btnNew.addEventListener('click', function () {
  const scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  hideDieEl.classList.add('hidden');
  playerActive0El.classList.remove('player--winner');
  playerActive1El.classList.remove('player--winner');
  playerActive0El.classList.add('player--active');
  playerActive1El.classList.remove('player--active');
});
