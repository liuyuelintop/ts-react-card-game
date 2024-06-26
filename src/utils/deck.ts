import { Deck, Player } from "../types/types";
import { Color, Mark } from "../enums/enums";

interface CreateDeckOptions {
  includeJokers?: boolean;
  minMark?: Mark;
  maxMark?: Mark;
}

const markOrder: Mark[] = [
  Mark.Ace,
  Mark.Two,
  Mark.Three,
  Mark.Four,
  Mark.Five,
  Mark.Six,
  Mark.Seven,
  Mark.Eight,
  Mark.Nine,
  Mark.Ten,
  Mark.Jack,
  Mark.Queen,
  Mark.King,
];

export const createDeck = (options: CreateDeckOptions = {}): Deck => {
  const {
    includeJokers = false,
    minMark = Mark.Ace,
    maxMark = Mark.King,
  } = options;
  const deck: Deck = [];
  const colors = [Color.Heart, Color.Spade, Color.Club, Color.Diamond];

  const minIndex = markOrder.indexOf(minMark);
  const maxIndex = markOrder.indexOf(maxMark);

  for (let i = minIndex; i <= maxIndex; i++) {
    for (const color of colors) {
      deck.push({ color, mark: markOrder[i] });
    }
  }

  if (includeJokers) {
    deck.push({ color: Color.Joker, mark: "joker" });
    deck.push({ color: Color.Joker, mark: "Joker" });
  }

  return deck;
};

export const shuffleDeck = (deck: Deck): Deck => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

export const dealCards = (
  deck: Deck,
  playerCount: number,
  cardsPerPlayer: number
): Player[] => {
  const players: Player[] = [];
  const shuffledDeck = shuffleDeck(deck);
  let cardIndex = 0;

  for (let i = 0; i < playerCount; i++) {
    players.push({ id: i + 1, name: `Player ${i + 1}`, hand: [] });
  }

  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < playerCount; j++) {
      if (cardIndex < shuffledDeck.length) {
        players[j].hand.push(shuffledDeck[cardIndex]);
        cardIndex++;
      }
    }
  }

  return players;
};
