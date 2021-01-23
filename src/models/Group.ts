import { flow, IAnyModelType, Instance, types } from "mobx-state-tree";
import { TWishListItem, WishList } from "./WishList";
import { random } from '../util/RandomUtil';

// User: anyになっていて、コンパイラに殺される
// assertionつけたいけど循環参照で無理
export const User = types.model({
  id: types.identifier,
  name: types.string,
  // unionも行ける
  // gender: types.union(types.literal('m'), types.literal('f')),
  gender: types.enumeration('gender', ['m', 'f']),
  wishList: types.optional(WishList, {}),
  // 循環参照で怒られる
  // recipient: types.maybe(types.reference(types.late(() => User)))
  // https://mobx-state-tree.js.org/tips/circular-deps
  recipient: types.maybe(types.reference(types.late((): IAnyModelType => User)))
})
.named('User')
.actions(self => ({
  changeName(newName: string) {
    self.name = newName;
  },
  // Failed to resolve reference 'a343' to type 'late(() => User)' (from node: /recipient)
  // self reference modelでactionでself reference modelを割り当てられない。。。
  // やり方はありそう
  // assignRecipient(user: any) {
  //   self.recipient = user;
  // },
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
// maybe: optional and nullable
// 循環参照である設計自体が問題だと思って切り離したらコンパイル突破できるけど、
// recipientにassignできなくて詰んだ
// const Recipient = types.maybe(types.reference(User));
// const UserEx = User.props({
//   recipient: Recipient,
// });
// userがoptionalになるっぽい
// const UserEx = types.union(User, Recipient);
export type TUser = Instance<typeof User>;
// export type TUserEX = Instance<typeof UserEx>

export const Group = types.model({
  users: types.map(User)
})
.actions(self => ({
  // くじを引くという意味
  drawLots() {
    const allUsers = Array.from(self.users.values());
    if (allUsers.length < 1) return;
    // ???
    let remaining = allUsers.slice();

    allUsers.forEach(user => {
      // 最後の一人は誰かと入れ替える
      if (remaining.length === 1 && remaining[0] === user) {
        const swapWith = allUsers[random(allUsers.length - 1)];
        user.recipient = swapWith.recipient;
      } else {
        while (!user.recipient) {
          const recipientIdx = random(remaining.length);
          if (remaining[recipientIdx] !== user) {
            // Error: [mobx-state-tree] Error while converting <User@/users/65aa(id: 65aa)> to `(reference(User) | undefined)`:
            // => types.late((): IAnyModelType => User)で通った
            user.recipient = remaining[recipientIdx];
            remaining.splice(recipientIdx, 1);
          }
        }
      }
    })
  }
}))
export type TGroup = Instance<typeof Group>;
