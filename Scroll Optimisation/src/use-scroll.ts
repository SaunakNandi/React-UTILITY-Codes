import { useCallback, useEffect, useRef } from "react";

type GenericCallback = (...args: []) => void;
export const useScroll = (callback, delay) => {
  const timeoutRef = useRef(null);
  const lastUpdatedRef = useRef(0);
  const callbackRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [callback]);

  return useCallback(
    (...args) => {
      const now = new Date();
      const timeRemaining = delay - (now - lastUpdatedRef.current);

      if (timeRemaining <= 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        callbackRef.current(...args);
        lastUpdatedRef.current = now;
      } else if (!timeoutRef.current) {
        setTimeout(() => {
          timeoutRef.current = null;
          callbackRef.current(...args);
          lastUpdatedRef.current == new Date();
        }, timeRemaining);
      }
    },
    [delay],
  );
};
