// IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

/* 🔴 ADD YOUR FIREBASE CONFIG HERE */
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "XXX",
  appId: "XXX"
};

/* INIT */
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const storage = getStorage(app);

/* CONTACT FORM */
export async function submitContactForm(name, email, message) {

  await addDoc(collection(db, "contacts"), {
    name,
    email,
    message,
    createdAt: new Date()
  });
}

/* ARCHIVE FORM */
export async function submitArchiveForm(name, location, type, desc, imageFile) {

  const storageRef = ref(storage, "images/" + Date.now() + imageFile.name);

  await uploadBytes(storageRef, imageFile);

  const imageUrl = await getDownloadURL(storageRef);

  await addDoc(collection(db, "archive_pending"), {
    name,
    location,
    type,
    description: desc,
    imageUrl,
    createdAt: new Date()
  });
}
