import React from "react";
import LoginButton from "./components/login-button";
import CrystaLogo from './components/CrystaLogo.svg';

const Login = () => (
  <div className = "NavContainer" class = 'flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen w-screen'>
    <div class = "flex flex-col justify-center items-center bg-gray-50 h-1/3 w-1/3 rounded-3xl shadow-lg ">
      <div className = "crysta-logo">
        <img src = {CrystaLogo} alt = "CrystaLogo"/>
      </div>

      <p class = "font-normal text-center mb-7 mt-7 mr-5 ml-5 text-xl">Glad to see you! Make sure you've downloaded the latest version of our <a href="https://tinyurl.com/Crysta-MVP" target = "_blank" class="font-semibold underline text-blue-400 hover:text-green-400 transition duration-250 ease-linear">energy tracker</a> first.</p>

      <div className="flex justify-center">
        <LoginButton/>
      </div>
    </div>
  </div>
);

export default Login;