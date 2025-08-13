import EVENTS from "../data/events";
import type EventModel from "../models/EventModel";

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
};

export default eventServices;
