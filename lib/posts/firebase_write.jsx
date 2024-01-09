import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
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

export const LikePost = async (user, postId) => {
  const postRef = doc(db, "posts", postId);
  const docSnap = await getDoc(postRef);

  if (docSnap.exists()) {
    const post = docSnap.data();
    if (post.likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: post.likes.filter((id) => id != user.uid),
      });
      return true;
    } else {
      await updateDoc(postRef, {
        likes: [...post.likes, user.uid],
      });
      return true;
    }
  }

  return false;
};

export const SharePost = async (user, postId) => {
  const postRef = doc(db, "posts", postId);
  const docSnap = await getDoc(postRef);

  if (docSnap.exists()) {
    const post = docSnap.data();
    if (post.shared.includes(user.uid)) {
      return true;
    } else {
      await updateDoc(postRef, {
        shared: [...post.shared, user.uid],
      });
      return true;
    }
  }

  return false;
};

export const AmplifyPost = async (user, postId) => {
  const postRef = doc(db, "posts", postId);
  const docSnap = await getDoc(postRef);

  if (docSnap.exists()) {
    const post = docSnap.data();
    if (post.amplified.includes(user.uid)) {
      console.log(1);
      await updateDoc(postRef, {
        amplified: post.amplified.filter((id) => id != user.uid),
      });
      return true;
    } else {
      await updateDoc(postRef, {
        amplified: [...post.amplified, user.uid],
      });
      return true;
    }
  }

  return false;
};
export const CommentPost = async (user, postId, comment) => {
  const postRef = doc(db, "posts", postId);
  const docSnap = await getDoc(postRef);

  const commentData = {
    owner: {
      uid: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
    },
    content: comment,
    createdAt: new Date(),
  };

  if (docSnap.exists()) {
    const post = docSnap.data();

    await updateDoc(postRef, {
      comments: [...post.comments, commentData],
    });
    return true;
  }

  return false;
};
