import React, { useState } from 'react';
import Canvas from '../components/DraggableCard/Canvas';
import DraggableCard from '../components/DraggableCard/DraggableCard';

interface CardData {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
}

const DraggablePage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([
    {
      id: '1',
      x: 100,
      y: 100,
      title: 'Card 1',
      description: 'Drag me around!'
    },
    {
      id: '2',
      x: 400,
      y: 200,
      title: 'Card 2',
      description: 'I can be dragged too!'
    }
  ]);

  const handleCardMove = (id: string, x: number, y: number) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, x, y } : card
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Draggable Cards</h1>
      <Canvas showGrid={true}>
        {cards.map(card => (
          <DraggableCard
            key={card.id}
            id={card.id}
            x={card.x}
            y={card.y}
            title={card.title}
            description={card.description}
            onMove={handleCardMove}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default DraggablePage;
