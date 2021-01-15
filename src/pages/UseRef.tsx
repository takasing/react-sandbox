import React, { useEffect, useReducer, useRef, useState } from 'react';

type Form = {
  text: string,
  length: number,
}

const UseRef: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useReducer(
    (state: Form, newState: Form) => ({...state, ...newState}),
    { text: '', length: 0 },
  );
  // const max = useRef<number>(0);
  const [history, setHistory] = useState<{
    text: string,
    length: number
  }[]>(() => {
    return JSON.parse(window.localStorage.getItem('history') || "[]")
  });
  const [max, setMax] = useState(0);
  const handleInput = (v: string) => {
    setState({ text: v, length: v.length })
  }
  const handleClick = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
    setHistory([...history, state]);
  }
  useEffect(() => {
    window.localStorage.setItem("history", JSON.stringify(history));
    // ここは通ってcurrentは更新されるっぽいが、renderされない
    // sampleだとstateの更新もセット
    // max.current = history.reduce(
    //   (memo, hist) => Math.max(memo, hist.length),
    //   0
    // );
    setMax(history.reduce(
      (memo, hist) => Math.max(memo, hist.length),
      0
    ))
  }, [history])
  return (
    <section>
      <input ref={inputRef} value={state.text} onChange={e => handleInput(e.target.value)} />
      <button onClick={handleClick} style={{marginLeft: '8px'}}>Focus</button>
      <p>max length: {max}</p>
    </section>
  )
}
export default UseRef;
