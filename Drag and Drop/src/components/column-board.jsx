import "../App.css";

const ColumnBoard = ({ status, list, setListItem }) => {
  function startDragging(e, note) {
    e.dataTransfer.setData("task-id", `${note.id}`);
    console.log("calling", note);
  }
  function dragging(e) {
    e.preventDefault();
    const ids = e.dataTransfer.getData("task-id");
    console.log(ids);
  }
  function onDrop(e) {
    const requiredId = e.dataTransfer.getData("task-id");
    const requiredItem = list.find((item) => item.id == requiredId);
    if (requiredItem.status === status) return;
    setListItem((prev) => {
      return prev.map((prevList) => {
        if (prevList.id == requiredId) return { ...prevList, status };
        return { ...prevList };
      });
    });
  }
  return (
    <div className="drag-dropt-ctn" onDragOver={dragging} onDrop={onDrop}>
      <div className="dd-title-ctn">
        <h1>{status}</h1>
      </div>
      <div className="dd-item-ctn">
        {list
          .filter((x) => x.status === status)
          .map((item) => (
            <div
              className="dd-item"
              draggable
              onDragStart={(e) => startDragging(e, item)}
              key={item.id}
            >
              <h4>{item.content}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColumnBoard;
