import React from "react";
import "../ForgotPassword/ForgotPassWord.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "../FirebaseConfig/FirebaseConfig";
import { useNavigate } from "react-router-dom";
export default function Password() {
    const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(database, emailVal)
      .then((data) => {
        alert("CHECK YOUR MAIL");
      })
      .catch((err) => {
        alert(err.code);
      });
  };
  const redirect=()=>{
    navigate("/signin")
  }

  return (
    <div className="form-container">
      <div className="logo-container">Forgot Password</div>

      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <button className="form-submit-btn" type="submit">
          Send Email
        </button>
      </form>

      <p className="signup-link">
        Don't have an account?
        <a  className="signup-link link" onClick={redirect} href="Loading...">
          {" "}
          Sign up now
        </a>
      </p>
    </div>
  );
}
