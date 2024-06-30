import React, { useState } from "react";
import Card from "../Card/Card";
import DeckControls from "../Deck/DeckControls";
import useDeck from "../../hooks/Deck/useDeck";
import usePlayerDeck from "../../hooks/Player/usePlayerDeck";
import { Mark } from "../../enums/enums";

const DealPage: React.FC = () => {
  const [minMark, setMinMark] = useState<Mark>(Mark.Ace);
  const [maxMark, setMaxMark] = useState<Mark>(Mark.King);
  const [includeJokers, setIncludeJokers] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [cardsPerPlayer, setCardsPerPlayer] = useState<number>(5);

  const { deck, handleShuffle } = useDeck(minMark, maxMark, includeJokers);

  const {
    players,
    playerFlips,
    handleDealCards,
    handlePlayerFlip,
    handleFlipAllPlayers,
  } = usePlayerDeck(deck, playerCount, cardsPerPlayer);

  return (
    <div className="text-center p-8 bg-gray-900 min-h-screen">
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
        handleFlipAll={handleFlipAllPlayers}
      />
      <button
        onClick={handleDealCards}
        className="mt-4 mb-8 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition"
      >
        Deal Cards
      </button>
      <div className="mt-8 grid grid-cols-1 gap-4">
        {players.map((player, playerIndex) => (
          <div key={player.id} className="mb-4">
            <h3 className="text-lg font-bold mb-2">{player.name}</h3>
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
