import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import type { DateFilterType } from "../constants/dateFiltersTypes";
import DATE_FILTER_TYPES from "../constants/dateFiltersTypes";
import { database } from "../firebase";
import type EventModel from "../models/EventModel";

const EVENTS_COLLECTION = collection(database, "events");

const mapFirestoreDocToEventModel = (doc: QueryDocumentSnapshot<DocumentData, DocumentData>): EventModel => {
  const docData = { ...doc.data() };
  docData.date = docData.date.toDate();
  return {
    id: doc.id,
    ...docData,
  } as EventModel;
};

const eventsServices = {
  getEvents: async (dateFilter?: DateFilterType): Promise<EventModel[]> => {
    let snapshot: QuerySnapshot<DocumentData, DocumentData>;

    if (dateFilter === DATE_FILTER_TYPES.all) {
      snapshot = await getDocs(EVENTS_COLLECTION);
    } else {
      let queryBuilder: Query<DocumentData, DocumentData>;

      const fromDate = new Date();
      fromDate.setHours(0, 0, 0, 0);

      const toDate = new Date();
      toDate.setHours(23, 59, 59, 999);

      switch (dateFilter) {
        case DATE_FILTER_TYPES.today:
          queryBuilder = query(EVENTS_COLLECTION, where("date", ">=", fromDate), where("date", "<=", toDate));
          break;
        case DATE_FILTER_TYPES.past:
          queryBuilder = query(EVENTS_COLLECTION, where("date", "<", fromDate));
          break;
        case DATE_FILTER_TYPES.upcoming:
          queryBuilder = query(EVENTS_COLLECTION, where("date", ">", toDate));
          break;
        default:
          queryBuilder = query(EVENTS_COLLECTION, where("date", ">=", fromDate), where("date", "<=", toDate));
          break;
      }

      snapshot = await getDocs(queryBuilder);
    }

    return snapshot.docs.map(mapFirestoreDocToEventModel) as EventModel[];
  },
  getEventById: async (eventId: string): Promise<EventModel | undefined> => {
    const docRef = doc(EVENTS_COLLECTION, eventId);
    const snapshot = await getDoc(docRef);

    return snapshot.exists() ? mapFirestoreDocToEventModel(snapshot) : undefined;
  },
  getUserEvents: async (userId: string): Promise<EventModel[]> => {
    const getUserEventsQuery = query(EVENTS_COLLECTION, where("createdBy", "==", userId));
    const snapshot = await getDocs(getUserEventsQuery);

    return snapshot.docs.map(mapFirestoreDocToEventModel) as EventModel[];
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
