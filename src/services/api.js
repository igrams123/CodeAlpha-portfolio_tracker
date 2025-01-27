const BASE_URL = "http://127.0.0.1:8000"; // Backend URL

// Fetch stock data by symbol
export const fetchStockData = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}/stock/${symbol}`);
    if (!response.ok) {
      throw new Error("Failed to fetch stock data.");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

// Fetch company profile by symbol
export const fetchCompanyProfile = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}/company/${symbol}`);
    if (!response.ok) {
      throw new Error("Failed to fetch company profile.");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching company profile:", error);
    throw error;
  }
};
