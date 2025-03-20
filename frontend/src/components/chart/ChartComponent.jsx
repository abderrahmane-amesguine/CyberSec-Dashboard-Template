import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ id, config, registerChart }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // If the chart instance already exists, destroy it first
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: config.type || 'line',
                data: config.data,
                options: config.options || {}
            });

            // Register the chart instance with the parent component
            if (registerChart) {
                registerChart(id, chartInstance.current);
            }
        }

        // Cleanup function to destroy chart when component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [id, config, registerChart]);

    return (
        <div style={{ height: config.height || '300px' }}>
            <canvas ref={chartRef} width="100%" height="100%"></canvas>
        </div>
    );
};

export default ChartComponent;