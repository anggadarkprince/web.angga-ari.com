"use client"

import styles from "@/app/(auth)/page.module.css";
import {Input} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import React, {useState} from "react";
import {ContactType, FormResult} from "@/app/types";
import {clsx} from "clsx";
import {API_URL} from "@/app/utility/constants";
import {useRouter} from "next/navigation";

export const ResetPasswordForm = ({email, token}: {email?: string, token: string}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<FormResult<ContactType> | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitResult(null);
      const response = await fetch(`${API_URL}auth/reset-password?token=${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: password,
          passwordConfirmation: confirmPassword,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitResult({
          type: 'success',
          message: 'The password successfully reset',
          response: result,
        });
        setPassword('');
        setConfirmPassword('');
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
      <form onSubmit={onSubmit} className={styles.auth__form} method="post">
        <fieldset disabled={isSubmitting}>
          <Input
            name={'email'}
            label={'Email'}
            placeholder={'Email'}
            id={'input-new-password'}
            required={true}
            defaultValue={email}
            errors={submitResult?.response?.errors}
            errorKey={'email'}
          />
          <Input
            type={'password'}
            name={'new_password'}
            label={'New Password'}
            placeholder={'New Password'}
            id={'input-new-password'}
            required={true}
            maxLength={50}
            value={password} onChange={e => setPassword(e.target.value)}
            errors={submitResult?.response?.errors}
            errorKey={'newPassword'}
          />
          <Input
            type={'password'}
            name={'password_confirmation'}
            label={'Confirm Password'}
            placeholder={'Confirm Password'}
            id={'input-confirm-password'}
            required={true}
            maxLength={50}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            errors={submitResult?.response?.errors}
            errorKey={'passwordConfirmation'}
          />
          <Button type={'submit'} full={true} className={'mt-1'}>Change Password</Button>
        </fieldset>
      </form>
    </>
  )
}
