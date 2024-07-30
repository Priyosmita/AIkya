'use client';


import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_KEY = 'W9FFWWWFBHNB1RRL';


const TECH_SYMBOLS = ['MSFT', 'AAPL', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'AMD', 'INTC', 'IBM'];
const FOOD_SYMBOLS = ['KO', 'PEP', 'MDLZ', 'GIS', 'CPB', 'K', 'NSRGY', 'CAG', 'SJM', 'BGS'];
const BEAUTY_SYMBOLS = ['EL', 'CL', 'COTY', 'PG', 'LB', 'AMZN', 'BE', 'TGT', 'M', 'ESTE'];


const SYMBOLS_BY_CATEGORY = {
  Tech: TECH_SYMBOLS,
  Food: FOOD_SYMBOLS,
  Beauty: BEAUTY_SYMBOLS,
};


const Window = ({ isMarketAnalysis }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tech');
  const [companies, setCompanies] = useState(SYMBOLS_BY_CATEGORY[selectedCategory]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyData, setCompanyData] = useState(null);


  useEffect(() => {
    setCompanies(SYMBOLS_BY_CATEGORY[selectedCategory]);
    setSelectedCompany(null);
    setCompanyData(null);
  }, [selectedCategory]);


  useEffect(() => {
    if (selectedCompany) {
      const fetchCompanyData = async () => {
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
          console.error('Error fetching data:', err);
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


  const getCompanyInfo = () => {
    if (!companyData || !companyData['Time Series (Daily)']) return null;


    const latestDate = Object.keys(companyData['Time Series (Daily)'])[0];
    const latestData = companyData['Time Series (Daily)'][latestDate];


    return (
      <div>
        <p><strong>Date:</strong> {latestDate}</p>
        <p><strong>Open:</strong> {latestData['1. open']}</p>
        <p><strong>High:</strong> {latestData['2. high']}</p>
        <p><strong>Low:</strong> {latestData['3. low']}</p>
        <p><strong>Close:</strong> {latestData['4. close']}</p>
        <p><strong>Volume:</strong> {latestData['5. volume']}</p>
      </div>
    );
  };


  return (
    <div className='w-65 bg-white rounded-2xl h-101 opacity-50 mb-6 mr-4 mt-24 p-4'>
      {isMarketAnalysis && (
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
              {selectedCompany && companyData && companyData['Time Series (Daily)'] && (
                <div className='flex justify-center'>
                  <div>
                    <h3 className='text-xl font-bold mb-2'>{selectedCompany}</h3>
                    {getCompanyInfo()}
                  </div>
                </div>
              )}
              {!selectedCompany && <p>Please select a company to view data.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Window;