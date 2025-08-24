import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
  updateDoc,
  where,
  type DocumentData,
  orderBy,
} from "firebase/firestore";
import type { DateFilterType } from "../constants/dateFiltersTypes";
import DATE_FILTER_TYPES from "../constants/dateFiltersTypes";
import { database } from "../firebase";
import type EventModel from "../models/EventModel";
import type PaginatedResult from "../models/PaginatedResult";

const EVENTS_COLLECTION = collection(database, "events");
const PAGE_SIZE = 2;

const mapFirestoreDocToEventModel = (doc: QueryDocumentSnapshot<DocumentData, DocumentData>): EventModel => {
  const docData = { ...doc.data() };
  docData.date = docData.date.toDate();
  return {
    id: doc.id,
    ...docData,
  } as EventModel;
};

const eventsServices = {
  getEvents: async (
    dateFilter?: DateFilterType,
    lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>
  ): Promise<PaginatedResult<EventModel>> => {
    const queryConstraints: QueryConstraint[] = [limit(PAGE_SIZE)];

    const fromDate = new Date();
    fromDate.setHours(0, 0, 0, 0);

    const toDate = new Date();
    toDate.setHours(23, 59, 59, 999);

    switch (dateFilter) {
      case DATE_FILTER_TYPES.today:
        queryConstraints.push(where("date", ">=", fromDate), where("date", "<=", toDate));
        break;
      case DATE_FILTER_TYPES.past:
        queryConstraints.push(where("date", "<", fromDate));
        break;
      case DATE_FILTER_TYPES.upcoming:
        queryConstraints.push(where("date", ">", toDate));
        break;
      default:
        queryConstraints.push(where("date", ">=", fromDate));
        break;
    }

    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc));
    }

    const snapshot = await getDocs(query(EVENTS_COLLECTION, ...queryConstraints));
    const events = snapshot.docs.map(mapFirestoreDocToEventModel) as EventModel[];

    return {
      result: events,
      lastDoc: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null,
      hasMore: snapshot.docs.length === PAGE_SIZE,
    };
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
  getUserEventsPaginated: async (
    userId: string,
    lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>
  ): Promise<PaginatedResult<EventModel>> => {
    const queryConstraints: QueryConstraint[] = [
      where("createdBy", "==", userId),
      orderBy("date", "asc"),
      limit(PAGE_SIZE),
    ];

    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc));
    }

    const snapshot = await getDocs(query(EVENTS_COLLECTION, ...queryConstraints));
    const events = snapshot.docs.map(mapFirestoreDocToEventModel) as EventModel[];

    return {
      result: events,
      lastDoc: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null,
      hasMore: snapshot.docs.length === PAGE_SIZE,
    };
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
