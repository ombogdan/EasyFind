import { useEffect, useRef } from 'react';

export const useInterval = (callback: any, delay: number | null) => {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!delay) {
      return () => {};
    }

    const interval = setInterval(() => {
      // @ts-ignore
      // eslint-disable-next-line no-unused-expressions
      callbackRef.current && callbackRef.current();
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);
};
