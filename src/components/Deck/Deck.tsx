// src/components/Deck/Deck.tsx

import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { createDeck, markToString, shuffleDeck } from "../../utils/deck";
import { NormalCard } from "../../types/types";

const Deck: React.FC = () => {
  const [deck, setDeck] = useState<NormalCard[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [minMark, setMinMark] = useState<number>(1);
  const [maxMark, setMaxMark] = useState<number>(13);

  useEffect(() => {
    const newDeck = createDeck({
      includeJokers: false,
      minMark,
      maxMark,
    });
    setDeck(newDeck);
    setFlipped(new Array(newDeck.length).fill(false));
  }, [minMark, maxMark]);

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
      <div className="mb-4">
        <label className="mr-2">Min Mark:</label>
        <input
          type="number"
          value={minMark}
          onChange={(e) => setMinMark(Number(e.target.value))}
          min="1"
          max="13"
          className="px-2 py-1 border rounded"
        />
        <label className="ml-4 mr-2">Max Mark:</label>
        <input
          type="number"
          value={maxMark}
          onChange={(e) => setMaxMark(Number(e.target.value))}
          min="1"
          max="13"
          className="px-2 py-1 border rounded"
        />
      </div>
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
