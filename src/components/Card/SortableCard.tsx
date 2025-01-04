import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CardWithActions } from './CardWithActions';

export {};

interface SortableCardProps {
  id: string;
  card: {
    id: string;
    title: string;
    content: string;
  };
}

export const SortableCard = ({ id, card }: SortableCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardWithActions
        title={card.title}
        description={card.content}
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
    </div>
  );
};
