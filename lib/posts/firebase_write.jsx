import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const CreateNewPost = async ({ user, post }) => {
  const finalData = {
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

  const postRef = collection(db, "posts");

  try {
    await addDoc(postRef, finalData);
    return true;
  } catch (e) {
    console.log("err", e);
    return false;
  }
};

export const BulkMediaUpload = async ({ user, postMedia }) => {
  var mediaURLs = [];

  console.log("postMedia", postMedia);

  try {
    postMedia.forEach(async (media) => {
      const mediaRef = ref(
        storage,
        `media/${user.uid}/posts/${
          new Date().toISOString() + `-${media?.url?.slice(0, 10)}`
        }`
      );
      await uploadBytes(mediaRef, media.file)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then(async (downloadUrl) => {
          mediaURLs.push(downloadUrl);
        });
    });

    console.log("mediaURLs", mediaURLs);

    return mediaURLs;
  } catch (e) {
    console.log("err", e);
    return false;
  }
};
