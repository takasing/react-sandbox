import { Instance, types } from 'mobx-state-tree';

// types.modelで吐き出した型と合わなくなるのでこれだとだめ
// export type TWishListItem = {
//   name: string,
//   price: number,
//   image?: string,
// }
export const WishListItem = types.model({
  name: types.string,
  price: types.number,
  image: types.optional(types.string, ''),
}).actions(self => ({
  changeName(newName: string) {
    self.name = newName;
  },
  changePrice(newPrice: number) {
    self.price = newPrice;
  },
  changeImage(newImage: string) {
    self.image = newImage;
  }
}))
export type TWishListItem = Instance<typeof WishListItem>;

// export type TWishList = {
//   items: TWishListItem[],
//   totalPrice(): number;
// }
export const WishList = types.model({
  items: types.optional(types.array(WishListItem), []),
})
.actions(self => ({
  add(item: TWishListItem) {
    self.items.push(item);
  }
}))
.views(self => ({
  get totalPrice() {
    return self.items.reduce((sum, entry) => sum + entry.price, 0);
  }
}));
export type TWishList = Instance<typeof WishList>;
