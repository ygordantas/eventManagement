import EVENTS from "../data/events";
import type EventModel from "../models/EventModel";

// CRUD
const eventServices = {
  getAllEvents: (): EventModel[] => {
    return EVENTS;
  },
  getEventById: (id: string): EventModel | undefined => {
    return EVENTS.find((e) => e.id === id);
  },
  getUserEvents: (userId: string): EventModel[] => {
    return EVENTS.filter((e) => e.createdBy === userId);
  },
  createEvent: (newEvent: EventModel): void => {
    EVENTS.push(newEvent);
  },
  deleteEvent: (eventId: string): void => {
    const eventIndex = EVENTS.findIndex((e) => e.id === eventId);
    EVENTS.splice(eventIndex, 1);
  },
  updateEvent: (
    eventId: string,
    updatedEvent: Omit<EventModel, "id" | "createdAt" | "createdBy">
  ): void => {
    const eventToUpdateIndex = EVENTS.findIndex((e) => e.id === eventId);

    EVENTS[eventToUpdateIndex] = {
      ...EVENTS[eventToUpdateIndex],
      ...updatedEvent,
    };
  },
};

export default eventServices;
