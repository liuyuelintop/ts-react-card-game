import { Color, Mark } from "../enums/enums";

export type Card = NormalCard | Joker;

type NormalCard = {
  color: Color;
  mark: Mark;
};

type Joker = {
  color: "★";
  mark: "joker" | "Joker";
};

export type Deck = Card[];

export type Player = {
  id: number;
  name: string;
  hand: Card[];
};
