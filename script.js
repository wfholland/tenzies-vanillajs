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

  manageDiceArray(dieID, dieValue);

  const heldDie = getHeldDie(dieID);
  die.classList.toggle("held-dice", !heldDie);
  console.log("hello");
}

function handleDiceContainerClick(event) {
  if (event.target.classList.contains("dice-element")) {
    handleHeldDie(event);
  }
}

function manageDiceArray(id, value) {
  const heldDie = getHeldDie(id);

  !heldDie
    ? heldDiceList.push({ id, value })
    : (heldDiceList = heldDiceList.filter((die) => die.id !== id));
}

diceContainer.addEventListener("click", handleDiceContainerClick);
rollButton.addEventListener("click", renderDice);
renderDice();
