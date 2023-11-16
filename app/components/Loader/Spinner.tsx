import styles from './Spinner.module.css';
import {clsx} from "clsx";

interface LoaderProps {
  size?: number,
  variant?: 'primary' | 'warning' | 'success' | 'info' | 'error'
}
export const Spinner = ({size = 38, variant = 'primary'}: LoaderProps) => {
  return <span className={clsx(styles.loader, styles[`loader__${variant}`])} style={{width: size, height: size}}></span>
}
