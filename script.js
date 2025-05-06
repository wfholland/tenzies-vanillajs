const diceContainer = document.querySelector(".dice-container");
const rollButton = document.querySelector("#roll-button");

// Array to track state of held die
let heldDice = [];

// dynamically create 10 new dice

function renderDice() {
  diceContainer.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const isHeld = heldDice.some((die) => die.id === i.toString());
    const randomValue = Math.ceil(Math.random() * 10);
    const diceEl = document.createElement("div");
    const currentHeldDie = heldDice.find((die) => die.id === i.toString());
    const diceValue = isHeld ? currentHeldDie.value : randomValue;
    diceEl.dataset.id = i.toString();
    diceEl.classList.add("dice-element");
    isHeld ? diceEl.classList.add("held-dice") : "";
    diceEl.dataset.value = diceValue;
    diceEl.textContent = diceValue;
    diceContainer.appendChild(diceEl);
  }
  const allDice = document.querySelectorAll(".dice-element");
  allDice.forEach((die) => die.addEventListener("click", handleHeldDie));
}

// Add click event listener to roll dice button
rollButton.addEventListener("click", renderDice);

// dice click handler logic
function handleHeldDie(event) {
  const die = event.target;
  const dieValue = die.dataset.value;
  const dieID = die.dataset.id;
  const dieDiv = document.querySelector(`[data-id="${dieID}"]`);
  manageDiceArray(dieID, dieValue);
  const isHeld = heldDice.some((die) => die.id === dieID);
  dieDiv.classList.toggle("held-dice", isHeld);
}

function manageDiceArray(id, value) {
  const filteredDice = heldDice.filter((die) => die.id !== id);
  const isHeld = heldDice.some((die) => die.id === id);
  !isHeld ? heldDice.push({ id: id, value: value }) : (heldDice = filteredDice);
}
renderDice();
