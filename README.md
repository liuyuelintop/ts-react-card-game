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
3. [x] Use Enums to refactor codebase for card colors and marks
4. [x] Add player functionalities and deal cards
   1. Implement dealing cards to players
   2. Allow each player to flip their own cards
5. [ ] 动画效果 (optional)
   1. 发牌
   2. 洗牌

## Analysis of Refactory

### Use Enums to refactor

#### 优点

1. **类型安全** ：
   - 使用枚举确保了卡片颜色和点数的值是固定的、有效的，减少了由于输入错误而导致的 bug。
2. **可读性和可维护性** ：
   - 枚举使代码更加自文档化，提升了代码的可读性。开发者可以更容易地理解每个值的含义。
3. **简化逻辑** ：
   - 枚举值可以直接使用，避免了字符串值的比较和转换，简化了代码逻辑。
4. **减少魔法字符串** ：
   - 枚举的使用减少了代码中的魔法字符串，使代码更易于维护和修改。

#### 缺点

1. **初始改动成本** ：
   - 需要重构现有代码，并测试以确保新代码不会引入 bug。初始的改动成本较高。
2. **枚举的硬编码** ：
   - 枚举值是硬编码的，不能在运行时动态修改。如果未来需要扩展卡片的颜色或点数，需要修改代码重新部署。
3. **复杂性增加** ：
   - 对于简单的项目或小型脚本，引入枚举可能会增加不必要的复杂性。

#### 是否需要进行改动的探讨

##### 应用场景

- **大型项目** ：在大型项目中，类型安全和可维护性是非常重要的。枚举可以减少错误并使代码更易于理解和维护。
- **多开发者协作** ：在有多个开发者协作的项目中，使用枚举可以确保所有人使用统一的值，减少因沟通不畅而引起的错误。
- **频繁更新** ：如果项目中卡片的颜色和点数需要频繁更新或扩展，枚举的硬编码可能会带来一些不便。

##### 消耗的资源

- **开发时间** ：需要投入时间来重构现有代码，并进行全面测试以确保新代码的正确性。
- **系统资源** ：枚举在运行时的性能开销非常小，基本可以忽略不计。

##### 综合考虑

- **推荐进行改动** ：如果项目是一个长期维护的大型项目，或者是一个需要多人协作的项目，使用枚举带来的好处远大于其缺点，推荐进行改动。
- **不推荐进行改动** ：如果项目是一个短期的小型项目，或者对性能和开发速度有极高要求，可以考虑不进行改动，以减少初始的改动成本和复杂性增加。

综上所述，使用枚举对项目代码进行优化是一种有效的方式，尤其在大型项目中能显著提升代码的安全性和可维护性。但在实施前应考虑项目的具体情况和需求，以确保改动带来的好处大于其成本。
