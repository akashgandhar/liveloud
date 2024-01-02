const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();




//Create User Document

// exports.createUserDocument = functions.auth.user().onCreate((user) => {
//   const { uid, email, displayName, photoURL, phoneNumber } = user;

//   const userHandle = email.split("@")[0] + uid.slice(0, 5);

//   const db = admin.firestore();

//   const userDocRef = db.collection("users").doc(uid);

//   // Set initial data for the user document
//   return userDocRef.set({
//     email: email,
//     uid: uid,
//     handle: userHandle,
//     name: displayName ?? "",
//     photoURL: photoURL ?? "",
//     phoneNumber: phoneNumber ?? "+91",
//     createdAt: new Date(),
//   });
// });





