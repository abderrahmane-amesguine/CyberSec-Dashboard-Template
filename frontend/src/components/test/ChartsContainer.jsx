import React from 'react';
import ChartComponent from './ChartComponent';

const ChartsContainer = ({ chartsConfig }) => {
  return (
    <div className="charts-container">
      {Object.entries(chartsConfig).map(([key, config]) => (
        <div className="chart-wrapper" key={key}>
          <div className="chart">
            <div className="chart-header">
              <h2>{config.title}</h2>
              <button className="refresh-btn" onClick={config.onRefresh}>
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
            <ChartComponent id={key} config={config} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartsContainer;
