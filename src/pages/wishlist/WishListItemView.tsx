import { observer } from 'mobx-react';
import React from 'react';
import { TWishListItem } from '../../models/WishList';
import styles from './WishListItemView.module.css';

interface Props {
  item: TWishListItem,
}
const WishListItemView = ({item}: Props) => (
  <li className={styles.item}>
    {item.image && <img alt={item.name} src={item.image} />}
    <h3>{item.name}</h3>
    <span>{item.price}</span>
  </li>
)

// ここはsetIntervalで内部の値を直接書き換えているからか、
// observerがなくても変化する
// export default WishListItemView;
export default observer(WishListItemView);
