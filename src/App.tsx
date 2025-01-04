import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/Sidebar/Sidebar';
import DragDropCards from './components/DragDropCards/DragDropCards';
import Settings from './components/Settings/Settings';
import ErrorBoundary from './components/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import Profile from './components/Profile/Profile';
import { CardExamples } from './components/Card/CardExamples';
import { DragDropCard } from './components/Card/DragDropCard';
import DraggableCard from './components/DraggableCard/DraggableCard';
import './App.css';

function App() {
  const { theme } = useTheme();
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DndProvider backend={HTML5Backend}>
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
                  <Route path="/" element={
                    <div className="space-y-4">
                      <DragDropCards />
                      <div className="relative h-96">
                        <DraggableCard 
                          id="card1" 
                          x={50} 
                          y={50}
                          title="Card 1"
                          description="This is a draggable card"
                          onMove={(id: string, x: number, y: number) => console.log(`Moved ${id} to ${x},${y}`)}
                        />
                      </div>
                    </div>
                  } />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/cards" element={<CardExamples />} />
                  <Route path="/drag-drop-cards" element={<DragDropCard />} />
                </Routes>
              </main>
            </div>
          </Router>
        </DndProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
