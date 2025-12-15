import { useState } from "react";
import "./App.css";
import { STATUS, todos } from "./data";

function App() {
  const [listItems, setListItems] = useState(todos);

  function handleDragOver(e) {
    e.preventDefault();
  }

  function updateListItems(id, status) {
    const tmp = listItems.find((x) => x.id == id);
    const tmpInd = listItems.findIndex((x) => x.id == id);
    if (tmp.status != status) {
      setListItems((prev) => {
        const items = [...prev];
        items[tmpInd].status = status;
        return items;
      });
    }
  }
  function handleDrop(e, status) {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    updateListItems(id, status);
  }
  function handleDragStart(e, item) {
    e.dataTransfer.setData("id", `${item.id}`);
  }
  return (
    <div className="ctn">
      <div className="title">
        <h1>Drag and Drop</h1>
      </div>
      <div className="drag-drop">
        {/* Representing TO DO container */}
        <div
          className="drag-drop-ctn"
          onDrop={(e) => handleDrop(e, STATUS[0])}
          onDragOver={handleDragOver}
        >
          <div className="dd-title-ctn">
            <h1>{STATUS[0]}</h1>
          </div>
          <div className="dd-items-ctn">
            {listItems.map((item, index) => {
              if (item.status === STATUS[0]) {
                return (
                  <div
                    key={index}
                    className="dd-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                  >
                    <h4>{item.content}</h4>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Representing In Progress container */}
        <div
          className="drag-drop-ctn"
          onDrop={(e) => handleDrop(e, STATUS[1])}
          onDragOver={handleDragOver}
        >
          <div className="dd-title-ctn">
            <h1>{STATUS[1]}</h1>
          </div>
          <div className="dd-items-ctn">
            {listItems.map((item, index) => {
              if (item.status === STATUS[1]) {
                return (
                  <div
                    key={index}
                    className="dd-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                  >
                    <h4>{item.content}</h4>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Representing Completed container */}
        <div
          className="drag-drop-ctn"
          onDrop={(e) => handleDrop(e, STATUS[2])}
          onDragOver={handleDragOver}
        >
          <div className="dd-title-ctn">
            <h1>{STATUS[2]}</h1>
          </div>
          <div className="dd-items-ctn">
            {listItems.map((item, index) => {
              if (item.status === STATUS[2]) {
                return (
                  <div
                    key={index}
                    className="dd-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                  >
                    <h4>{item.content}</h4>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
