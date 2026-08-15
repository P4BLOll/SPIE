import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { getReactNativePersistence } = require('firebase/auth');

<<<<<<< HEAD
const firebaseConfig = {

  apiKey: "AIzaSyDROcLOvoTT9d1MKghOZudFlRGhd_676Hk",

  authDomain: "spieproject-b4262.firebaseapp.com",

  projectId: "spieproject-b4262",

  storageBucket: "spieproject-b4262.firebasestorage.app",

  messagingSenderId: "1023558385987",

  appId: "1:1023558385987:web:22c4450965412cbd0eaff6"

=======
 const firebaseConfig = {
  apiKey: "AIzaSyDROcLOvoTT9d1MKghOZudFlRGhd_676Hk",
  authDomain: "spieproject-b4262.firebaseapp.com",
  projectId: "spieproject-b4262",
  storageBucket: "spieproject-b4262.firebasestorage.app",
  messagingSenderId: "1023558385987",
  appId: "1:1023558385987:web:22c4450965412cbd0eaff6"
>>>>>>> 39f5a69 (SPIE ATUALIZADO)
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