/* TODO +=> ========================
| Implement and initialize firebase |
| configurations                    |
================================== */

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { type Analytics, getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // not need. used for firebase analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const fireStore = getFirestore(app);

let analytics: Analytics | undefined;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);

  // logEvent(analytics, "analytic_logging");
  // console.log(" in analytics ", analytics);
}

// auth providers

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  login_hint: "user@example.com",
});

export { analytics };
