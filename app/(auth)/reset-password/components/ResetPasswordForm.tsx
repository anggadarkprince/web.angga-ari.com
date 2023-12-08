"use client"

import styles from "@/app/(auth)/page.module.css";
import {Input} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import React, {useState} from "react";
import {ApiError, ContactType, FormResult} from "@/app/types";
import {clsx} from "clsx";
import {API_URL} from "@/app/utility/constants";
import {useRouter} from "next/navigation";
import * as z from "zod";
import {Form, FormSubmitHandler} from "@/app/components/Form/Form";

const schema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  newPassword: z.string().min(1, 'New Password is required').max(20),
  passwordConfirmation: z.string().min(1, 'Confirm password is required'),
})
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });
export const ResetPasswordForm = ({email, token}: {email?: string, token: string}) => {
  const defaultValues = {email: email, newPassword: '', passwordConfirmation: ''};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<FormResult<ContactType> | null>(null);
  const errors = submitResult?.response?.errors as ApiError;
  const router = useRouter();

  const onSubmit: FormSubmitHandler<typeof defaultValues> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitResult(null);
      const response = await fetch(`${API_URL}auth/reset-password?token=${token}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitResult({
          type: 'success',
          message: 'The password successfully reset',
          response: result,
        });
        router.replace('/login?reset_password=1');
      } else {
        setSubmitResult({
          type: 'error',
          message: result?.message || 'Cannot reset password, try again later',
          response: result,
        });
      }
    } catch (error) {
      setSubmitResult({
        type: 'error',
        message: 'Something went wrong, try again later',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {!isSubmitting && submitResult && (
        <div className={clsx('alert', `alert-${submitResult.type}`)}>
          {submitResult.message}
        </div>
      )}
      <Form
        onSubmit={onSubmit}
        className={styles.auth__form}
        disabled={isSubmitting}
        schema={schema}
        defaultValues={defaultValues}
      >
        <Input
          name={'email'}
          label={'Email'}
          placeholder={'Email'}
          required={true}
          defaultValue={email}
          errors={errors}
          errorKey={'email'}
          readOnly={true}
        />
        <Input
          type={'password'}
          name={'newPassword'}
          label={'New Password'}
          placeholder={'New Password'}
          errors={errors}
          errorKey={'newPassword'}
        />
        <Input
          type={'password'}
          name={'passwordConfirmation'}
          label={'Confirm Password'}
          placeholder={'Confirm Password'}
          errors={errors}
          errorKey={'passwordConfirmation'}
        />
        <Button type={'submit'} full={true} className={'mt-1'} disabled={isSubmitting}>Change Password</Button>
      </Form>
    </>
  )
}
