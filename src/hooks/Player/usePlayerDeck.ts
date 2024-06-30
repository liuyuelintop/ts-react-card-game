import { useState } from "react";
import { NormalCard, Player } from "../../types/types";
import { dealCards } from "../../utils/deck";

const usePlayerDeck = (
  deck: NormalCard[],
  playerCount: number,
  cardsPerPlayer: number
) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerFlips, setPlayerFlips] = useState<boolean[][]>([]);

  const handleDealCards = () => {
    const dealtPlayers = dealCards(deck, playerCount, cardsPerPlayer);
    setPlayers(dealtPlayers);
    setPlayerFlips(
      dealtPlayers.map((player) => new Array(player.hand.length).fill(false))
    );
  };

  const handlePlayerFlip = (playerIndex: number, cardIndex: number) => {
    setPlayerFlips((prevPlayerFlips) => {
      const newPlayerFlips = [...prevPlayerFlips];
      newPlayerFlips[playerIndex] = [...newPlayerFlips[playerIndex]];
      newPlayerFlips[playerIndex][cardIndex] =
        !newPlayerFlips[playerIndex][cardIndex];
      return newPlayerFlips;
    });
  };

  const handleFlipAllPlayers = () => {
    const allFlipped = playerFlips.every((playerFlip) =>
      playerFlip.every((state) => state)
    ); // 检查所有玩家的卡片是否都已翻转
    setPlayerFlips(
      playerFlips.map((playerFlip) => playerFlip.map(() => !allFlipped))
    ); // 如果所有卡片都已翻转，则将所有卡片设为未翻转，反之亦然
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
