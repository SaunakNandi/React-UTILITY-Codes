import { useState } from "react";
import Stopwatch from "./Stopwatch";

const StopWatchList = () => {
  const [stopwatch, setStopwatch] = useState([0]);
  function handleAdd() {
    // inserting length in stopwatch array
    setStopwatch((prev) => [...prev, prev.length]);
  }
  return (
    <div>
      {stopwatch.map((_, index) => (
        <Stopwatch key={index} handleAdd={handleAdd} />
      ))}
    </div>
  );
};

export default StopWatchList;
