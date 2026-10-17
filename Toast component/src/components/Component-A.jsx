import { useContext } from "react";
import { NotificationContext } from "../context/Notification-Context";

const ComponentA = () => {
  const { triggerNotification } = useContext(NotificationContext);
  return (
    <div>
      <strong>Component A</strong>
      <div className="">
        <button
          onClick={() => {
            triggerNotification({
              type: "success",
              message: "Success message",
              duration: 3000,
            });
          }}
        >
          Trigger
        </button>
      </div>
    </div>
  );
};

export default ComponentA;
