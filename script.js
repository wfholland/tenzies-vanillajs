const diceContainer = document.querySelector(".dice-container");
const rollButton = document.querySelector("#roll-button");

// dynamically create 10 new dice

function renderDice() {
  diceContainer.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const randomValue = Math.ceil(Math.random() * 10);
    const diceEl = document.createElement("div");
    diceEl.classList.add("dice-element");
    diceEl.dataset.value = randomValue;
    diceEl.textContent = randomValue;
    diceContainer.appendChild(diceEl);
  }
}

renderDice();
rollButton.addEventListener("click", renderDice);
