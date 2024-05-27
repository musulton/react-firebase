import {
  signInWithGooglePopup
} from './utils/firebase.app'

import './App.css';

function App() {
  const logGoogleUser =  async () => {
    const res = await signInWithGooglePopup()
    console.log(res)
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
