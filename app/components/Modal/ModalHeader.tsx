import {PropsWithChildren} from "react";
import styles from "@/app/components/Modal/ModalHeader.module.css";
import {clsx} from "clsx";

interface ModalHeaderProps {
  title?: string;
  icon?: string;
  onClose?: () => void;
  disabled?: boolean;
}
export const ModalHeader = ({title, icon, onClose, disabled = false}: PropsWithChildren<ModalHeaderProps>) => {
  return (
    <div className={styles.modal__header}>
      {title && <h3 className="mb-0 text-h4">{icon && <i className={clsx(icon, 'mr-0-5')}/>}{title}</h3>}
      {onClose && (
        <button type="button" className={styles.modal__close} onClick={onClose} disabled={disabled}>
          <i className="uil-times"></i>
        </button>
      )}
    </div>
  )
}
