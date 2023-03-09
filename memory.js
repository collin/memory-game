// a card
const cards = [];
// build up cards list
for (let cardCount = 0; cardCount < 8; cardCount++) {
  cards.push({ name: cardCount + 1 });
  cards.push({ name: cardCount + 1 });
}
const gameState = {
  cards: cards,
  players: [
    {
      score: 0,
      name: "Pawan",
    },
    {
      score: 0,
      name: "Collin",
    },
  ],
  currentPlayerIndex: 0,
};

const gameboard = document.querySelector("#gameboard");
const scoreboard = document.querySelector("#scoreboard");

function renderGameboard() {
  for (const card of gameState.cards) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.setAttribute("cardName", card.name);
    cardEl.innerText = card.name;
    gameboard.append(cardEl);
  }
}

renderGameboard();

function renderScoreboard() {
  for (let i = 0; i < gameState.players.length; i++) {
    const player = gameState.players[i];
    const playerEl = document.createElement("div");
    const isPlayersTurn = i === gameState.currentPlayerIndex;
    playerEl.classList.add("player");
    playerEl.innerHTML = `
     ${isPlayersTurn ? `<span>Current</span>` : ``}
      <label>Player: ${player.name}</label>
      <p>Score: ${player.score}</p>
    `;

    scoreboard.append(playerEl);
  }
}

renderScoreboard();

gameboard.addEventListener("click", (e) => {
  if (e.target.classList.contains("card")) {
    e.target.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    console.log(flippedCards);
    if (flippedCards.length < 2) {
      return;
    } else {
      if (
        flippedCards[0].getAttribute("cardname") ===
        flippedCards[1].getAttribute("cardname")
      ) {
        setTimeout(() => {
          flippedCards[0].classList.remove("flipped");
          flippedCards[1].classList.remove("flipped");
        }, 1000);
      }
    }
  }
});
