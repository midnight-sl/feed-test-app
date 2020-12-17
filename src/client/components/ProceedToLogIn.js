import React from 'react';
import { useHistory } from "react-router-dom";
import '../styles/app.css'
import '../styles/login.css'


export default function ProceedToLogIn() {
  const history = useHistory();

  const loginRedirect = async(e) => {
    e.preventDefault();
    history.push('/auth');
  }

  return (
    <div className="page proceed">
      <div className="proceed-container">
        <p>In order to read the feed you are welcome to login</p>
        <button className="proceed-btn" type="submit" onClick={loginRedirect}>Proceed to Log In</button>
      </div>
    </div>
  );
}
