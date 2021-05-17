import React from 'react';
import { Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import {ProfileProvider} from './context/profile.context'
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home/index';
import PublicRoute from './components/PublicRoute';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    <ErrorBoundary>

      <ProfileProvider>
      <Switch>
      <PublicRoute path ="/signin"> 
        <SignIn/>
      </PublicRoute>
      <PrivateRoute path="/" >
        <Home/>
      </PrivateRoute>
      </Switch>
      </ProfileProvider>
    </ErrorBoundary>
    
    
  );
}

export default App;
