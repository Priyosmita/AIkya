'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './options.css';

// const API_KEY = 'cqkil61r01qjqssgdq00cqkil61r01qjqssgdq0g';
const API_KEY = 'your_alpha_vantage_api_key';

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
          const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
              function: 'TIME_SERIES_DAILY',
              symbol: selectedCompany,
              apikey: API_KEY,
            },
          });

          const timeSeries = response.data['Time Series (Daily)'];
          const dates = Object.keys(timeSeries).slice(0, 30).reverse();
          const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']));

          setCompanyData({ dates, prices });
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
    if (!companyData) return null;

    return {
      labels: companyData.dates,
      datasets: [
        {
          label: `${selectedCompany} Stock Price`,
          data: companyData.prices,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
    };
  };

  return (
    <div className='p-10'>
      <div className='flex justify-around mb-4 ml-32'>
        {Object.keys(SYMBOLS_BY_CATEGORY).map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 hover:scale-110 transition duration-300 py-2 rounded-xl w-44 text-3xl text-center justify-center items-center  ${selectedCategory === category ? 'bg-[#f8b891] text-white' : 'bg-[#7ebaba]'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className='flex mt-20'>
        <div className='w-1/4 p-4'>
          <ul>
            {companies.map(company => (
              <li
                key={company}
                onClick={() => handleCompanyClick(company)}
                className={`cursor-pointer mb-4 p-2 rounded-full w-36 text-center hover:scale-110 transition duration-300 ${selectedCompany === company ? 'bg-[#f8b891] text-white' : 'bg-[#7ebaba]'}`}
              >
                {company}
              </li>
            ))}
          </ul>
        </div>
        <div className='w-3/4 p-4'>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {selectedCompany && companyData && !loading && (
            <div className='flex justify-start'>
              <div className='w-full'>
                <h3 className='text-xl font-bold mb-2 text-[#7ebaba]'>{selectedCompany}</h3>
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
