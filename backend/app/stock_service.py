import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the API key from the environment variables
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

# Base URL for FinnHub API
BASE_URL = "https://finnhub.io/api/v1"

class FinnHubService:
    @staticmethod
    def get_stock_quote(symbol: str):
        """
        Fetch stock quote data for a given symbol from FinnHub API.
        
        :param symbol: Stock ticker symbol (e.g., AAPL, MSFT)
        :return: JSON response with stock quote data
        """
        url = f"{BASE_URL}/quote"
        params = {"symbol": symbol, "token": FINNHUB_API_KEY}
        response = requests.get(url, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Failed to fetch data for {symbol}. HTTP {response.status_code}"}

    @staticmethod
    def get_company_profile(symbol: str):
        """
        Fetch company profile data for a given symbol from FinnHub API.
        
        :param symbol: Stock ticker symbol (e.g., AAPL, TSLA)
        :return: JSON response with company profile data
        """
        url = f"{BASE_URL}/stock/profile2"
        params = {"symbol": symbol, "token": FINNHUB_API_KEY}
        response = requests.get(url, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Failed to fetch company profile for {symbol}. HTTP {response.status_code}"}
