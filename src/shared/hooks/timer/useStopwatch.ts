import { useState } from 'react';
import { Time } from './utils';
import { useInterval } from './useInterval';

export const useStopwatch = (
  autoStart: { autoStart: boolean },
  offsetTimestamp?: number,
) => {
  const [passedSeconds, setPassedSeconds] = useState(
    Time.getSecondsFromExpiry(offsetTimestamp, true) || 0,
  );
  const [prevTime, setPrevTime] = useState(new Date());
  const [seconds, setSeconds] = useState(
    passedSeconds + Time.getSecondsFromPrevTime(prevTime.getTime() || 0, true),
  );
  const [isRunning, setIsRunning] = useState<boolean>(autoStart.autoStart);

  useInterval(
    () => {
      setSeconds(
        passedSeconds + Time.getSecondsFromPrevTime(prevTime.getTime(), true),
      );
    },
    isRunning ? 1000 : null,
  );

  function start() {
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setIsRunning(true);
    setSeconds(
      passedSeconds + Time.getSecondsFromPrevTime(newPrevTime.getTime(), true),
    );
  }

  function pause() {
    setPassedSeconds(seconds);
    setIsRunning(false);
  }

  function reset(offset = 0, newAutoStart = true) {
    const newPassedSeconds = Time.getSecondsFromExpiry(offset, true) || 0;
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setPassedSeconds(newPassedSeconds);
    setIsRunning(newAutoStart);
    setSeconds(
      newPassedSeconds +
        Time.getSecondsFromPrevTime(newPrevTime.getTime(), true),
    );
  }

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    setPassedSeconds,
    isRunning,
  };
};
