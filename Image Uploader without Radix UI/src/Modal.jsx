import React, { useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({ setImage, setOpenPortal }) => {
  const [previewImage, setPreviewImage] = useState("");
  const [drag, setDrag] = useState(false);

  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDrag(true);
  }

  function onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const imageUrl = URL.createObjectURL(e.dataTransfer.files[0]);
      setPreviewImage(imageUrl);
      setImage(imageUrl);
    }
  }

  function selectFile(e) {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      console.log(imageUrl);
      setPreviewImage(imageUrl);
      setImage(imageUrl);
    }
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="container-portal w-96 h-96 border border-amber-200 bg-gray-300">
        <div className="header w-full h-8 p-2 flex">
          <p className="text-lg font-semibold">
            Upload from your system or drag and drop to upload your image
          </p>
          <button
            className="block w-6 h-6 border-black"
            onClick={() => setOpenPortal(false)}
          >
            {" "}
            X{" "}
          </button>
        </div>
        <div className="preview w-full h-48">
          <div
            className={`image-box flex items-center justify-center w-full h-44 ${drag ? "border border-blue-400" : ""}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {console.log("Preview image ", previewImage)}
            <img
              src={previewImage}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
          <label className="border border-black">
            Upload Image
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => selectFile(e)}
            />
          </label>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
