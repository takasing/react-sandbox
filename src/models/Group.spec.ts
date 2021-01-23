import { getSnapshot, onSnapshot } from "mobx-state-tree";
import { User } from "./Group"

it('can create User', () => {
  const user = User.create({
    id: 'a342',
    name: 'Homer',
    gender: 'm',
  });
  const states = [];
  onSnapshot(user, snapshot => {
    states.push(snapshot);
  });

  expect(states.length).toBe(0);
  expect(user.name).toBe('Homer');
  user.changeName('Home alone');
  expect(states.length).toBe(1);
  expect(user.name).toBe('Home alone');
  expect(getSnapshot(user)).toMatchSnapshot();
  expect(states).toMatchSnapshot();

  // Cannot modify 'User@<root>(id: a342)', the object is protected and can only be modified by using an action
  // user.recipient = User.create({
  //   id: 'a343',
  //   name: 'Hoder',
  //   gender: 'f',
  // });
  // expect(states.length).toBe(2);
  // expect(user.recipient.name).toBe('Hoder');
  // expect(getSnapshot(user)).toMatchSnapshot();
  // expect(states).toMatchSnapshot();
})

