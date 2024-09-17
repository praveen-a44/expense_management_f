import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';
import tt from './exp.png';
import AuthContext from './AuthContext';

export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const history = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      alert(`${credentials.email} has been logged in`);
      login(credentials);
      history('/dashboard');
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src={tt} alt="Loading" />
      </div>
     
      <div className="form-container">
      
        <h1 className={`text-${props.mode === "light" ? "rgb(43, 45, 106)" : "white"}`}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input type="email" id='email' value={credentials.email} name='email' onChange={onChange} className="form-control" placeholder="Email" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input type="password" id='password' name='password' value={credentials.password} className="form-control" onChange={onChange} placeholder="Password" />
            </div>
          </div>
          <div>
            <input type="submit" className="btn btn-primary mx-2 my-2" value="Login" />
            <Link to="/signup" className="btn btn-primary">Click here to SignUp</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
