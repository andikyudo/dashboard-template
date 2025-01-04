import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Card from '../Card/Card';

interface CardData {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const DraggableCard = ({ 
  id,
  title,
  description,
  image,
  index,
  moveCard 
}: CardData & { 
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: { id: string; index: number }, monitor) {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={`${isDragging ? 'opacity-50' : 'opacity-100'}`}>
      <Card
        title={title}
        description={description}
        image={image}
      />
    </div>
  );
};

const DragDropCards = () => {
  const [cards, setCards] = React.useState<CardData[]>([
    {
      id: '1',
      title: 'Project Alpha',
      description: 'A cutting-edge AI project',
      image: 'https://source.unsplash.com/random/400x200?technology'
    },
    {
      id: '2',
      title: 'Marketing Campaign',
      description: 'Q4 marketing strategy',
      image: 'https://source.unsplash.com/random/400x200?business'
    },
    {
      id: '3',
      title: 'Product Launch',
      description: 'New product release plan',
      image: 'https://source.unsplash.com/random/400x200?product'
    }
  ]);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex];
    const newCards = [...cards];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    setCards(newCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {cards.map((card, index) => (
          <DraggableCard
            key={card.id}
            index={index}
            moveCard={moveCard}
            {...card}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragDropCards;
