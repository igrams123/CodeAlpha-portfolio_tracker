import React, { useState } from 'react';
import { fetchCompanyProfile, fetchStockData } from '../services/api'; // Import API services

const AddStockForm = ({ onAddStock }) => {
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symbol.trim() || !shares || shares <= 0) {
      setError('Please enter a valid symbol and number of shares.');
      return;
    }

    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const stockQuote = await fetchStockData(symbol); // Fetch stock quote
      const stockProfile = await fetchCompanyProfile(symbol); // Fetch company profile

      if (!stockQuote || !stockProfile || !stockQuote.c || !stockProfile.name) {
        throw new Error('Invalid stock data received.');
      }

      const stockData = {
        symbol: symbol.toUpperCase(),
        shares: parseFloat(shares),
        price: stockQuote.c,
        name: stockProfile.name,
      };

      onAddStock(stockData); // Add stock to portfolio
      setSymbol('');
      setShares('');
    } catch (err) {
      setError('Failed to fetch stock data. Please check the symbol and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="mb-4">
        <label className="block mb-1 font-bold">Stock Symbol</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="e.g., AAPL, GOOGL"
          className="w-full border px-2 py-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold">Number of Shares</label>
        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          placeholder="e.g., 10"
          className="w-full border px-2 py-1"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Stock'}
      </button>
    </form>
  );
};

export default AddStockForm;
