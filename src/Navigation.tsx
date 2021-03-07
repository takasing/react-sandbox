import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  const link = {
    color: 'white',
  }
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.itemItem}>
          <Link to="/about" style={link}>About</Link>
        </li>
        <li className={styles.item}>
          <Link to="/users" style={link}>Users</Link>
        </li>
        <li className={styles.item}>
          <Link to="/typescripts"  style={link}>Typescripts</Link>
        </li>
        <li className={styles.item}>
          <Link to="/rx"  style={link}>Rx Programming</Link>
        </li>
        <li className={styles.item}>
          <Link to="/useRef"  style={link}>useRef</Link>
        </li>
        <li className={styles.item}>
          <Link to="/wishlist"  style={link}>Mobx:WL</Link>
        </li>
        <li className={styles.item}>
          <Link to="/groups"  style={link}>Mobx:GR</Link>
        </li>
        <li className={styles.item}>
          <Link to="/hooks"  style={link}>Hooks</Link>
        </li>
        <li className={styles.item}>
          <Link to="/react-hooks-and-suspense/counter"  style={link}>RHS</Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navigation;
