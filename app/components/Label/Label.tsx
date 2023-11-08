import {PropsWithChildren} from "react";
import {clsx} from "clsx";
import styles from './Label.module.css';

export type LabelVariant = 'primary' | 'error' | 'success' | 'warning' | 'info' | 'white';
interface LabelProps {
  variant?: LabelVariant,
}
export const Label = ({variant = 'white', children}: PropsWithChildren<LabelProps>) => {
  return (
    <span className={clsx(styles.label, variant && styles[`label__${variant}`])}>
      {children}
    </span>
  )
}
