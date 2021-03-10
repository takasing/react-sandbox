import { css } from '@emotion/css';
import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

const rootStyle = css`
  height: 150px;
  background-color: red;
  background-image: -webkit-linear-gradient(315deg, #ff00ba 0%, #fae713 100%);
  background-image: linear-gradient(135deg, #ff00ba 0%, #fae713 100%);
  transform-style: preserve-3d;
  will-change: transform;
`

const childStyle = css`
  position: absolute;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translateZ(30px) translateX(-50%) translateY(-50%);
  box-shadow: 0 0 50px 0 rgba(51, 51, 51, 0.3);
  background-color: white;
  color: #282c34;
`

const Tilt: React.FC = (props) => {
  const tiltRef = useRef<any>();
  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5
    })
  }, []) // no deps means render only a time for the component
  return (
    <div ref={tiltRef} className={rootStyle}>
      <div className={childStyle}>{props.children}</div>
    </div>
  )
}
export default Tilt;
