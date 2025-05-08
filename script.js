const diceContainer = document.querySelector(".dice-container");
const rollButton = document.querySelector("#roll-button");
const gameContainer = document.querySelector(".game-container");
const modalContent = document.querySelector("#modal-content");
const modalContainer = document.querySelector(".modal-container");

let startTime;
let timerInterval;
let elapsedTime = 0;
let finalTime;

const timerDisplay = document.createElement("div");
timerDisplay.className = "timer";
timerDisplay.textContent = "Time: 0s";
gameContainer.appendChild(timerDisplay);

let gameRunning = false;
let heldDiceList = [];

setInterval(() => {
  rollButton.textContent = gameRunning ? "Roll Dice" : "Start Game";
}, 100);

function renderDice() {
  clearDiceContainer();

  for (let i = 0; i < 10; i++) {
    const dieElement = createDieElement(i);
    diceContainer.appendChild(dieElement);
  }
}

function clearDiceContainer() {
  diceContainer.innerHTML = "";
}

function createDieElement(index) {
  const dieID = index.toString();
  const heldDie = getHeldDie(dieID);
  const randomDieValue = Math.ceil(Math.random() * 10);
  const dieValue = heldDie ? heldDie.value : randomDieValue;

  const dieElement = document.createElement("div");
  dieElement.dataset.id = dieID;
  dieElement.dataset.value = dieValue;
  dieElement.textContent = dieValue;
  dieElement.classList.add("dice-element");
  if (heldDie) dieElement.classList.add("held-dice");

  return dieElement;
}

function getHeldDie(dieID) {
  return heldDiceList.find((die) => die.id === dieID);
}

function handleHeldDie(event) {
  const die = event.target;
  const dieValue = die.dataset.value;
  const dieID = die.dataset.id;

  const isHeld = getHeldDie(dieID);
  manageDiceArray(dieID, dieValue, isHeld);

  die.classList.toggle("held-dice", !isHeld);
}

function handleDiceContainerClick(event) {
  if (event.target.classList.contains("dice-element")) {
    handleHeldDie(event);
  }
  if (heldDiceList.length === 10) {
    checkWinCondition();
  }
}

function manageDiceArray(id, value, isCurrentlyHeld) {
  if (isCurrentlyHeld) {
    heldDiceList = heldDiceList.filter((die) => die.id !== id);
  } else {
    heldDiceList.push({ id, value });
  }
}

function checkWinCondition() {
  const gameWon = heldDiceList.every(
    (die) => die.value === heldDiceList[0].value
  );
  if (gameWon) {
    handleWinningGame();
  }
}

function handleWinningGame() {
  gameRunning = false;
  updateTimer();
  saveBestTime();
  modalContainer.style.display = "flex";
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
  if (gameRunning) {
    elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    timerDisplay.textContent = `Time: ${seconds}s`;
  } else {
    finalTime = Math.floor(elapsedTime / 1000);
    timerDisplay.textContent = `Time: ${finalTime}s`;
    clearInterval(timerInterval);
  }
}

function handleRollButton() {
  if (gameRunning) {
    renderDice();
  } else {
    gameRunning = true;
    renderDice();
    startTimer();
  }
}

function saveBestTime() {
  const storedTime = localStorage.getItem("bestTime");
  let bestTime = storedTime !== null ? Number(storedTime) : null;

  if (bestTime === null || finalTime < bestTime) {
    bestTime = finalTime;
    localStorage.setItem("bestTime", bestTime);
  }
  updateModalContent(finalTime, bestTime);
}

function updateModalContent(finalTime, bestTime) {
  if (bestTime === null || finalTime <= bestTime) {
    modalContent.innerHTML = `<div>
    <h1>New Best Time!</h1>
    <h2>${finalTime}s</h2>
    </div>`;
  } else {
    modalContent.innerHTML = `<div>
    <h2>Final time:${finalTime}s/h2>
    <h2>Best time:${bestTime}s</h2>
    </div>`;
  }
}

diceContainer.addEventListener("click", handleDiceContainerClick);
rollButton.addEventListener("click", handleRollButton);
