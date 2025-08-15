import type EventModel from "../models/EventModel";
import { database } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const EVENTS_COLLECTION = collection(database, "events");

const eventServices = {
  getAllEvents: async (): Promise<EventModel[]> => {
    const snapshot = await getDocs(EVENTS_COLLECTION);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as EventModel[];
  },
  getEventById: async (eventId: string): Promise<EventModel | undefined> => {
    const docRef = doc(EVENTS_COLLECTION, eventId);
    const snapshot = await getDoc(docRef);

    return snapshot.exists()
      ? ({ ...snapshot.data(), id: snapshot.id } as EventModel)
      : undefined;
  },
  getUserEvents: async (userId: string): Promise<EventModel[]> => {
    const getUserEventsQuery = query(
      EVENTS_COLLECTION,
      where("createdBy", "==", userId)
    );
    const snapshot = await getDocs(getUserEventsQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as EventModel[];
  },
  createEvent: async (newEvent: Omit<EventModel, "id">): Promise<void> => {
    await addDoc(EVENTS_COLLECTION, newEvent);
  },
  deleteEvent: async (eventId: string): Promise<void> => {
    const docRef = doc(EVENTS_COLLECTION, eventId);
    await deleteDoc(docRef);
  },
  updateEvent: async (
    eventId: string,
    updatedEvent: Omit<EventModel, "id" | "createdAt" | "createdBy">
  ): Promise<void> => {
    const docRef = doc(EVENTS_COLLECTION, eventId);
    await updateDoc(docRef, updatedEvent);
  },
};

export default eventServices;
