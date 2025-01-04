import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface CanvasProps {
  children: React.ReactNode;
  showGrid?: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ children, showGrid = false }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div 
        className="relative bg-gray-100 dark:bg-dark-700 rounded-lg overflow-hidden"
        style={{
          touchAction: 'none',
          userSelect: 'none',
          backgroundImage: showGrid ? `
            linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px)
          ` : 'none',
          backgroundSize: '20px 20px',
          minHeight: '500px',
          width: '100%',
        }}
      >
        {children}
      </div>
    </DndProvider>
  );
};

export default Canvas;
