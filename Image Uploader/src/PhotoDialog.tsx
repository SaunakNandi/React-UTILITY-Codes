import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import React, { useState } from "react"

type PhotoDialog = {
  setImage: (url: string) => void
}
function PhotoDialog({ setImage }: PhotoDialog) {
  const [dragItem, setDragItem] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState('')
  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("files", e.target.files)
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setImage(url)
      setPreviewImage(url)
    }
  }
  function handleDragOver(e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragItem(true)
  }
  function handleDragLeave(e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragItem(false)
  }
  function handleFileDrop(e: React.DragEvent<HTMLInputElement>) {
    console.log("dataTransfer.files => ", e.dataTransfer.files[0])
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const url = URL.createObjectURL(e.dataTransfer.files[0])
      setPreviewImage(url)
      setImage(url)
    }
  }
  return (
    <Dialog>
  <DialogTrigger>
    <Button>Update Image</Button>
  </DialogTrigger>

  <DialogContent className="w-[60vw] h-[70vh] bg-white">
    <DialogHeader className="bg-white">
      <DialogTitle className="text-center">
        Upload from your system or drag and drop to upload your image
      </DialogTitle>

    </DialogHeader>

    <div
      className={`flex flex-col justify-center ${
        dragItem ? "border border-blue-400" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
    >
      <label htmlFor="name-1" className="text-center cursor-pointer">
        Upload Image
        <Input
          type="file"
          id="name-1"
          accept="image/*"
          className="hidden"
          onChange={(e) => selectFile(e)}
        />
      </label>

      {previewImage && (
        <div className="w-full h-[40vh] flex justify-center">
          <img src={previewImage} alt="" className="h-full w-full" />
        </div>
      )}
    </div>
  </DialogContent>
</Dialog>
  )
}

export default React.memo(PhotoDialog)