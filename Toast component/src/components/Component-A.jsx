import { useNotification } from "../hooks/use-notification";

const ComponentA = () => {
  const { triggerNotification, NotificationComponent } =
    useNotification("top-right");
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

      {NotificationComponent}
    </div>
  );
};

export default ComponentA;
