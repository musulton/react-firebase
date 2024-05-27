import {
  createUserDocumentFromAuth,
  signInWithGooglePopup
} from './utils/firebase.app'

import './App.css';

function App() {
  const logGoogleUser =  async () => {
    const {user} = await signInWithGooglePopup()
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
