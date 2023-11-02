import styles from './ButtonGroup.module.css';
import {clsx} from "clsx";
import {CSSProperties, PropsWithChildren} from "react";

export const ButtonGroup = ({className, style, children}: PropsWithChildren<{ className: string, style: CSSProperties }>) => {
  return (
    <div className={clsx(styles.button__group, className)} style={style}>
      {children}
    </div>
  )
}
