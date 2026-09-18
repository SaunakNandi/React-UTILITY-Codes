import { useState } from "react";
import "./App.css";
import { useScroll } from "./use-scroll";

function App() {
  const [scroll, setScroll] = useState<number>(0);
  const throttledScroll = useScroll((scrollNumber: number) => {
    console.log("scroll value ", scrollNumber);
    setScroll(scrollNumber || 0);
  }, 700);
  const onDivScroll = (e: React.UIEvent<HTMLDivElement>) => {
    throttledScroll(e.currentTarget.scrollTop);
  };
  return (
    <div
      onScroll={onDivScroll}
      style={{ height: "200px", overflowY: "auto", border: "1px solid #ccc" }}
    >
      <div style={{ height: "600px" }}>Keep scrolling down... ⬇️ {scroll}</div>
    </div>
  );
}

export default App;
