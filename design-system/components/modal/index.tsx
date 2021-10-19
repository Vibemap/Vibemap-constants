import React from "react";

import "./modal.scss";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button className="modal__closer" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function ModalBody({ children }) {
  return <div className="modal__body">{children}</div>;
}

function ModalFooter({ children }) {
  return <div className="modal__footer">{children}</div>;
}

function ModalHeader({ children }) {
  return <div className="modal__header">{children}</div>;
}

Modal.Body = React.memo(ModalBody);
Modal.Footer = React.memo(ModalFooter);
Modal.Header = React.memo(ModalHeader);

export default Modal;
