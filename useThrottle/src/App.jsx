import { useEffect, useState } from 'react'
import { useThrottle } from './useThrottle'
import './App.css'

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Throttle the scroll position with a delay of 300ms
  const throttledScrollPosition = useThrottle(scrollPosition, 1000);

  // Handle the scroll event and update the scroll position
  const handleScroll = () => {
    const position = window.scrollY; // Get the vertical scroll position
    setScrollPosition(position); // Set the scroll position in state
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ height: '200vh', padding: '20px' }}>
      {/* Output the throttled scroll position */}
      <h1 style={{position:'fixed'}}>Throttled Scroll Position: {Math.round(throttledScrollPosition)}px</h1>
    </div>
  );
}

export default App
