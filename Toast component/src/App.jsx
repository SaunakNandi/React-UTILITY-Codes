import "./App.css";
import ComponentA from "./components/Component-A";
import ComponentB from "./components/Component-B";
import { NotificationProvider } from "./context/Notification-Context";

function App() {
  return (
    <NotificationProvider>
      <div>
        Lets Trigger
        <ComponentA />
        <ComponentB />
      </div>
    </NotificationProvider>
  );
}

export default App;
