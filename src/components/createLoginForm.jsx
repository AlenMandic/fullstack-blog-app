import  React from 'react'

export default function CreateLoginForm({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) {


    return <div><form className="login-form" onSubmit={handleLogin}>
        <div>
          <h1>Log in page</h1>
       Username <input value={username} minLength={3} maxLength={30} required name="username-input" id="username-input" type="text" onChange={({
            target
          }) => setUsername(target.value)}></input>
        </div>
        <div>
       Password <input value={password} required name="password-input" id="password-input" type="password" onChange={({
            target
          }) => setPassword(target.value)}></input>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
       </div>
  }

