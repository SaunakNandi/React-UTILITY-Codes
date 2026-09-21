import { useCallback, useRef, useState } from "react";
import "./App.css";

function App() {
  // https://picsum.photos/v2/list?page=1&limit=3

  const [arr, setArr] = useState(new Array(40).fill("* "));
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  function loadMore() {
    setLoading(true);
    setTimeout(() => {
      setArr((prev) => [...prev, ...new Array(20).fill("*")]);
      setLoading(false);
    }, 2000);
  }
  const lastRef = useCallback(
    (item) => {
      if (!item) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) loadMore();
      });
      observerRef.current.observe(item);
    },
    [setArr],
  );
  return (
    <>
      {/* <InfiniteScroll/> */}
      {/* Efficient approach */}
      <div className="container">
        {arr.map((item, i) => {
          const lastIndex = arr.length - 1 == i;
          return (
            <div
              style={{
                height: "30px",
                width: "100%",
                backgroundColor: "lightpink",
              }}
              key={i}
              ref={lastIndex ? lastRef : null}
            >
              {item}
            </div>
          );
        })}
        {loading && (
          <div style={{ height: "15px", width: "100%" }}>Loading ...</div>
        )}
      </div>
    </>
  );
}

export default App;
