import "./App.css";
import NestedComments from "./components/nested-comments";
import commentsData from "./data/comment.json";
function App() {
  return (
    <div>
      <h1>Nested comment system</h1>
      <NestedComments
        comments={commentsData}
        onSubmit={(content) => {}}
        onEdit={(content) => {}}
        onDelete={(commentId) => {}}
      />
    </div>
  );
}

export default App;
