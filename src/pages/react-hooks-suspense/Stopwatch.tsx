import React, { useEffect, useRef, useReducer } from 'react';
import { css } from '@emotion/css';

type State = {
  lapse: number,
  running: boolean
}
const reducer = (currentState: State, newState: Partial<State>) => {
  return {...currentState, ...newState}
}

export const Stopwatch: React.FC = () => {
  const [{lapse, running}, setState] = useReducer(reducer, {
    lapse: 0,
    running: false
  });
  const intervalRef = useRef<NodeJS.Timeout|undefined>();

  const clearCurrentInterval = () => {
    intervalRef.current && global.clearInterval(intervalRef.current)
  }

  useEffect(() => {
    return () => clearCurrentInterval()
  }, [])

  const handleRunClick = () => {
    if (running) {
      clearCurrentInterval()
    } else {
      const startTime = Date.now() - lapse;
      intervalRef.current = setInterval(() => {
        setState({lapse: Date.now() - startTime })
      }, 0)
    }
    setState({running: !running})
  }

  const handleClearClick = () => {
    clearCurrentInterval()
    setState({lapse: 0, running: false})
  }

  return (
    <div className={css`
      display: flex;
      justify-content: center;
      flex-direction: column;
    `}>
      <label>{lapse}</label>
      <div className={css`
        display: flex;
        justify-content: center;
        margin-top: 20px;
      `}>
        <button onClick={handleRunClick}>
          {/* intervalRef.currentはclearIntervalしてもundefinedにならない */}
          {/* {running ? 'Stop' : intervalRef.current ? 'Restart' : 'Start'} */}
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleClearClick}>Clear</button>
      </div>
    </div>
  )
}
