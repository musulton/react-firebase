import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdUOfWZmMXvQajLEDzzf0m2aN6QeoNkxQ",
  authDomain: "fir-demo-b9e63.firebaseapp.com",
  projectId: "fir-demo-b9e63",
  storageBucket: "fir-demo-b9e63.appspot.com",
  messagingSenderId: "169320676632",
  appId: "1:169320676632:web:b19599a504792d2cef326d",
  measurementId: "G-6KR4ND3KYZ"
};

// initializeApp must be called to initialize firebase API
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider()

// Force users to choose a google account
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return

  // get user reference using unique string (uid)
  const userDocRef = doc(db, 'users', userAuth.uid)

  // get snapshot data (user information document) from firestore db
  const userSnapshot = await getDoc(userDocRef)

  // in this case we only need the exist() function
  // to find out whether the user already exists in our firestore db or not
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      // userDocRef used to reference our data to firebase auth
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        // additionalInformation params used to handle create user document from email and password
        // not from platform auth such as Google or Facebook account
        ...additionalInformation
      })
    } catch (err) {
      console.error('error creating the user', err.message)
    }
  }

  return userDocRef
}

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}