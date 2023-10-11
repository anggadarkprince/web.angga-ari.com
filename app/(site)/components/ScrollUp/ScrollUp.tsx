import styles from './ScrollUp.module.css';
import {clsx} from "clsx";

interface ScrollUpProps {
  target?: string
}
export const ScrollUp = ({target = '#home'}: ScrollUpProps) => {
  return (
    <a href={target} className={styles.scrollUp} id="scroll-up">
      <i className={clsx('uil-arrow-up', styles.scrollUp__icon)}></i>
    </a>
  )
}
