import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCdUOfWZmMXvQajLEDzzf0m2aN6QeoNkxQ",
  authDomain: "fir-demo-b9e63.firebaseapp.com",
  projectId: "fir-demo-b9e63",
  storageBucket: "fir-demo-b9e63.appspot.com",
  messagingSenderId: "169320676632",
  appId: "1:169320676632:web:b19599a504792d2cef326d",
  measurementId: "G-6KR4ND3KYZ"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);