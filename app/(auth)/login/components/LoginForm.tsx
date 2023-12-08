"use client"

import styles from "@/app/(auth)/page.module.css";
import {Input, InputGroup} from "@/app/components/Inputs";
import {Checkbox} from "@/app/components/Checkbox";
import Link from "next/link";
import {Button} from "@/app/components/Buttons";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useState} from "react";
import {UserType, FormResult, ApiError} from "@/app/types";
import {clsx} from "clsx";
import {API_URL} from "@/app/utility/constants";
import {Form, FormSubmitHandler} from "@/app/components/Form/Form";
import * as z from "zod";

const schema = z.object({
  username: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginForm = ({referer = ''}: {referer?: string}) => {
  const path = useSearchParams();
  const defaultValues = {username: path.get('email') || '', password: ''};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<FormResult<UserType> | null>(null);
  const errors = submitResult?.response?.errors as ApiError;
  const router = useRouter();

  const onSubmit: FormSubmitHandler<typeof defaultValues> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitResult(null);
      const response = await fetch(`${API_URL}auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        router.replace('/manage/dashboard');
      } else {
        setSubmitResult({
          type: 'error',
          message: result?.message || 'Cannot logged you in, try again later',
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
      {path.get('reset_password') && referer.includes('/reset-password') && (
        <div className="alert alert-success">
          The password successfully reset
        </div>
      )}
      {path.get('register') && referer.includes('/register') && (
        <div className="alert alert-success">
          You&apos;re successfully register, please open the link that we&apos;ve sent to activate the account
        </div>
      )}
      {!isSubmitting && submitResult?.message && (
        <div className={clsx('alert', `alert-${submitResult.type}`)}>
          {submitResult.message}
        </div>
      )}
      <Form
        onSubmit={onSubmit}
        className={styles.auth__form}
        schema={schema}
        disabled={isSubmitting}
        defaultValues={defaultValues}
      >
        <Input
          name={'username'}
          label={'Username'}
          placeholder={'Username or email address'}
          defaultValue={defaultValues.username}
          errors={errors}
          errorKey={'username'}
        />
        <Input
          type={'password'}
          name={'password'}
          label={'Password'}
          placeholder={'Password'}
          errors={errors}
          errorKey={'password'}
        />
        <InputGroup className={'grid col-3-2 mb-2'}>
          <Checkbox name={'remember'} id={'input-remember'} label={'Remember for 30 days'} />
          <Link href="/forgot-password" className="text-right">Forgot Password?</Link>
        </InputGroup>
        <Button type={'submit'} full={true} disabled={isSubmitting}>Sign In</Button>
      </Form>
    </>
  );
}
