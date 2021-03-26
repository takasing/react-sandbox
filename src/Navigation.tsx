import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';

export const listStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 0;
`
export const itemStyle = css`
  padding: 8px;
`
export const linkStyle = {
  color: 'white',
}

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className={listStyle}>
        <li className={itemStyle}>
          <Link to="/about" style={linkStyle}>About</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/users" style={linkStyle}>Users</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/typescripts"  style={linkStyle}>Typescripts</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/rx"  style={linkStyle}>Rx Programming</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/useRef"  style={linkStyle}>useRef</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/wishlist"  style={linkStyle}>Mobx:WL</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/groups"  style={linkStyle}>Mobx:GR</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/hooks"  style={linkStyle}>Hooks</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/react-hooks-and-suspense"  style={linkStyle}>RHS</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/animations" style={linkStyle}>Animations</Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navigation;
