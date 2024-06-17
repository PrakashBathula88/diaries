import React, { useContext } from "react";
import AuthContext from "../SignupProvider/Signinprovider";
import { Navigate } from "react-router-dom";
import Home from "../Home/Home";

export default function Private() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isloggedin;

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }else{
    return <Home/>
  }
 
}
