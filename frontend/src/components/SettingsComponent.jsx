import React, { useState } from 'react';
import { Save, Bell, Shield, Globe, Moon } from 'lucide-react';

function SettingsComponent() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState('english');

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      {/* General Settings */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium">General Settings</h3>
        </div>
        <div className="p-6 space-y-6">
          {/* Language Selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="mr-3 text-gray-500" size={20} />
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-gray-500">Select your preferred language</p>
              </div>
            </div>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>
          
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Moon className="mr-3 text-gray-500" size={20} />
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Toggle dark mode on or off</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium">Notifications</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="mr-3 text-gray-500" size={20} />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email updates about your account</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium">Security</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="mr-3 text-gray-500" size={20} />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Enhance your account security</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700">
          <Save className="mr-2" size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsComponent;