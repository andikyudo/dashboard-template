import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CardWithActions } from './CardWithActions';
import { StatsCard } from './StatsCard';
import { HeaderCard } from './HeaderCard';
import { FooterCard } from './FooterCard';
import { FiSettings, FiUser } from 'react-icons/fi';
import DraggableCard from '../DraggableCard/DraggableCard';

interface CardPosition {
  x: number;
  y: number;
}

interface CardPositions {
  [key: string]: CardPosition;
}

export const CardExamples = () => {
  const [positions, setPositions] = useState<CardPositions>(() => {
    const savedPositions = localStorage.getItem('cardPositions');
    return savedPositions ? JSON.parse(savedPositions) : {
      card1: { x: 50, y: 50 },
      card2: { x: 200, y: 50 }
    };
  });

  const handleMove = (id: string, x: number, y: number) => {
    const newPositions = {
      ...positions,
      [id]: { x, y }
    };
    setPositions(newPositions);
    localStorage.setItem('cardPositions', JSON.stringify(newPositions));
  };

  return (
    <div className="p-4">
      <div className="relative h-[500px] mb-8 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
        <DndProvider backend={HTML5Backend}>
          <DraggableCard
            id="card1"
            x={positions.card1.x}
            y={positions.card1.y}
            title="Draggable Card 1"
            description="Try moving me around!"
            onMove={handleMove}
          />
          <DraggableCard
            id="card2"
            x={positions.card2.x}
            y={positions.card2.y}
            title="Draggable Card 2"
            description="I'm also draggable!"
            onMove={handleMove}
          />
        </DndProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card with Actions */}
        <CardWithActions
          title="Project Tasks"
          description="Manage your project tasks efficiently"
          actions={
            <>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </>
          }
        />

        {/* Stats Card */}
        <StatsCard
          title="Project Progress"
          value="75%"
          description="Completed tasks"
          progress={75}
        />

        {/* Header Card */}
        <HeaderCard
          title="User Profile"
          description="Manage your account settings"
          header={
            <div className="flex items-center gap-2">
              <FiUser className="w-6 h-6" />
              <span className="font-medium">John Doe</span>
            </div>
          }
        />

        {/* Footer Card */}
        <FooterCard
          title="System Settings"
          description="Configure your system preferences"
          footer={
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded">
              <FiSettings />
              Open Settings
            </button>
          }
        />
      </div>
    </div>
  );
};
