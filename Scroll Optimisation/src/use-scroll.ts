import { useCallback, useEffect, useRef } from "react";

export const useScroll = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  const timeoutRef = useRef<number | null>(null);
  const lastUpdatedRef = useRef(0);
  const callbackRef = useRef<(...args: T) => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [callback]);

  return useCallback(
    (...args: T) => {
      const now = Date.now();
      const timeRemaining = delay - (now - lastUpdatedRef.current);

      if (timeRemaining <= 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        callbackRef.current(...args);
        lastUpdatedRef.current = now;
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          callbackRef.current(...args);
          lastUpdatedRef.current = Date.now();
        }, timeRemaining);
      }
    },
    [delay],
  );
};
