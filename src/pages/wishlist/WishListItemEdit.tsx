import React from 'react';
import { observer } from 'mobx-react';
import { TWishListItem } from '../../models/WishList';
import styles from './WishList.module.css';

interface Props {
  item: TWishListItem,
}
const WishListItemEdit: React.FC<Props> = ({item}: Props) => {
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    item.changeName(e.target.value);
  }
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value);
    if (!isNaN(price)) item.changePrice(price);
  }
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    item.changeImage(e.target.value);
  }
  // どうやら直接変更されてそう
  return (
    <div className={styles.itemEdit}>
      Thing: <input value={item.name} onChange={onChangeName} />
      <br/>
      Price: <input value={item.price} onChange={onChangePrice} />
      <br/>
      Image: <input value={item.image} onChange={onChangeImage} />
      <br/>
    </div>
  );
}
// observerをつけないとinputの内容が変更できない
// export default WishListItemEdit;
export default observer(WishListItemEdit);
