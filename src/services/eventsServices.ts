import type EventModel from "../models/EventModel";
import { database, fileStorage } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  FirestoreError,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
  updateDoc,
  where,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";
import type { DateFilterType } from "../constants/dateFiltersTypes";
import DATE_FILTER_TYPES from "../constants/dateFiltersTypes";
import type { PaginatedResultType } from "../types/PaginatedResultType";
import { getEndOfTheDay, getStartOfTheDay } from "../utils/dateUtils";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const mapFirestoreDocToEventModel = async (
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
): Promise<EventModel> => {
  const docData = { ...doc.data() };
  const id = doc.id;

  docData.date = docData.date.toDate();

  if (docData.hasImage) {
    const fileRef = ref(fileStorage, id);
    docData.imagePath = await getDownloadURL(fileRef);
  }

  return {
    id,
    ...docData,
  } as EventModel;
};

export const EVENTS_COLLECTION = collection(database, "events");

const eventsServices = {
  getEvents: async (
    dateFilter?: DateFilterType,
    lastDoc?: DocumentSnapshot<DocumentData, DocumentData>,
    queryLimit: number = 20
  ): Promise<PaginatedResultType<EventModel>> => {
    const queryConstrains: QueryConstraint[] = [limit(queryLimit)];

    const fromDate = new Date();
    fromDate.setHours(0, 0, 0, 0);

    const toDate = new Date();
    toDate.setHours(23, 59, 59, 999);

    switch (dateFilter) {
      case DATE_FILTER_TYPES.all:
        break;
      case DATE_FILTER_TYPES.today:
        queryConstrains.push(
          where("date", ">=", fromDate),
          where("date", "<=", toDate)
        );
        break;
      case DATE_FILTER_TYPES.past:
        queryConstrains.push(where("date", "<", fromDate));
        break;
      case DATE_FILTER_TYPES.upcoming:
        queryConstrains.push(where("date", ">", toDate));
        break;
      default:
        queryConstrains.push(where("date", ">=", fromDate));
        break;
    }

    if (lastDoc) {
      queryConstrains.push(startAfter(lastDoc));
    }

    const queryBuilder = query(EVENTS_COLLECTION, ...queryConstrains);

    const snapshot = await getDocs(queryBuilder);

    const docsLength = snapshot.docs.length;

    const eventsPromises = snapshot.docs.map(mapFirestoreDocToEventModel);

    const events = await Promise.all(eventsPromises);

    return {
      records: events,
      hasMore: docsLength == queryLimit,
      lastDoc: snapshot.docs[docsLength - 1],
    };
  },
  getEventById: async (eventId: string): Promise<EventModel | undefined> => {
    const docRef = doc(EVENTS_COLLECTION, eventId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return;

    const event = await mapFirestoreDocToEventModel(snapshot);

    return event;
  },
  getUserEvents: async (userId: string): Promise<EventModel[]> => {
    const getUserEventsQuery = query(
      EVENTS_COLLECTION,
      where("createdBy", "==", userId)
    );
    const snapshot = await getDocs(getUserEventsQuery);

    const eventsPromises = snapshot.docs.map(mapFirestoreDocToEventModel);

    const events = await Promise.all(eventsPromises);

    return events;
  },
  createEvent: async (
    newEvent: Omit<EventModel, "id">,
    file?: File
  ): Promise<void> => {
    newEvent.hasImage = Boolean(file);
    const doc = await addDoc(EVENTS_COLLECTION, newEvent);
    if (file) {
      const fileRef = ref(fileStorage, doc.id);
      await uploadBytes(fileRef, file);
    }
  },
  deleteEvent: async (eventId: string): Promise<void> => {
    const docRef = doc(EVENTS_COLLECTION, eventId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      if (snapshot.data().hasImage) {
        const fileRef = ref(fileStorage, eventId);
        await deleteObject(fileRef);
      }
      await deleteDoc(docRef);
    }
  },
  updateEvent: async (
    eventId: string,
    updatedEvent: Omit<
      EventModel,
      "id" | "createdAt" | "createdBy" | "attendees" | "attendeesCount"
    >,
    file?: File
  ): Promise<void> => {
    updatedEvent.hasImage = Boolean(file);

    const docRef = doc(EVENTS_COLLECTION, eventId);
    await updateDoc(docRef, updatedEvent);

    if (file) {
      const fileRef = ref(fileStorage, eventId);
      await uploadBytes(fileRef, file);
    }
  },
  getCustomEvent: async (): Promise<EventModel[]> => {
    const queryBuilder = query(
      EVENTS_COLLECTION,
      where("date", "<=", new Date()),
      where("entrancePrice", ">=", 100)
    );

    const snapshot = await getDocs(queryBuilder);

    const eventsPromises = snapshot.docs.map(mapFirestoreDocToEventModel);

    const events = await Promise.all(eventsPromises);

    return events;
  },
  subscribeToEvents: (
    onSuccess: (result: PaginatedResultType<EventModel>) => void,
    onFailure: (error: FirestoreError) => void,
    dateFilter?: DateFilterType,
    lastDoc?: DocumentSnapshot<DocumentData, DocumentData>,
    queryLimit: number = 20
  ): Unsubscribe => {
    const queryConstrains: QueryConstraint[] = [limit(queryLimit)];

    const fromDate = getStartOfTheDay();

    const toDate = getEndOfTheDay();

    switch (dateFilter) {
      case DATE_FILTER_TYPES.all:
        break;
      case DATE_FILTER_TYPES.today:
        queryConstrains.push(
          where("date", ">=", fromDate),
          where("date", "<=", toDate)
        );
        break;
      case DATE_FILTER_TYPES.past:
        queryConstrains.push(where("date", "<", fromDate));
        break;
      case DATE_FILTER_TYPES.upcoming:
        queryConstrains.push(where("date", ">", toDate));
        break;
      default:
        queryConstrains.push(where("date", ">=", fromDate));
        break;
    }

    if (lastDoc) {
      queryConstrains.push(startAfter(lastDoc));
    }

    const queryBuilder = query(EVENTS_COLLECTION, ...queryConstrains);

    return onSnapshot(
      queryBuilder,
      async (querySnapshot) => {
        const docsLength = querySnapshot.docs.length;

        const eventsPromises = querySnapshot.docs.map(
          mapFirestoreDocToEventModel
        );

        const events = await Promise.all(eventsPromises);

        const result = {
          records: events,
          hasMore: docsLength == queryLimit,
          lastDoc: querySnapshot.docs[docsLength - 1],
        };

        onSuccess(result);
      },
      onFailure
    );
  },
};

export default eventsServices;
