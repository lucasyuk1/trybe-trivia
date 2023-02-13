import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import './pages/game.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/Game" component={ Game } />
        <Route exact path="/Settings" component={ Settings } />
        <Route exact path="/Feedback" component={ Feedback } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
