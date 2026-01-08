import React, { useCallback, useState } from "react";

const SelectableGrid = ({ row = 15, column = 15 }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  };
  const handleMouseEnter = useCallback(
    (boxNumber) => {
      if (isMouseDown) {
        const startBox = selectedBoxes[0];
        const endBox = boxNumber;
        const startRow = Math.floor((startBox - 1) / column);
        const startCol = (startBox - 1) % column;
        const endRow = Math.floor((endBox - 1) / column);
        const endCol = (endBox - 1) % column;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);
        const selected = [];
        for (let i = minRow; i <= maxRow; i++) {
          for (let j = minCol; j <= maxCol; j++)
            selected.push(i * column + j + 1);
        }
        setSelectedBoxes(selected);
      }
    },
    [isMouseDown]
  );

  return (
    <div
      className="grid"
      style={{ "--row": row, "--col": column }}
      onMouseUp={handleMouseUp}
    >
      {[...Array(row * column).keys()].map((x, i) => {
        return (
          <div
            key={x}
            className={`box ${selectedBoxes.includes(i + 1) ? "selected" : ""}`}
            onMouseDown={() => handleMouseDown(i + 1)}
            onMouseEnter={() => handleMouseEnter(i + 1)}
          >
            {i + 1}
          </div>
        );
      })}
    </div>
  );
};

export default SelectableGrid;
