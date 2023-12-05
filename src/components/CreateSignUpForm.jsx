import { React, useState } from 'react'

export default function CreateSignUpForm() {

    const [showSignUpForm, setShowSignUpForm] = useState(false)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    function handleShowForm() {
        setShowSignUpForm(!showSignUpForm)
      }

// ensure password is validated as in the backend, and that the user knows about it.
      function handleSignUp(e) {
        e.preventDefault()
        console.log('Attempting to sign-up user: ')

        if(password !== repeatPassword) {
            alert('passwords dont match')
            return null
        }

        return null
      }

      function showForm() {
        if(showSignUpForm) {
          return <div><form className="signup-form" onSubmit={handleSignUp}>
            <div>
           Username <input value={username} required name="username-input" id="username-input" type="text" onChange={({
                target
              }) => setUsername(target.value)}></input>
            </div>
            <div>
           Name <input value={name} name="name-input" required id="name-input" type="text" onChange={({
                target
              }) => setName(target.value)}></input>
            </div>
            <div>
           Password <input value={password} required name="password-input" id="password-input" type="password" onChange={({
                target
              }) => setPassword(target.value)}></input>
            </div>
            <div>
           Confirm password <input value={repeatPassword} required name="rpassword-input" id="rpassword-input" type="password" onChange={({
                target
              }) => setRepeatPassword(target.value)}></input>
            </div>
            <div>
              <button type="submit">Create account</button>
            </div>
          </form>
          <button onClick={handleShowForm}>Cancel</button>
          </div>
        } else {
          return <button onClick={handleShowForm}>Sign up!</button>
        }

      }

      return showForm()
}