import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../firebase";
import type UserDetails from "../models/UserDetails";

const USERS_COLLECTION = collection(database, "users");

const usersServices = {
  getUserDetailsById: async (
    userId: string
  ): Promise<UserDetails | undefined> => {
    const docRef = doc(USERS_COLLECTION, userId);

    const snapshot = await getDoc(docRef);

    return snapshot.exists()
      ? ({ ...snapshot.data() } as UserDetails)
      : undefined;
  },
  createUserDetails: (
    userId: string,
    userDetails: UserDetails
  ): Promise<void> => {
    const docRef = doc(USERS_COLLECTION, userId);
    return setDoc(docRef, userDetails);
  },
};

export default usersServices;
