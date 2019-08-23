import React, { Fragment } from "react";
import "./modal.css";

const Modal = ({ show, text, close }) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
        display: !show ? "none" : null
      }}
    >
      <div className="modal-header">
        <h3>Modal Header</h3>
        <span className="close-modal-btn" onClick={close}>
          ×
        </span>
      </div>
      <div className="modal-body">
        <p>{text}</p>
      </div>
      <div className="modal-footer">
        <button className="btn-cancel" onClick={close}>
          CLOSE
        </button>
        <button className="btn-continue">CONTINUE</button>
      </div>
    </div>
  );
};

export default Modal;
