import { flow, Instance, types } from "mobx-state-tree";
import { TWishListItem, WishList } from "./WishList";

export const User = types.model({
  id: types.string,
  name: types.string,
  // unionも行ける
  // gender: types.union(types.literal('m'), types.literal('f')),
  gender: types.enumeration('gender', ['m', 'f']),
  wishList: types.optional(WishList, {}),
})
.actions(self => ({
  changeName(newName: string) {
    self.name = newName;
  },
  getSuggestions: flow(function*() {
    // Unhandled Rejection (Error): [mobx-state-tree] Cannot modify 'AnonymousModel[]@/users/a342/wishList/items',
    // the object is protected and can only be modified by using an action.
    // async/awaitだと中でselfをいじれないっぽい というより1行しか実行されない？
    const res = yield fetch(`http://localhost:3001/suggestions_${self.gender}`)
    // json()はanyを返すので、assertionしておいたほうがよい
    const suggestions: TWishListItem[] = yield res.json();
    // flowだと参照できる
    self.wishList.items.push(...suggestions);
    // Property 'addSuggestions' does not exist on type
    // self.addSuggestions(...(yield res.json()))
  }),
  // addSuggestions(suggestions: TWishListItem[]) {
  //   self.wishList.items.push(...suggestions)
  // }
}));
export type TUser = Instance<typeof User>;

export const Group = types.model({
  users: types.map(User)
})
export type TGroup = Instance<typeof Group>;
