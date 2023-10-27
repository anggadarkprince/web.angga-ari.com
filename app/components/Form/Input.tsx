import styles from './Input.module.css';
import {PropsWithChildren} from "react";
import {clsx} from "clsx";

interface InputType {
  id?: string,
  type: string,
  label?: string,
  placeholder?: string,
  name: string,
  required?: boolean,
  minLength?: number,
  maxLength?: number,
}
export const Input = ({type = 'text', label, placeholder, id, name, required, minLength, maxLength}: InputType) => {
  return (
    <InputGroup>
      {label && <label htmlFor={id || name} className={styles.form__label}>{label}</label>}
      <input
        type={type}
        className={styles.form__input}
        id={id || name}
        placeholder={placeholder}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    </InputGroup>
  )
}

export const InputGroup = ({className, children}: PropsWithChildren<{className?: string}>) => {
  return (
    <div className={clsx(className, styles.form__inputGroup)}>
      {children}
    </div>
  )
}
