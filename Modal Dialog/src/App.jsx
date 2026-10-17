import { useState } from "react";
import { DialogModal } from "./Dialog";

function App() {
  const [showDialog, setShowDialog] = useState(false);
  const handleShowDialog = () => {
    // console.log(showDialog)
    setShowDialog(!showDialog);
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  return (
    <div className="App">
      <button onClick={handleShowDialog}>Toggle Dialog</button>
      <DialogModal
        isOpen={showDialog}
        onClose={handleCloseDialog}
        title={"Hi, I am a custom Modal"}
      >
        <p>Random text</p>
      </DialogModal>
    </div>
  );
}

export default App;
