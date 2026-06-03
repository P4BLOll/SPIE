import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { getReactNativePersistence } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCF4yz_9MvZJSa8NdDuGk9LswRTzzecuog",
  authDomain: "spiedatabase.firebaseapp.com",
  projectId: "spiedatabase",
  storageBucket: "spiedatabase.firebasestorage.app",
  messagingSenderId: "550273427464",
  appId: "1:550273427464:web:2f5e5e256547162c22c9bd"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Inicializa a Autenticação usando a persistência nativa do Expo
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) as any // 👈 O 'as any' resolve o conflito de tipo
});

export { auth, db };