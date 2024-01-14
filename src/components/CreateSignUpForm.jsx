import { React, useState } from 'react'
import loginService from '../services/handleSignUpLogin'
import { NotificationError } from './Notification'
import SignUp from '../mui-components/Sign-up'
import { useNavigate } from 'react-router-dom'
import { showErrorNotification } from '../utils'

export default function CreateSignUpForm({ user, showSuccessMessageCallback, setNotificationSuccess }) {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [notificationError, setNotificationError] = useState(null)

      function handleShowMessageCallback() {
        showSuccessMessageCallback('Your account has been created successfully! You may now log in.', setNotificationSuccess)
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
            showErrorNotification('Passwords dont match!', setNotificationError)
            return null
        }

        const newUser = { username, name, password }

         try {
          const response = await loginService.registerUser(newUser)

          if(response.status === 201) {
            handleShowMessageCallback()
            navigate('/api/login')
          }

          resetForm()
          return response

         } catch(err) {
          showErrorNotification('An error occured while registering your account.', setNotificationError)
         }
      }

    return <>
      <NotificationError message={notificationError} />
      <SignUp user={user} setUsername={setUsername} username={username} name={name} setName={setName} password={password} setPassword={setPassword} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword} handleSignUp={handleSignUp} />
      </>
      }