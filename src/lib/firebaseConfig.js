import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, push, ref, set, update } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCJET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDERID,
  appId: process.env.EXPO_PUBLIC_APP_ID
}
console.log(firebaseConfig)
const app = initializeApp(firebaseConfig)

const db = getDatabase(app)

export { app, db, onValue, push, ref, set, update }
