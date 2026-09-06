import { useState } from "react";

export const useProcessCheckboxes = (checkboxData) => {
  const [nodes, setNodes] = useState(checkboxData);

  function onToggle(targeId) {
    setNodes((prev) => {
      const next = structuredClone(prev);
      const isCheck = !next[targeId].check;

      // cascade downward
      const stack = [targeId];
      while (stack.length > 0) {
        const newId = stack.pop();
        next[newId].check = isCheck;
        if (next[newId].children.length > 0)
          stack.push(...next[newId].children);
      }

      let parentId = next[targeId].parentId;
      while (parentId && next[parentId]) {
        const isEveryChildToggled = next[parentId].children.every(
          (id) => next[id].check,
        );
        next[parentId].check = isEveryChildToggled;
        parentId = next[parentId].parentId;
      }
      return next;
    });
  }
  return { nodes, onToggle };
};
