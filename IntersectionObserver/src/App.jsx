import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const [arr, setArr] = useState(new Array(40).fill("*"));
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current) {
          setLoading(true);
          loadingRef.current = true;
          setTimeout(() => {
            setArr((prev) => {
              const newArr = new Array(20).fill("*");
              return [...prev, ...newArr];
            });
            setLoading(false);
            loadingRef.current = false;
          }, 2000);
        }
      },
      {
        root: observerRef.current,
        threshold: 0.5,
      },
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        height: "400px",
        width: "200px",
        backgroundColor: "green",
        overflow: "scroll",
      }}
      ref={observerRef}
    >
      {arr.map((item, i) => {
        return (
          <div
            style={{ width: "100%", height: "20px", border: "1px solid green" }}
            key={i}
          >
            {item}
          </div>
        );
      })}
      <div ref={elementRef} style={{ height: "30px", textAlign: "center" }}>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
