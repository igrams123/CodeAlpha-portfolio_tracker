import React, { useState, useEffect } from "react";
import PortfolioChart from "./PortfolioChart";

const StockPortfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");
  const [price, setPrice] = useState(""); // Added for purchase price
  const [companyName, setCompanyName] = useState(""); // Added for company name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch company name when symbol changes
    if (symbol.trim()) {
      const fetchCompanyName = async () => {
        try {
          const response = await fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=YOUR_API_KEY`
          );
          const data = await response.json();
          setCompanyName(data.name || "Unknown Company");
        } catch {
          setCompanyName("Invalid Symbol");
        }
      };
      fetchCompanyName();
    } else {
      setCompanyName("");
    }
  }, [symbol]);

  const handleAddStock = async (e) => {
    e.preventDefault();

    if (!symbol.trim() || !shares || shares <= 0 || !price || price <= 0) {
      setError("Please enter a valid symbol, number of shares, and purchase price.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const stockResponse = await fetch(`http://127.0.0.1:8000/stock/${symbol}`);
      const stockData = await stockResponse.json();

      const currentPrice = stockData.data?.c ?? 0; // Ensure valid current price
      if (!currentPrice) throw new Error("Failed to retrieve current stock price.");

      const newStock = {
        symbol: symbol.toUpperCase(),
        name: companyName || symbol.toUpperCase(), // Use company name if available
        shares: parseFloat(shares),
        price: parseFloat(price),
        currentPrice,
      };

      setStocks((prevStocks) => [...prevStocks, newStock]);
      setSymbol("");
      setShares("");
      setPrice("");
      setCompanyName("");
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setError("Failed to fetch stock data. Please check the symbol and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStock = (symbolToRemove) => {
    setStocks(stocks.filter((stock) => stock.symbol !== symbolToRemove));
  };

  const calculateProfitLoss = (stock) => {
    const profitLoss = stock.shares * (stock.currentPrice - stock.price);
    return {
      value: profitLoss.toFixed(2),
      isProfit: profitLoss >= 0,
    };
  };

  const calculateTotalValue = () => {
    return stocks
      .reduce((acc, stock) => acc + stock.shares * stock.currentPrice, 0)
      .toFixed(2);
  };

  const calculateTotalProfitLoss = () => {
    return stocks
      .reduce((acc, stock) => acc + stock.shares * (stock.currentPrice - stock.price), 0)
      .toFixed(2);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">My Portfolio</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleAddStock} className="mb-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Stock Symbol (e.g., AAPL)"
          className="border p-2 mr-2"
        />
        {companyName && (
          <span className="text-gray-500 italic">({companyName})</span>
        )}
        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          placeholder="Number of Shares"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Purchase Price (USD)"
          className="border p-2 mr-2"
        />
        <button type="submit" className="border p-2 bg-blue-500 text-white" disabled={loading}>
          {loading ? "Adding..." : "Add Stock"}
        </button>
      </form>

      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Symbol</th>
                <th className="border p-2">Company</th>
                <th className="border p-2">Shares</th>
                <th className="border p-2">Purchase Price (USD)</th>
                <th className="border p-2">Current Price (USD)</th>
                <th className="border p-2">Profit/Loss</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => {
                const { value, isProfit } = calculateProfitLoss(stock);
                return (
                  <tr key={index}>
                    <td className="border p-2">{stock.symbol}</td>
                    <td className="border p-2">{stock.name}</td>
                    <td className="border p-2">{stock.shares}</td>
                    <td className="border p-2">${stock.price.toFixed(2)}</td>
                    <td className="border p-2">${stock.currentPrice.toFixed(2)}</td>
                    <td className="border p-2">
                      <span
                        className={isProfit ? "text-green-500" : "text-red-500"}
                      >
                        {isProfit ? "▲" : "▼"} ${value}
                      </span>
                    </td>
                    <td className="border p-2">
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleRemoveStock(stock.symbol)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4">
            <h3 className="font-bold">Total Portfolio Value: </h3>
            <p>${calculateTotalValue()}</p>
            <h3 className="font-bold">Total Profit/Loss: </h3>
            <p>${calculateTotalProfitLoss()}</p>
          </div>

          <PortfolioChart stocks={stocks} />
        </>
      )}
    </div>
  );
};

export default StockPortfolio;
