import { observer } from 'mobx-react';
import React from 'react';
import { TWishList } from '../../models/WishList';
import WishListItemView from './WishListItemView';
import styles from './WishList.module.css';

interface Props {
  wishList: TWishList,
}
const WishListView = ({wishList}: Props) => (
  <div className={styles.list}>
    <ul>{wishList.items.map((item, i) => (
      <WishListItemView key={i} item={item} />
    ))}</ul>
    Total: {wishList.totalPrice} €
  </div>
)

// ここだけobserverをとると、totalが変化しなくなる
// 多分modelでviewsとして付け加えているからでは
// export default WishListView;
export default observer(WishListView);
