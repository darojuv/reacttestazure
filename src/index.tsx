import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MsalProvider } from '@azure/msal-react';
import { AccountInfo, AuthenticationResult, Configuration, EventType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './auth/AuthConfig';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Logout } from './components/Logout/Logout';
import { App } from './App';
import 'semantic-ui-css/semantic.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const msalInstance: IPublicClientApplication = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  var accountInfo = msalInstance.getActiveAccount();
  msalInstance.setActiveAccount(accountInfo);
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const eventPayload: AuthenticationResult = event.payload as AuthenticationResult;
      const account = eventPayload.account;
      msalInstance.setActiveAccount(account);
  }
});

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
        </Routes>
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
