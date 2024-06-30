import { useState, useEffect } from "react";
import { createDeck, shuffleDeck } from "../../utils/deck";
import { NormalCard } from "../../types/types";
import { Mark } from "../../enums/enums";
import useFlip from "../useFlip";

const useDeck = (minMark: Mark, maxMark: Mark, includeJokers: boolean) => {
  const [deck, setDeck] = useState<NormalCard[]>([]);
  const { flipped, handleFlipAll, handleFlip, setFlipped } = useFlip(
    deck.length
  );

  useEffect(() => {
    const newDeck = createDeck({ includeJokers, minMark, maxMark });
    setDeck(newDeck);
    setFlipped(new Array(newDeck.length).fill(false));
  }, [minMark, maxMark, includeJokers, setFlipped]);

  const handleShuffle = () => {
    const shuffledDeck = shuffleDeck(deck);
    setDeck(shuffledDeck);
    setFlipped(new Array(shuffledDeck.length).fill(false));
  };

  return {
    deck,
    flipped,
    handleShuffle,
    handleFlipAll,
    handleFlip,
  };
};

export default useDeck;
