// src/components/Deck/DeckControls.tsx

import React from "react";

interface DeckControlsProps {
  minMark: number;
  maxMark: number;
  includeJokers: boolean;
  setMinMark: (value: number) => void;
  setMaxMark: (value: number) => void;
  setIncludeJokers: (value: boolean) => void;
  handleShuffle: () => void;
  handleFlipAll: () => void;
}

const DeckControls: React.FC<DeckControlsProps> = ({
  minMark,
  maxMark,
  includeJokers,
  setMinMark,
  setMaxMark,
  setIncludeJokers,
  handleShuffle,
  handleFlipAll,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-center items-center mb-4">
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
        <label className="ml-4 mr-2">Jokers:</label>
        <input
          type="checkbox"
          checked={includeJokers}
          onChange={(e) => setIncludeJokers(e.target.checked)}
          className="ml-2"
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
