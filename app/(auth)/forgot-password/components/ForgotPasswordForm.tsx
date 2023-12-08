"use client"

import styles from "@/app/(auth)/page.module.css";
import {Input} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import React, {useState} from "react";
import {clsx} from "clsx";
import {FormResult} from "@/app/types";
import {API_URL} from "@/app/utility/constants";
import {Form, FormSubmitHandler} from "@/app/components/Form/Form";
import * as z from "zod";

const schema = z.object({
  email: z.string().min(1, 'Email is required').email(),
});
export const ForgotPasswordForm = () => {
  const defaultValues = {email: ''};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<FormResult | null>(null);

  const onSubmit: FormSubmitHandler<typeof defaultValues> = async ({email}, form) => {
    try {
      setIsSubmitting(true);
      setSubmitResult(null);
      const response = await fetch(API_URL + 'auth/forgot-password', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email}),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitResult({
          type: 'success',
          message: `We already send the recovery email to ${email}`,
          response: result,
        });
        form.setValue('email', '');
      } else {
        setSubmitResult({
          type: 'error',
          message: result?.message || 'Cannot send email recovery, try again later',
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
        defaultValues={defaultValues}
        schema={schema}
        disabled={isSubmitting}
      >
        <Input
          type={'email'}
          name={'email'}
          label={'Email Address'}
          placeholder={'Registered email address'}
          required={true}
          errors={submitResult?.response?.errors}
          errorKey={'email'}
        />
        <Button type={'submit'} full={true} className={'mt-1'} disabled={isSubmitting}>Reset Password</Button>
      </Form>
    </>
  );
}
