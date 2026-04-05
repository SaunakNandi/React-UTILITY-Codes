import { useEffect, useState } from "react";

import "./App.css";
import { Progresspro } from "./component/progress/Progress-pro";

function App() {
  const [value, setValue] = useState(10);

  useEffect(() => {
    let id = setInterval(() => {
      setValue((prev) => prev + 1);
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <>
      {/* <ProgressBar value={value} max={100} onStart={onStart} onComplete={onComplete}/> */}
      <Progresspro value={value} max={100} />
    </>
  );
}

export default App;
