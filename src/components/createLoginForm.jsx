import  { React, useState } from 'react'

export default function CreateLoginForm({ handleLogin, username, setUsername, password, setPassword }) {

  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  const passwordInput = showPassword === false ? <div>
  Password <input value={password} required name="password-input" id="password-input" type="password" onChange={({
       target
     }) => setPassword(target.value)}></input>
   </div> : <div>
       Password <input value={password} required name="password-input" id="password-input" type="text" onChange={({
            target
          }) => setPassword(target.value)}></input>
        </div>

    return <div><form className="login-form" onSubmit={handleLogin}>
        <div>
          <h1>Log in page</h1>
       Username <input value={username} minLength={3} maxLength={30} required name="username-input" id="username-input" type="text" onChange={({
            target
          }) => setUsername(target.value)}></input>
        </div>
        {passwordInput}
        <div>
        Show password: <input type="checkbox" id="show-password-checkbox" name="show-password-checkbox" value={showPassword} onChange={handleShowPassword}></input>
        </div>
        <div><button type="submit">Login</button></div>
      </form>
       </div>
  }
