import {format, parseISO} from "date-fns";
import {FieldErrors, FieldValues} from "react-hook-form";

export const delay = (ms: number = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const dateFormat = (date: Date | string | number | null | undefined, dateFormat: string) => {
  if (date === null) {
    return null;
  }
  if (date === undefined) {
    return undefined;
  }
  if (typeof date === 'string') {
    if (date.trim() === '') {
      return '';
    }
    date = parseISO(date);
  }
  return format(date, dateFormat);
}

export const parseErrors = (errors: FieldErrors | Record<string, {message: string}>) => {
  const inputs = Object.keys(errors);
  const errorMessages = inputs.reduce<Record<string, string>>((allErrors, errorKey) => {
    return Object.assign(allErrors, {
      [errorKey]: errors[errorKey]?.message}
    );
  }, {});

  return {
    isValid: inputs.length === 0,
    errors: errorMessages,
  }
}

export const joinErrors = (...errors: any) => {
  let err: String[] = [];
  errors.forEach((item: any) => {
    if (Array.isArray(item)) {
      err = err.concat(item);
    } else if(typeof item === 'string' || item instanceof String) {
      if (item !== '') {
        err.push(item);
      }
    }
  });
  return err;
}

export const filterToParam = (params: URLSearchParams, filters: Record<string, any>, key: string) => {
  if (filters[key] || undefined) {
    params.set(key, filters[key]);
  } else {
    params.delete(key);
  }
}

export const truncate = (input: string, totalChars = 5) => input.length > totalChars ? `${input.substring(0, totalChars)}...` : input;