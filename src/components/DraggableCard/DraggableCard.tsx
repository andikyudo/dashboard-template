import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
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
  initialOffset: {
    x: number;
    y: number;
  };
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  x,
  y,
  title,
  description,
  onMove,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  const lastPosition = useRef({ x, y });
  const isDraggingRef = useRef(false);

  const updatePosition = useCallback(() => {
    if (isDraggingRef.current) {
      requestAnimationFrame(() => {
        if (lastPosition.current.x !== position.x || 
            lastPosition.current.y !== position.y) {
          onMove(id, position.x, position.y);
          lastPosition.current = position;
        }
      });
    }
  }, [id, onMove, position]);

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition]);

  const [{ isDragging }, connectDrag] = useDrag<
    DragItem,
    unknown,
    { isDragging: boolean }
  >({
    type: 'CARD',
    item: {
      id,
      type: 'CARD',
      initialOffset: { x, y },
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item: any, monitor: any) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const newX = Math.round(item.initialOffset.x + delta.x);
        const newY = Math.round(item.initialOffset.y + delta.y);
        setPosition({ x: newX, y: newY });
        onMove(id, newX, newY);
      }
    },
  });

  useLayoutEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Connect drag to the element
  useLayoutEffect(() => {
    if (elementRef.current) {
      connectDrag(elementRef.current);
    }
  }, [connectDrag]);

  const style: React.CSSProperties = {
    position: 'absolute',
    transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isDragging ? 1.02 : 1})`,
    opacity: isDragging ? 0.8 : 1,
    cursor: 'grab',
    willChange: 'transform',
    transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
    touchAction: 'none',
    pointerEvents: isDragging ? 'none' : 'auto',
    zIndex: isDragging ? 1000 : 1,
    filter: isDragging ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : 'none',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  };

  return (
    <div ref={elementRef} style={style}>
      <Card 
        title={title} 
        description={description}
      />
    </div>
  );
};

export default DraggableCard;
