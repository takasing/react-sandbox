import React from 'react';
import logo from './logo.svg';
import Routing from './Routing';

const Header: React.FC = props => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <Routing></Routing>
      </div>
    </header>
  )
}
export default Header;
