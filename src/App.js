import React from 'react';
import { Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import {ProfileProvider} from './context/profile.context'
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';


function App() {
  return (
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
    
  );
}

export default App;
