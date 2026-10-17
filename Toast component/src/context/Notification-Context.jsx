import { createContext, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Notification from "../components/notification";

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifiationList, setNotificationList] = useState([]);
  const removeNotification = (id) => {
    setNotificationList((prev) => {
      const tmp = [...prev];
      return tmp.filter((x) => x.id !== id);
    });
  };
  const triggerNotification = useCallback(
    ({ type, message, duration = 3000 }) => {
      const id = Date.now().toString() + Math.random().toString(36).slice(2);
      const tmp = { id, type, message, duration };
      setNotificationList((prev) => [tmp, ...prev]);
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    },
    [],
  );
  return (
    <NotificationContext.Provider value={{ triggerNotification }}>
      {children}
      {notifiationList.length > 0 &&
        createPortal(
          <div
            style={{
              position: "fixed",
              bottom: "0",
              right: "20px",
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "baseline",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            {notifiationList.map((item) => (
              <Notification
                key={item.id}
                type={item.type}
                message={item.message}
                onClose={() => removeNotification(item.id)}
              />
            ))}
          </div>,
          document.body,
        )}
    </NotificationContext.Provider>
  );
};
