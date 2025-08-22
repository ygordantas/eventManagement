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
  QuerySnapshot,
  updateDoc,
  where,
  type DocumentData,
  type WhereFilterOp,
} from "firebase/firestore";
import type { DateFilterType } from "../constants/dateFiltersTypes";
import DATE_FILTER_TYPES from "../constants/dateFiltersTypes";

const EVENTS_COLLECTION = collection(database, "events");

const eventsServices = {
  getEvents: async (dateFilter?: DateFilterType): Promise<EventModel[]> => {
    let snapshot: QuerySnapshot<DocumentData, DocumentData>;

    if (dateFilter === DATE_FILTER_TYPES.all) {
      snapshot = await getDocs(EVENTS_COLLECTION);
    } else {
      let operation: WhereFilterOp;

      switch (dateFilter) {
        case DATE_FILTER_TYPES.now:
          operation = "==";
          break;
        case DATE_FILTER_TYPES.past:
          operation = "<";
          break;
        case DATE_FILTER_TYPES.upcoming:
          operation = ">";
          break;
        default:
          operation = ">=";
          break;
      }

      const queryBuilder = query(
        EVENTS_COLLECTION,
        where("date", operation, new Date())
      );

      snapshot = await getDocs(queryBuilder);
    }

    return snapshot.docs.map((doc) => {
      const docData = { ...doc.data() };
      docData.date = docData.date.toDate();
      return {
        id: doc.id,
        ...docData,
      };
    }) as EventModel[];
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

export default eventsServices;
