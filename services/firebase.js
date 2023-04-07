import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCDCerGF2ZeHs18-9TnEJH-_JAix2qwGg",
  // authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  projectId: "ground-break",
  storageBucket: "ground-break.appspot.com",

  // messagingSenderId: "XXXXXXXXXXXXXXX",
  // appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);