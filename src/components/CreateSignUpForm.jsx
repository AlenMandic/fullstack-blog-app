import { React, useState } from 'react'
import loginService from '../services/handleSignUpLogin'
import { NotificationError } from './Notification'
import SignUp from '../mui-components/Sign-up'
import { useNavigate } from 'react-router-dom'

export default function CreateSignUpForm({ user, showSuccessMessageCallback }) {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [notificationError, setNotificationError] = useState(null)

      function showErrorNotification(message) {
        setNotificationError(message)

        setTimeout(() => {
          setNotificationError(null)
        }, 5000)
      }

      function handleShowMessageCallback() {
        showSuccessMessageCallback('Your account has been created successfully! You may now log in.')
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

          if(response.status === 201) {
            handleShowMessageCallback()
            navigate('/api/login')
          }

          resetForm()
          return response

         } catch(err) {
          showErrorNotification('An error occured while registering your account.')
         }
      }

    return <>
      <NotificationError message={notificationError} />
      <SignUp user={user} setUsername={setUsername} username={username} name={name} setName={setName} password={password} setPassword={setPassword} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword} handleSignUp={handleSignUp} />
      </>
      }