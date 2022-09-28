// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-o8PxHRFGPKa4OGfUu-POWiKE8J5AfDg",
    authDomain: "budget-app-a0353.firebaseapp.com",
    databaseURL: "https://budget-app-a0353-default-rtdb.firebaseio.com",
    projectId: "budget-app-a0353",
    storageBucket: "budget-app-a0353.appspot.com",
    messagingSenderId: "1800492586",
    appId: "1:1800492586:web:11b9d7cd95f9079984d553"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;