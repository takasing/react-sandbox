import { onSnapshot } from "mobx-state-tree";
import React, { useState } from "react";
import { Group } from '../models/Group';
import WishListView from "./wishlist/WishListView";

const initialState = {
  users: {
      a342: {
          id: "a342",
          name: "Homer",
          gender: "m" as const
      },
      "5fc2": {
          id: "5fc2",
          name: "Marge",
          gender: "f" as const
      },
      "663b": {
          id: "663b",
          name: "Bart",
          gender: "m" as const
      },
      "65aa": {
          id: "65aa",
          name: "Maggie",
          gender: "f" as const
      },
      ba32: {
          id: "ba32",
          name: "Lisa",
          gender: "f" as const
      }
  }
}
interface State {
  selectedUser: string | null
}
// これをFCの中に入れると毎回初期化されてしまって死ぬ
// => だからMobxWishListだとlocalStorageなのか！
// 実際はstoreは別ファイルだったり親コンポーネントが持つので問題ないはず
const group = Group.create(initialState);
const MobxGroups: React.FC = () => {
  onSnapshot(group, snapshot => {
    // ここには来るし、snapshot内ではwishListが追加されている
    console.log('taken snapshot!');
  })
  const [state, setState] = useState<State>({
    // map系のmethodがcallできない... entries()とか
    // as constのせい？
    // selectedUser: initialState.users["5fc2"].id,
    selectedUser: group.users.entries().next().value[0],
  });
  if (!state.selectedUser) {
    return <section>no selected user</section>
  }
  // selectedUser.getSuggestionsを実行してもここを通らない
  // => userを選択し直すとwishListが消えてる => Group.createをFC外で！
  const selectedUser = group.users.get(state.selectedUser);
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({selectedUser: e.target.value});
  }
  return (
    <section>
      <select value={state.selectedUser} onChange={onChange}>
        <option>- Select user -</option>
        {Array.from(group.users.values()).map(u => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>
      {selectedUser && <WishListView wishList={selectedUser.wishList} />}
      {selectedUser && <button onClick={selectedUser.getSuggestions}>Suggestions</button>}
    </section>
  );
};

export default MobxGroups;
