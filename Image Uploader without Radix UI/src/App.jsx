import { useState } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  const [image, setImage] = useState("https://github.com/shadcn.png");
  const [openPortal, setOpenPortal] = useState(false);
  return (
    <>
      <div className="container flex justify-around w-175 h-100 ">
        <div className="w-12 h-12 rounded">
          <img src={image} alt="" className=" w-full h-full" />
        </div>
        <button
          className=" inline-block w-20 h-16 bg-green-300 text-black font-semibold"
          onClick={() => setOpenPortal(true)}
        >
          Upload Image
        </button>
      </div>
      {openPortal && (
        <Modal setImage={setImage} setOpenPortal={setOpenPortal} />
      )}
    </>
  );
}

export default App;
