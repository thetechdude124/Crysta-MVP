import React from 'react';
import { withAuthenticationRequired } from "@auth0/auth0-react";

function Calendar() {
  return (
    <div className='Calendar' class = "flex items-center justify-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen ">
      <h1 class = "fixed text-black font-bold text-8xl">📅Calendar.</h1>
      <h1 class = "mt-40 text-white font-semibold text-2xl">Coming soon in a later release. In the meanwhile, check out our weekly newsletter for updates!</h1>
    </div>
  );
}

export default withAuthenticationRequired(Calendar, {
  onRedirecting: () => <div> Hey there! We're just redirecting you 😁</div>,
})