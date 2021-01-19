import React, { useState } from 'react';
import { TWishList, WishListItem } from '../../models/WishList';
import WishListItemEdit from './WishListItemEdit';
import styles from './WishList.module.css';

interface Props {
  wishList: TWishList,
}
const WishListItemEntry: React.FC<Props> = ({wishList}: Props) => {
  const initialState = () => {
    return {
      entry: WishListItem.create({
        name: '',
        price: 0,
      })
    }
  }
  const [state, setState] = useState(initialState());
  const onAdd = () => {
    wishList.add(state.entry);
    setState(initialState())
  }
  return (
    <div className={styles.item}>
      <WishListItemEdit item={state.entry} />
      <button onClick={onAdd}>💾</button>
    </div>
  );
}
export default WishListItemEntry;
