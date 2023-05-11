import React, { useState } from "react";
import PropTypes from "prop-types";

import './Login.css'

const loginUser = async (credentials) => {
    return fetch('http://localhost:8080/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}


const Login = ({ setToken }) => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
        username,
        password
    });
    setToken(token)
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input className="input-field" type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input className="input-field" type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button className="submit-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
