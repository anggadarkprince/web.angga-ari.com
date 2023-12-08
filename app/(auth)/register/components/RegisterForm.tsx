"use client"

import styles from "@/app/(auth)/page.module.css";
import {Input} from "@/app/components/Inputs";
import {Button} from "@/app/components/Buttons";
import React, {useState} from "react";
import {ApiError, ContactType, FormResult} from "@/app/types";
import {useRouter} from "next/navigation";
import {API_URL} from "@/app/utility/constants";
import {clsx} from "clsx";
import {Form, FormSubmitHandler} from "@/app/components/Form/Form";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(15),
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required').max(20),
  passwordConfirmation: z.string().min(1, 'Confirm password is required'),
})
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export const RegisterForm = () => {
  const defaultValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<FormResult<ContactType> | null>(null);
  const errors = submitResult?.response?.errors as ApiError;
  const router = useRouter();

  const onSubmit: FormSubmitHandler<typeof defaultValues> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitResult(null);
      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        router.replace('/login?register=1');
      } else {
        setSubmitResult({
          type: 'error',
          message: result?.message || 'Cannot register the user, try again later',
          response: result,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      setSubmitResult({
        type: 'error',
        message: 'Something went wrong, try again later',
      });
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {!isSubmitting && submitResult?.message  && (
        <div className={clsx('alert', `alert-${submitResult.type}`)}>
          {submitResult.message}
        </div>
      )}
      <Form
        onSubmit={onSubmit}
        className={styles.auth__form}
        defaultValues={defaultValues}
        disabled={isSubmitting}
        schema={schema}
      >
        <Input
          name={'name'}
          label={'Full Name'}
          placeholder={'Your full name'}
          errors={errors?.name}
        />
        <Input
          name={'username'}
          label={'Username'}
          placeholder={'Username or email address'}
          id={'input-username'}
          errors={errors?.username}
        />
        <Input
          type={'email'}
          name={'email'}
          label={'Email Address'}
          placeholder={'Email address'}
          errors={errors?.email}
        />
        <Input
          type={'password'}
          name={'password'}
          label={'Password'}
          placeholder={'Password'}
          errors={errors?.password}
        />
        <Input
          type={'password'}
          name={'passwordConfirmation'}
          label={'Confirm Password'}
          placeholder={'Repeat the password'}
          errors={errors?.passwordConfirmation}
        />
        <Button type={'submit'} full={true} disabled={isSubmitting}>Sign Up</Button>
      </Form>
    </>
  );
}
