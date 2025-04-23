import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC6xqhvwZQIfUj-m_QY4V-IyULWT4-YfxM",
    authDomain: "feedback-form-7fd2c.firebaseapp.com",
    projectId: "feedback-form-7fd2c",
    storageBucket: "feedback-form-7fd2c.firebasestorage.app",
    messagingSenderId: "294962306882",
    appId: "1:294962306882:web:616df60eb64c80b49532db",
    measurementId: "G-TWH5H22VNB"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 