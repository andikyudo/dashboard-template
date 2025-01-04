import React, { useState, useCallback, ChangeEvent } from 'react';
import { Calendar as BigCalendar, momentLocalizer, SlotInfo, Event as BigCalendarEvent } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Modal, TextInput } from '@mantine/core';
import { useTheme } from '../../context/ThemeContext';

interface CustomEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
}

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(BigCalendar);

export default function Calendar() {
  const { theme } = useTheme();
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<CustomEvent>({
    id: 0,
    title: '',
    start: new Date(),
    end: new Date(),
    allDay: false
  });

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setNewEvent({
      id: Date.now(),
      title: '',
      start: slotInfo.start,
      end: slotInfo.end,
      allDay: slotInfo.slots.length === 1
    });
    setShowModal(true);
  }, []);

  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);

  const handleEventSelect = useCallback((event: object) => {
    const customEvent = event as CustomEvent;
    setSelectedEvent(customEvent);
    setNewEvent(customEvent);
    setShowModal(true);
  }, []);

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.title.trim()) {
      alert('Title is required');
      return;
    }
    if (newEvent.start >= newEvent.end) {
      alert('End date must be after start date');
      return;
    }

    if (selectedEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id ? newEvent : event
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      setEvents([...events, { ...newEvent, id: Date.now() }]);
    }
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (event: CustomEvent) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== event.id));
    }
  };

  const handleEventDrop = useCallback(({ event, start, end }: any) => {
    setEvents(prevEvents => 
      prevEvents.map(existingEvent =>
        existingEvent.id === event.id
          ? { ...existingEvent, start, end }
          : existingEvent
      )
    );
  }, []);

  return (
    <div className={`h-[calc(100vh-200px)] ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor={(event: any) => (event as CustomEvent).start}
        endAccessor={(event: any) => (event as CustomEvent).end}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventSelect}
        onEventDrop={handleEventDrop}
        views={['month', 'week', 'day']}
        defaultView="month"
        style={{ height: '100%' }}
        className={theme === 'dark' ? 'dark-calendar' : ''}
      />

      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Schedule"
      >
        <div className="space-y-4">
          <TextInput
            label="Title"
            value={newEvent.title?.toString() || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <div className="flex gap-4">
            <TextInput
              label="Start Date"
              type="datetime-local"
              value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewEvent({ ...newEvent, start: new Date(e.target.value) })
              }
            />
            <TextInput
              label="End Date"
              type="datetime-local"
              value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewEvent({ ...newEvent, end: new Date(e.target.value) })
              }
            />
          </div>
          <Button onClick={handleAddEvent} fullWidth>
            Add Schedule
          </Button>
        </div>
      </Modal>
    </div>
  );
}
