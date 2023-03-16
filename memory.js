/**
 * How your time is spent as a programmer
 *
 * 25% Reading code (one file)
 * 25% Navigating code (across files)
 * 25% Reading documentation
 * 25% Using the program being written
 *
 * 1-3% Writing/modifying code
 */

/** Build up cards and initial game state */
const cards = []
// build up cards list
for (let cardCount = 0; cardCount < 8; cardCount++) {
  cards.push({ name: cardCount + 1 })
  cards.push({ name: cardCount + 1 })
}
const gameState = {
  cards: cards,
  players: [
    {
      score: 0,
      name: "Player 1"
    },
    {
      score: 0,
      name: "Player 2"
    }
  ],
  currentPlayerIndex: 0
}

/** DOM References */
const form = document.querySelector("form")
const gameboard = document.querySelector("#gameboard")
const scoreboard = document.querySelector("#scoreboard")

/** Render functions */
function renderGameboard() {
  for (const card of gameState.cards) {
    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    cardEl.setAttribute("cardName", card.name)
    cardEl.innerText = card.name
    gameboard.append(cardEl)
  }
}

function renderScoreboard() {
  scoreboard.innerHTML = ""
  for (let i = 0; i < gameState.players.length; i++) {
    const player = gameState.players[i]
    const playerEl = document.createElement("div")
    const isPlayersTurn = i === gameState.currentPlayerIndex
    playerEl.classList.add("player")
    playerEl.innerHTML = `
     ${isPlayersTurn ? `<span>Current</span>` : ``}
      <label>Player: ${player.name}</label>
      <p>Score: ${player.score}</p>
    `

    scoreboard.append(playerEl)
  }

  // if all cards are matched, player with highest score wins
  if (checkWin()) {
    scoreboard.innerHTML += `<p>${getWinner()}</p>`
  }
}

function shuffle() {
  // loop through the cards array
  for (let i = gameState.cards.length - 1; i >= 0; i--) {
    const randomIdx = Math.floor(Math.random() * i)
    const currentCard = gameState.cards[i]
    const cardAtRandomIdx = gameState.cards[randomIdx]
    gameState.cards[i] = cardAtRandomIdx
    gameState.cards[randomIdx] = currentCard
  }
}

/** Check game state */
function checkWin() {
  const removedCards = document.querySelectorAll(".removed")
  return removedCards.length === gameState.cards.length
}

function getWinner() {
  const player1Score = gameState.players[0].score
  const player2Score = gameState.players[1].score

  if (player1Score === player2Score) {
    return "No winner, tie game!"
  } else if (player1Score > player2Score) {
    return `${gameState.players[0].name} won!`
  } else {
    return `${gameState.players[1].name} won!`
  }
}

/** Respond to user action */
function playerDidRemember(flippedCards) {
  gameState.players[gameState.currentPlayerIndex].score++

  // remove cards from board
  flippedCards[0].classList.add("removed")
  flippedCards[1].classList.add("removed")
}

function playerDidntRemember(flippedCards) {
  // player did not remember
  // switch current player, using modulo to wrap around to 0
  gameState.currentPlayerIndex =
    (gameState.currentPlayerIndex + 1) % gameState.players.length

  // this happens if they don't match
  flippedCards[0].classList.remove("flipped")
  flippedCards[1].classList.remove("flipped")
}

/** Listen to DOM events */
gameboard.addEventListener("click", (e) => {
  const clickIsOnCard = e.target.classList.contains("card")
  if (!clickIsOnCard) {
    return
  }

  e.target.classList.add("flipped")
  // use css to filter out removed
  const flippedCards = document.querySelectorAll(".flipped:not(.removed)")

  console.log(flippedCards)
  if (flippedCards.length < 2) {
    return
  }

  document.body.style.setProperty("pointer-events", "none")
  // set-up
  setTimeout(() => {
    const chosenCardsMatch =
      flippedCards[0].getAttribute("cardname") ===
      flippedCards[1].getAttribute("cardname")

    if (chosenCardsMatch) {
      playerDidRemember(flippedCards)
    } else {
      playerDidntRemember(flippedCards)
    }
    renderScoreboard()
    document.body.style.removeProperty("pointer-events")
  }, 1000)
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const player1Name = e.target[0].value
  const player2Name = e.target[1].value
  gameState.players[0].name = player1Name
  gameState.players[1].name = player2Name
  renderScoreboard()
})

/** Start the game */
shuffle()
renderGameboard()
