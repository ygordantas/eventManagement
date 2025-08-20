import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  useEmulators: import.meta.env.DEV,
  apiKey: "AIzaSyDyCElfqAfn9FHGyMybVZOGYvZtba7jX00",
  authDomain: "event-management-1586c.firebaseapp.com",
  projectId: "event-management-1586c",
  storageBucket: "event-management-1586c.firebasestorage.app",
  messagingSenderId: "317750156289",
  appId: "1:317750156289:web:b2250a528f701cb02a7400",
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

const auth = getAuth(app);

if (firebaseConfig.useEmulators) {
  connectFirestoreEmulator(database, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
}

export { database, auth };
