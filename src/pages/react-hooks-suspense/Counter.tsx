import React, { useReducer, useState } from 'react';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)
  const incrementCount = () => setCount(currentCount => currentCount + 1)
  return (
    <button onClick={incrementCount}>{count}</button>
  )
}
