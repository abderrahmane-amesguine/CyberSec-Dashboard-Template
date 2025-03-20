import React, { useState, useEffect, use } from 'react';
import ChartsContainer from './chart/ChartContainer';
import RecentAlerts from './chart/RecentAlerts';
import { getChartConfig } from "../services/charts";

function DashboardComponent({theme}) {

  const [charts, setCharts] = useState([]);

  useEffect(() => {
    const fetchCharts = () => {
      try {
        const chartsConfig = getChartConfig(theme);
        setCharts(chartsConfig);
      } catch (error) {
        console.error("Error fetching charts", error);
      }
    };
    fetchCharts();
  }, [theme]);   

  const sampleAlerts = [
    {
        id: 1,
        severity: 'high',
        message: 'Suspicious login attempt detected',
        timestamp: '2025-03-03 11:43:05'
    },
    {
        id: 2,
        severity: 'medium',
        message: 'Unusual network traffic pattern observed',
        timestamp: '2025-03-03 11:42:30'
    },
    {
        id: 3,
        severity: 'low',
        message: 'System update available',
        timestamp: '2025-03-03 11:40:15'
    }
  ];


  const [alerts, setAlerts] = useState([]);
  const fetchAlerts = () => {
    setAlerts(sampleAlerts);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const currentDateTime = new Date().toUTCString();
      document.getElementById('currentDateTime').textContent = currentDateTime;
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <header>
        <div className="header-content ">
          <h1 className='text-3xl font-extrabold'>Security Operations Dashboard</h1>
        </div>
        <div className="datetime">
          <i className="fas fa-clock"></i>
          <span id="currentDateTime">2025-03-03 11:40:16 UTC</span>
        </div>
      </header>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        <div className="quick-stats">
          <div className="stat-card">
            <i className="fas fa-shield-alt"></i>
            <div className="stat-info">
              <h3 className="text-lg font-medium mb-2">Security Score</h3>
              <p className="text-3xl font-bold">85%</p>
            </div>
          </div>

          <div className="stat-card">
            <i className="fas fa-exclamation-triangle"></i>
            <div className="stat-info">
              <h3 className="text-lg font-medium mb-2">Active Threats</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
          </div>

          <div className="stat-card">
            <i className="fas fa-bug"></i>
            <div className="stat-info">
              <h3 className="text-lg font-medium mb-2">Open Vulnerabilities</h3>
              <p className="text-3xl font-bold">28</p>
            </div>
          </div>

          <div className="stat-card">
            <i className="fas fa-clock"></i>
            <div className="stat-info">
              <h3 className="text-lg font-medium mb-2">Avg. Response Time</h3>
              <p className="text-3xl font-bold">45m</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ChartsContainer chartsConfig={charts} />
        <RecentAlerts alerts={alerts} />
      </div>
    </>
  );
};

export default DashboardComponent;