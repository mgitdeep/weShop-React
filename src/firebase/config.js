
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1kN5vkP11etBH92IgLH38bZu93NDVhiE",
  authDomain: "weshop-c318c.firebaseapp.com",
  projectId: "weshop-c318c",
  storageBucket: "weshop-c318c.appspot.com",
  messagingSenderId: "627806783961",
  appId: "1:627806783961:web:659d6242394888dd34b1c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app