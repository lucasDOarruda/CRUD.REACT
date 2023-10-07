import { initializeApp } from "firebase/app";
import{getFirestore} from "@firebase/firestore";

console.log(process .env);

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "edireact00.firebaseapp.com",
    databaseURL: "https://edireact00-default-rtdb.firebaseio.com",
    projectId: "edireact00",
    storageBucket: "edireact00.appspot.com",
    messagingSenderId: "624722371122",
    appId: "1:624722371122:web:1c510ebbc9ffc695bfd22b",
    measurementId: "G-CRQXGB2ZEJ"
};

const app = initializeApp(firebaseConfig);

export const db = getFireStore()