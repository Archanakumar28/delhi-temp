// FIREBASE CONFIG
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 🔴 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// CONTACT FORM
export async function submitContactForm(name, email, message) {
  await addDoc(collection(db, "contacts"), {
    name,
    email,
    message,
    timestamp: new Date()
  });
}

// ARCHIVE FORM
export async function submitArchiveForm(name, location, type, desc, file) {

  const storageRef = ref(storage, `uploads/${file.name}`);
  await uploadBytes(storageRef, file);

  const imageUrl = await getDownloadURL(storageRef);

  await addDoc(collection(db, "submissions"), {
    name,
    location,
    type,
    description: desc,
    imageUrl,
    timestamp: new Date()
  });
}
// FETCH ARCHIVE DATA
import { getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function fetchArchiveData() {
  const querySnapshot = await getDocs(collection(db, "submissions"));
  const data = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
}
