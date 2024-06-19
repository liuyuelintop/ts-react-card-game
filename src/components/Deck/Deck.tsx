import React, { useState } from "react";
import Card from "../Card/Card";
import DeckControls from "./DeckControls";
import useDeck from "../../hooks/Deck/useDeck";
import { NormalCard } from "../../types/types";
import { Mark } from "../../enums/enums";
import { markToString } from "../../utils/deck";

const Deck: React.FC = () => {
  const [minMark, setMinMark] = useState<Mark>(Mark.Ace);
  const [maxMark, setMaxMark] = useState<Mark>(Mark.King);
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
              mark: markToString(card.mark) as Mark,
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
