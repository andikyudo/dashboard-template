import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { throttle } from 'lodash';
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

  // Throttle the move callback to improve performance
  const throttledMove = useCallback(
    (id: string, x: number, y: number) => {
      onMove(id, x, y);
    },
    [onMove]
  );

  const throttledMoveRef = useRef(throttle(throttledMove, 16));

  useLayoutEffect(() => {
    const currentThrottle = throttledMoveRef.current;
    return () => {
      currentThrottle.cancel();
    };
  }, []);

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
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const newX = Math.round(item.initialOffset.x + delta.x);
        const newY = Math.round(item.initialOffset.y + delta.y);
        setPosition({ x: newX, y: newY });
        throttledMoveRef.current(id, newX, newY);
      }
    },
  });

  // Connect drag to the element
  useLayoutEffect(() => {
    if (elementRef.current) {
      connectDrag(elementRef.current);
    }
  }, [connectDrag]);

  const style: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    transform: isDragging ? 'translate3d(0, 0, 0)' : undefined,
    willChange: isDragging ? 'transform' : undefined,
    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
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
