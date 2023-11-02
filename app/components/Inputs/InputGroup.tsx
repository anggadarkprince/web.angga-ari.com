import React, {PropsWithChildren} from "react";
import {clsx} from "clsx";
import styles from "@/app/components/Inputs/InputGroup.module.css";

export const InputGroup = ({className, children}: PropsWithChildren<{className?: string}>) => {
  return (
    <div className={clsx(className, styles.form__inputGroup)}>
      {children}
    </div>
  )
}
