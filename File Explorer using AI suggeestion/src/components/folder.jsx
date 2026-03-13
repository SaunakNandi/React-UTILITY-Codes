import { useState } from "react";

const Folder = ({
  node,
  tree,
  insertNode,
  showInput,
  setShowInput,
  actionFunc,
}) => {
  const { editNode, deleteNode } = actionFunc;
  const [expand, setExpand] = useState(false);
  editFileFolderName;
  const [nodeIdForEdit, setNodeIdForEdit] = useState("-1");
  function folderClicked() {
    setExpand((prev) => !prev);
    setShowInput({ isVisible: false, folderId: node.id });
  }

  function editFileFolderName(node, e) {
    setNodeIdForEdit("-1");
    editNode(node, e.target.value);
  }
  if (node?.type === "file") {
    return (
      <div
        style={{
          marginLeft: 20,
          paddingLeft: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {nodeIdForEdit !== node.id ? (
          <p>📄 {node.name}</p>
        ) : (
          <input
            type="text"
            autoFocus
            style={{ display: "block" }}
            onBlur={(e) => editFileFolderName(node, e)}
            onKeyDown={(e) => e.key === "Enter" && editFileFolderName(node, e)}
          />
        )}
        <div className="actions">
          <button onClick={() => setNodeIdForEdit(`${node.id}`)}>✎</button>
          <button onClick={() => deleteNode(node)}>🚮</button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ paddingLeft: 20 }}>
      <div
        style={{
          paddingLeft: 10,
          cursor: "pointer",
          backgroundColor: `${node.id === showInput.folderId ? "green" : ""}`,
          display: "flex",
          justifyContent: "space-between",
        }}
        onClick={folderClicked}
      >
        {nodeIdForEdit !== node.id ? (
          <p>📂 {node.name}</p>
        ) : (
          <input
            autoFocus
            type="text"
            style={{ display: "block" }}
            onBlur={(e) => editFileFolderName(node, e)}
            onKeyDown={(e) => e.key === "Enter" && editFileFolderName(node, e)}
          />
        )}
        <div className="actions">
          <button onClick={() => setNodeIdForEdit(`${node.id}`)}>✏️</button>
          <button onClick={() => deleteNode(node)}>🗑️</button>
        </div>
      </div>

      <div className="below-part" style={{ marginLeft: 20 }}>
        {expand && (
          <>
            {node?.children &&
              node.children.map((childId) => (
                <Folder
                  key={childId}
                  node={tree[childId]}
                  tree={tree}
                  insertNode={insertNode}
                  showInput={showInput}
                  setShowInput={setShowInput}
                  actionFunc={actionFunc}
                />
              ))}
          </>
        )}
        {showInput.isVisible && showInput.folderId == node.id && (
          <div className="inputField" style={{ display: "flex", gap: 5 }}>
            <span>{showInput?.type === "file" ? "📄" : "📂"}</span>
            <input
              type="text"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && insertNode(e)}
              onBlur={insertNode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
