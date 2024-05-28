import {
  createUserDocumentFromAuth,
  signInWithGooglePopup
} from './utils/firebase.app'

import './App.css';

function App() {
  const logGoogleUser =  async () => {
    // signin with google account and get user information
    const {user} = await signInWithGooglePopup()

    // user information will be stored in our firestore db
    createUserDocumentFromAuth(user)
  }

  return (
    <div className="App">
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        SignIn with Google
      </button>
    </div>
  );
}

export default App;
