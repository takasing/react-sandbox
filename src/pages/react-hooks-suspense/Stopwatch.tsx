import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';

export const Stopwatch: React.FC = () => {
  const [lapse, setLapse] = useState(0)
  const [running, setRunning] = useState(false)
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
        setLapse(Date.now() - startTime);
      }, 0)
    }
    setRunning(!running)
  }

  const handleClearClick = () => {
    clearCurrentInterval()
    setLapse(0)
    setRunning(false);
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
