import {ApiError} from "@/app/types";
import React from "react";
import {ItemWrapper} from "@/app/(site)/components/Wrapper";
import {clsx} from "clsx";

interface FormMessageProps {
  errors: ApiError | string | Array<any> | undefined | null,
  errorKey?: string | null,
  as?: 'text' | 'alert'
}
export const FormMessage = ({errors, errorKey, as = 'text'}: FormMessageProps) => {
  let errorMessage: string[] = [];
  if (typeof errors === "string" && !errorKey) {
    errorMessage.push(errors);
  } else if (Array.isArray(errors)) {
    const isStringArray = errors.length > 0 && errors.every((value) => true);
    if (isStringArray) {
      errorMessage = errors;
    }
  } else if (typeof errors === 'object' && !Array.isArray(errors) && errors !== null) {
    let fieldMessage = null;
    if (errorKey) {
      fieldMessage = errors[errorKey] || null;
    }
    if (Array.isArray(fieldMessage)) {
      errorMessage = fieldMessage;
    } else if (typeof fieldMessage === "string") {
      errorMessage.push(fieldMessage);
    }
  }

  let errorElement;
  if (errorMessage.length > 1) {
    errorElement = (
      <ul className={clsx('text-small', as == 'text' && 'text-error mt-0-5')}>
        {errorMessage.map((item, idx) => <li className="display-flex" key={`error-${idx}`}><span className="mr-0-5">•</span> {item}</li>)}
      </ul>
    );
  } else {
    errorElement = errorMessage.map(item => <p key={`error-${item}`} className={clsx('text-small', as == 'text' && 'text-error mt-0-5')}>{item}</p>)
  }

  return errorMessage && errorMessage.length > 0 && (
    <ItemWrapper wrapper={children => as == 'text' ? <>{children}</> : <div className="alert alert-error">{children}</div>}>
      {errorElement}
    </ItemWrapper>
  )
}
