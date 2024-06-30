import React, { useState } from "react";
import Card from "../Card/Card";
import DealControls from "./DealControls";
import useDeck from "../../hooks/Deck/useDeck";
import usePlayerDeck from "../../hooks/Player/usePlayerDeck";
import { Mark } from "../../enums/enums";

const DealPage: React.FC = () => {
  const [minMark, setMinMark] = useState<Mark>(Mark.Ace);
  const [maxMark, setMaxMark] = useState<Mark>(Mark.King);
  const [includeJokers, setIncludeJokers] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [cardsPerPlayer, setCardsPerPlayer] = useState<number>(5);

  const { deck } = useDeck(minMark, maxMark, includeJokers);

  const {
    players,
    playerFlips,
    handleDealCards,
    handlePlayerFlip,
    handleFlipAllPlayers,
  } = usePlayerDeck(deck, playerCount, cardsPerPlayer);

  return (
    <div className="text-center p-8 bg-gray-900 min-h-screen">
      <DealControls
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
        handleFlipAll={handleFlipAllPlayers}
        handleDealCards={handleDealCards}
      />
      <div className="mt-8 grid grid-cols-1 gap-4">
        {players.map((player, playerIndex) => (
          <div key={player.id} className="mb-4">
            <h3 className="text-lg text-white font-bold mb-2">{player.name}</h3>
            <div className="flex justify-center gap-2">
              {player.hand.map((card, cardIndex) => (
                <Card
                  key={`${player.id}-${cardIndex}`}
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

export default DealPage;
