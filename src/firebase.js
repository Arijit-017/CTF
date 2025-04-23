import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBMlfwenSz3rYShaRjUXfIAkw_QuQMmK2Q",
  authDomain: "ctf-iste-7c444.firebaseapp.com",
  projectId: "ctf-iste-7c444",
  storageBucket: "ctf-iste-7c444.firebasestorage.app",
  messagingSenderId: "963465804891",
  appId: "1:963465804891:web:d176c74006b91af376d37e",
  databaseURL: "https://ctf-iste-7c444-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
