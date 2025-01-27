import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PortfolioChart = ({ stocks }) => {
  // Prepare labels (stock symbols) and data (current prices)
  const labels = stocks.map((stock) => stock.symbol); // Stock symbols as labels
  const prices = stocks.map((stock) => stock.currentPrice); // Current prices for the stocks

  // Define chart data
  const data = {
    labels, // X-axis labels
    datasets: [
      {
        label: "Stock Prices", // Dataset label
        data: prices, // Y-axis data
        fill: false, // Do not fill under the line
        borderColor: "rgb(75, 192, 192)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Point background color
        tension: 0.4, // Smoothing of the line
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        position: "top", // Legend position
      },
      title: {
        display: true,
        text: "Portfolio Performance", // Chart title
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Portfolio Performance</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default PortfolioChart;
