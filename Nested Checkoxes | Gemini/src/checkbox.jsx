export const Checkbox = ({ onToggle, node, nodeId }) => {
  console.log("node value ", node);
  if (!node[nodeId]) return <></>;
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <input
          type="checkbox"
          checked={node[nodeId].check}
          onChange={() => onToggle(node[nodeId].id)}
        />
        <label htmlFor={node.id}>{node[nodeId].label}</label>
      </div>
      {node[nodeId].children.length > 0 && (
        <div style={{ marginLeft: "16px", paddingLeft: "4px" }}>
          {node[nodeId].children.map((item) => (
            <Checkbox
              key={item}
              onToggle={onToggle}
              node={node}
              nodeId={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};
