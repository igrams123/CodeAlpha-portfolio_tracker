// src/components/PortfolioTable.jsx

import React from "react";

const PortfolioTable = ({ stocks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Symbol</th>
            <th className="border p-2">Company Name</th>
            <th className="border p-2">Shares</th>
            <th className="border p-2">Current Price</th>
            <th className="border p-2">Total Value</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td className="border p-2">{stock.symbol}</td>
              <td className="border p-2">{stock.companyName}</td>
              <td className="border p-2">{stock.shares}</td>
              <td className="border p-2">${stock.price.toFixed(2)}</td>
              <td className="border p-2">${(stock.price * stock.shares).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
