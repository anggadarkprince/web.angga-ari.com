"use client"

import styles from "@/app/(auth)/page.module.css";
import {Input} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import React, {useState} from "react";
import {clsx} from "clsx";
import {ContactType, FormResult} from "@/app/types";
import {API_URL} from "@/app/utility/constants";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<FormResult<ContactType> | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitResult(null);
      const response = await fetch(API_URL + 'auth/forgot-password', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitResult({
          type: 'success',
          message: `We already send the recovery email to ${email}`,
          response: result,
        });
        setEmail('');
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
      <form onSubmit={onSubmit} className={styles.auth__form} method="post">
        <fieldset disabled={isSubmitting}>
          <Input
            type={'text'}
            name={'username'}
            label={'Email Address'}
            placeholder={'Registered email address'}
            id={'input-email'}
            required={true}
            maxLength={50}
            value={email}
            onChange={e => setEmail(e.target.value)}
            errors={submitResult?.response?.errors}
          />
          <Button type={'submit'} full={true} className={'mt-1'}>Reset Password</Button>
        </fieldset>
      </form>
    </>
  );
}
