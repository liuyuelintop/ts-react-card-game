// 定义卡牌颜色类型
export type Color = "♥" | "♠" | "♦" | "♣" | "★";

// 定义常规卡牌类型
export type NormalCard = {
  color: Color;
  mark: number | "Joker";
};

// 定义扑克牌组类型
export type Deck = NormalCard[];
