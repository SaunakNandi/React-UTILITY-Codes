import { useEffect, useRef, useState } from "react";

export function LoggedIn({ isLoggedIn, symbol }) {
  const [price, setPrice] = useState();

  const controllerRef = useRef(null);
  async function PriceCalculator(controller) {
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();
    try {
      const res = await fetch(`/api/get-price-update?id=${symbol}`, {
        method: "GET",
        signal: controller.signal,
      });
      const data = await res.json();
      setPrice(data);
    } catch (error) {
      if (error.name === "AbortError") return;
      console.log("", error);
    }
  }

  function checker() {
    if (!document.hidden) PriceCalculator();
  }
  useEffect(() => {
    if (!isLoggedIn) return;

    PriceCalculator();
    const intervalId = setInterval(() => {
      PriceCalculator();
    }, 1000);

    document.addEventListener("visibilitychange", checker);

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", checker);
    };
  }, [isLoggedIn, symbol]);

  return (
    <div className="">
      <p>Price: {price}</p>
    </div>
  );
}
