import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbj2ZqFZQTWUUSIu5W6zB9GdR8kjJlTWI",
  authDomain: "expense-tracker-app-d6619.firebaseapp.com",
  projectId: "expense-tracker-app-d6619",
  storageBucket: "expense-tracker-app-d6619.appspot.com",
  messagingSenderId: "413921747546",
  appId: "1:413921747546:web:b1df7e4bc47f5eff2d2e63",
  measurementId: "G-DT4WCBC08D",
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
