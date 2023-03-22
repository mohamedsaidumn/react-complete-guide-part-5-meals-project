import React, { Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

interface ModalOverlayProbs {
  children: ReactNode;
}
interface ModalProbs {
  children: ReactNode;
  onClose: () => void;
}

interface BackdropProbs {
  onClose: () => void;
}

const Backdrop = (props: BackdropProbs) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: ModalOverlayProbs) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays") as HTMLElement;

const Modal = (props: ModalProbs) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
