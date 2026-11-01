import { useRef } from "react";
import { useScroll } from "./use-scroll"; // Your throttled hook from earlier

export default function ScrollAnalyticsComponent() {
  // 1. Silently tracks the exact pixel depth (No re-renders!)
  const currentScrollRef = useRef<number>(0);

  // 2. The Lock: Prevents us from DDoSing our own analytics server
  const hasPingedRef = useRef<boolean>(false);

  // 3. The Logic (Wrapped in your throttle hook for maximum performance)
  const throttledAnalyticsCheck = useScroll((scrollTop: number) => {
    // Update the silent observer
    currentScrollRef.current = scrollTop;

    // The Tripwire: Are we past 500px AND have we not pinged yet?
    if (currentScrollRef.current > 500 && !hasPingedRef.current) {
      console.log("🚀 [API CALL] User reached 500px scroll depth!");

      // FIRE ANALYTICS API HERE
      // fetch('/api/track', { body: JSON.stringify({ event: 'scroll_500' }) });

      // Lock the gate immediately so it never fires again for this session
      hasPingedRef.current = true;
    }
  }, 200);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    throttledAnalyticsCheck(e.currentTarget.scrollTop);
  };

  return (
    <div
      style={{ height: "400px", overflowY: "auto", border: "2px solid purple" }}
      onScroll={handleScroll}
    >
      <div style={{ height: "1500px", padding: "20px" }}>
        <h2>Keep scrolling down...</h2>
        <p>
          Keep an eye on your console. At exactly 500px, the API fires once.
        </p>
        {/* Imagine 1500px of heavy images or text here */}
      </div>
    </div>
  );
}
