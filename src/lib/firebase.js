// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoEvStDsffu45W6YiWEDwzLnyRsznnTUc",
    authDomain: "menudigital-fb494.firebaseapp.com",
    projectId: "menudigital-fb494",
    storageBucket: "menudigital-fb494.firebasestorage.app",
    messagingSenderId: "824575508448",
    appId: "1:824575508448:web:deaa3955fec333ef1fb585"
  };

// Check if Firebase app has already been initialized
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0]; // If already initialized, use the existing app
}

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
