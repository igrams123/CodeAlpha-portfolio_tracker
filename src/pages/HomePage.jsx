import React from "react";
import StockPortfolio from "../components/StockPortfolio"; // Import the StockPortfolio component

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Stock Portfolio Tracker</h1>
      <StockPortfolio /> {/* Render the StockPortfolio component */}
    </div>
  );
};

export default HomePage;
