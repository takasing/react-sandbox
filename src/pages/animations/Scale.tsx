import { css } from '@emotion/css';
import React from 'react';
import {ReactComponent as Logo} from '../../logo.svg';
const style = css`
  max-width: 200px;
  margin-bottom: 10px;
`
const scale2 = css`
  ${style};
  transform: scale(2)
`
const scaleX = css`
  ${style};
  transform: scaleX(0.5)
`
const scaleY = css`
  ${style};
  transform: scaleY(0.5)
`
const scaleBoth = css`
  ${style};
  transform: scale(0.8, 0.5)
`
export const Scale: React.FC = () => {
  // useStateの引数にすれば毎回呼び出さなくてよくなるため
  return (
    <div>
      <div><Logo className={style}/></div>
      <div><Logo className={scale2}/></div>
      <div><Logo className={scaleX}/></div>
      <div><Logo className={scaleY}/></div>
      <div><Logo className={scaleBoth}/></div>
    </div>
  )
}
