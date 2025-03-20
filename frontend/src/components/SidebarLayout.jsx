import React, { useState } from 'react';
import { Home, Database, Settings, User, Menu, X, BarChart } from 'lucide-react';
import DashboardComponent from './DashboardComponent';
import SettingsComponent from './SettingsComponent';
import SourcesComponent from './SourcesComponent';
import ProfileComponent from './ProfileComponent';
import CSVDashboardComponent from './CSVDashboardComponent';

function SidebarLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [newTheme, setNewTheme] = useState('dark');

  // Toggle sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Toggle theme
  const toggleTheme = () => {
    setNewTheme(prevTheme => {
      const updatedTheme = prevTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', updatedTheme);
      return updatedTheme;
    });
  };

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen transition-all duration-300 flex flex-col ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-700"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-grow py-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
            { id: 'csv-dashboard', label: 'CSV Visualizer', icon: <BarChart size={20} /> },
            { id: 'sources', label: 'Sources', icon: <Database size={20} /> },
            { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
          ].map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
              active={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
            />
          ))}
        </div>

        {/* Profile Section */}
        <div className="border-t border-gray-700">
          <NavItem
            key="profile"
            icon={<User size={20} />}
            label="Profile"
            collapsed={collapsed}
            active={activeSection === 'profile'}
            onClick={() => setActiveSection('profile')}
          />
        </div>

        {/* Theme Toggle Section */}
        <div className="border-t border-gray-700">
          <NavItem
            key="theme"
            icon={
              newTheme === 'dark' ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )
            }
            label={newTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            collapsed={collapsed}
            onClick={toggleTheme}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-grow p-6 bg-gray-100 overflow-auto"
        data-theme={newTheme}
        id="content"
      >
        {(() => {
          switch (activeSection) {
            case 'dashboard':
              return <DashboardComponent theme={newTheme} />;
            case 'csv-dashboard':
              return <CSVDashboardComponent />;
            case 'sources':
              return <SourcesComponent />;
            case 'settings':
              return <SettingsComponent />;
            case 'profile':
              return <ProfileComponent />;
            default:
              return <DashboardComponent />;
          }
        })()}
      </div>
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ icon, label, collapsed, active, onClick }) => {
  return (
    <div
      className={`flex items-center px-4 py-3 cursor-pointer ${
        active ? 'bg-gray-700' : 'hover:bg-gray-700'
      }`}
      onClick={onClick}
    >
      <div className="mr-4">{icon}</div>
      {!collapsed && <span>{label}</span>}
    </div>
  );
};

export default SidebarLayout;