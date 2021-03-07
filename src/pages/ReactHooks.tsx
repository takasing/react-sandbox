import React, { useReducer } from 'react';
import { random } from '../util/RandomUtil';

type State = {
  name: string,
  count: number,
}
type Actions =
  | { type: 'A', payload: string }
  | { type: 'B', payload: number };
const Reducer: React.Reducer<State, Actions> = (state, action) => {
  switch(action.type) {
    case 'A':
      return {
        ...state,
        name: action.payload,
      }
    case 'B':
      return {
        ...state,
        count: action.payload,
      }
  }
}
export const Hooks: React.FC = () => {
  const [state, dispatch] = useReducer(Reducer, {name: '', count: 0});
  return (
    <div>
      <p>{state.name}, {state.count}</p>
      <button onClick={() => dispatch({type: 'A', payload: Math.random().toString(36).slice(-8)})}>changeName</button>
      <button onClick={() => dispatch({type: 'B', payload: random(100)})}>count</button>
    </div>
  )
}
