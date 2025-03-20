import React, { useState } from 'react';
import CSVUploaderComponent from './csv/CSVUploaderComponent';
import ChartsContainer from './chart/ChartContainer';
import { getSampleCSVData } from '../services/csvService';

const CSVDashboardComponent = () => {
  const [chartConfigs, setChartConfigs] = useState({});
  const [hasCharts, setHasCharts] = useState(false);

  const handleDataLoaded = (configs) => {
    setChartConfigs(configs);
    setHasCharts(Object.keys(configs).length > 0);
  };

  const handleLoadSample = async () => {
    try {
      const sampleCSV = getSampleCSVData();
      const { createChartFromCSV } = await import('../services/csvService');
      const configs = await createChartFromCSV(sampleCSV);
      handleDataLoaded(configs);
    } catch (error) {
      console.error('Error loading sample data:', error);
    }
  };

  return (
    <div>
      <header>
        <div className="header-content">
          <h1 className="text-3xl font-extrabold">CSV Data Visualization</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLoadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Load Sample Data
          </button>
          <div className="datetime">
            <i className="fas fa-clock"></i>
            <span id="currentDateTime">
              {new Date().toUTCString()}
            </span>
          </div>
        </div>
      </header>

      <CSVUploaderComponent onDataLoaded={handleDataLoaded} />

      {hasCharts ? (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Visualizations</h2>
          <ChartsContainer chartsConfig={chartConfigs} />
        </div>
      ) : (
        <div className="mt-8 bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">
            Upload a CSV file to see visualizations here, or click "Load Sample Data" to see a demo.
          </p>
        </div>
      )}
    </div>
  );
};

export default CSVDashboardComponent;