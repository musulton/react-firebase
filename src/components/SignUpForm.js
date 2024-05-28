import { useState } from "react"
import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase.app"

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const onChangeHandler = (event) => {
    const { name, value } = event.target

    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  const onResetField = () => {
    setFormFields(defaultFormFields)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('password do not match')
      return 
    }

    try {
      // create user auth and get user information data from response
      const { user } = await createUserAuthWithEmailAndPassword(email, password)

      // store the user response to firestore db with displayname
      await createUserDocumentFromAuth(user, { displayName })

      onResetField()
    } catch (err) {
      // auth/email-already-in-use
      // error code from firebase when email is already/registered in firestore db
      if (err.code === 'auth/email-already-in-use') {
        alert('cannot create user, email already in use')
      } else {
        console.error('user creation encountered an error', err)
      }
    }

  }

  return (
    <>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={onSubmitHandler}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={onChangeHandler}
          name="displayName"
          value={displayName}
        />

        <label>Email</label>
        <input
          type="email"
          required
          onChange={onChangeHandler}
          name="email"
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          required
          onChange={onChangeHandler}
          name="password"
          value={password}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={onChangeHandler}
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default SignUpForm