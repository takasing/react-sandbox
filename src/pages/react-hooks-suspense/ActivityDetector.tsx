import React, { useEffect, useState } from 'react';
import activityDetector, { ActivityDetectorOptions } from 'activity-detector';

const useIdle = (options: ActivityDetectorOptions) => {
  const [isIdle, setIsIdle] = useState(false);
  useEffect(() => {
    const ad = activityDetector(options);
    ad.on('idle', () => setIsIdle(true))
    ad.on('active', () => setIsIdle(false))
    return () => ad.stop();
  }, [])
  return isIdle;
}

const ActivityDetector: React.FC = () => {
  const isIdle = useIdle({timeToIdle: 1000});
  return <div>{isIdle ? 'Are you still there?' : 'Hello there!'}</div>
}

export default ActivityDetector;
