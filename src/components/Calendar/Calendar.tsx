import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer, SlotInfo, Event as BigCalendarEvent } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Button, Modal, TextInput, ActionIcon } from '@mantine/core';
import { useTheme } from '../../context/ThemeContext';
import { FiTrash2 } from 'react-icons/fi';

interface CustomEvent extends BigCalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
}

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const STORAGE_KEY = 'calendar_events';

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
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);
  const [error, setError] = useState<string>('');

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem(STORAGE_KEY);
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }));
        setEvents(parsedEvents);
      } catch (err) {
        console.error('Error loading events:', err);
      }
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setError('');
    setSelectedEvent(null);
    setNewEvent({
      id: Date.now(),
      title: '',
      start: slotInfo.start,
      end: slotInfo.end,
      allDay: slotInfo.slots.length === 1
    });
    setShowModal(true);
  }, []);

  const handleEventSelect = useCallback((event: BigCalendarEvent) => {
    setError('');
    const customEvent = event as CustomEvent;
    setSelectedEvent(customEvent);
    setNewEvent(customEvent);
    setShowModal(true);
  }, []);

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.title.trim()) {
      setError('Title is required');
      return;
    }
    if (moment(newEvent.start).isAfter(moment(newEvent.end))) {
      setError('End date must be after start date');
      return;
    }

    try {
      if (selectedEvent) {
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === selectedEvent.id ? newEvent : event
          )
        );
      } else {
        setEvents(prevEvents => [...prevEvents, { ...newEvent, id: Date.now() }]);
      }
      setShowModal(false);
      setSelectedEvent(null);
      setError('');
    } catch (err) {
      setError('Failed to save event');
      console.error('Error saving event:', err);
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    try {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      setShowModal(false);
      setSelectedEvent(null);
    } catch (err) {
      setError('Failed to delete event');
      console.error('Error deleting event:', err);
    }
  };

  const handleEventDrop = useCallback(
    ({ event, start, end }: any) => {
      try {
        const updatedEvent = { ...event, start, end };
        setEvents(prevEvents =>
          prevEvents.map(existingEvent =>
            existingEvent.id === event.id ? updatedEvent : existingEvent
          )
        );
      } catch (err) {
        console.error('Error moving event:', err);
      }
    },
    []
  );

  return (
    <div className={`h-[calc(100vh-200px)] ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor={(event: BigCalendarEvent) => (event as CustomEvent).start}
        endAccessor={(event: BigCalendarEvent) => (event as CustomEvent).end}
        selectable
        resizable
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
        onClose={() => {
          setShowModal(false);
          setSelectedEvent(null);
          setError('');
        }}
        title={selectedEvent ? 'Edit Schedule' : 'Create New Schedule'}
      >
        <div className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          <TextInput
            label="Title"
            value={newEvent.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            required
          />
          <div className="flex gap-4">
            <TextInput
              label="Start Date"
              type="datetime-local"
              value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewEvent({ ...newEvent, start: new Date(e.target.value) })
              }
              required
            />
            <TextInput
              label="End Date"
              type="datetime-local"
              value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewEvent({ ...newEvent, end: new Date(e.target.value) })
              }
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleAddEvent}
              fullWidth
              color={selectedEvent ? 'blue' : 'green'}
            >
              {selectedEvent ? 'Update Schedule' : 'Add Schedule'}
            </Button>
            {selectedEvent && (
              <ActionIcon
                color="red"
                onClick={() => handleDeleteEvent(selectedEvent.id)}
                size="lg"
              >
                <FiTrash2 size={20} />
              </ActionIcon>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
