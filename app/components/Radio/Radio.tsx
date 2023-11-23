import {InputHTMLAttributes} from "react";
import styles from './Radio.module.css';

interface RadioType extends InputHTMLAttributes<HTMLInputElement>{
  label?: string,
}
export const Radio = ({label, ...rest}: RadioType) => {
  return (
    <div className={styles.form__radio}>
      <input type="radio" {...rest}/>
      {label && <label htmlFor={rest?.id}>{label}</label>}
    </div>
  )
}
