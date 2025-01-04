import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableCard } from './SortableCard';

export {};

interface Card {
  id: string;
  title: string;
  content: string;
}

export const DragDropCard = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: '1', title: 'Task 1', content: 'Description for task 1' },
    { id: '2', title: 'Task 2', content: 'Description for task 2' },
    { id: '3', title: 'Task 3', content: 'Description for task 3' },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={cards} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {cards.map((card) => (
            <SortableCard key={card.id} id={card.id} card={card} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
