const diceContainer = document.querySelector(".dice-container");
const rollButton = document.querySelector("#roll-button");

// Array to track state of held die
let heldDiceList = [];

// renders 10 dice to the game board
function renderDice() {
  clearDiceContainer();

  for (let i = 0; i < 10; i++) {
    const dieElement = createDieElement(i);
    diceContainer.appendChild(dieElement);
  }
}

// clear dice from DOM
function clearDiceContainer() {
  diceContainer.innerHTML = "";
}

// create new die
function createDieElement(index) {
  const dieID = index.toString();
  const isDieHeld = isDieCurrentlyHeld(dieID);
  const randomDieValue = Math.ceil(Math.random() * 10);
  const currentHeldDie = getHeldDie(dieID);
  const dieValue = isDieHeld ? currentHeldDie.value : randomDieValue;

  const dieElement = document.createElement("div");
  dieElement.dataset.id = dieID;
  dieElement.dataset.value = dieValue;
  dieElement.textContent = dieValue;
  dieElement.classList.add("dice-element");
  if (isDieHeld) dieElement.classList.add("held-dice");

  return dieElement;
}

// check if the die with a given id is currently held
function isDieCurrentlyHeld(dieID) {
  return heldDiceList.some((die) => die.id === dieID);
}

// returns held die with a given id
function getHeldDie(dieID) {
  return heldDiceList.find((die) => die.id === dieID);
}

// die click handler logic
function handleHeldDie(event) {
  const die = event.target;
  const dieValue = die.dataset.value;
  const dieID = die.dataset.id;
  manageDiceArray(dieID, dieValue);
  const isDieHeld = isDieCurrentlyHeld(dieID);
  die.classList.toggle("held-dice", isDieHeld);
}

// delegates click handling for dice to their container
function handleDiceContainerClick(event) {
  if (event.target.classList.contains("dice-element")) {
    handleHeldDie(event);
  }
}

function manageDiceArray(id, value) {
  const filteredDice = heldDiceList.filter((die) => die.id !== id);
  const isDieHeld = isDieCurrentlyHeld(id);
  !isDieHeld
    ? heldDiceList.push({ id: id, value: value })
    : (heldDiceList = filteredDice);
}

diceContainer.addEventListener("click", handleDiceContainerClick);
rollButton.addEventListener("click", renderDice);
renderDice();
