import "./App.css";
import SelectableGrid from "./SelectableGrid";

function App() {
  return (
    <>
      <h1>Selectable Grid</h1>
      <SelectableGrid row={15} column={15} />
    </>
  );
}

export default App;
