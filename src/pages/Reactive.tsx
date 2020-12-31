import React from 'react';
import { interval } from 'rxjs';
import { useEventCallback, useObservable } from 'rxjs-hooks';
import { map } from 'rxjs/operators';
import {
  increment,
  delay2s,
  stack,
  keydowns,
} from '../logic/TaskProgressService';

// start is null
const threeTimes = () => interval(3000).pipe(map(v => v * 3))

const Reactive: React.FC = () => {
  const [clickCallback, count] = useEventCallback(increment, 0);
  const [mapCallback, mapped] = useEventCallback(delay2s, 'nothing');
  const [stackCallback, stacked] = useEventCallback(stack, 0);
  const threeTimed = useObservable(threeTimes);
  const keydowned = useObservable<string[]>(keydowns, []);
  return (
    <div>
      <div>
        <p>{`incremental count: ${count}`}</p>
        <button onClick={clickCallback}>increment</button>
      </div>
      <div>
        <p>{`mapped: ${mapped}`}</p>
        <button onClick={mapCallback}>map</button>
      </div>
      <div>
        <p>{`stacked: ${stacked}`}</p>
        <button onClick={stackCallback}>stack</button>
      </div>
      <div>
        <p>{`3 times: ${threeTimed}`}</p>
      </div>
      <div>
        <p>{`keydowned: ${keydowned}`}</p>
      </div>
    </div>
  )
}
export default Reactive;
