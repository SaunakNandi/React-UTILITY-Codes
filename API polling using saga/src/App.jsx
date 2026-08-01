import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { startPolling, stopPolling } from "./redux/action/polling-action";

function App() {
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const symbol = useSelector((store) => store.symbol);
  const { dispatch } = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(startPolling(symbol));
    }
    return () => {
      dispatch(stopPolling());
    };
  }, [isLoggedIn, symbol]);
}

export default App;
