import { useState } from "react";
import "./App.css";
import { STATUS, todos } from "./data";
import ColumnBoard from "./components/column-board";

function App() {
  const [listItems, setListItems] = useState(todos);

  return (
    <div className="ctn">
      <div className="title">
        <h1>Drag and Drop</h1>
      </div>

      <div className="drag-drop">
        {STATUS.map((stat) => (
          <ColumnBoard
            status={stat}
            list={listItems}
            setListItem={setListItems}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
