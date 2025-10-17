import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ Tu configuración real
const firebaseConfig = {
  apiKey: "AIzaSyAerUDBd5Y4u95XX0HYQYDJanRB2S9FVeI",
  authDomain: "moto-2bc7c.firebaseapp.com",
  projectId: "moto-2bc7c",
  storageBucket: "moto-2bc7c.firebasestorage.app",
  messagingSenderId: "908540899105",
  appId: "1:908540899105:web:c63dbfe121037a53721860"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);