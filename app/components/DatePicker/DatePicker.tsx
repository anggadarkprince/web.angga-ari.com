import {ChangeEventHandler, forwardRef, HTMLProps, Ref, useState} from "react";
import ReactDatePicker, {ReactDatePickerProps} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import {parseISO} from "date-fns";
import {Input} from "@/app/components/Inputs";
import {InputProps} from "@/app/components/Inputs/Input";
import React from "react";
import {dateFormat as formatter} from "@/app/utility/helpers";
import {ApiError} from "@/app/types";
import {clsx} from "clsx";
import {Controller, useFormContext} from "react-hook-form";

interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange' | 'value'> {
  value?: string | Date | null;
  defaultValue?: string | Date | null;
  required?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onDateChange?: ReactDatePickerProps['onChange'];

  // input props
  label?: string,
  inputSize?: 'small' | 'medium' | 'large',
  icon?: string,
  borderless?: boolean,
  errors?: ApiError | null | string | string[],
  errorKey?: string,
}
export const DatePicker = forwardRef(({
   selected,
   value,
   defaultValue,
   required,
   placeholder,
   label,
   id,
   name,
   errors,
   onChange,
   onDateChange,
   dateFormat = 'yyyy-MM-dd',
   ...rest
}: DatePickerProps, ref: Ref<ReactDatePicker>) => {
  //const defaultValueDate = defaultValue ? (defaultValue instanceof Date ? defaultValue : parseISO(defaultValue)) : null;
  const valueDate = value ? (value instanceof Date ? value : parseISO(value)) : (selected ? selected : null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(valueDate);
  const {control} = useFormContext() || {control: null};

  const DateInput = forwardRef(({value: updatedValue, onClick}: HTMLProps<HTMLInputElement>, ref: Ref<InputProps>) => {
    const valueAttributes: InputProps = {}
    if (value !== undefined) {
      valueAttributes.value = updatedValue;
    }
    if (defaultValue !== undefined) {
      //const format = (Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || 'yyyy-MM-dd';
      //valueAttributes.defaultValue = formatter(updatedValue as string, format) || '';
      valueAttributes.defaultValue = defaultValue as string;
    }
    if (control && !valueAttributes.value && !valueAttributes.defaultValue) {
        valueAttributes.value = updatedValue;
    }
    return (
      <Input
        required={required}
        placeholder={placeholder}
        onClick={onClick}
        label={label}
        id={id}
        name={name}
        onChange={onChange}
        errors={errors}
        {...valueAttributes}
      />
    );
  });

  function triggerChange(date: Date | null) {
    if (id) {
      const input = document.querySelector(`#${id}`);
      if (input) {
        const property = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        if (property) {
          const format = (Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || 'yyyy-MM-dd';
          property?.set?.call(input, formatter(date, format));
        }
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else {
      throw Error('DatePicker: attribute onChange passed but no unique ID for the input');
    }
  }

  const renderDatePicker = (dateValue: Date | null, onInputChange?: (date: string) => void) => {
      return (
          <ReactDatePicker
              ref={ref}
              selected={dateValue}
              onChange={(date, e) => {
                  if (onInputChange) {
                      const format = (Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || 'yyyy-MM-dd';
                      onInputChange(formatter(date, format) || '');
                  }
                  setSelectedDate(date);
                  if (onDateChange) {
                      onDateChange(date, e);
                  }
                  if (onChange) {
                      triggerChange(date);
                  }
              }}
              customInput={<DateInput />}
              dateFormat={dateFormat}
              popperClassName={"datepicker"}
              clearButtonClassName={clsx("datepicker-clear-button", label && 'with-label')}
              {...rest}
          />
      )
  }

  if (!control) {
      return renderDatePicker(selected || selectedDate || valueDate);
  }

  return (
      <Controller
          control={control}
          name={name || ''}
          render={({field}) => {
              const fieldValue = field.value === '' ? null : (field.value instanceof Date ? field.value : parseISO(field.value)) ;
              const dateValue = fieldValue || selected || selectedDate || valueDate;
              return renderDatePicker(dateValue, field.onChange);
          }}
      />
  )
});
DatePicker.displayName = 'DatePicker';
