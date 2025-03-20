// Populate alerts
export const populateAlerts = () => {
    const alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = '';

    sampleAlerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert-item';
        alertElement.innerHTML = `
            <div class="alert-info">
                <span class="alert-severity severity-${alert.severity}">${alert.severity}</span>
                <span>${alert.message}</span>
            </div>
            <div class="alert-time">${alert.timestamp}</div>
        `;
        alertsList.appendChild(alertElement);
    });
}

// Refresh data periodically
export const refreshData = () => {

    // Add new random alert
    const severities = ['high', 'medium', 'low'];
    const messages = [
        'New vulnerability detected',
        'Failed authentication attempt',
        'Unusual file access pattern',
        'Configuration change detected',
        'Server resource usage spike'
    ];

    const newAlert = {
        id: sampleAlerts.length + 1,
        severity: severities[Math.floor(Math.random() * severities.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: currentDateTime
    };

    sampleAlerts.unshift(newAlert);
    if (sampleAlerts.length > 5) sampleAlerts.pop();
}