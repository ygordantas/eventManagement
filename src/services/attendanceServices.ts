import {
  doc,
  runTransaction,
  arrayUnion,
  arrayRemove,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database, fileStorage } from "../firebase";
import { EVENTS_COLLECTION } from "./eventsServices";
import { USERS_COLLECTION } from "./usersServices";
import { deleteObject, ref } from "firebase/storage";

const attendanceServices = {
  addAttendance: async (userId: string, eventId: string) => {
    const userDocRef = doc(USERS_COLLECTION, userId);
    const eventDocRef = doc(EVENTS_COLLECTION, eventId);

    await runTransaction(database, async (transaction) => {
      transaction.update(userDocRef, {
        attendingEvents: arrayUnion(eventId),
      });

      transaction.update(eventDocRef, {
        attendees: arrayUnion(userId),
      });
    });
  },
  removeAttendance: async (userId: string, eventId: string) => {
    const userDocRef = doc(USERS_COLLECTION, userId);
    const eventDocRef = doc(EVENTS_COLLECTION, eventId);

    await runTransaction(database, async (transaction) => {
      transaction.update(userDocRef, {
        attendingEvents: arrayRemove(eventId),
      });

      transaction.update(eventDocRef, {
        attendees: arrayRemove(userId),
      });
    });
  },
  deleteEvent: async (eventId: string): Promise<void> => {
    const queryBuilder = query(
      USERS_COLLECTION,
      where("attendingEvents", "array-contains", eventId)
    );
    const userDocsSnapshot = await getDocs(queryBuilder);
    const userDocRefs = userDocsSnapshot.docs.map((d) => d.ref);

    const eventDocRef = doc(EVENTS_COLLECTION, eventId);

    await runTransaction(database, async (transaction) => {
      const snapshot = await transaction.get(eventDocRef);

      userDocRefs.forEach((ref) => {
        transaction.update(ref, {
          attendingEvents: arrayRemove(eventId),
        });
      });

      transaction.delete(eventDocRef);

      if (snapshot?.data()?.hasImage) {
        const fileRef = ref(fileStorage, eventId);
        await deleteObject(fileRef);
      }
    });
  },
};

export default attendanceServices;
