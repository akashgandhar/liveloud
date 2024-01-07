import { db } from "../firebase";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const validateHandle = async (user, handle) => {
  try {
    if (!user || !handle) return false;

    const handleRef = query(
      collection(db, "users"),
      where("handle", "==", handle)
    );

    const snapshot = await getDocs(handleRef);

    console.log(snapshot);

    if (snapshot?.docs?.length > 0) {
      if (snapshot.docs[0].id === user.uid) {
        return true;
      }
      return false;
    }

    return true;
  } catch (e) {
    console.log("validate", e);
    return e.message;
  }
};

export const getUserProfile = async (user) => {
  try {
    if (!user) return false;

    const userRef = doc(db, "users", user?.uid);

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    }
    return false;
  } catch (e) {
    console.log("err", e);
    return false;
  }
};
