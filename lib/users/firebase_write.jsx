import { updateProfile } from "firebase/auth";
import { db } from "../firebase";

import { doc, updateDoc } from "firebase/firestore";

export const updateUserProfile = async (user, data) => {
  try {
    if (!user || !data) return "user or data is missing";

    const userRef = doc(db, "users", user?.uid);

    await updateDoc(userRef, data);

    await updateProfile(user, {
      displayName: data?.name ?? "",
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
