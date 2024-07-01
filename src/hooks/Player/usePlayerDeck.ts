import { useState } from "react";
import { Card, Player } from "../../types/types";
import { dealCards } from "../../utils/deck";
import useFlip from "../useFlip";

const usePlayerDeck = (
  deck: Card[],
  playerCount: number,
  cardsPerPlayer: number
) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const {
    flipped: playerFlips,
    handleFlipAll: handleFlipAllPlayers,
    handleFlip: handlePlayerFlip,
    setFlipped: setPlayerFlips,
  } = useFlip(playerCount, true);

  const handleDealCards = () => {
    const dealtPlayers = dealCards(deck, playerCount, cardsPerPlayer);
    setPlayers(dealtPlayers);
    setPlayerFlips(
      dealtPlayers.map((player) => new Array(player.hand.length).fill(false))
    );
  };

  return {
    players,
    playerFlips,
    handleDealCards,
    handlePlayerFlip,
    handleFlipAllPlayers,
  };
};

export default usePlayerDeck;
