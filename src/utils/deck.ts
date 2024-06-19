import { Deck, NormalCard } from "../types/types";

interface CreateDeckOptions {
  includeJokers?: boolean;
  minMark?: number;
  maxMark?: number;
}

/**
 * 创建一副制定长度的扑克牌
 * @returns {Deck} 返回生成的牌堆
 */
export const createDeck = (options: CreateDeckOptions = {}): Deck => {
  const { includeJokers = true, minMark = 1, maxMark = 13 } = options;
  const deck: Deck = [];
  // 定义常规牌的颜色，排除Joker
  const colors: Exclude<NormalCard["color"], "★">[] = ["♥", "♠", "♦", "♣"];

  // 为每种颜色生成指定数量的牌
  for (let i = minMark; i <= maxMark; i++) {
    for (const color of colors) {
      deck.push({ color, mark: i });
    }
  }
  // 根据option添加Joker牌
  if (includeJokers) {
    deck.push({ color: "★", mark: "Joker" });
    deck.push({ color: "★", mark: "Joker" });
  }

  return deck;
};

/**
 * 将点数转换为字符串表示，J、Q、K 和 Joker
 * @param {number | "Joker"} mark - 牌的点数或Joker
 * @returns {string | "Joker"} 返回转换后的字符串表示
 */
export const markToString = (mark: number | "Joker"): string | "Joker" => {
  if (mark === "Joker") {
    return "Joker";
  }

  switch (mark) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return mark.toString();
  }
};

/**
 * 洗牌功能，使用Fisher-Yates算法打乱牌堆
 * @param {Deck} deck - 要洗的牌堆
 * @returns {Deck} 返回洗乱后的牌堆
 */
export const shuffleDeck = (deck: Deck): Deck => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};
