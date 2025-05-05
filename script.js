const diceContainer = document.querySelector(".dice-container");
const rollButton = document.querySelector("#roll-button");

// dynamically create 10 new divs

function renderDice() {
  for (let i = 0; i < 10; i++) {
    const diceEl = document.createElement("div");
    diceEl.classList.add("dice-element");
    diceEl.textContent = "1";
    diceContainer.appendChild(diceEl);
  }
}

renderDice();
