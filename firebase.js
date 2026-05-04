// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

/* 🔴 REPLACE THIS WITH YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// INITIALIZE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

/* =========================
   CONTACT FORM FUNCTION
========================= */
export async function submitContactForm(name, email, message) {
  await addDoc(collection(db, "messages"), {
    name: name,
    email: email,
    message: message,
    createdAt: new Date()
  });
}

/* =========================
   ARCHIVE SUBMISSION FUNCTION
========================= */
export async function submitArchiveForm(name, location, type, description, file) {
  let imageURL = "";

  if (file) {
    const storageRef = ref(storage, "uploads/" + Date.now() + "-" + file.name);
    await uploadBytes(storageRef, file);
    imageURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "archive"), {
    name: name,
    location: location,
    type: type,
    description: description,
    image: imageURL,
    createdAt: new Date()
  });
}
