import { observer } from "mobx-react";
import React, { useState } from "react";
import { TWishListItem } from "../../models/WishList";
import WishListItemEdit from "./WishListItemEdit";
import styles from "./WishList.module.css";
import { applySnapshot, clone, getSnapshot } from "mobx-state-tree";

interface Props {
  item: TWishListItem;
}
type Editing = {
  isEditing: boolean,
  clone: TWishListItem | null
}
const WishListItemView = ({ item }: Props) => {
  const [state, setState] = useState<Editing>({
    isEditing: false,
    clone: null,
  });
  const renderEditable = () => {
    // nullの扱い
    if (!state.clone) {
      return (<></>)
    }
    // cloneを渡す
    return (
      <li className={styles.item}>
        <WishListItemEdit item={state.clone} />
        <button onClick={onSaveEdit}>💾</button>
        <button onClick={onCancelEdit}>❎</button>
      </li>
    )
  }
  const onToggleEdit = () => {
    setState({
      isEditing: true,
      // cancelするため
      clone: clone(item)
    })
  }
  // 先祖返りする
  const onSaveEdit = () => {
    if (!state.clone) {
      return;
    }
    // cloneを渡して編集しているので、cloneのsnapshotをとってitemに反映
    applySnapshot(item, getSnapshot(state.clone));
    setState({
      isEditing: false,
      clone: null,
    })
  }
  const onCancelEdit = () => {
    setState({
      isEditing: false,
      clone: null,
    })
  }
  return state.isEditing ? (
    renderEditable()
  ) : (
    <li className={styles.item}>
      {item.image && <img alt={item.name} src={item.image} />}
      <h3>{item.name}</h3>
      <span>{item.price}</span>
      <span>
        <button onClick={onToggleEdit}>✏</button>
      </span>
    </li>
  );
};

// ここはsetIntervalで内部の値を直接書き換えているからか、
// observerがなくても変化する
// export default WishListItemView;
export default observer(WishListItemView);
