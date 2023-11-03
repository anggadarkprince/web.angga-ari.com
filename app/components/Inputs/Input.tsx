import styles from './Input.module.css';
import React, {HTMLAttributes, InputHTMLAttributes} from "react";
import {FormMessage} from "@/app/(site)/components/Form/FormMessage";
import {ApiError} from "@/app/types";
import {InputGroup} from "@/app/components/Inputs/InputGroup";
import {clsx} from "clsx";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

interface InputType extends InputHTMLAttributes<FormControlElement>{
  label?: string,
  inputSize?: 'small' | 'medium' | 'large',
  icon?: string,
  borderless?: boolean,
  errors?: ApiError | null | string | string[],
  errorKey?: string,
}
export const Input = ({label, inputSize, icon, borderless = false, errors, errorKey, ...rest}: InputType) => {
  return (
    <InputGroup>
      {label && <label htmlFor={rest.id} className={styles.form__label}>{label}</label>}
      {icon && <label className={clsx(icon, styles.form__inputIcon)} htmlFor={rest.id}></label>}
      <input
        className={clsx(styles.form__input, inputSize && `input__${inputSize}`, borderless && styles.form_inputBorderless)}
        {...rest}
      />
      <FormMessage errors={errors} errorKey={errorKey} as={'text'} />
    </InputGroup>
  )
}
