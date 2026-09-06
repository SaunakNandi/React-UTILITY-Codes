import "./App.css";
import { Checkbox } from "./checkbox";
import { dataObj } from "./data";
import { useProcessCheckboxes } from "./use-process-checkboxes";

function App() {
  const { onToggle, nodes } = useProcessCheckboxes(dataObj);
  const rootIds = Object.keys(dataObj)
    .filter((id) => dataObj[id].parentId === null)
    .map((id) => id);
  return (
    <div style={{ width: "100vw", height: "100vh", padding: "20px" }}>
      {rootIds.map((ids) => (
        <Checkbox key={ids} onToggle={onToggle} node={nodes} nodeId={ids} />
      ))}
    </div>
  );
}

export default App;
