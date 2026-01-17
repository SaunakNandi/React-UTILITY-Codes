import "./App.css";
import { ProgressBar } from "./progress-bar";
import { useScroll } from "./use-scroll";

function App() {
  const { percent } = useScroll();
  return (
    <>
      <ProgressBar value={typeof percent != "undefined" ? percent : 0} />
      <div className="content"></div>
    </>
  );
}

export default App;
