import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Game from './pages/game';
import Settings from './pages/settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
