import { addDoc, collection, doc, setDoc } from "firebase/firestore";
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
    await addDoc(postRef, finalData);
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
