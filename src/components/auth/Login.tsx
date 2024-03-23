import React from 'react'

function Login() {
  console.log('process.env.REACT_APP_API_URL',process.env.REACT_APP_AUTH_TOKEN)
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    )
  }
  return (
    <div>
      <h1>Login</h1>
      <button onClick={googleAuth}>Login with google auth</button>
    </div>
  )
}

export default Login