// src/App.tsx

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
