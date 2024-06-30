import React from "react";
import { Mark } from "../../enums/enums";

interface DeckControlsProps {
  minMark: Mark;
  maxMark: Mark;
  includeJokers: boolean;
  playerCount?: number;
  cardsPerPlayer?: number;
  setMinMark: (value: Mark) => void;
  setMaxMark: (value: Mark) => void;
  setIncludeJokers: (value: boolean) => void;
  setPlayerCount?: (value: number) => void;
  setCardsPerPlayer?: (value: number) => void;
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
    <div className="max-w-screen-lg mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <label className="text-lg">Min Mark:</label>
        <select
          value={minMark}
          onChange={(e) => setMinMark(e.target.value as Mark)}
          className="px-3 py-2 border rounded-lg bg-gray-700 text-white"
        >
          {Object.values(Mark)
            .filter((mark) => mark !== Mark.Joker)
            .map((mark) => (
              <option key={mark} value={mark}>
                {mark}
              </option>
            ))}
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <label className="text-lg">Max Mark:</label>
        <select
          value={maxMark}
          onChange={(e) => setMaxMark(e.target.value as Mark)}
          className="px-3 py-2 border rounded-lg bg-gray-700 text-white"
        >
          {Object.values(Mark)
            .filter((mark) => mark !== Mark.Joker)
            .map((mark) => (
              <option key={mark} value={mark}>
                {mark}
              </option>
            ))}
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <label className="text-lg">Include Jokers:</label>
        <input
          type="checkbox"
          checked={includeJokers}
          onChange={(e) => setIncludeJokers(e.target.checked)}
          className="ml-2 h-6 w-6 rounded-lg bg-gray-700 text-white"
        />
      </div>

      {setPlayerCount && setCardsPerPlayer && (
        <>
          <div className="flex items-center space-x-4">
            <label className="text-lg">Player Count:</label>
            <input
              type="number"
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              min="1"
              className="px-3 py-2 border rounded-lg bg-gray-700 text-white"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-lg">Cards Per Player:</label>
            <input
              type="number"
              value={cardsPerPlayer}
              onChange={(e) => setCardsPerPlayer(Number(e.target.value))}
              min="1"
              className="px-3 py-2 border rounded-lg bg-gray-700 text-white"
            />
          </div>
        </>
      )}

      <div className="flex items-center space-x-4">
        <button
          onClick={handleShuffle}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Shuffle Deck
        </button>
        <button
          onClick={handleFlipAll}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
        >
          Flip All
        </button>
      </div>
    </div>
  );
};

export default DeckControls;
