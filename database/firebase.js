import {initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "your apiKey",
    authDomain: "your authDomain",
    projectId: "your projectId",
    storageBucket: "your storageBucket",
    messagingSenderId: "your messagingSenderId",
    appId: "your appId"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export default db;