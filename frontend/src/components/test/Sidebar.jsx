import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="sidebar">
      <div className="user-info">
        <i className="fas fa-user-shield"></i>
        <span id="userLogin">abderrahmane-amesguine</span>
      </div>
      <nav>
        <ul>
          {['dashboard', 'threats', 'vulnerabilities', 'alerts', 'settings'].map(section => (
            <li key={section}>
              <a
                href="#"
                className={activeSection === section ? 'active' : ''}
                onClick={() => setActiveSection(section)}
              >
                <i className={`fas fa-${section === 'dashboard' ? 'home' : section}`}></i>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
