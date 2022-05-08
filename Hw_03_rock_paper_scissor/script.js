"use strict";
//select the value
const score0El = document.querySelector(".score--0");
const score1El = document.querySelector(".score--1");
const hand0Img = document.querySelector(".hand--0");
const hand1Img = document.querySelector(".hand--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//btn select
const btnStart = document.querySelector(".btn--start");
const scissor = document.querySelector(".choose--0");
const paper = document.querySelector(".choose--1");
const rock = document.querySelector(".choose--2");

//set default value
let playerScore, computerScore, startPlay;
score0El.textContent = "0";
score1El.textContent = "0";

const defaultMode = function () {
  startPlay = true;
  playerScore = 0;
  computerScore = 0;
  btnStart.textContent = "START";
  score0El.textContent = playerScore;
  score1El.textContent = computerScore;
  hand0Img.classList.add("hidden");
  hand1Img.classList.add("hidden");
  player0El.classList.remove("player-win");
  player1El.classList.remove("player-win");
};

defaultMode();

//computer
let computer;
const computerChoose = function () {
  computer = Math.floor(Math.random() * 3);
  hand1Img.src = `/images/hand-${computer}.png`;
  hand1Img.classList.remove("hidden");
  return computer;
};
const playerChoose = function (num) {
  if (startPlay) {
    let computer = computerChoose();
    hand0Img.src = `/images/hand-${num}.png`;
    hand0Img.classList.remove("hidden");
    if (
      (num === 0 && computer === 1) ||
      (num === 1 && computer === 2) ||
      (num === 2 && computer === 0)
    ) {
      if (playerScore < 10 || computerScore < 10) {
        playerScore++;
        score0El.textContent = playerScore;
      }
    } else if (
      (num === 0 && computer === 2) ||
      (num === 1 && computer === 0) ||
      (num === 2 && computer === 1)
    ) {
      if (playerScore < 10 || computerScore < 10) {
        computerScore++;
        score1El.textContent = computerScore;
      }
    }
  }
  if (playerScore === 10 || computerScore === 10) {
    startPlay = false;
    btnStart.textContent = "RESTART";
    if (playerScore === 10) {
      score0El.textContent = "WIN";
      player0El.classList.add("player-win");
    } else {
      score1El.textContent = "WIN";
      player1El.classList.add("player-win");
    }
  }
};

scissor.addEventListener("click", () => playerChoose(0));
paper.addEventListener("click", () => playerChoose(1));
rock.addEventListener("click", () => playerChoose(2));

btnStart.addEventListener("click", defaultMode);
