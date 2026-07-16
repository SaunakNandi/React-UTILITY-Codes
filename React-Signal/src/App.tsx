import "./App.css";
import { useEffect } from "react";
import { fetchPosts, hasMore, isLoading, postData } from "./fetch-data";
import { useSignals } from "@preact/signals-react/runtime";

function App() {
  useSignals();
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <div className="">
        {postData.value.length > 0 ? (
          postData.value.map((post) => (
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <div className="">
            <p>Loading...</p>
          </div>
        )}
      </div>
      <div className="">
        <button
          onClick={() => hasMore.value && fetchPosts()}
          disabled={isLoading.value}
          style={{
            width: "200px",
            height: "50px",
            padding: "12px",
            border: "1px solid black",
          }}
        >
          Fetch more
        </button>
      </div>
    </>
  );
}

export default App;
