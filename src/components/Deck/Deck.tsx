import React, { useState } from "react";
import Card from "../Card/Card";
import DeckControls from "./DeckControls";
import useDeck from "../../hooks/Deck/useDeck";
import { Mark } from "../../enums/enums";

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
    <div className="text-center p-8 bg-gray-900 min-h-screen">
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
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {deck.map((card, index) => (
          <Card
            key={index}
            card={card}
            isFlipped={(flipped as boolean[])[index]}
            onFlip={() => handleFlip(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
