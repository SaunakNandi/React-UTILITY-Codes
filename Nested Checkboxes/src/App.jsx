import { useState } from "react";
import "./App.css";
import { checkboxesData } from "./data";

const Checkbox = ({ data, checked, setChecked }) => {
  function handleChange(value, node) {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: value };
      const updateChildren = (item) => {
        item.children.forEach((child) => {
          newState[child.id] = value;
          child.children && updateChildren(child);
        });
      };

      updateChildren(node);
      console.log("before", { ...newState });
      const verifyChecked = (item) => {
        console.log("item ", item.children);
        if (item?.children?.length == 0) return newState[item.id] || false;
        const allChildrenChecked = item.children.every((child) =>
          verifyChecked(child)
        );
        newState[item.id] = allChildrenChecked;
        return allChildrenChecked;
      };
      checkboxesData.forEach((x) => verifyChecked(x));
      console.log("after ", newState);
      return newState;
    });
  }
  return (
    <div className="">
      {data.map((node) => (
        <div className="parent" key={node.id}>
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <span>{node.name}</span>
          {node.children && node.children.length > 0 && (
            <Checkbox
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [checked, setChecked] = useState({});
  return (
    <div className="App">
      <Checkbox
        data={checkboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}

export default App;
