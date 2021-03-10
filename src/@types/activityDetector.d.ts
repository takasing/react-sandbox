declare module 'activity-detector' {
  export interface ActivityDetectorOptions {
    timeToIdle: number;
  }
  interface ActivityDetector {
    on(eventName: 'active'|'idle', listener: (...args) => any);
    stop(): void;
  }
  export default function activityDetector(options: ActivityDetectorOptions): ActivityDetector;
}
