import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link } from 'react-router-dom';

export const LoginSignup = () => {
  const [signin, setsignin] = useState(true);
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      localStorage.setItem('initial', "");
      localStorage.setItem('initial', email.charAt(0));
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{signin ? "Sign Up" : "Login"}</h1>
        <div className="loginsignup-fields">
          {signin && <input type="text" placeholder='Your Name' />}
          <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' />
        </div>
        <Link to = '/'><button onClick={handleSubmit}>Submit</button></Link>
        <p className="loginsignup-login">{signin ? "Already have an account?" : "Don't have an account?"} <span onClick={() => setsignin(!signin)}>
          {signin ? "Login here" : "Sign Up here"}
        </span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
