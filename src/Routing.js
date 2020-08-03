import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Typescripts } from './typescripts/Typescripts';

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default function Routing() {
  const link = {
    color: 'white',
  }
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/about" style={link}>About</Link>
            </li>
            <li>
              <Link to="/users" style={link}>Users</Link>
            </li>
            <li>
              <Link to="/typescripts"  style={link}>Typescripts</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about"><About /></Route>
          <Route path="/users"><Users /></Route>
          <Route path="/typescripts"><Typescripts/></Route>
        </Switch>
      </div>
    </Router>
  )
}
