import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import CrystaLogo from './components/CrystaLogo.svg';
import LogoutButton from './components/logout-button';

const Logout = () => {
  const { logout } = useAuth0();
  return (
    <div className = "NavContainer" class = 'flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen w-screen'>
    <div class = "flex flex-col justify-center items-center bg-gray-50  rounded-3xl h-1/3 w-1/3 rounded-3xl shadow-lg">
      <div className = "crysta-logo" class = "">
        <img src = {CrystaLogo} alt = "CrystaLogo"/>
      </div>

      <p class = "font-medium text-center w-64 mb-4 mt-7 text-xl mr-5 ml-5">We're sad to see you go. 😢 Come back soon!</p>

      <div className="flex justify-center">
        <LogoutButton/>
      </div>
    </div>
  </div>
  );
};

export default Logout;