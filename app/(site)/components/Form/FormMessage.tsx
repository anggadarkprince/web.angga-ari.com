import {ApiError} from "@/app/types";
import React from "react";
import {ItemWrapper} from "@/app/(site)/components/Wrapper";
import {clsx} from "clsx";

export const FormMessage = ({errors, errorKey}: {errors: ApiError | string | undefined | null, errorKey?: string | null}) => {
  let errorMessage: string[] = [];
  if (typeof errors === "string" && !errorKey) {
    errorMessage.push(errors);
  } else if (Array.isArray(errors)) {
    const isStringArray = errors.length > 0 && errors.every((value) => typeof value === 'string');
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
      <ul className={clsx('text-small', errorKey && 'text-error mt-0-5')}>
        {errorMessage.map(item => <li className="display-flex"><span className="mr-0-5">•</span> {item}</li>)}
      </ul>
    );
  } else {
    errorElement = errorMessage.map(item => <p className={clsx('text-small', errorKey && 'text-error mt-0-5')}>{item}</p>)
  }
  return (
    <ItemWrapper wrapper={children => errorKey ? <>{children}</> : <div className="alert alert-error">{children}</div>}>
      {errorElement}
    </ItemWrapper>
    )
}
