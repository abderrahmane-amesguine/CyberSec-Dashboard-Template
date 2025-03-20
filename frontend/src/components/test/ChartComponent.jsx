import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ id, config }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, config);
    return () => chart.destroy();
  }, [config]);

  return <canvas id={id} ref={chartRef}></canvas>;
};

export default ChartComponent;