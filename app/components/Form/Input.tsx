import styles from './Input.module.css';
import React, {PropsWithChildren} from "react";
import {clsx} from "clsx";
import {FormMessage} from "@/app/(site)/components/Form/FormMessage";
import {ApiError} from "@/app/types";

interface InputType {
  id?: string,
  type?: string,
  label?: string,
  placeholder?: string,
  name: string,
  readonly ?: boolean,
  required?: boolean,
  minLength?: number,
  maxLength?: number,
  value?: string | number | readonly string[] | undefined,
  defaultValue?: string | number | readonly string[] | undefined,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  errors?: ApiError | null | string | string[],
  errorKey?: string,
}
export const Input = ({type = 'text', label, placeholder, id, name, required, minLength, maxLength, value, defaultValue, onChange, errors, errorKey}: InputType) => {
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
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <FormMessage errors={errors} errorKey={errorKey || name} />
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
