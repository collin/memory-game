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
      name: "???",
    },
    {
      score: 0,
      name: "???",
    },
  ],
  currentPlayerIndex: 0,
};

const gameboard = document.querySelector("#gameboard");
const scoreboard = document.querySelector("#scoreboard");

for (const card of gameState.cards) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.setAttribute("cardName", card.name);
  cardEl.innerText = card.name;
  gameboard.append(cardEl);
}

for (const player of gameState.players) {
  const playerEl = document.createElement("div");
  playerEl.classList.add("player");
  playerEl.innerHTML = `
    <label>Player: ${player.name}</label>
    <p>Score: ${player.score}</p>
  `;
  scoreboard.append(playerEl);
}
