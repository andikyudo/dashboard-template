import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Sidebar from './components/Sidebar/Sidebar';
import DragDropCards from './components/DragDropCards/DragDropCards';
import Settings from './components/Settings/Settings';
import ErrorBoundary from './components/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import Profile from './components/Profile/Profile';
import { CardExamples } from './components/Card/CardExamples';
import { DragDropCard } from './components/Card/DragDropCard';
import './App.css';

function App() {
  const { theme } = useTheme();
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className={`flex min-h-screen transition-colors duration-300 font-inter ${
            theme === 'dark' ? 'bg-dark-900 text-gray-100' : 'bg-white text-gray-900'
          }`}>
            <Sidebar />
            
            <header className="fixed top-0 right-0 left-64 h-16 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between z-40">
            <div className="w-64">
              <SearchBar onSearch={(query) => console.log(query)} />
            </div>
            <Profile />
          </header>
          
          <main className="flex-1 p-8 ml-64 mt-16">
              <Routes>
                <Route path="/" element={<DragDropCards />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/cards" element={<CardExamples />} />
                <Route path="/drag-drop-cards" element={<DragDropCard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
