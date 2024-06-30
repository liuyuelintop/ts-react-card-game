import React from "react";
import { Mark } from "../../enums/enums";

interface DeckControlsProps {
  minMark: Mark;
  maxMark: Mark;
  includeJokers: boolean;
  playerCount: number;
  cardsPerPlayer: number;
  setMinMark: (value: Mark) => void;
  setMaxMark: (value: Mark) => void;
  setIncludeJokers: (value: boolean) => void;
  setPlayerCount: (value: number) => void;
  setCardsPerPlayer: (value: number) => void;
  handleShuffle: () => void;
  handleFlipAll: () => void;
}

const DeckControls: React.FC<DeckControlsProps> = ({
  minMark,
  maxMark,
  includeJokers,
  playerCount,
  cardsPerPlayer,
  setMinMark,
  setMaxMark,
  setIncludeJokers,
  setPlayerCount,
  setCardsPerPlayer,
  handleShuffle,
  handleFlipAll,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-center items-center mb-4">
        <label className="mr-2">Min Mark:</label>
        <select
          value={minMark}
          onChange={(e) => setMinMark(e.target.value as Mark)}
          className="px-2 py-1 border rounded"
        >
          {Object.values(Mark)
            .filter((mark) => mark !== Mark.Joker)
            .map((mark) => (
              <option key={mark} value={mark}>
                {mark}
              </option>
            ))}
        </select>
        <label className="ml-4 mr-2">Max Mark:</label>
        <select
          value={maxMark}
          onChange={(e) => setMaxMark(e.target.value as Mark)}
          className="px-2 py-1 border rounded"
        >
          {Object.values(Mark)
            .filter((mark) => mark !== Mark.Joker)
            .map((mark) => (
              <option key={mark} value={mark}>
                {mark}
              </option>
            ))}
        </select>
        <label className="ml-4 mr-2">Include Jokers:</label>
        <input
          type="checkbox"
          checked={includeJokers}
          onChange={(e) => setIncludeJokers(e.target.checked)}
          className="ml-2"
        />
        <label className="ml-4 mr-2">Player Count:</label>
        <input
          type="number"
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
          min="1"
          className="px-2 py-1 border rounded"
        />
        <label className="ml-4 mr-2">Cards Per Player:</label>
        <input
          type="number"
          value={cardsPerPlayer}
          onChange={(e) => setCardsPerPlayer(Number(e.target.value))}
          min="1"
          className="px-2 py-1 border rounded"
        />
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default DeckControls;
