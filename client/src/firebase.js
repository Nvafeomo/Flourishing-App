import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Read Firebase config from Vite env variables (must start with VITE_)
// Create a `client/.env.local` (or `.env`) with these keys and restart the dev server.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Basic runtime checks to surface clearer errors during development
const required = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

const missing = required.filter((k) => !firebaseConfig[k]);
if (missing.length) {
  console.error(
    `Firebase configuration missing keys: ${missing.join(", ")}.\n` +
      "Make sure client/.env.local contains the correct VITE_FIREBASE_* values and restart the dev server."
  );
}

// In dev, print the resolved config keys (not secret values) to help debugging
if (import.meta.env.DEV) {
  console.log("Firebase config keys:", Object.keys(firebaseConfig));
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
