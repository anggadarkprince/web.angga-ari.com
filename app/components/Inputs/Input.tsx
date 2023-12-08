"use client"

import styles from './Input.module.css';
import React, {ForwardedRef, InputHTMLAttributes, TextareaHTMLAttributes, useImperativeHandle} from "react";
import {FormMessage} from "@/app/components/Form/FormMessage";
import {ApiError} from "@/app/types";
import {InputGroup} from "@/app/components/Inputs/InputGroup";
import {clsx} from "clsx";
import {useFormContext} from "react-hook-form";
import {joinErrors} from "@/app/utility/helpers";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export interface InputProps extends InputHTMLAttributes<FormControlElement>, TextareaHTMLAttributes<FormControlElement> {
  as?: 'input' | 'textarea',
  label?: string | React.ReactElement | React.ReactElement[],
  inputSize?: 'small' | 'medium' | 'large',
  icon?: string,
  borderless?: boolean,
  errors?: ApiError | null | string | string[],
  errorKey?: string,
}
export const Input = React.forwardRef(({as: Component = 'input', label, name, required, inputSize, icon, borderless = false, errors, errorKey, ...rest}: InputProps, ref: ForwardedRef<any>) => {
  const formContext = useFormContext();
  const {ref: inputRef, ...inputRest} = formContext ? formContext.register(name || '', {required}) : {ref: null, required: false};
  const inputErrors = joinErrors((formContext ? formContext.formState.errors[name || '']?.message : '') as string, errorKey && errors ? errors[errorKey as any] : errors);

  useImperativeHandle(inputRef, () => ref);

  return (
    <InputGroup>
      {label && <label htmlFor={rest.id || name} className={styles.form__label}>{label}</label>}
      {icon && <label className={clsx(icon, styles.form__inputIcon, styles[`icon__${inputSize}`])} htmlFor={rest.id || name}></label>}
      <Component
        ref={inputRef || ref}
        className={clsx(styles.form__input, inputSize && styles[`input__${inputSize}`], borderless && styles.form_inputBorderless)}
        name={name}
        id={rest.id || name}
        {...rest}
        {...inputRest}
      />
      <FormMessage errors={inputErrors || errors} errorKey={errorKey} as={'text'} />
    </InputGroup>
  )
});
Input.displayName = 'Input';
