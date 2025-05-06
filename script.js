const diceContainer = document.querySelector(".dice-container");
const rollButton = document.querySelector("#roll-button");

let heldDiceList = [];

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
}

function manageDiceArray(id, value, isCurrentlyHeld) {
  if (isCurrentlyHeld) {
    heldDiceList = heldDiceList.filter((die) => die.id !== id);
  } else {
    heldDiceList.push({ id, value });
  }
}

/// new
// function checkWinCondition() {
//   heldDiceList.every((die) => die.value === heldDiceList[0].value)
//     ? console.log("win")
//     : console.log("lose");
// }

diceContainer.addEventListener("click", handleDiceContainerClick);
rollButton.addEventListener("click", renderDice);
renderDice();
