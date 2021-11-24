import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn btn-primary btn-block" class = "font-medium text-gray-50 h-12 w-40 bg-blue-400 rounded-3xl hover:bg-green-400 transition duration-250 ease-linear"
      onClick={() => loginWithRedirect()}
    >
      Log In | Sign Up
    </button>
  );
};

export default LoginButton;