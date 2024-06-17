    import React, { useState } from "react";

    const AuthContext = React.createContext({
      token: " ",
      isloggedin: false,
      login: (token) => {},
      logout: () => {},
    });

    export const Signinprovider = ({ children }) => {
      const initialToken = localStorage.getItem("tokenid");
      const [token, settoken] = useState(initialToken);

      const userisloggedin = !!token;

      const loginHandler = (token) => {
        settoken(token);
        localStorage.setItem("tokenid", token);
      };

      const logoutHandler = () => {
        settoken(null);
        localStorage.removeItem("tokenid");
      };

      const Handling = {
        token: token,
        isloggedin: userisloggedin,
        login: loginHandler,
        logout: logoutHandler,
      };
      return (
        <AuthContext.Provider value={Handling}>{children}</AuthContext.Provider>
      );
    };  

    export default AuthContext;
