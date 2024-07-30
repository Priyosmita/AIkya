import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'W9FFWWWFBHNB1RRL'; // Replace with your Vantage API key
const SYMBOL = 'MSFT'; // Example stock symbol

export const Market = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: 'TIME_SERIES_DAILY',
            symbol: SYMBOL,
            apikey: API_KEY,
          },
        });
        setStockData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Stock Market Data for {SYMBOL}</h1>
      {stockData && (
        <div>
          <h2>Time Series (Daily)</h2>
          <ul>
            {Object.entries(stockData['Time Series (Daily)']).map(([date, data]) => (
              <li key={date}>
                <strong>{date}</strong>: Open: {data['1. open']}, High: {data['2. high']}, Low: {data['3. low']}, Close: {data['4. close']}, Volume: {data['5. volume']}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Market;