import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const FollowOrUnfollowUser = async (user, endUserId) => {
  try {
    const endUserRef = doc(db, "users", endUserId);
    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);
    const endUserSnap = await getDoc(endUserRef);

    if (userSnap.exists() && endUserSnap.exists()) {
      const userData = userSnap.data();
      const endUserData = endUserSnap.data();

    //   console.log(userData);

      if (userData?.following?.includes(endUserId)) {
        await updateDoc(userRef, {
          following: userData?.following?.filter((id) => id != endUserId),
        });
        await updateDoc(endUserRef, {
          followers: endUserData?.followers?.filter((id) => id != user.uid),
        });
        return true;
      } else {
        await updateDoc(userRef, {
          following: [...(userData?.following || []), endUserId],
        });
        await updateDoc(endUserRef, {
          followers: [...(endUserData?.followers || []), user.uid],
        });
        return true;
      }
    }
  } catch (error) {
    console.log(error.message);
    //check for half written data

    const endUserRef = doc(db, "users", endUserId);
    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);
    const endUserSnap = await getDoc(endUserRef);

    if (userSnap.exists() && endUserSnap.exists()) {
      const userData = userSnap.data();
      const endUserData = endUserSnap.data();

      if (!userData?.following || !endUserData?.followers) return false;

      console.log(userData);

      if (
        userData?.following?.includes(endUserId) &&
        endUserData?.followers?.includes(user.uid)
      ) {
        return true;
      } else {
        await updateDoc(userRef, {
          following: [...(userData?.following || []), endUserId],
        });
        await updateDoc(endUserRef, {
          followers: [...(endUserData?.followers || []), user.uid],
        });
        return true;
      }
    }
  }

  return false;
};
