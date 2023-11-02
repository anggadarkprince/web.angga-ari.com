import styles from './Checkbox.module.css';
import {InputHTMLAttributes} from "react";

interface CheckboxType extends InputHTMLAttributes<HTMLInputElement>{
  label?: string,
}
export const Checkbox = ({label, ...rest}: CheckboxType) => {
  return (
    <div className={styles.form__checkbox}>
      <input type="checkbox" {...rest}/>
      {label && <label htmlFor={rest?.id}>{label}</label>}
    </div>
  )
}
