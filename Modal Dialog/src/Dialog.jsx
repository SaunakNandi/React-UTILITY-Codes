import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const DialogModal = ({
  isOpen,
  onClose,
  title,
  children,
  styles = {},
}) => {
  const overflowRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e) {
      if (e.key == "Escape") onClose();
    }

    // Lock background scrolling
    document.body.style.overflow = "hidden";
    window.addEventListener("keyup", handleClick);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keyup", handleClick);
    };
  }, [isOpen]);
  function handleOverlayClick(e) {
    if (e.target == overflowRef.current) onClose();
  }
  if (!isOpen) return null;
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: "0",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        ...styles.overlay,
      }}
      ref={overflowRef}
      role="dialog"
      onClick={handleOverlayClick}
    >
      <div
        style={{
          width: "300px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "baseline",
          border: "1px solid pink",
          paddingTop: "10px",
          backgroundColor: "lightpink",
          ...styles.boxmodal,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "24px",
            display: "flex",
            justifyContent: "space-between",
            ...styles.content,
          }}
        >
          {title && <p style={{ fontSize: "18px" }}>{title}</p>}
          <button onClick={onClose}>X</button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};
