import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import axios from "axios";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  /*let adminEmail = "admin@gmail.com";
    let adminPassword = "123";*/

  // Function to store email and username in cookies after successful login
  const setCookies = (email, userName) => {
    const expTime = 5 * 60 * 60; // 5 hours expiry time
    cookies.set("adminEmail", email, { expires: expTime / (60 * 60 * 24) });
    cookies.set("adminUserName", userName, {
      expires: expTime / (60 * 60 * 24),
    }); // Store username
  };

  const fetchdata = async () => {
    try {
      const responce = await axios.post(
        "http://localhost:8080/api/v1/adminsignin",
        {
          email: email,
          password: password,
        }
      );
      let responcedata = responce.data;
      const expTime = 5 * 60 * 60;
      cookies.set("token", responcedata, { expires: expTime / (60 * 60 * 24) });
      if (responce.status === 200) {
        //fetch admin name
        const adminResponse = await axios.get(
          "http://localhost:8080/api/v1/getadmin",
          {}
        );
        let adminData = adminResponse.data.find(
          (admin) => admin.email === email
        );
        if (adminData && adminData.userName) {
          alert("Login Successful");
          setCookies(email, adminData.userName);
          navigate("/dashboard");
        } else {
          alert("Failed to fetch admin details.");
        }
      } else {
        console.error("Login Response:", responcedata);
        alert("Can't Login");
      }
    } catch (error) {
      alert("System Error : " + error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetchdata();
  }

  //show and hide password
  function handleToggle() {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">
          <strong>Login</strong>
        </h2>
        <div className="login-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Username :
              </label>
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
              <label htmlFor="password" className="form-label">
                Password :{" "}
              </label>
              <div className="input-group">
                <input
                  type={type}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={handleToggle}
                >
                  <Icon className="absolute" icon={icon} size={20} />
                </button>
              </div>
            </div>
            <div className="form-actions">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <div className="form-submit">
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
