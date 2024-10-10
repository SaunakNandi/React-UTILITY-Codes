import { useEffect, useRef, useState } from "react";
export const useThrottle = (value, delay) => {
    // console.log("Hello")
    // Step 1: Set initial state for throttled value
    const [throttledValue, setThrottledValue] = useState(value);
  
    // Step 2: Use a ref to store the last time the function was executed
    const lastExecuted = useRef(Date.now());
  
    // Step 3: Side effect using useEffect to handle throttling
    useEffect(() => {
        console.log("Hello")
      // Calculate the remaining time to wait based on the last execution time

      const handler = setTimeout(() => {
        const now = Date.now(); // Current time
        const timeElapsed = now - lastExecuted.current; // Time passed since last execution
  
        // If the time elapsed is greater than or equal to the delay, update the throttled value
        if (timeElapsed >= delay) {
          setThrottledValue(value); // Update the throttled value with the new value
          lastExecuted.current = now; // Update the last execution time to now
        }
        // Date.now() - lastExecuted.current calculates how much time has passed since the last update (i.e., the elapsed time).
      }, delay - (Date.now() - lastExecuted.current)); //This calculation determines how much time is left before the next allowed update should occur.
  
      // Cleanup function to clear the timeout
      return () => {
        clearTimeout(handler);
      };
    }, [delay, value]); // Re-run effect when delay or value changes
  
    // Return the throttled value
    return throttledValue;
  };
  