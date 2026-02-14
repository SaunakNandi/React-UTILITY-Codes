import { useCallback, useState } from "react";
import Notification from "../components/notification";

export const useNotification = (position = "top-right") => {
  const [notification, setNotification] = useState([]);
  const removeNotification = (id) => {
    setNotification((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  const triggerNotification = useCallback(
    ({ type, message, duration = 3000 }) => {
      console.log("Hello");
      const newId = new Date().getTime().toString();
      const newNotification = {
        id: newId,
        type,
        message,
      };
      setNotification((prev) => [newNotification, ...prev]);
      setTimeout(() => {
        removeNotification(newId);
      }, duration);
    },
    [],
  );
  const NotificationComponent =
    notification.length > 0 ? (
      <div className={`${position}`}>
        {notification.map((item) => (
          <Notification
            type={item.type}
            message={item.message}
            onClose={removeNotification}
          />
        ))}
      </div>
    ) : (
      <></>
    );
  return { triggerNotification, NotificationComponent };
};
