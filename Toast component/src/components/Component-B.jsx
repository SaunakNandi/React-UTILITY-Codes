import React from "react";
import { useNotification } from "../hooks/use-notification";

const ComponentB = () => {
  const { triggerNotification, NotificationComponent } =
    useNotification("bottom-left");
  return (
    <div>
      <strong>Component B</strong>
      <div className="">
        <button
          onClick={() => {
            triggerNotification({
              type: "error",
              message: "Oops something went wrong",
              duration: 3000,
            });
          }}
        >
          Error
        </button>
      </div>

      {NotificationComponent}
    </div>
  );
};

export default ComponentB;
