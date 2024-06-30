import React, { useState } from "react";
import Card from "../Card/Card";
import DeckControls from "./DeckControls";
import useDeck from "../../hooks/Deck/useDeck";
import { NormalCard } from "../../types/types";
import { Mark } from "../../enums/enums";

const Deck: React.FC = () => {
  const [minMark, setMinMark] = useState<Mark>(Mark.Ace);
  const [maxMark, setMaxMark] = useState<Mark>(Mark.King);
  const [includeJokers, setIncludeJokers] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [cardsPerPlayer, setCardsPerPlayer] = useState<number>(5);

  const {
    deck,
    flipped,
    players,
    playerFlips,
    handleShuffle,
    handleFlipAll,
    handleFlip,
    handlePlayerFlip,
    handleDealCards,
  } = useDeck(minMark, maxMark, includeJokers, playerCount, cardsPerPlayer);

  return (
    <div className="text-center">
      <DeckControls
        minMark={minMark}
        maxMark={maxMark}
        includeJokers={includeJokers}
        playerCount={playerCount}
        cardsPerPlayer={cardsPerPlayer}
        setMinMark={setMinMark}
        setMaxMark={setMaxMark}
        setIncludeJokers={setIncludeJokers}
        setPlayerCount={setPlayerCount}
        setCardsPerPlayer={setCardsPerPlayer}
        handleShuffle={handleShuffle}
        handleFlipAll={handleFlipAll}
      />
      <button
        onClick={handleDealCards}
        className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition"
      >
        Deal Cards
      </button>
      <div className="flex flex-wrap justify-center gap-2">
        {deck.map((card: NormalCard, index: number) => (
          <Card
            key={index}
            card={card}
            isFlipped={flipped[index]}
            onFlip={() => handleFlip(index)}
          />
        ))}
      </div>
      <div className="mt-8">
        {players.map((player, playerIndex) => (
          <div key={player.id} className="mb-4">
            <h3 className="text-lg font-bold">{player.name}</h3>
            <div className="flex justify-center gap-2">
              {player.hand.map((card, cardIndex) => (
                <Card
                  key={cardIndex}
                  card={card}
                  isFlipped={playerFlips[playerIndex][cardIndex]}
                  onFlip={() => handlePlayerFlip(playerIndex, cardIndex)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deck;
