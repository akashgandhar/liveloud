import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCPVNovajRDLCi2DBbWO1mfLQ4IyqAOMl4",
  authDomain: "liveloud-93752.firebaseapp.com",
  projectId: "liveloud-93752",
  storageBucket: "liveloud-93752.appspot.com",
  messagingSenderId: "471511767251",
  appId: "1:471511767251:web:eb70e8083ea2b4f8071c26",
  measurementId: "G-6CJQ7FDJ5E"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);
export const analytics = isSupported().then((yes) =>
  yes ? getAnalytics(app) : null
);
