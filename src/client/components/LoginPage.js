import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { loginUser } from  '../api'
import '../styles/app.css';
import '../styles/login.css'


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const login = async(e) => {
    e.preventDefault();
    const loginResult = await loginUser(email);
    if (loginResult) {
      localStorage.setItem('user', JSON.stringify(loginResult));
      history.push('/feed');
    }
  }

  return (
    <div className="page login">
      <div className="login-container">
        <form id="login-form" name="form" onSubmit={login} >
          <fieldset id="details">
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" value={email} onChange={ e => setEmail(e.target.value) }/>

              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" value={'secret'}/>
          </fieldset>
          <button className="login-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
