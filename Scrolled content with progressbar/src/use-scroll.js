import { useEffect, useState } from "react";

export function useScroll() {
  const [percent, setPercent] = useState(0);
  function handleScroll() {
    const scrollTop = window.scrollY;
    const scrollableLength =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolledPercentage = (scrollTop * 100) / scrollableLength;

    setPercent(Math.max(0, Math.min(scrolledPercentage, 100)));
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { percent };
}
