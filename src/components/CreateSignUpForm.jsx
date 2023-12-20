import { React, useState } from 'react'
import loginService from '../services/handleSignUpLogin'
import { NotificationError, NotificationSuccess } from './Notification'
import SignUp from '../mui-components/Sign-up'

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

    return <>
      <NotificationError message={notificationError} />
      <NotificationSuccess message={notificationSuccess} />
      <SignUp user={user} setUsername={setUsername} username={username} name={name} setName={setName} password={password} setPassword={setPassword} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword} handleSignUp={handleSignUp} />
      </>
      }