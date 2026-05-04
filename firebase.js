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
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyASYxHX5-H7DiVbB_Q0UeqlBrGobyspPb8",
    authDomain: "delhi-temp.firebaseapp.com",
    projectId: "delhi-temp",
    storageBucket: "delhi-temp.firebasestorage.app",
    messagingSenderId: "1063718083614",
    appId: "1:1063718083614:web:99332fba7a1ba6350d220f",
    measurementId: "G-2YRP8GBDNP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
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
