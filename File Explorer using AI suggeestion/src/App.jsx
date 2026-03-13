import { useState } from "react";
import "./App.css";
import { data } from "./data/data";
import Folder from "./components/folder";

function App() {
  const [explorerItems, setExplorerItems] = useState(data);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    folderId: -1,
    type: "",
  });
  function handleCreateNode(type) {
    setShowInput((prev) => {
      return {
        ...prev,
        isVisible: true,
        type,
      };
    });
  }
  function insertNode(e) {
    const value = e.target.value.trim();
    if (!value || value.length == 0) return;
    if (!showInput.isVisible) return;
    const newNode = {
      id: new Date().getTime().toString(),
      name: value,
      parentId: showInput.folderId,
      type: showInput.type,
      children: [],
    };
    const parentId = showInput.folderId;
    setExplorerItems((prev) => {
      const childrenArr = [...prev[parentId].children, newNode.id];
      return {
        ...prev,
        [parentId]: {
          ...prev[parentId],
          children: childrenArr,
        },
        [newNode.id]: newNode,
      };
    });
    setShowInput({
      isVisible: false,
      folderId: -1,
      type: "",
    });
  }

  const editNode = (node, value) => {
    setExplorerItems((prev) => {
      const nodeList = structuredClone(prev);
      nodeList[node.id] = {
        ...nodeList[node.id],
        name: value,
      };
      return nodeList;
    });
  };

  function updateFolderStructure(newState, node) {
    const idCollector = [node.id];
    const parentId = node.parentId;
    let i = 0;
    console.log("newState starting ", newState);
    while (i < idCollector.length) {
      const tmpNode = newState[idCollector[i]];
      if (tmpNode.type === "folder" && tmpNode.children > 0)
        idCollector.push(...tmpNode.children);
      i++;
    }
    for (let id of idCollector) delete newState[id];

    if (parentId !== null && newState[parentId]) {
      newState[parentId] = {
        ...newState[parentId],
        children: newState[parentId].children.filter(
          (childId) => childId !== node.id,
        ),
      };
    }
    console.log("newState ", newState);
    return newState;
  }
  const deleteNode = (node) => {
    setExplorerItems((prev) => {
      console.log("prev", prev);
      const newState = { ...prev };
      console.log("updateFolderStructure ", newState);
      return updateFolderStructure(newState, node);
    });
  };
  return (
    <div className="">
      <div className="buttons">
        <button onClick={() => handleCreateNode("folder")}>➕ 📂</button>
        <button onClick={() => handleCreateNode("file")}>➕ 📄</button>
      </div>
      <Folder
        node={explorerItems[1]}
        tree={explorerItems}
        insertNode={insertNode}
        showInput={showInput}
        setShowInput={setShowInput}
        actionFunc={{ editNode, deleteNode }}
      />
    </div>
  );
}

export default App;
