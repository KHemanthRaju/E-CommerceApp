import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const notifyLogin = () => toast.success("Successfully login!!");

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const { login } = useAuth();

  const loginWithGuest = (e) => {
    e.preventDefault();
    login("hemanthRaju@gmail.com", "hemanth1234");
    notifyLogin();
  };

  return (
    <div className="main-logo">
      <div className="center">
        <h1>Login</h1>
        <form onSubmit={(e) => loginHandler(e)}>
          <div className="txt_field">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <span></span>
            <label>Email Address</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="fa fa-eye-slash icon"
              required
            />
            <label>Password</label>
          </div>
          <button className="btn btn-success" type="submit">
            Login
          </button>
          <button className="btn btn-success" onClick={loginWithGuest}>
            Guest Login
          </button>
          <div className="signup_link">
            Create Your Account
            <Link to="/signup">
              <b>Signup</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
