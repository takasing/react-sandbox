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

const Navigation: React.FC = () => {
  const link = {
    color: 'white',
  }
  return (
    <nav>
      <ul className={listStyle}>
        <li className={itemStyle}>
          <Link to="/about" style={link}>About</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/users" style={link}>Users</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/typescripts"  style={link}>Typescripts</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/rx"  style={link}>Rx Programming</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/useRef"  style={link}>useRef</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/wishlist"  style={link}>Mobx:WL</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/groups"  style={link}>Mobx:GR</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/hooks"  style={link}>Hooks</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/react-hooks-and-suspense"  style={link}>RHS</Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navigation;
