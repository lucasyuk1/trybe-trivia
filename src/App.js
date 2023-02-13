import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import './pages/game.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/Ranking" component={ Ranking } />
        <Route path="/Game" component={ Game } />
        <Route path="/Settings" component={ Settings } />
        <Route path="/Feedback" component={ Feedback } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
