import React from "react";
import { Mark } from "../../enums/enums";
import SelectControl from "../Controls/SelectControl";
import CheckboxControl from "../Controls/CheckboxControl";
import NumberInputControl from "../Controls/NumberInputControl";

interface DealControlsProps {
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
  handleFlipAll: () => void;
  handleDealCards: () => void;
}

const DealControls: React.FC<DealControlsProps> = ({
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
  handleFlipAll,
  handleDealCards,
}) => {
  return (
    <div className="max-w-screen-md mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectControl
          label="Min Mark"
          value={minMark}
          options={Object.values(Mark).filter((mark) => mark !== Mark.Joker)}
          onChange={(value) => setMinMark(value as Mark)}
        />
        <SelectControl
          label="Max Mark"
          value={maxMark}
          options={Object.values(Mark).filter((mark) => mark !== Mark.Joker)}
          onChange={(value) => setMaxMark(value as Mark)}
        />
      </div>
      <CheckboxControl
        label="Include Jokers"
        checked={includeJokers}
        onChange={setIncludeJokers}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInputControl
          label="Player Count"
          value={playerCount}
          min={1}
          onChange={setPlayerCount}
        />
        <NumberInputControl
          label="Cards Per Player"
          value={cardsPerPlayer}
          min={1}
          onChange={setCardsPerPlayer}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleFlipAll}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
        >
          Flip All
        </button>
        <button
          onClick={handleDealCards}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition"
        >
          Deal Cards
        </button>
      </div>
    </div>
  );
};

export default DealControls;
