import {clsx} from "clsx";
import React, {CSSProperties, PropsWithChildren} from "react";
import styles from './Alert.module.css';

export type AlertVariant = 'primary' | 'success' | 'error' | 'warning' | 'info';
interface AlertProps {
  variant: AlertVariant;
  className?: string;
  style?: CSSProperties
}
export const Alert = ({variant, className, style, children}: PropsWithChildren<AlertProps>) => {
  return (
    <div className={clsx(styles.alert, variant && styles[`alert__${variant}`], className)} style={style}>
      {children}
    </div>
  )
}
