import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfiguration = {
    auth: {
        clientId: "b591252a-4f23-4936-b6ad-5638e5fddcc8",
    }
};

const pca = new PublicClientApplication(msalConfiguration);

const AppWithAuthentication = () => (
    <MsalProvider instance={pca}>
        <App />
    </MsalProvider>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWithAuthentication />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();