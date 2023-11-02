import styles from './Input.module.css';
import React, {InputHTMLAttributes} from "react";
import {FormMessage} from "@/app/(site)/components/Form/FormMessage";
import {ApiError} from "@/app/types";
import {InputGroup} from "@/app/components/Inputs/InputGroup";

interface InputType extends InputHTMLAttributes<HTMLInputElement>{
  label?: string,
  errors?: ApiError | null | string | string[],
  errorKey?: string,
}
export const Input = ({label, errors, errorKey, ...rest}: InputType) => {
  return (
    <InputGroup>
      {label && <label htmlFor={rest.id} className={styles.form__label}>{label}</label>}
      <input
        className={styles.form__input}
        {...rest}
      />
      <FormMessage errors={errors} errorKey={errorKey} as={'text'} />
    </InputGroup>
  )
}
