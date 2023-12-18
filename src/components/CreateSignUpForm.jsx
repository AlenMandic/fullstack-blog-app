import { React, useState } from 'react'
import loginService from '../services/handleSignUpLogin'
import { NotificationError, NotificationSuccess } from './Notification'
import Alert from '@mui/material/Alert'

export default function CreateSignUpForm({ user }) {

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [notificationError, setNotificationError] = useState(null)
    const [notificationSuccess, setNotificationSuccess] = useState(null)


      function showErrorNotification(message) {
        setNotificationError(message)

        setTimeout(() => {
          setNotificationError(null)
        }, 5000)
      }

      function showSuccessNotification(message) {
        setNotificationSuccess(message)

        setTimeout(() => {
          setNotificationSuccess(null)
        }, 5000)
      }

      function resetForm() {
        setUsername('')
        setName('')
        setPassword('')
        setRepeatPassword('')
      }

// ensure password is validated as in the backend, and that the user knows about it.
      async function handleSignUp(e) {
        e.preventDefault()

        if(password !== repeatPassword) {
            showErrorNotification('Passwords dont match!')
            return null
        }

        const newUser = {
          username: username,
          name: name,
          password: password
        }

         try {
          const response = await loginService.registerUser(newUser)
          console.log(response.data)

          if(response.status === 201) {
            showSuccessNotification('Account created. You may now log in.')
          }

          resetForm()
          return response

         } catch(err) {
          console.log(err)
          showErrorNotification('An error occured while registering your account.')
         }
      }

      const loggedIn = <h1>You are currently logged in and have an account.</h1>

      const notLoggedIn = <div>
      <NotificationError message={notificationError} />
      <NotificationSuccess message={notificationSuccess} />
      <h1>Create your SnapBlog account!</h1>
          <form className="signup-form" onSubmit={handleSignUp}>
          <div>
         Username <input value={username} required minLength={3} maxLength={30} name="username-input" id="username-input" type="text" onChange={({
              target
            }) => setUsername(target.value)}></input>
          </div>
          <div>
         Name <input value={name} name="name-input" required minLength={3} maxLength={30} id="name-input" type="text" onChange={({
              target
            }) => setName(target.value)}></input>
          </div>
          <div>
         Password <input value={password} required minLength={15} maxLength={80} name="password-input" id="password-input" type="password" onChange={({
              target
            }) => setPassword(target.value)}></input>
          </div>
          <div>
         Confirm password <input value={repeatPassword} minLength={15} maxLength={80} required name="rpassword-input" id="rpassword-input" type="password" onChange={({
              target
            }) => setRepeatPassword(target.value)}></input>
          </div>
          <div>
          <Alert severity="info" style={{ backgroundColor: '#1f1f54', color: 'white' }}>Password must be 15 characters or more; include atleast 1 capital letter, 1 number, and 1 special character!</Alert>
          </div>
        <div>
            <button type="submit">Create account</button>
          </div>
        </form>
        </div>

          return <>
          {user && loggedIn}
          {!user && notLoggedIn}
          </>
      }