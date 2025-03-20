import React from 'react';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header>
      <div className="header-content">
        <h1>Security Operations Dashboard</h1>
        <div className="datetime">
          <i className="fas fa-clock"></i>
          <span id="currentDateTime">2025-03-03 11:40:16 UTC</span>
        </div>
      </div>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          <i className={`fas fa-${theme === 'dark' ? 'moon' : 'sun'}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;

