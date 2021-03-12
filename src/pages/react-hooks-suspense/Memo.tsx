import React, { Dispatch, SetStateAction, useState } from "react";

// type UpperProps = {
//   content: string
// }
// React.memoでComponentを再利用する
// const Upper: React.FC<UpperProps> = React.memo(({content}: UpperProps) => {
const Upper: React.FC = React.memo(({children}) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      Uppercase version: {typeof children === 'string' && children.toUpperCase()}{' '}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
})

// useState書いたら何故か2回renderされている => React.StrictMode
// developmentだけ
// https://stackoverflow.com/questions/54927622/usestate-do-double-render
const Memo: React.FC = () => {
  const [first, setFirstName] = useState('')
  const [last, setLastName] = useState('')
  const setValue = (dispatch: Dispatch<SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(e.target.value);
  return (
    <div>
      <label htmlFor="first-name-input">First Name</label>
      <input
        id="first-name-input"
        onChange={setValue(setFirstName)}
      />
      <Upper>{first}</Upper>
      <hr />
      <label htmlFor="last-name-input">Last Name</label>
      <input id="last-name-input" onChange={setValue(setLastName)} />
      <Upper>{last}</Upper>
    </div>
  )
}
export default Memo;
