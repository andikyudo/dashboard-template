import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`p-6 w-[400px] max-w-full font-sans ${
      theme === 'dark' ? 'bg-dark-800 text-gray-100' : 'bg-white text-gray-900'
    }`}>
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      
      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark Mode</span>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full p-1 transition-all duration-300 ease-in-out ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Notification Settings */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Enable Notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Language Settings */}
        <div className="flex flex-col">
          <label htmlFor="language" className="text-sm mb-2">
            Language
          </label>
          <select
            id="language"
            className={`p-2 rounded border ${
              theme === 'dark' ? 'bg-dark-700 border-dark-600' : 'bg-gray-50 border-gray-300'
            } text-sm`}
          >
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
