import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// =====================================
// CONFIGURAÇÃO DO FIREBASE
// =====================================

const firebaseConfig = {
  apiKey: "AIzaSyDROcLOvoTT9d1MKghOZudFlRGhd_676Hk",
  authDomain: "spieproject-b4262.firebaseapp.com",
  projectId: "spieproject-b4262",
  storageBucket: "spieproject-b4262.firebasestorage.app",
  messagingSenderId: "1023558385987",
  appId: "1:1023558385987:web:22c4450965412cbd0eaff6",
};

// =====================================
// APP & SERVICES
// =====================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db };