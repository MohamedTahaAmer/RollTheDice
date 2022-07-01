"use strict";

// App componants
function dq(selector) {
  const element = document.querySelector(`${selector}`);
  return element;
}

let activePlayer,
  score,
  playingStatus,
  acumelatedScore,
  currentScore,
  authenticated = false;
const max = 10; // you can but any number here

function newGame() {
  if (authenticated) {
    playingStatus = true;
    activePlayer = 0;
    acumelatedScore = [0, 0];
    currentScore = 0;

    dq("#score--0").textContent = 0;
    dq("#current--0").textContent = 0;
    dq("#score--1").textContent = 0;
    dq("#current--1").textContent = 0;

    dq(`.player--0`).classList.add("player--active");
    dq(`.player--1`).classList.remove("player--active");
    dq(`.player--0`).classList.remove("player--winner");
    dq(`.player--1`).classList.remove("player--winner");

    authenticatedClasses();
  }
}

function rollDice() {
  if (playingStatus && authenticated) {
    let rand = Math.ceil(Math.random() * 6);
    dq(".dice").src = `dice-${rand}.png`;
    dq(".dice").classList.remove("hidden");
    if (rand !== 1) {
      currentScore += rand;
      dq(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  currentScore = 0;
  dq(`#current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  dq(`.player--0`).classList.toggle("player--active");
  dq(`.player--1`).classList.toggle("player--active");
}

function win() {
  dq(`.player--${activePlayer}`).classList.add("player--winner");
  dq(".dice").classList.add("hidden");
  dq(".btn--add").classList.add("hidden");
  dq(".btn--roll").classList.add("hidden");
  dq(".btn--congrats").textContent = `🎉 Congrats ${
    dq(`#name--${activePlayer}`).textContent
  } !!!`;
  dq(".btn--congrats").classList.remove("hidden");
  playingStatus = false;
}

function showScore() {
  if (score[0] > score[1]) {
    dq(".btn--result-0").textContent = `😍 ${score[0]}`;
    dq(".btn--result-1").textContent = `😡 ${score[1]}`;
  } else if (score[0] < score[1]) {
    dq(".btn--result-0").textContent = `😡 ${score[0]}`;
    dq(".btn--result-1").textContent = `😍 ${score[1]}`;
  } else {
    dq(".btn--result-0").textContent = `🤞 ${score[0]}`;
    dq(".btn--result-1").textContent = `🤞 ${score[1]}`;
  }
}

function addScore() {
  if (playingStatus && authenticated) {
    acumelatedScore[activePlayer] += currentScore;
    if (acumelatedScore[activePlayer] < max) {
      dq(`#score--${activePlayer}`).textContent = acumelatedScore[activePlayer];
      switchPlayer();
    } else {
      win();
      score[activePlayer]++;
      showScore();
    }
  }
}

function authenticatedClasses() {
  const Classes = [
    ".c1",
    ".c0",
    "#current--1",
    "#score--1",
    "#current--0",
    "#score--0",
    ".btn--add",
    ".btn--roll",
    ".btn--new",
    ".btn--player",
    ".btn--rules",
    ".btn--result-0",
    ".btn--result-1",
  ];
  for (let i = 0; i < Classes.length; i++)
    dq(`${Classes[i]}`).classList.remove("hidden");

  dq(`.btn--start`).classList.add("hidden");
  dq(`.btn--congrats`).classList.add("hidden");
  dq(`.btn--please`).classList.add("hidden");
  dq(`.player--0--name`).classList.add("hidden");
  dq(`.player--1--name`).classList.add("hidden");
  dq(`.dice`).classList.add("hidden");
  showScore();
}

function unauthenticatedClasses() {
  const Classes = [
    ".c1",
    ".c0",
    "#current--1",
    "#score--1",
    "#current--0",
    "#score--0",
    ".btn--add",
    ".btn--roll",
    ".btn--congrats",
    ".btn--new",
    ".btn--player",
    ".btn--rules",
    ".btn--result-0",
    ".btn--result-1",
    ".dice",
  ];
  for (let i = 0; i < Classes.length; i++)
    dq(`${Classes[i]}`).classList.add("hidden");

  dq(`.player--0`).classList.remove("player--active", "player--winner");
  dq(`.player--1`).classList.remove("player--active", "player--winner");
  dq(`.btn--start`).classList.remove("hidden");
  dq(`.player--0--name`).classList.remove("hidden");
  dq(`.player--1--name`).classList.remove("hidden");

  dq("#name--0").textContent = "Player 1 name";
  dq("#name--1").textContent = "Player 2 name";
}

function init() {
  score = [0, 0];
  authenticated = false;
  playingStatus = false;
  unauthenticatedClasses();
}

function startGame() {
  if (
    dq(".player--1--name").value === "" ||
    dq(".player--0--name").value === ""
  ) {
    dq(".btn--please").classList.remove("hidden");
    dq(".btn--please").classList.add("please");
  }

  if (
    dq(".player--0--name").value !== "" &&
    dq(".player--1--name").value !== ""
  ) {
    authenticated = true;
    dq("#name--0").textContent = dq(".player--0--name").value;
    dq("#name--1").textContent = dq(".player--1--name").value;
    newGame();
  }
}

function showRules() {
  dq(".modal").classList.remove("hidden");
  dq(".overlay").classList.remove("hidden");
}

function hideRules() {
  dq(".modal").classList.add("hidden");
  dq(".overlay").classList.add("hidden");
}
// Starting the App
init();
dq(".btn--start").addEventListener("click", startGame);
dq(".btn--roll").addEventListener("click", rollDice);
dq(".btn--add").addEventListener("click", addScore);
dq(".btn--new").addEventListener("click", newGame);
dq(".btn--player").addEventListener("click", init);
dq(".btn--rules").addEventListener("click", showRules);
dq(".close-modal").addEventListener("click", hideRules);
dq(".overlay").addEventListener("click", hideRules);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !dq(".modal").classList.contains("hidden")) {
    hideRules();
  }
});
