// src/components/Deck/Deck.tsx

import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { createDeck, markToString, shuffleDeck } from "../../utils/deck";
import { NormalCard } from "../../types/types";

const Deck: React.FC = () => {
  const [deck, setDeck] = useState<NormalCard[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  useEffect(() => {
    const newDeck = createDeck({
      includeJokers: false,
      minMark: 1,
      maxMark: 13,
    });
    setDeck(newDeck);
    setFlipped(new Array(newDeck.length).fill(false));
  }, []);

  const handleShuffle = () => {
    setDeck((prevDeck) => shuffleDeck(prevDeck));
    setFlipped(new Array(deck.length).fill(false));
  };

  const handleFlipAll = () => {
    const allFlipped = flipped.every((state) => state);
    setFlipped(new Array(deck.length).fill(!allFlipped));
  };

  const handleFlip = (index: number) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div className="text-center">
      <button
        onClick={handleShuffle}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Shuffle Deck
      </button>
      <button
        onClick={handleFlipAll}
        className="mb-4 ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
      >
        Flip All
      </button>
      <div className="flex flex-wrap justify-center gap-2">
        {deck.map((card: NormalCard, index: number) => (
          <Card
            key={index}
            card={{
              ...card,
              mark: markToString(card.mark) as number | "Joker",
            }}
            isFlipped={flipped[index]}
            onFlip={() => handleFlip(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
