import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { Link, redirect } from 'react-router-dom'

export const LoginSignup = () => {

  const [signin,setsignin] = useState(true);

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>
          {
            signin ? "Sign Up" : "Login"
          }</h1>
        <div className="loginsignup-fields">
          {signin ? <input type="text" placeholder='Your Name' /> : <></>}
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
        <Link to = '/'><button>Submit</button></Link>
        <p className="loginsignup-login">{signin ? "Already have an accounts?":"Don't have an account?"} <span onClick={() => setsignin(!signin)}>
          {
            signin ? "Login here" : "Sign In here"
          }
        </span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name = '' id ='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
