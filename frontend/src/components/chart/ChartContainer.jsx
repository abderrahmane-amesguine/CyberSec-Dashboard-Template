import React, { useRef } from 'react';
import ChartComponent from './ChartComponent';

const ChartsContainer = ({ chartsConfig: initialConfig }) => {
    const chartsRef = useRef({});

    // Register chart references
    const registerChart = (id, chartInstance) => {
        chartsRef.current[id] = chartInstance;
    };

    // Function to refresh data for all charts
    const refreshData = () => {
        if (chartsRef.current.threat) {
            const newThreatData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 50));
            chartsRef.current.threat.data.datasets[0].data = newThreatData;
            chartsRef.current.threat.update();
        }

        if (chartsRef.current.incident) {
            chartsRef.current.incident.data.datasets.forEach((dataset) => {
                const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 20));
                dataset.data = newData;
            });
            chartsRef.current.incident.update();
        }
    };

    // Handle time range changes for threat detection
    const handleTimeRangeChange = (e) => {
        const range = e.target.value;
        let labels, data;

        switch (range) {
            case 'day':
                labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
                data = Array.from({ length: 24 }, () => Math.floor(Math.random() * 50));
                break;
            case 'week':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200));
                break;
            case 'month':
                labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
                data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 500));
                break;
            default:
                labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
                data = Array.from({ length: 24 }, () => Math.floor(Math.random() * 50));
        }

        if (chartsRef.current.threat) {
            chartsRef.current.threat.data.labels = labels;
            chartsRef.current.threat.data.datasets[0].data = data;
            chartsRef.current.threat.update();
        }
    };

    return (
        <div className="charts-container grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(initialConfig).map(([key, config]) => (
                <div key={key} className="chart-wrapper bg-white rounded-lg shadow p-4">
                    <div className="chart">
                        <div className="chart-header flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">{config.title}</h2>
                            <div className="chart-controls">
                                {key === 'threat' && (
                                    <select
                                        id="threatTimeRange"
                                        className="mr-2 p-1 border border-gray-300 rounded"
                                        defaultValue="day"
                                        onChange={handleTimeRangeChange}
                                    >
                                        <option value="day">24 Hours</option>
                                        <option value="week">Week</option>
                                        <option value="month">Month</option>
                                    </select>
                                )}
                                {key === 'vulnerability' || (
                                    <button
                                    className="refresh-btn bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                    onClick={refreshData}
                                >
                                    <i className="fas fa-sync-alt"></i>
                                </button>
                                )}
                            </div>
                        </div>
                        <ChartComponent
                            id={key}
                            config={config}
                            registerChart={registerChart}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChartsContainer;
