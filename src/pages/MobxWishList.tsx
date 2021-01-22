import React from "react";
import WishListView from "./wishlist/WishListView";
import { TWishList, WishList } from "../models/WishList";
import { onSnapshot } from "mobx-state-tree";

let initialState = {
  items: [
    {
      name: "LEGO Mindstorms EV3",
      price: 349.95,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg",
    },
    {
      name: "Miracles - C.S. Lewis",
      price: 12.91,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51a7xaMpneL._SX329_BO1,204,203,200_.jpg",
    },
  ],
}
const storeKey = 'wishlistapp';
const stored = localStorage.getItem(storeKey);
// if (localStorage.getItem('wishlistapp')) {
if (stored) {
  // なんでtype guard効かないの？
  // => localStorage.getItemの結果が次回実行時まで同じとは限らないので
  // Type 'null' is not assignable to type 'string'.
  // const json = JSON.parse(localStorage.getItem(storeKey));
  const json = JSON.parse(stored);
  // もしlocalStorageに入っているものがあれば優先するという実装
  if (WishList.is(json)) initialState = json as TWishList;
}

const wishList = WishList.create(initialState);
onSnapshot(wishList, snapshot => {
  localStorage.setItem(storeKey, JSON.stringify(snapshot));
})

const MobxWishList: React.FC = () => {
  setInterval(() => {
    wishList.items[0].changePrice(wishList.items[0].price + 1);
    // 下でeditしてもここは変わらない
    // console.log('wishList', wishList.items[0].name);
  }, 10000);
  return (
    <section>
      <WishListView wishList={wishList}></WishListView>
      <button onClick={() => localStorage.removeItem(storeKey)}>🆑</button>
    </section>
  );
};

export default MobxWishList;
