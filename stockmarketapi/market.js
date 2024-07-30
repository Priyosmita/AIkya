import axios from 'axios';

// Replace with your Vantage API key
const API_KEY = 'W9FFWWWFBHNB1RRL'; 

// Expanded symbols for tech, food, and beauty industries
const TECH_SYMBOLS = [
  'MSFT', 'AAPL', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'AMD', 'INTC', 'IBM', 
  'CSCO', 'ORCL', 'SAP', 'ADBE', 'CRM', 'TWTR', 'UBER', 'PFE', 'QUALCOMM', 'VMW'
]; 

const FOOD_SYMBOLS = [
  'KO', 'PEP', 'MDLZ', 'GIS', 'CPB', 'K', 'NSRGY', 'CAG', 'SJM', 'BGS', 
  'FDP', 'BUD', 'DEO', 'HEIAF', 'WMT', 'PWR', 'SAB', 'SYY', 'STZ', 'BRFS'
]; 

const BEAUTY_SYMBOLS = [
  'EL', 'CL', 'COTY', 'PG', 'LB', 'AMZN', 'BE', 'TGT', 'M', 'ESTE', 
  'LUX', 'LVMUY', 'CHIC', 'SHS', 'AVP', 'KMB', 'ULTA', 'HGG', 'JCP', 'BAX'
]; 

const ALL_SYMBOLS = [...TECH_SYMBOLS, ...FOOD_SYMBOLS, ...BEAUTY_SYMBOLS];

const fetchStockData = async () => {
  try {
    const requests = ALL_SYMBOLS.map(symbol =>
      axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol: symbol,
          apikey: API_KEY,
        },
      })
    );
    const responses = await Promise.all(requests);
    const data = responses.reduce((acc, response) => {
      acc[response.config.params.symbol] = response.data;
      return acc;
    }, {});
    
    // Process the data as needed
    console.log('Fetched stock data:', data);

  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

fetchStockData();