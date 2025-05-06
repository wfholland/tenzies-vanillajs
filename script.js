const diceContainer = document.querySelector(".dice-container");
const rollButton = document.querySelector("#roll-button");

// Array to track state of held die
let heldDiceList = [];

// dynamically create 10 new dice

function renderDice() {
  diceContainer.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const isDieHeld = heldDiceList.some((die) => die.id === i.toString());
    const randomDieValue = Math.ceil(Math.random() * 10);
    const dieElement = document.createElement("div");
    const currentHeldDie = heldDiceList.find((die) => die.id === i.toString());
    const dieValue = isDieHeld ? currentHeldDie.value : randomDieValue;
    dieElement.dataset.id = i.toString();
    dieElement.classList.add("dice-element");
    if (isDieHeld) dieElement.classList.add("held-dice");
    dieElement.dataset.value = dieValue;
    dieElement.textContent = dieValue;
    diceContainer.appendChild(dieElement);
  }
  const allDiceElements = document.querySelectorAll(".dice-element");
  allDiceElements.forEach((die) =>
    die.addEventListener("click", handleHeldDie)
  );
}

// Add click event listener to roll dice button
rollButton.addEventListener("click", renderDice);

// dice click handler logic
function handleHeldDie(event) {
  const die = event.target;
  const dieValue = die.dataset.value;
  const dieID = die.dataset.id;
  manageDiceArray(dieID, dieValue);
  const isDieHeld = heldDiceList.some((die) => die.id === dieID);
  die.classList.toggle("held-dice", isDieHeld);
}

function manageDiceArray(id, value) {
  const filteredDice = heldDiceList.filter((die) => die.id !== id);
  const isDieHeld = heldDiceList.some((die) => die.id === id);
  !isDieHeld
    ? heldDiceList.push({ id: id, value: value })
    : (heldDiceList = filteredDice);
}
renderDice();
