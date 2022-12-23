import { useEffect } from "react";
import "./Popup.css";

const Popup = ({ show, setShow, component }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  const closeHandler = () => {
    setShow(false);
    document.body.style.overflow = "auto";
  };
  return (
    <div
      style={{
        display: show ? "block" : "none",
        opacity: show ? "1" : "0",
      }}
      className="overlay"
    >
      <div className="popup">
        <span className="close" onClick={closeHandler}>
          &times;
        </span>
        <div className="content">{component}</div>
      </div>
    </div>
  );
};

export default Popup;
