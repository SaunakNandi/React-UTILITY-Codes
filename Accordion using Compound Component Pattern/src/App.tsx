import { Accordion } from "./accodion-context";
import "./App.css";

function App() {
  return (
    <Accordion defaultOpen="item-1">
      <Accordion.item value={"item-1"}>
        <Accordion.header>Section 1</Accordion.header>
        <Accordion.body>Section-1 data</Accordion.body>
      </Accordion.item>
    </Accordion>
  );
}

export default App;
