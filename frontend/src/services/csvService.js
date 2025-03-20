// Convert CSV to JSON
const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(header => header.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = line.split(',').map(val => val.trim());
        if (values.length !== headers.length) {
            console.warn(`Skipping line ${i}: column count mismatch`);
            continue;
        }

        const row = {};
        headers.forEach((header, j) => {
            // Try to convert numeric values
            const value = values[j];
            row[header] = isNaN(value) ? value : Number(value);
        });
        result.push(row);
    }

    return { data: result, headers };
};

// Identify data types in CSV columns
const analyzeDataTypes = (data) => {
    if (!data || data.length === 0) return {};

    const firstRow = data[0];
    const columnTypes = {};

    for (const key in firstRow) {
        const values = data.map(row => row[key]);

        // Check if column contains dates
        const possibleDateColumn = values.every(val =>
            typeof val === 'string' && (
                /^\d{4}-\d{2}-\d{2}/.test(val) || // ISO format
                /^\d{1,2}\/\d{1,2}\/\d{4}/.test(val) || // MM/DD/YYYY
                /^\d{1,2}-\d{1,2}-\d{4}/.test(val) // MM-DD-YYYY
            )
        );

        if (possibleDateColumn) {
            columnTypes[key] = 'date';
        }
        // Check if column is numeric
        else if (values.every(val => typeof val === 'number')) {
            columnTypes[key] = 'number';
        }
        // Check if column might be a category with few unique values
        else {
            const uniqueValues = new Set(values);
            // If less than 25% of total rows, likely a category
            if (uniqueValues.size < data.length * 0.25 || uniqueValues.size < 10) {
                columnTypes[key] = 'category';
            } else {
                columnTypes[key] = 'text';
            }
        }
    }

    return columnTypes;
};

// Suggest charts based on data types
const suggestCharts = (data, columnTypes) => {
    if (!data || data.length === 0) return [];

    const suggestions = [];
    const numericColumns = Object.entries(columnTypes)
        .filter(([_, type]) => type === 'number')
        .map(([key]) => key);

    const dateColumns = Object.entries(columnTypes)
        .filter(([_, type]) => type === 'date')
        .map(([key]) => key);

    const categoryColumns = Object.entries(columnTypes)
        .filter(([_, type]) => type === 'category')
        .map(([key]) => key);

    // Time series chart
    if (dateColumns.length > 0 && numericColumns.length > 0) {
        suggestions.push({
            type: 'line',
            title: `${numericColumns[0]} over Time`,
            xAxis: dateColumns[0],
            yAxis: numericColumns.slice(0, 3) // Take up to 3 numeric columns
        });
    }

    // Bar chart for categories
    if (categoryColumns.length > 0 && numericColumns.length > 0) {
        suggestions.push({
            type: 'bar',
            title: `${numericColumns[0]} by ${categoryColumns[0]}`,
            xAxis: categoryColumns[0],
            yAxis: [numericColumns[0]]
        });
    }

    // Pie chart for category distribution
    if (categoryColumns.length > 0) {
        suggestions.push({
            type: 'doughnut',
            title: `${categoryColumns[0]} Distribution`,
            category: categoryColumns[0]
        });
    }

    // Multi-metric bar chart
    if (numericColumns.length >= 2 && categoryColumns.length > 0) {
        suggestions.push({
            type: 'bar',
            title: `Multi-Metric Comparison by ${categoryColumns[0]}`,
            xAxis: categoryColumns[0],
            yAxis: numericColumns.slice(0, 3) // Take up to 3 numeric columns
        });
    }

    return suggestions;
};

// Create chart configurations
const createChartConfigs = (data, suggestions) => {
    if (!data || !suggestions || suggestions.length === 0) return {};

    const configs = {};

    suggestions.forEach((suggestion, index) => {
        const chartId = `csv_chart_${index}`;

        switch (suggestion.type) {
            case 'line': {
                // Group by date and calculate values
                const dateField = suggestion.xAxis;
                const valueFields = suggestion.yAxis;

                // Sort data by date
                data.sort((a, b) => {
                    const dateA = new Date(a[dateField]);
                    const dateB = new Date(b[dateField]);
                    return dateA - dateB;
                });

                const labels = data.map(item => item[dateField]);
                const datasets = valueFields.map(field => {
                    return {
                        label: field,
                        data: data.map(item => item[field]),
                        fill: false,
                        tension: 0.4,
                        borderColor: getRandomColor(),
                        backgroundColor: getRandomColor(0.2)
                    };
                });

                configs[chartId] = {
                    type: 'line',
                    title: suggestion.title,
                    data: { labels, datasets },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' }
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                };
                break;
            }

            case 'bar': {
                const categoryField = suggestion.xAxis;
                const valueFields = suggestion.yAxis;

                // Group data by category
                const categories = [...new Set(data.map(item => item[categoryField]))];

                const datasets = valueFields.map(field => {
                    const categoryData = categories.map(category => {
                        const items = data.filter(item => item[categoryField] === category);
                        // Calculate average or sum for this category
                        return items.reduce((sum, item) => sum + item[field], 0) / items.length;
                    });

                    return {
                        label: field,
                        data: categoryData,
                        backgroundColor: getRandomColor(0.7)
                    };
                });

                configs[chartId] = {
                    type: 'bar',
                    title: suggestion.title,
                    data: { labels: categories, datasets },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' }
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                };
                break;
            }

            case 'doughnut': {
                const categoryField = suggestion.category;

                // Count occurrences of each category
                const categoryCounts = {};
                data.forEach(item => {
                    const category = item[categoryField];
                    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                });

                const labels = Object.keys(categoryCounts);
                const values = Object.values(categoryCounts);

                configs[chartId] = {
                    type: 'doughnut',
                    title: suggestion.title,
                    data: {
                        labels,
                        datasets: [{
                            data: values,
                            backgroundColor: labels.map(() => getRandomColor())
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'right' }
                        }
                    }
                };
                break;
            }
        }
    });

    return configs;
};

// Helper to generate random colors
const getRandomColor = (alpha = 1) => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Main function to process CSV and create chart configs
export const createChartFromCSV = async (csvText) => {
    try {
        // Parse CSV to JSON
        const { data, headers } = parseCSV(csvText);

        if (data.length === 0) {
            throw new Error('No data found in CSV file');
        }

        // Analyze data types
        const columnTypes = analyzeDataTypes(data);

        // Suggest charts based on data types
        const suggestions = suggestCharts(data, columnTypes);

        // Create chart configurations
        const chartConfigs = createChartConfigs(data, suggestions);

        return chartConfigs;
    } catch (error) {
        console.error('Error creating charts from CSV:', error);
        throw error;
    }
};

// Function to prepare sample data for testing/demo purposes
export const getSampleCSVData = () => {
    const dates = [];
    const today = new Date();

    // Generate last 30 days
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }

    let csv = 'date,threats,vulnerabilities,incidents\n';

    dates.forEach(date => {
        const threats = Math.floor(Math.random() * 50);
        const vulnerabilities = Math.floor(Math.random() * 30);
        const incidents = Math.floor(Math.random() * 10);
        csv += `${date},${threats},${vulnerabilities},${incidents}\n`;
    });

    return csv;
};