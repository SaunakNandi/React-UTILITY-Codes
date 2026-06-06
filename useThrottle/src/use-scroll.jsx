import { useCallback, useEffect, useRef } from "react";

export const useScroll = (callback, delay) => {
  const timeoutRef = useRef(null);
  const lastUpdatedTimeRef = useRef(0);
  const callbackRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallback(
    (...args) => {
      const now = new Date();
      const timeRemaining = delay - (now - lastUpdatedTimeRef.current);

      if (timeRemaining <= 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        callbackRef.current(...args);
        lastUpdatedTimeRef.current = now;
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          lastUpdatedTimeRef.current = new Date();
          callbackRef.current(...args);
          timeoutRef.current = null;
        }, timeRemaining);
      }
    },
    [delay],
  );
};
