import styles from "@/app/components/Modal/ModalBody.module.css";
import {PropsWithChildren} from "react";

export const ModalBody = ({children}: PropsWithChildren) => {
  return (
    <div className={styles.modal__content}>
      {children}
    </div>
  )
}
