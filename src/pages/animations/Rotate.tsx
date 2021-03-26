import { css } from '@emotion/css';
import React from 'react';
import {ReactComponent as Logo} from '../../logo.svg';
const style = css`
  max-width: 200px;
  margin-bottom: 10px;
  transition: transform 0.6s;
`
const rotate90 = css`
  ${style}
  &:hover {
    transform: rotate(90deg)
  }
`
const rotateMinus180 = css`
  ${style}
  &:hover {
    transform: rotate(-180deg)
  }
`
const rotateX = css`
  ${style}
  &:hover {
    transform: rotateX(180deg)
  }
`
const rotateY = css`
  ${style}
  &:hover {
    transform: rotateY(180deg)
  }
`
export const Rotate: React.FC = () => {
  // useStateの引数にすれば毎回呼び出さなくてよくなるため
  return (
    <div>
      <div><Logo className={rotate90}/></div>
      <div><Logo className={rotateMinus180}/></div>
      <div><Logo className={rotateX}/></div>
      <div><Logo className={rotateY}/></div>
    </div>
  )
}
