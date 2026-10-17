import { useContext } from "react";
import { NotificationContext } from "../context/Notification-Context";

const ComponentB = () => {
  const { triggerNotification } = useContext(NotificationContext);
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
    </div>
  );
};

export default ComponentB;
