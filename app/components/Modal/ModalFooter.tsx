import {PropsWithChildren} from "react";
import styles from './ModalFooter.module.css';
import {clsx} from "clsx";

export const ModalFooter = ({children}: PropsWithChildren) => {
  return (
    <div className={clsx(styles.modal__footer, 'text-right')}>
      {children}
    </div>
  )
}
