import './App.css';
import GoogleSignInForm from './components/GoogleSignInForm';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

function App() {

  return (
    <div className="App">
      <GoogleSignInForm />
      <SignUpForm />
      <SignInForm />
    </div>
  );
}

export default App;
