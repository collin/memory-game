const player1Name = prompt("What is Player 1's Name?");
const player2Name = prompt("What is Player 2's Name?");

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
      name: player1Name,
    },
    {
      score: 0,
      name: player2Name,
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
