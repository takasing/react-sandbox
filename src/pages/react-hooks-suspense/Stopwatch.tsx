import React, { useEffect, useRef, useReducer } from 'react';
import { css } from '@emotion/css';

type State = {
  lapse: number,
  running: boolean
}
type ActionLapse = {
  type: 'LAPSE'
  now: number,
  startTime: number,
}
type ActionToggleRunning = {
  type: 'TOGGLE_RUNNING'
}
type ActionClear = {
  type: 'CLEAR'
}
type Actions = ActionLapse | ActionToggleRunning | ActionClear
const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'LAPSE':
      return {
        ...state,
        lapse: action.now - action.startTime,
      }
    case 'TOGGLE_RUNNING':
      return {
        ...state,
        running: !state.running
      }
    case 'CLEAR':
      return {
        lapse: 0,
        running: false
      }
    default:
      return state;
  }
}

export const Stopwatch: React.FC = () => {
  const [{lapse, running}, dispatch] = useReducer(reducer, {
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
        dispatch({type: 'LAPSE', now: Date.now(), startTime: startTime })
      }, 0)
    }
    dispatch({type: 'TOGGLE_RUNNING'})
  }

  const handleClearClick = () => {
    clearCurrentInterval()
    dispatch({type: 'CLEAR'})
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
