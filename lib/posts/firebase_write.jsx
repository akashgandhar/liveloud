import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const CreateNewPost = async ({ user, post }) => {
  var finalData = {
    ...post,
    owner: user.uid,
    likes: [],
    comments: [],
    amplified: [],
    shared: [],
    visibility: "public",
    flag: "flag",
    createdAt: new Date(),
  };

  await uploadFilesToStorage(user, post?.media).then((result) => {
    finalData = {
      ...finalData,
      media: result,
    };
  });

  const postRef = collection(db, "posts");

  console.log("finalData", finalData);

  try {
    await addDoc(postRef, finalData).then(async (docRef) => {
      console.log("Document written with ID: ", docRef.id);
      await updateDoc(doc(db, "posts", docRef.id), { postId: docRef.id });
    });

    await addDoc(collection(db, `users/${user.uid}/posts`), {
      postId: finalData.postId,
      createdAt: new Date(),
    });
    return true;
  } catch (e) {
    console.log("err", e);
    return false;
  }
};

export async function uploadFilesToStorage(user, mediaArray) {
  const resultArray = [];

  for (const mediaObject of mediaArray) {
    const file = mediaObject.file;
    const type = mediaObject.type;

    if (type == "gif") {
      resultArray.push({ type: type, url: file.url });
      continue;
    }

    // const fileRef = storage.ref().child(`${type}/${file.name}`);
    const storageRef = ref(
      storage,
      `${user.uid}/posts/${type}/${file.name}-${new Date().getTime()}}`
    );

    try {
      await uploadBytes(storageRef, file)
        .then((snapshot) => {
          return getDownloadURL(storageRef);
        })
        .then(async (downloadUrl) => {
          resultArray.push({ type: type, url: downloadUrl });
        });
    } catch (error) {
      console.error(`Error uploading file ${file.name}: ${error.message}`);
      // You can handle errors here, e.g., retrying the upload or skipping the file
    }
  }

  return resultArray;
}

export const LikePost = async (user, postId, ownerId) => {
  try {
    const docRef = query(
      collection(db, `posts/${postId}/likes`),
      where("uid", "==", user.uid)
    );

    await getDocs(docRef).then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((docd) => {
          console.log(docd.id, " => ", docd.data());
          deleteDoc(doc(db, `posts/${postId}/likes`, docd.id));
        });
      } else {
        addDoc(collection(db, `posts/${postId}/likes`), {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          ownerId: ownerId,
        });
      }
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const SavePost = async (user, postId, ownerId) => {
  try {
    const docRef = query(
      collection(db, `posts/${postId}/saved`),
      where("uid", "==", user.uid)
    );

    await getDocs(docRef).then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((docd) => {
          console.log(docd.id, " => ", docd.data());
          deleteDoc(doc(db, `posts/${postId}/saved`, docd.id));
        });
      } else {
        addDoc(collection(db, `posts/${postId}/saved`), {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          ownerId: ownerId,
        });
      }
    });

    const docRef2 = query(
      collection(db, `users/${user.uid}/saved`),
      where("postId", "==", postId)
    );

    await getDocs(docRef2).then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((docd) => {
          console.log(docd.id, " => ", docd.data());
          deleteDoc(doc(db, `users/${user.uid}/saved`, docd.id));
        });
      } else {
        addDoc(collection(db, `users/${user.uid}/saved`), {
          postId: postId,
          createdAt: new Date(),
        });
      }
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const SharePost = async (user, postId, ownerId) => {
  try {
    const docRef = query(
      collection(db, `posts/${postId}/shared`),
      where("uid", "==", user.uid)
    );

    await getDocs(docRef).then((querySnapshot) => {
      if (querySnapshot.size <= 0) {
        addDoc(collection(db, `posts/${postId}/shared`), {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          ownerId: ownerId,
        });
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const AmplifyPost = async (user, postId, ownerId) => {
  try {
    const docRef = query(
      collection(db, `posts/${postId}/amplified`),
      where("uid", "==", user.uid)
    );

    await getDocs(docRef).then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((docd) => {
          console.log(docd.id, " => ", docd.data());
          deleteDoc(doc(db, `posts/${postId}/amplified`, docd.id));
        });
      } else {
        addDoc(collection(db, `posts/${postId}/amplified`), {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          ownerId: ownerId,
        });
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const CommentPost = async (user, postId, ownerId, comment) => {
  try {
    addDoc(collection(db, `posts/${postId}/comments`), {
      uid: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
      comment: comment,
      createdAt: new Date(),
      ownerId: ownerId,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const DeletePost = async (user, postId) => {
  const postRef = doc(db, "posts", postId);
  const postDoc = await getDoc(postRef);
  const post = postDoc.data();

  if (post.owner !== user.uid) {
    return false;
  }

  try {
    const docRef = doc(db, "posts", postId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
