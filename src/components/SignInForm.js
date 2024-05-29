import { useState } from "react"
import { signinUserAuthWithEmailAndPassword } from "../utils/firebase.app"

const defaultFormFields = {
  email: '',
  password: '',
}

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

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

    try {
      // sign user auth and get user information data from response
      const response = await signinUserAuthWithEmailAndPassword(email, password)
      console.log(response)
      onResetField()
    } catch (err) {
      // each error code describes error message from firebase auth
      if (err.code === 'auth/wrong-password') {
        alert('incorrect password for email')
      } else if (err.code === 'auth/user-not-found') {
        alert('no user associated with this email')
      } else {
        console.error(err)
      }
    }
  }

  return (
    <>
      <h1>Sign In with email and password</h1>
      <form onSubmit={onSubmitHandler}>
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
        <button type="submit">Sign In</button>
      </form>
    </>
  )
}

export default SignInForm