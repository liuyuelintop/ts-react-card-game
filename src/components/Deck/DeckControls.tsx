import React from "react";
import { Mark } from "../../enums/enums";
import SelectControl from "../Controls/SelectControl";
import CheckboxControl from "../Controls/CheckboxControl";

interface DeckControlsProps {
  minMark: Mark;
  maxMark: Mark;
  includeJokers: boolean;
  setMinMark: (value: Mark) => void;
  setMaxMark: (value: Mark) => void;
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
    <div className="max-w-screen-md mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col space-y-6">
      <div className="flex flex-wrap justify-between space-y-4 sm:space-y-0">
        <div className="flex-1 min-w-[200px] mr-4">
          <SelectControl
            label="Min Mark"
            value={minMark}
            options={Object.values(Mark).filter((mark) => mark !== Mark.Joker)}
            onChange={(value) => setMinMark(value as Mark)}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <SelectControl
            label="Max Mark"
            value={maxMark}
            options={Object.values(Mark).filter((mark) => mark !== Mark.Joker)}
            onChange={(value) => setMaxMark(value as Mark)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center space-y-4 sm:space-y-0">
        <CheckboxControl
          label="Include Jokers"
          checked={includeJokers}
          onChange={setIncludeJokers}
        />
      </div>
      <div className="flex justify-center space-x-4">
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
