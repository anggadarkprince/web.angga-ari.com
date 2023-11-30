import {format, parseISO} from "date-fns";

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
