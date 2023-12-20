import  { React, useState } from 'react'
import SignInSide from '../mui-components/Login'

export default function CreateLoginForm({ handleLogin, username, setUsername, password, setPassword, user }) {

  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

    return <>
     <SignInSide username={username} setUsername={setUsername} password={password} setPassword={setPassword} showPassword={showPassword} handleShowPassword={handleShowPassword} handleLogin={handleLogin} user={user} />
    </>
  }
