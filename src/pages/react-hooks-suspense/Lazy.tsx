import React, { Suspense, useState } from 'react';
const Tilt = React.lazy(() => import('./Tilt'));

const useToggle = (init = false): [boolean, () => void] => {
  const [on, setOn] = useState(init);
  const toggle = () => setOn(!on);
  return [on, toggle];
}

const Lazy: React.FC = () => {
  const [showTilt, toggleTilt] = useToggle();
  return (
    <div>
      <label>
        show tilt
        <input type="checkbox" checked={showTilt} onChange={toggleTilt}/>
      </label>
      <div>
        {showTilt ? (
          <Suspense fallback={<div>loading...</div>}>
            <Tilt>
              <div>vanilla-tilt.js</div>
            </Tilt>
          </Suspense>
        ): null}
      </div>
    </div>
  )
}

export default Lazy;
