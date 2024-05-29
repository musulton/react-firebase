import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect
} from '../utils/firebase.app'

import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

function SignInForm() {
  const onGooglePopupUserClick =  async () => {
    // signin with google account and get user information
    const {user} = await signInWithGooglePopup()

    // user information will be stored in our firestore db
    createUserDocumentFromAuth(user)
  }

  const onGoogleRedirectUserClick =  async () => {
    // signin with google account
    await signInWithGoogleRedirect()
  }

  useEffect(() => {
    const onCreateUser = async () => {
      // get user information from result of signInWithGoogleRedirect() function
      // because page reload after execute signInWithGoogleRedirect() function
      // we need use getRedirectResult() and useEffect() function
      const res = await getRedirectResult(auth)
      
      if (res) {
        // user information will be stored in our firestore db
        createUserDocumentFromAuth(res.user)
      }
    }
    onCreateUser()
  }, [])

  return (
    <>
      <h1>Google Sign In</h1>
      <button onClick={onGooglePopupUserClick}>
        Sign In with Google PopUp
      </button>
      <button onClick={onGoogleRedirectUserClick}>
        Sign In with Google Redirect
      </button>
    </>
  );
}

export default SignInForm;
