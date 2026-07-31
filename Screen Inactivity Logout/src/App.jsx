import { useEffect, useRef } from "react";
import "./App.css";

const idealTime = 15 * 60 * 1000;
function App() {
  const timeRef = useRef();

  async function logout() {
    try {
      await fetch(`${api_endpoint}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      navigate("/login");
    }
  }
  function resetTimer() {
    if (timeRef.current) clearTimeout(timeRef.current);
    timeRef.current = setTimeout(logout, idealTime);
  }
  useEffect(() => {
    const events = ["mousemove", "click", "scroll", "keydown"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timeRef.current) clearTimeout(timeRef.current);
    };
  }, []);
  return <></>;
}

export default App;
