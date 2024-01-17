import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

export const FollowUnfollow = async (user, profileId) => {
  try {
    const userRef = doc(db, "users", user?.uid);
    const profileRef = doc(db, "users", profileId);

    const userDoc = await getDoc(userRef);
    const profileDoc = await getDoc(profileRef);

    if (userDoc.exists() && profileDoc.exists()) {
      if (userDoc.data().following.includes(profileId)) {
        await updateDoc(userRef, {
          following: arrayRemove(profileId),
        });
        await updateDoc(profileRef, {
          followers: arrayRemove(user?.uid),
        });

        return true;
      } else {
        await updateDoc(userRef, {
          following: arrayUnion(profileId),
        });
        await updateDoc(profileRef, {
          followers: arrayUnion(user?.uid),
        });

        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const RemoveFollower = async (user, profileId) => {
  try {
    const userRef = doc(db, "users", user?.uid);
    const profileRef = doc(db, "users", profileId);

    const userDoc = await getDoc(userRef);
    const profileDoc = await getDoc(profileRef);

    if (userDoc.exists() && profileDoc.exists()) {
      if (userDoc.data().followers.includes(profileId)) {
        await updateDoc(userRef, {
          followers: arrayRemove(profileId),
        });
        await updateDoc(profileRef, {
          following: arrayRemove(user?.uid),
        });

        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
