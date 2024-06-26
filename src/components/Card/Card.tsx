import React from "react";
import { Card as PokerCard } from "../../types/types";
import { Color } from "../../enums/enums";

interface CardProps {
  card: PokerCard;
  isFlipped: boolean;
  onFlip: () => void;
  className?: string; // 添加 className 属性
}

const Card: React.FC<CardProps> = ({ card, isFlipped, onFlip, className }) => {
  const isJoker = card.color === "★" && card.mark === "Joker";

  return (
    <div
      className={`relative border rounded-lg w-20 h-28 flex flex-col justify-center items-center m-2 shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer ${
        isFlipped ? "bg-white" : "bg-gradient-to-r from-blue-400 to-purple-500"
      } ${className}`}
      onClick={onFlip}
    >
      {isFlipped ? (
        <>
          <div
            className={`${
              card.color === Color.Heart ||
              card.color === Color.Diamond ||
              isJoker
                ? "text-red-500"
                : "text-black"
            } ${card.color === Color.Joker ? "text-xl" : "text-3xl"}`}
          >
            {card.color}
          </div>
          <div className="text-xl mt-2">{card.mark}</div>
        </>
      ) : (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-3xl text-white">🂠</div>
        </div>
      )}
    </div>
  );
};

export default Card;
