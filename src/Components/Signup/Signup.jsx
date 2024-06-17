import React, { useContext, useRef, useState } from "react";
import "./Signin.css";
import AuthContext from "../SignupProvider/Signinprovider";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const navigate = useNavigate();

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value;
  const password = passwordRef.current?.value;
  const confirm = confirmPassRef.current?.value;
    if (!isLogin && password !== confirm) {
     alert("Passwords does not matching");
      return;
    }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbj2ZqFZQTWUUSIu5W6zB9GdR8kjJlTWI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbj2ZqFZQTWUUSIu5W6zB9GdR8kjJlTWI";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message || "Authentication failed");
      }

      const data = await response.json();
      authCtx.login(data.idToken);
      navigate("/"); 
    } catch (error) {
      console.error("Authentication Error:", error.message);
    
    }
  };

  const handleForgotClick = () => {
    navigate("/forgot");
  };

  return (
    <div className="container">
      <div className="All_sign_in">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        <form onSubmit={handleSubmit} className="form_elements">
          <input type="email" placeholder="E-MAIL" ref={emailRef} required />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPassRef}
              required
            />
          )}

          <button type="submit" className="btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {isLogin && (
            <p className="forgot" onClick={handleForgotClick}>
              Forgot password
            </p>
          )}
        </form>
        <button className="have" onClick={switchHandler}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
}
