// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔴 REPLACE WITH YOUR CONFIG FROM FIREBASE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

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
