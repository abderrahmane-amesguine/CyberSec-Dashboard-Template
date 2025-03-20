export const getChartConfig = (theme) => {
    const isDark = theme === 'light';
    const textColor = isDark ? '#ffffff' : '#333333';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    return {
        threat: {
            type: 'line',
            data: {
                labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                datasets: [
                    {
                        label: 'Threats Detected',
                        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50)),
                        borderColor: '#4CAF50',
                        fill: true,
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: textColor }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: gridColor },
                        ticks: { color: textColor }
                    },
                    x: {
                        grid: { color: gridColor },
                        ticks: { color: textColor }
                    }
                }
            },
            title: 'Threat Detection Trends'
        },
        vulnerability: {
            type: 'doughnut',
            title: 'vulnerability Management',
            data: {
                labels: ['Critical', 'High', 'Medium', 'Low'],
                datasets: [{
                    data: [4, 8, 15, 25],
                    backgroundColor: [
                        '#ff4444',
                        '#ffbb33',
                        '#00C851',
                        '#33b5e5'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor }
                    }
                }
            },
        },
        incident: {
            title: 'Security Incidents',
            type: 'bar',
            height: '300px',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'High Severity',
                        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20)),
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    },
                    {
                        label: 'Medium Severity',
                        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20)),
                        backgroundColor: 'rgba(255, 159, 64, 0.7)'
                    },
                    {
                        label: 'Low Severity',
                        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20)),
                        backgroundColor: 'rgba(75, 192, 192, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: textColor }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: gridColor },
                        ticks: { color: textColor }
                    },
                    x: {
                        grid: { color: gridColor },
                        ticks: { color: textColor }
                    }
                }
            }
        },
        performance: {
            title: 'System Performance',
            type: 'line',
            height: '300px',
            data: {
                labels: Array.from({ length: 12 }, (_, i) => `${i * 2}:00`),
                datasets: [
                    {
                        label: 'Response Time (ms)',
                        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 100),
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: textColor }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: gridColor },
                        ticks: { color: textColor }
                    },
                    x: {
                        grid: { color: gridColor },
                        ticks: { color: textColor }
                    }
                }
            }
        }
    };
};