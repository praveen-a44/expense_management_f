import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Use the same CSS file
import tt from './exp.png';

export default function Signup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      history("/");
      alert("Registration Successful!!");
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
        <h1 className={`text-${props.mode === "light" ? "rgb(43, 45, 106)" : "white"}`}>SignUp</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input type="text" id="name" name='name' onChange={onChange} className="form-control" placeholder="Username" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input type="email" id="email" name='email' onChange={onChange} className="form-control" placeholder="Email" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input type="password" id="password" name='password' className="form-control" onChange={onChange} placeholder="Password" />
            </div>
          </div>
          <div>
            <input type="submit" className="btn btn-primary mx-2 my-2" value="Sign Up" />
            <Link to="/" className="btn btn-primary">Click here to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
