// src/components/Card/Card.tsx

import React from "react";
import { NormalCard } from "../../types/types";

interface CardProps {
  card: NormalCard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="border rounded-lg w-20 h-28 flex flex-col justify-center items-center m-2 shadow-lg transform hover:scale-110 transition duration-300 bg-white">
      <div
        className={`text-3xl ${
          card.color === "♥" || card.color === "♦" || card.color === "★"
            ? "text-red-500"
            : "text-black"
        }`}
      >
        {card.color}
      </div>
      <div className="text-2xl mt-2">{card.mark}</div>
    </div>
  );
};

export default Card;
