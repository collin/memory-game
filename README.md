# memory-game

# Notes

## Nouns
- Grid of cards
  - Each Card
  - Each Card has a number
- Play info
  - Score/#of pairs found
  - Name
- Whose turn it is (currentPlayer)
- Player order

## Verbs
- Game loop
  - Flip one cards over
    - Try to find its match
    - Check if card matches
      - yes: you get the point
        - Check the win condition
          - If all cards are matched, player with high score wins
      - no: cards flip back over
        - Check the win condition
        - If all cards are matched, player with high score wins
  - It becomes the next players turn
  - repeat game loop
