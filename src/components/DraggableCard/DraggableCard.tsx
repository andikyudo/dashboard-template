import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import Card from '../Card/Card';

interface DraggableCardProps {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  onMove: (id: string, x: number, y: number) => void;
}

interface DragItem {
  id: string;
  type: string;
  initialX: number;
  initialY: number;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  x,
  y,
  title,
  description,
  onMove,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >(() => ({
    type: 'CARD',
    item: { id, type: 'CARD', initialX: x, initialY: y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      
      if (delta) {
        const newX = Math.round(x + delta.x);
        const newY = Math.round(y + delta.y);
        onMove(id, newX, newY);
      }
    },
  }), [id, x, y, onMove]);

  return (
    <div
      ref={ref}
      {...drag(ref)}
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        zIndex: isDragging ? 1000 : 1,
        touchAction: 'none',
      }}
      className="transition-opacity duration-200"
    >
      <Card 
        title={title} 
        description={description}
      />
    </div>
  );
};

export default DraggableCard;
