// src/components/Deck/Deck.tsx

import React, { useState } from "react";
import Card from "../Card/Card";
import DeckControls from "./DeckControls";
import useDeck from "../../hooks/Deck/useDeck";
import { NormalCard } from "../../types/types";
import { markToString } from "../../utils/deck";

const Deck: React.FC = () => {
  const [minMark, setMinMark] = useState<number>(1);
  const [maxMark, setMaxMark] = useState<number>(13);
  const [includeJokers, setIncludeJokers] = useState<boolean>(false);

  const { deck, flipped, handleShuffle, handleFlipAll, handleFlip } = useDeck(
    minMark,
    maxMark,
    includeJokers
  );

  return (
    <div className="text-center">
      <DeckControls
        minMark={minMark}
        maxMark={maxMark}
        includeJokers={includeJokers}
        setMinMark={setMinMark}
        setMaxMark={setMaxMark}
        setIncludeJokers={setIncludeJokers}
        handleShuffle={handleShuffle}
        handleFlipAll={handleFlipAll}
      />
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
