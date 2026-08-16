import { useEffect } from "react";
import "./App.css";
import { useAppState, useDispatch } from "./context";

function App() {
  const { username } = useAppState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_USERNAME",
      payload: "saunak007",
    });
  }, []);
  return <>{username}</>;
}

export default App;
