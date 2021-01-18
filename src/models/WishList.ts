import { ISimpleType, types } from 'mobx-state-tree';

type TWishListItem = {
  name: string,
  price: number,
  image?: string,
}
export const WishListItem = types.model({
  name: types.string,
  price: types.number,
  image: "",
}).actions(self => ({
  changeName(newName: string) {
    self.name = newName;
  }
}))

export const WishList = types.model({
  items: types.optional(types.array(WishListItem), []),
}).actions(self => ({
  add(item: TWishListItem) {
    self.items.push(item);
  }
}))