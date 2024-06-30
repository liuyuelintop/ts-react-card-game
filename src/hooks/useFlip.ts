import { useState } from "react";

/**
 * 自定义 Hook，用于管理卡片的翻转状态。
 *
 * @param length - 卡片的数量。如果是嵌套数组，表示玩家的数量。
 * @param nested - 是否是嵌套数组。如果为 true，表示每个玩家有多张卡片。
 *
 * @returns 包含翻转状态数组和翻转处理函数的对象。
 */
const useFlip = (length: number, nested: boolean = false) => {
  // 初始化翻转状态。如果是嵌套数组，为每个玩家初始化翻转状态数组。
  const initialFlipState = nested
    ? Array.from({ length }, () => new Array(length).fill(false))
    : new Array(length).fill(false);

  // 定义状态：flipped 存储卡片的翻转状态。
  const [flipped, setFlipped] = useState<boolean[] | boolean[][]>(
    initialFlipState
  );

  /**
   * 翻转所有卡片的状态。
   * 如果是嵌套数组，遍历所有玩家的卡片翻转状态。
   */
  const handleFlipAll = () => {
    if (nested) {
      const allFlipped = (flipped as boolean[][]).every((playerFlip) =>
        playerFlip.every((state) => state)
      );
      setFlipped(
        (flipped as boolean[][]).map((playerFlip) =>
          playerFlip.map(() => !allFlipped)
        )
      );
    } else {
      const allFlipped = (flipped as boolean[]).every((state) => state);
      setFlipped(new Array((flipped as boolean[]).length).fill(!allFlipped));
    }
  };

  /**
   * 翻转指定索引处的卡片状态。
   *
   * @param index - 要翻转的卡片的索引。如果是嵌套数组，表示玩家的索引。
   * @param nestedIndex - 如果是嵌套数组，表示玩家手中卡片的索引。
   */
  const handleFlip = (index: number, nestedIndex?: number) => {
    if (nested && nestedIndex !== undefined) {
      setFlipped((prevFlipped) => {
        const newFlipped = [...(prevFlipped as boolean[][])];
        newFlipped[index] = [...newFlipped[index]];
        newFlipped[index][nestedIndex] = !newFlipped[index][nestedIndex];
        return newFlipped;
      });
    } else {
      setFlipped((prevFlipped) => {
        const newFlipped = [...(prevFlipped as boolean[])];
        newFlipped[index] = !newFlipped[index];
        return newFlipped;
      });
    }
  };

  return { flipped, handleFlipAll, handleFlip, setFlipped };
};

export default useFlip;
