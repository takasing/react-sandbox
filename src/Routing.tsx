import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigation from './Navigation';
import { Typescripts } from './pages/Typescripts';
import Reactive from './pages/Reactive';
import UseRef from './pages/UseRef';
import MobxWishList from './pages/MobxWishList';
import MobxGroups from './pages/MobxGroups';
import { Hooks } from './pages/ReactHooks';
import ReactHooksSuspense from './pages/react-hooks-suspense';
import Animations from './pages/animations';

const About = () => {
  return <h2>About</h2>;
}

const Users = () => {
  return <h2>Users</h2>;
}

const Routing: React.FC = () => {
  return (
    <Router>
      <div>
        <Navigation></Navigation>

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about"><About /></Route>
          <Route path="/users"><Users /></Route>
          <Route path="/typescripts"><Typescripts/></Route>
          <Route path="/rx"><Reactive /></Route>
          <Route path="/useRef"><UseRef /></Route>
          <Route path="/wishList"><MobxWishList /></Route>
          <Route path="/groups"><MobxGroups /></Route>
          <Route path="/hooks"><Hooks /></Route>
          <Route path="/react-hooks-and-suspense"><ReactHooksSuspense /></Route>
          <Route path="/animations"><Animations /></Route>
        </Switch>
      </div>
    </Router>
  )
}
export default Routing;
