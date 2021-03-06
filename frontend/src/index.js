import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(

    <Auth0Provider
      domain="crysta.us.auth0.com"
      clientId="7wM95Dzz4zhafR6dCBB6PhZdyvKQgDMH"
      //Development
      // redirectUri="http://localhost:3000/pages/Dashboard/continue?state=THE_ORIGINAL_STATE"
      //Staging
      // redirectUri="https://crysta-staging.herokuapp.com/pages/Dashboard/continue?state=THE_ORIGINAL_STATE"
      //Production
      redirectUri="https://crysta-app.herokuapp.com/pages/Dashboard/continue?state=THE_ORIGINAL_STATE"
      
    >
      <App />
    </Auth0Provider>,
    document.getElementById('root')
);