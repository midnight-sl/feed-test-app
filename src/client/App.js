import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import FeedPage from './components/FeedPage';
import ProceedToLogIn from './components/ProceedToLogIn';

import './styles/app.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <LoginPage />
        </Route>

        <Route path="/feed">
          <FeedPage />
        </Route>

        <Route path="/">
          <ProceedToLogIn />
        </Route>
      </Switch>
    </Router>
  );
}
