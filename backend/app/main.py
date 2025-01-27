import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
import requests
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

# Fetch Finnhub API Key from environment variables
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

# Ensure the API key is available
if not FINNHUB_API_KEY:
    raise EnvironmentError("FINNHUB_API_KEY is not set in the .env file")

# Initialize FastAPI application
app = FastAPI()

# Set up CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to fetch stock data from Finnhub
def get_stock_data(symbol: str):
    url = f'https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_API_KEY}'
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code, 
            detail="Error fetching stock data from Finnhub"
        )
    return response.json()

# API endpoint to fetch stock data
@app.get("/stock/{symbol}")
async def get_stock(symbol: str):
    """
    Fetch stock data for a given symbol.
    """
    try:
        data = get_stock_data(symbol)
        return {"symbol": symbol, "data": data}
    except HTTPException as e:
        raise e  # Pass through HTTP exceptions
    except Exception as e:
        # Handle unexpected errors gracefully
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
