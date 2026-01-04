import { useState } from "react";
import PropTypes from "prop-types";

export const VirtualizedList = ({ list, height, itemHeight, width }) => {
  const elementsVisibileInWindow = Math.floor(height / itemHeight);
  const [indices, setIndices] = useState([0, elementsVisibileInWindow]); // taking an extra element
  const visibleList = list.slice(indices[0], indices[1] + 1);
  const handleScroll = (e) => {
    const { scrollTop } = e.target; // scrollTop tell how much is scrolled
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + elementsVisibileInWindow;
    setIndices([newStartIndex, newEndIndex]);
  };
  return (
    <div
      className="container"
      style={{ height, width, background: "grey", overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: list.length * itemHeight, position: "relative" }}>
        {visibleList.map((item, index) => {
          // Better Performance
          // transform: does not trigger layout recalculations (reflow), unlike top.
          // It works on the GPU, making animations and updates smoother.

          return (
            <div
              className="item"
              key={index}
              style={{
                height: itemHeight,
                width: "100%",
                textAlign: "center",
                background: "coral",
                borderTop: "2px solid grey",
                position: "absolute",
                // translateY(value) moves an element vertically by the specified value in pixels.
                transform: `translateY(${(indices[0] + index) * itemHeight}px)`,
              }}
            >
              {"Item " + item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

VirtualizedList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
};
