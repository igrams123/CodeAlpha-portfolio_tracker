# Stock Portfolio Tracker

A web application for tracking stock portfolio with real-time stock prices and performance. This app allows users to input stock symbols, the number of shares, and their purchase price. The app fetches real-time stock data, calculates the profit or loss, and displays the total portfolio value.

## Features

- Add stocks to the portfolio by entering the stock symbol, number of shares, and purchase price.
- Fetch real-time stock data using FastAPI for the backend and display it on the frontend.
- Calculate the profit or loss based on the difference between the purchase price and the current price of the stock.
- Visualize stock portfolio performance with charts.

## Technologies Used

- **Frontend:** React, TailwindCSS
- **Backend:** FastAPI (Python)
- **Real-time Stock Data:** Finnhub API
- **Database:** None (Data is stored in-memory for simplicity)
- **Charts:** Portfolio chart visualizations

Backend Setup
Clone the Repository:

git clone https://github.com/your-username/stock-portfolio-tracker.git

cd stock-portfolio-tracker

Install Dependencies:

Navigate to the backend directory and install the required dependencies:

cd backend
pip install -r requirements.txt
Run the FastAPI Backend:

Run the FastAPI app using Uvicorn:

uvicorn app.main:app --reload

The FastAPI server should be running at http://127.0.0.1:8000.

## Project Structure





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

