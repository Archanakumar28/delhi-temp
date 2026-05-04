// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔴 REPLACE WITH YOUR CONFIG FROM FIREBASE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// CONTACT FORM
export async function submitContactForm(name, email, message) {
  await addDoc(collection(db, "contacts"), {
    name,
    email,
    message,
    createdAt: new Date()
  });
}

// ARCHIVE FORM (NO IMAGE)
export async function submitArchiveForm(name, location, type, description) {
  await addDoc(collection(db, "submissions"), {
    name,
    location,
    type,
    description,
    approved: false,
    createdAt: new Date()
  });
}

// LOAD APPROVED ENTRIES (FOR ARCHIVE PAGE)
export async function loadApprovedEntries() {
  const querySnapshot = await getDocs(collection(db, "submissions"));
  let data = [];

  querySnapshot.forEach((doc) => {
    const item = doc.data();
    if (item.approved === true) {
      data.push(item);
    }
  });

  return data;
}
