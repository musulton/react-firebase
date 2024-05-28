import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect
} from './utils/firebase.app'

import './App.css';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

function App() {
  const onGooglePopupUserClick =  async () => {
    // signin with google account and get user information
    const {user} = await signInWithGooglePopup()

    // user information will be stored in our firestore db
    createUserDocumentFromAuth(user)
  }

  const onGoogleRedirectUserClick =  async () => {
    await signInWithGoogleRedirect()
  }

  useEffect(() => {
    const onCreateUser = async () => {
      const res = await getRedirectResult(auth)
      
      if (res) {
        createUserDocumentFromAuth(res.user)
      }
    }
    onCreateUser()
  }, [])

  return (
    <div className="App">
      <h1>Sign In Page</h1>
      <button onClick={onGooglePopupUserClick}>
        Sign In with Google PopUp
      </button>
      <button onClick={onGoogleRedirectUserClick}>
        Sign In with Google Redirect
      </button>
    </div>
  );
}

export default App;
