# Card Deck Project

This project is a simple React application that displays a deck of cards, including a shuffle button to shuffle the deck. The project uses TypeScript and Tailwind CSS for styling.

## Project Initialization

To create a new React project with TypeScript and Tailwind CSS, you can follow these steps:

1. **Create a new React project with TypeScript:**

```bash
npx create-react-app ts-react-card-game --template typescript
cd ts-react-card-game
```

2. **Install Tailwind CSS:**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Configure Tailwind CSS:**

Update the `tailwind.config.js` file:

```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

4. **Add Tailwind CSS to your project:**

Create a new CSS file `src/index.css` and add the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then import this CSS file in `src/index.tsx`:

## Setup

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download and install them from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/liuyuelintop/ts-react-card-game.git
cd ts-react-card-game
```

2. **Install the dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm start
```

This will start the development server and open the application in your default browser.

## Project Structure

The project structure is organized as follows:

```
my-card-game/
│
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   └── Deck/
│   │       ├── Deck.tsx
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── utils/
│   │   └── deck.ts
│   ├── types/
│   │   └── types.ts
│   ├── App.tsx
│   └── index.tsx
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Code Explanation

### 1. Types

**src/types/types.ts**

```typescript
export type Color = "♥" | "♠" | "♦" | "♣" | "★";

export type NormalCard = {
  color: Color;
  mark: number | "Joker";
};

export type Deck = NormalCard[];
```

### 2. Deck Utility Functions

**src/utils/deck.ts**

```typescript
import { Deck, NormalCard } from "../types/types";

export const createDeck = (): Deck => {
  const deck: Deck = [];
  const colors: Exclude<NormalCard["color"], "★">[] = ["♥", "♠", "♦", "♣"];

  for (let i = 1; i <= 13; i++) {
    for (const color of colors) {
      deck.push({ color, mark: i });
    }
  }

  deck.push({ color: "★", mark: "Joker" });
  deck.push({ color: "★", mark: "Joker" });

  return deck;
};

export const markToString = (mark: number | "Joker"): string | "Joker" => {
  if (mark === "Joker") {
    return "Joker";
  }

  switch (mark) {
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

export const shuffleDeck = (deck: Deck): Deck => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};
```

### 3. Card Component

**src/components/Card/Card.tsx**

```typescript
import React from "react";
import { NormalCard } from "../../types/types";

interface CardProps {
  card: NormalCard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="border rounded-lg w-20 h-28 flex flex-col justify-center items-center m-2 shadow-lg transform hover:scale-105 transition duration-300 bg-white">
      <div
        className={`text-3xl ${
          card.color === "♥" || card.color === "♦"
            ? "text-red-500"
            : "text-black"
        }`}
      >
        {card.color}
      </div>
      <div className="text-xl mt-2">
        {typeof card.mark === "number" ? card.mark : "Joker"}
      </div>
    </div>
  );
};

export default Card;
```

### 4. Deck Component

**src/components/Deck/Deck.tsx**

```typescript
import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { createDeck, markToString, shuffleDeck } from "../../utils/deck";
import { NormalCard } from "../../types/types";

const Deck: React.FC = () => {
  const [deck, setDeck] = useState<NormalCard[]>([]);

  useEffect(() => {
    const newDeck = createDeck();
    setDeck(newDeck);
  }, []);

  const handleShuffle = () => {
    setDeck((prevDeck) => shuffleDeck(prevDeck));
  };

  return (
    <div className="text-center">
      <button
        onClick={handleShuffle}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        Shuffle Deck
      </button>
      <div className="flex flex-wrap justify-center">
        {deck.map((card: NormalCard, index: number) => (
          <Card
            key={index}
            card={{
              ...card,
              mark: markToString(card.mark) as number | "Joker",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
```

### 5. App Component

**src/App.tsx**

```typescript
import React from "react";
import Deck from "./components/Deck/Deck";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div className="text-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Card Deck</h1>
      <Deck />
    </div>
  );
};

export default App;
```

### 6. Index File

**src/index.tsx**

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 7. Tailwind CSS Configuration

**tailwind.config.js**

```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 8. Global Styles

**src/styles/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**src/styles/App.css**

```css
body {
  font-family: "Arial", sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}
```

## ToDo

1. [x] Flip Card
2. [x] Create a specific length Deck of Cards based on the option
3. [ ] 动画效果 (optional)
   1. 发牌
   2. 洗牌
