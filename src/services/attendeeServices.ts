import {
  doc,
  runTransaction,
  arrayUnion,
  increment,
  arrayRemove,
} from "firebase/firestore";
import { database } from "../firebase";
import { EVENTS_COLLECTION } from "./eventsServices";
import { USERS_COLLECTION } from "./usersServices";

const attendeeServices = {
  addAttendance: async (userId: string, eventId: string) => {
    const userDocRef = doc(USERS_COLLECTION, userId);
    const eventDocRef = doc(EVENTS_COLLECTION, eventId);

    await runTransaction(database, async (transaction) => {
      transaction.update(userDocRef, {
        attendingEvents: arrayUnion(eventId),
      });

      transaction.update(eventDocRef, {
        attendees: arrayUnion(userId),
        attendeesCount: increment(1),
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
        attendeesCount: increment(-1),
      });
    });
  },
};

export default attendeeServices;
