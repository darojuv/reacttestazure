import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton/SignInButton';
import { SignOutButton } from './components/SignOutButton/SignOutButton';
import { Home } from './components/Home/Home';
import { Route, Router, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { IPublicClientApplication } from '@azure/msal-browser';
import { Container, Header, Segment } from 'semantic-ui-react';
import styles from "../src/App.module.css";

export const App = () => {
  return (
      <>
        <AuthenticatedTemplate>
          <Home/>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Container>
            <Segment textAlign='center' vertical={true}>
              <SignInButton />
            </Segment>
          </Container>
        </UnauthenticatedTemplate>
      </>
  );
}
