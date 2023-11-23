import styles from './Modal.module.css';
import {clsx} from "clsx";
import {PropsWithChildren} from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  show: boolean,
}
export const Modal = ({show, children}: PropsWithChildren<ModalProps>) => {
  if (!show) {
    return;
  }
  const modalContent = (
    <>
      <div className={clsx(styles.modal, styles.show)} tabIndex={-1} role="dialog" data-ref="#modal-delete">
        <div className={styles.modal__wrapper}>
          {children}
        </div>
      </div>
      <div className={clsx(styles.modal__overlay, styles.show)}></div>
    </>
  );
  if (typeof window === "object") {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  }
  return modalContent;
}
