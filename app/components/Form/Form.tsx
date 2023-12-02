import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormProps, UseFormReturn
} from "react-hook-form";
import React, {PropsWithChildren} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {ZodType} from "zod";

export type FormSubmitHandler<TFieldValues extends FieldValues> = (data: TFieldValues, methods: UseFormReturn, event?: React.BaseSyntheticEvent) => unknown | Promise<unknown>;
interface FormProps extends UseFormProps {
  form?: UseFormReturn;
  schema?: ZodType<any, any, any>;
  onSubmit?: FormSubmitHandler<any>;
}
export const Form = ({form, schema, defaultValues = {}, values, children, disabled, onSubmit}: PropsWithChildren<FormProps>) => {
  const methods = form || useForm<typeof defaultValues>({
    mode: "onChange",
    resolver: schema && zodResolver(schema),
    defaultValues: defaultValues,
    values: values,
    disabled: disabled,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data, event) => {
        onSubmit && onSubmit(data, methods, event);
      })} noValidate>
        {children}
      </form>
    </FormProvider>
  )
}
