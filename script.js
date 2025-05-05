const diceContainer = document.querySelector(".dice-container");
const rollButton = document.querySelector("#roll-button");

const heldDice = [];

// dynamically create 10 new dice

function renderDice() {
  diceContainer.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const randomValue = Math.ceil(Math.random() * 10);
    const diceEl = document.createElement("div");
    diceEl.id = `die-${i}`;
    diceEl.classList.add("dice-element");
    diceEl.dataset.value = randomValue;
    diceEl.dataset.isHeld = "false";
    diceEl.textContent = randomValue;
    diceContainer.appendChild(diceEl);
  }
}

// Add click event listener to roll dice button
rollButton.addEventListener("click", renderDice);

// dice click handler logic
function handleHeldDie(event) {
  const die = event.target;
  die.dataset.isHeld === "false"
    ? (die.classList.add("held-dice"), (die.dataset.isHeld = "true"))
    : (die.classList.remove("held-dice"), (die.dataset.isHeld = "false"));
}
renderDice();

// Add dice click logic to all die
const allDice = document.querySelectorAll(".dice-element");
allDice.forEach((die) => die.addEventListener("click", handleHeldDie));
