import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(

    <Auth0Provider
      domain="crysta.us.auth0.com"
      clientId="7wM95Dzz4zhafR6dCBB6PhZdyvKQgDMH"
      // redirectUri="http://localhost:3000/pages/Energy/continue?state=THE_ORIGINAL_STATE"
      redirectUri="https://crysta-app.herokuapp.com/pages/Energy/continue?state=THE_ORIGINAL_STATE"
    >
      <App />
    </Auth0Provider>,
    document.getElementById('root')
);