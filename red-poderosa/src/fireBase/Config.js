// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPR5iFshuYf633_ifStTLZXor6-aKR3ak",
    authDomain: "regrets-app.firebaseapp.com",
    projectId: "regrets-app",
    storageBucket: "regrets-app.appspot.com",
    messagingSenderId: "766922869293",
    appId: "1:766922869293:web:21246a26d47623a6a886a4"
};

const app = firebase.initializeApp(firebaseConfig);

export const getFirestore = () => {
    return firebase.firestore(app);
}