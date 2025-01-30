import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyATK3oKn7iSAiWSJRa-ydm3B7Wn2OoDwAE",
  authDomain: "college-hub-a411b.firebaseapp.com",
  projectId: "college-hub-a411b",
  storageBucket: "college-hub-a411b.firebasestorage.app",
  messagingSenderId: "874126333294",
  appId: "1:874126333294:web:ae647e85d29a1d2e1e1d7f"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app 