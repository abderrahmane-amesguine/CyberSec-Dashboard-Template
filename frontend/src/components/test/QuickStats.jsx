import React from 'react';

const QuickStats = () => {
  const stats = [
    { icon: 'shield-alt', label: 'Security Score', value: '85%' },
    { icon: 'exclamation-triangle', label: 'Active Threats', value: '12' },
    { icon: 'bug', label: 'Open Vulnerabilities', value: '28' },
    { icon: 'clock', label: 'Avg. Response Time', value: '45m' }
  ];

  return (
    <div className="quick-stats">
      {stats.map(stat => (
        <div className="stat-card" key={stat.label}>
          <i className={`fas fa-${stat.icon}`}></i>
          <div className="stat-info">
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
