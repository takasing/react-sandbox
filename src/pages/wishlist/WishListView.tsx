import { observer } from 'mobx-react';
import React from 'react';
import { TWishList } from '../../models/WishList';
import WishListItemView from './WishListItemView';
import styles from './WishList.module.css';
import WishListItemEntry from './WishListItemEntry';

interface Props {
  wishList: TWishList,
}
const WishListView = ({wishList}: Props) => (
  <div className={styles.list}>
    <ul className={styles.listWrapper}>{wishList.items.map((item, i) => (
      <WishListItemView key={i} item={item} />
    ))}</ul>
    Total: {wishList.totalPrice} €
    <WishListItemEntry wishList={wishList} />
  </div>
)

// ここだけobserverをとると、totalが変化しなくなる
// 多分modelでviewsとして付け加えているからでは
// export default WishListView;
export default observer(WishListView);
