import React from 'react';

const RecentAlerts = ({ alerts }) => {
  return (
    <div className="recent-alerts">
      <h2>Recent Security Alerts</h2>
      <div className="alerts-list">
        {alerts.map(alert => (
          <div className="alert-item" key={alert.id}>
            <div className="alert-info">
              <span className={`alert-severity severity-${alert.severity}`}>
                {alert.severity}
              </span>
              <span>{alert.message}</span>
            </div>
            <div className="alert-time">{alert.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAlerts;
