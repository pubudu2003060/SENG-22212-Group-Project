import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import "../styles/login.css";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  let adminEmail = "admin@gmail.com";
  let adminPassword = "123";

  function handleSubmit (e){
    e.preventDefault();

    //validations
    if (email === adminEmail && password === adminPassword) {
      navigate('/dashboard'); 
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }

  //show and hide password
  function handleToggle () {
    if (type==='password'){
        setIcon(eye);
        setType('text');
    } else {
        setIcon(eyeOff);
        setType('password');
    }
};

  return (
      <div className="login-container">
        <div className="login-card">
            <h2 className="login-header"><strong>Login</strong></h2>
            <div className="login-body">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Username :</label>
                        <input 
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password : </label>
                        <div class="input-group">
                            <input 
                                type={type}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="form-input"
                            />
                            <button type="button" className="toggle-btn" onClick={handleToggle}>
                            <Icon className="absolute" icon={icon} size={20}/>
                            </button>
                        </div>
                    </div>
                    <div className="form-actions">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>
                    <div class="form-submit">
                        <button type="submit" className="login-btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    );
  };
  
  export default Login;