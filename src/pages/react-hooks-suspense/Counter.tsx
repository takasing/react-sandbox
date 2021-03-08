import React, { useEffect, useState } from 'react';

// const useCounter = ({initialState, step}: {initialState: number, step: number}) => {
//   const [count, setCount] = useState(initialState)
//   const increment = () => setCount(count => count + step)
//   return {count, increment}
// }
const useCounter = (initialState: () => number) => {
  const [count, setCount] = useState(initialState)
  const increment = () => setCount(count => count + 1);
  return {count, setCount, increment}
}

export const Counter: React.FC = () => {
  // useStateの引数にすれば毎回呼び出さなくてよくなるため
  const initialState = () => Number(window.localStorage.getItem('count') || 0);
  const { count, setCount, increment } = useCounter(initialState);
  const reset = () => {
    setCount(0)
    window.localStorage.removeItem('count')
  };
  useEffect(() => {
    window.localStorage.setItem('count', String(count));
  }, [count])
  return (
    <div>
      <button onClick={increment}>{count}</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}
