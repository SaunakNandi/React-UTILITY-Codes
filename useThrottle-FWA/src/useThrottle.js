import React, { useEffect, useRef, useState } from "react";

export const useThrottle = (value, delay = 2000) => {
  const [throttledValue, setThrottledValue] = useState(0);
  const timeRef = useRef(false);
  useEffect(() => {
    if (timeRef.current) {
      setThrottledValue(value);
      timeRef.current = false;
    }
    setTimeout(() => {
      timeRef.current = true;
    }, delay);
  }, [value, delay]);
  return throttledValue;
};
