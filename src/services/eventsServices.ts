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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const mapFirestoreDocToEventModel = (
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
): EventModel => {
  const docData = { ...doc.data() };
  docData.date = docData.date.toDate();
  return {
    id: doc.id,
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

    return {
      records: snapshot.docs.map(mapFirestoreDocToEventModel) as EventModel[],
      hasMore: docsLength == queryLimit,
      lastDoc: snapshot.docs[docsLength - 1],
    };
  },
  getEventById: async (eventId: string): Promise<EventModel | undefined> => {
    const docRef = doc(EVENTS_COLLECTION, eventId);
    const snapshot = await getDoc(docRef);

    return snapshot.exists()
      ? mapFirestoreDocToEventModel(snapshot)
      : undefined;
  },
  getUserEvents: async (userId: string): Promise<EventModel[]> => {
    const getUserEventsQuery = query(
      EVENTS_COLLECTION,
      where("createdBy", "==", userId)
    );
    const snapshot = await getDocs(getUserEventsQuery);

    return snapshot.docs.map(mapFirestoreDocToEventModel);
  },
  createEvent: async (
    newEvent: Omit<EventModel, "id">,
    file?: File
  ): Promise<void> => {
    const doc = await addDoc(EVENTS_COLLECTION, newEvent);
    if (file) {
      const fileRef = ref(fileStorage, doc.id);
      await uploadBytes(fileRef, file);
    }
  },
  deleteEvent: async (eventId: string): Promise<void> => {
    const docRef = doc(EVENTS_COLLECTION, eventId);
    await deleteDoc(docRef);
  },
  updateEvent: async (
    eventId: string,
    updatedEvent: Omit<
      EventModel,
      "id" | "createdAt" | "createdBy" | "attendees" | "attendeesCount"
    >,
    file?: File
  ): Promise<void> => {
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

    return snapshot.docs.map(mapFirestoreDocToEventModel);
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
      (querySnapshot) => {
        const docsLength = querySnapshot.docs.length;

        const result = {
          records: querySnapshot.docs.map(
            mapFirestoreDocToEventModel
          ) as EventModel[],
          hasMore: docsLength == queryLimit,
          lastDoc: querySnapshot.docs[docsLength - 1],
        };

        onSuccess(result);
      },
      onFailure
    );
  },
  getEventImagePath: (eventId: string): Promise<string> => {
    const fileRef = ref(fileStorage, eventId);
    return getDownloadURL(fileRef);
  },
};

export default eventsServices;
