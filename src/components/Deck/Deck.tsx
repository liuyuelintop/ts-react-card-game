// src/components/Deck/Deck.tsx

import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { createDeck, markToString, shuffleDeck } from "../../utils/deck";
import { NormalCard } from "../../types/types";

const Deck: React.FC = () => {
  const [deck, setDeck] = useState<NormalCard[]>([]);

  useEffect(() => {
    const newDeck = createDeck();
    setDeck(newDeck);
  }, []);

  const handleShuffle = () => {
    setDeck((prevDeck) => shuffleDeck(prevDeck));
  };

  return (
    <div className="text-center">
      <button
        onClick={handleShuffle}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        Shuffle Deck
      </button>
      <div className="flex flex-wrap justify-center">
        {deck.map((card: NormalCard, index: number) => (
          <Card
            key={index} // TODO: fix 'index as key' issue.
            card={{
              ...card,
              mark: markToString(card.mark) as number | "Joker",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
