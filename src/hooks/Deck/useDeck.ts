import { useState, useEffect } from "react";
import { createDeck, shuffleDeck } from "../../utils/deck";
import { NormalCard } from "../../types/types";
import { Mark } from "../../enums/enums";

// 自定义 Hook，用于管理扑克牌堆和卡片翻转状态
const useDeck = (minMark: Mark, maxMark: Mark, includeJokers: boolean) => {
  // 状态：deck 表示当前的扑克牌堆，flipped 表示每张卡片的翻转状态
  const [deck, setDeck] = useState<NormalCard[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);

  // 使用 useEffect 在组件挂载时生成新的牌堆，并初始化翻转状态
  useEffect(() => {
    const newDeck = createDeck({
      includeJokers,
      minMark,
      maxMark,
    });
    setDeck(newDeck);
    setFlipped(new Array(newDeck.length).fill(false)); // 初始化所有卡片为未翻转状态
  }, [minMark, maxMark, includeJokers]); // 依赖项：当这些值变化时重新生成牌堆

  // 洗牌函数，重新排列牌堆，并重置翻转状态
  const handleShuffle = () => {
    const shuffledDeck = shuffleDeck(deck);
    setDeck(shuffledDeck);
    setFlipped(new Array(shuffledDeck.length).fill(false));
  };

  // 翻转所有卡片状态的函数
  const handleFlipAll = () => {
    const allFlipped = flipped.every((state) => state); // 检查所有卡片是否都已翻转
    setFlipped(new Array(deck.length).fill(!allFlipped)); // 如果所有卡片都已翻转，则将所有卡片设为未翻转，反之亦然
  };

  // 翻转单张卡片状态的函数
  const handleFlip = (index: number) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index]; // 翻转指定索引的卡片状态
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

export default useDeck;
