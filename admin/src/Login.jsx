import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


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
      navigate('./Dashboard'); 
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
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="card login-card shadow p-4">
            <h2 className="header text-center mb-2 text-primary "><strong>Login</strong></h2>
            <div className="card-body">
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Username :</label><br/>
                        <input 
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control form-control-lg"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password : </label><br/>
                        <div class="input-group">
                            <input 
                                type={type}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="form-control form-control-lg"
                            />
                            <button type="button" className="btn btn-outline" onClick={handleToggle}>
                            <Icon className="absolute" icon={icon} size={20}/>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between gap-5 align-items-left mb-3">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a href="#" className="text-decoration-none">Forgot Password?</a>
                    </div>
                    <div class="mt-4 d-grid">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    );
  };
  
  export default Login;