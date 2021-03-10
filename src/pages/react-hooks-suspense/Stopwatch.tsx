import React, { useEffect, useRef, useReducer } from 'react';
import { css } from '@emotion/css';

type State = {
  lapse: number,
  running: boolean
}
const reducer = (currentState: State, newState: Partial<State>) => {
  return {...currentState, ...newState}
}

const useStopwatch = () => {
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
  return {
    lapse, running, handleRunClick, handleClearClick
  }
}

export const Stopwatch: React.FC = () => {
  const sw1 = useStopwatch();
  const sw2 = useStopwatch();

  return (
    <div className={css`
      display: flex;
      justify-content: center;
      flex-direction: column;
    `}>
      <label>{sw1.lapse}ms</label>
      <div className={css`
        display: flex;
        justify-content: center;
        margin-top: 20px;
      `}>
        <button onClick={sw1.handleRunClick}>
          {/* intervalRef.currentはclearIntervalしてもundefinedにならない */}
          {/* {running ? 'Stop' : intervalRef.current ? 'Restart' : 'Start'} */}
          {sw1.running ? 'Stop' : 'Start'}
        </button>
        <button onClick={sw1.handleClearClick}>Clear</button>
      </div>
      <hr/>
      <strong>Lapse Diff</strong>
      <span>{sw1.lapse - sw2.lapse}ms</span>
      <hr/>
      <label>{sw2.lapse}ms</label>
      <div className={css`
        display: flex;
        justify-content: center;
        margin-top: 20px;
      `}>
        <button onClick={sw2.handleRunClick}>
          {/* intervalRef.currentはclearIntervalしてもundefinedにならない */}
          {/* {running ? 'Stop' : intervalRef.current ? 'Restart' : 'Start'} */}
          {sw2.running ? 'Stop' : 'Start'}
        </button>
        <button onClick={sw2.handleClearClick}>Clear</button>
      </div>
    </div>
  )
}
