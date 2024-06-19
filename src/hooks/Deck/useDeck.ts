import { useState, useEffect } from "react";
import { createDeck, shuffleDeck } from "../../utils/deck";
import { NormalCard } from "../../types/types";
import { Mark } from "../../enums/enums";

const useDeckLogic = (minMark: Mark, maxMark: Mark, includeJokers: boolean) => {
  const [deck, setDeck] = useState<NormalCard[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);

  useEffect(() => {
    const newDeck = createDeck({
      includeJokers,
      minMark,
      maxMark,
    });
    setDeck(newDeck);
    setFlipped(new Array(newDeck.length).fill(false));
  }, [minMark, maxMark, includeJokers]);

  const handleShuffle = () => {
    setDeck((prevDeck) => shuffleDeck(prevDeck));
    setFlipped(new Array(deck.length).fill(false));
  };

  const handleFlipAll = () => {
    const allFlipped = flipped.every((state) => state);
    setFlipped(new Array(deck.length).fill(!allFlipped));
  };

  const handleFlip = (index: number) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return {
    deck,
    flipped,
    handleShuffle,
    handleFlipAll,
    handleFlip,
  };
};

export default useDeckLogic;
