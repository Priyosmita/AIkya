'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './options.css'

const API_KEY = 'W9FFWWWFBHNB1RRL';

const TECH_SYMBOLS = ['MSFT', 'AAPL', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'AMD', 'INTC', 'IBM'];
const FOOD_SYMBOLS = ['KO', 'PEP', 'MDLZ', 'GIS', 'CPB', 'K', 'NSRGY', 'CAG', 'SJM', 'BGS'];
const BEAUTY_SYMBOLS = ['EL', 'CL', 'COTY', 'PG', 'LB', 'AMZN', 'BE', 'TGT', 'M', 'ESTE'];

const SYMBOLS_BY_CATEGORY = {
  Tech: TECH_SYMBOLS,
  Food: FOOD_SYMBOLS,
  Beauty: BEAUTY_SYMBOLS,
};

const MarketAnalysis = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tech');
  const [companies, setCompanies] = useState(SYMBOLS_BY_CATEGORY[selectedCategory]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCompanies(SYMBOLS_BY_CATEGORY[selectedCategory]);
    setSelectedCompany(null);
    setCompanyData(null);
    setError(null);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCompany) {
      const fetchCompanyData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
              function: 'TIME_SERIES_DAILY',
              symbol: selectedCompany,
              apikey: API_KEY,
            },
          });
          setCompanyData(response.data);
        } catch (err) {
          setError('Error fetching data');
        } finally {
          setLoading(false);
        }
      };
      fetchCompanyData();
    }
  }, [selectedCompany]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const transformDataForChart = () => {
    if (!companyData || !companyData['Time Series (Daily)']) return null;

    const dates = Object.keys(companyData['Time Series (Daily)']).slice(0, 30).reverse();
    const prices = dates.map(date => parseFloat(companyData['Time Series (Daily)'][date]['4. close']));

    return {
      labels: dates,
      datasets: [
        {
          label: `${selectedCompany} Stock Price`,
          data: prices,
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
      ],
    };
  };

  return (
    <div>
      <div className='flex justify-around mb-4'>
        {Object.keys(SYMBOLS_BY_CATEGORY).map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className='flex'>
        <div className='w-1/4 p-4'>
          <ul>
            {companies.map(company => (
              <li
                key={company}
                onClick={() => handleCompanyClick(company)}
                className={`cursor-pointer mb-2 p-2 rounded ${selectedCompany === company ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {company}
              </li>
            ))}
          </ul>
        </div>
        <div className='w-3/4 p-4'>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {selectedCompany && companyData && companyData['Time Series (Daily)'] && !loading && (
            <div className='flex justify-start'>
              <div className='w-full'>
                <h3 className='text-xl font-bold mb-2'>{selectedCompany}</h3>
                <div className='chart-container'>
                  <Line data={transformDataForChart()} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          )}
          {!selectedCompany && !loading && <p>Please select a company to view data.</p>}
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
