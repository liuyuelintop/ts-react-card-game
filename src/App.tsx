import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Deck from "./components/Deck/Deck";
import DealPage from "./components/DealPage/DealPage";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="flex space-x-4 p-4 bg-gray-800 text-white">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/deal">Deal Cards</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Deck />} />
          <Route path="/deal" element={<DealPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
