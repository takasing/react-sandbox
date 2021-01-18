import { reaction } from "mobx";
import { getSnapshot, onPatch, onSnapshot } from "mobx-state-tree";
import { WishList, WishListItem } from "./WishList";

it("can create a instance of model", () => {
  const item = WishListItem.create({
    name: "Model name",
    price: 28.73,
    image:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
  });
  expect(item.price).toBe(28.73);
  expect(item.image).toBe(
    "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
  );
  item.changeName("Natalie");
  expect(item.name).toBe("Natalie");
});

it("can create a wishlist", () => {
  const list = WishList.create({
    items: [
      {
        name: "Model name",
        price: 28.73,
        image:
          "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
      },
    ],
  });
  expect(list.items.length).toBe(1);
  expect(list.items[0].name).toBe("Model name");
});

it("can add item", () => {
  const list = WishList.create();
  // list.add(WishListItem.create({
  //   name: 'Chesterton',
  //   price: 10,
  // }));

  // 状態遷移を保持するもの
  const states = [];

  // 新しいsnapshotの作成をlistenしているらしい
  // なので2回実行される
  // てことは対象のオブジェクトが変更されるたびsnapshotされる？
  // => オブジェクト変更されるたびstatesを更新してテストする
  onSnapshot(list, (snapshot) => {
    // listは追加後のもの(なのでname:Chesterton, length:1)
    // console.log(JSON.stringify(list), snapshot, states);
    // 状態遷移を保存しておく
    states.push(snapshot);
  });
  // createしなくてもmobxがやってくれるっぽい
  list.add({
    name: "Chesterton",
    price: 10,
  });
  // console.log('add'); // 1回目のonSnapshotの後に実行されている => 1度目のsnapshot作成
  expect(list.items.length).toBe(1);
  expect(list.items[0].name).toBe("Chesterton");
  list.items[0].changeName("Chesterton jr.");
  expect(list.items[0].name).toBe("Chesterton jr.");

  // snapshotはcommitすべしとのこと
  // snapshotを作って、古いsnapshotと比較する
  // 失敗したらバグを修正もしくはsnapshotを更新する
  expect(getSnapshot(list)).toMatchSnapshot();

  // 2つ目のsnapshot testing
  expect(states).toMatchSnapshot();
});

it("can add item checking by patching", () => {
  const list = WishList.create();
  // 差分を保持する用
  const patches = [];
  onPatch(list, (patch) => {
    patches.push(patch);
  });

  // op: 'add'
  list.add({
    name: "Chesterton",
    price: 10,
  });
  // op: 'replace'
  list.items[0].changeName("Chesterton jr.");

  // 差分の変更をsnapshotにしておき、それをテスト
  expect(patches).toMatchSnapshot();
});

it("can calculate the total price of a wishlist", () => {
  const list = WishList.create({
    items: [
      {
        name: "Machine Gun Preacher",
        price: 7.35,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/91AFFK9fwkL._SY445_.jpg",
      },
      {
        name: "LEGO Mindstorms EV3",
        price: 349.95,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg",
      },
    ],
  });

  expect(list.totalPrice).toBe(7.35+349.95);
  let changed = 0;
  // reactでdata functionにreactしてeffect functionを実行し
  // side effectを発動できる
  reaction(() => list.totalPrice, () => changed++);

  expect(changed).toBe(0);
  list.items[0].changeName('Test');
  // nameを変えてもreactしない
  expect(changed).toBe(0);
  list.items[0].changePrice(140);
  expect(changed).toBe(1);
});
