"use client"

import styles from "@/app/(auth)/page.module.css";
import {Input} from "@/app/components/Form/Input";
import {Button} from "@/app/components/Form/Button";
import React, {useState} from "react";
import {ApiError, ContactType, FormResult} from "@/app/types";
import {useRouter} from "next/navigation";
import {API_URL} from "@/app/utility/constants";
import {clsx} from "clsx";

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<FormResult<ContactType> | null>(null);
  const errors = submitResult?.response?.errors as ApiError;
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitResult(null);
      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password,
          passwordConfirmation: confirmPassword,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        router.replace('/login?register=1');
      } else {
        setSubmitResult({
          type: 'error',
          message: result?.message || 'Cannot register the user, try again later',
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
      {!isSubmitting && submitResult?.message  && (
        <div className={clsx('alert', `alert-${submitResult.type}`)}>
          {submitResult.message}
        </div>
      )}
      <form onSubmit={onSubmit} className={styles.auth__form} method="post">
        <fieldset disabled={isSubmitting}>
          <Input
            name={'name'}
            label={'Full Name'}
            placeholder={'Your full name'}
            id={'input-name'}
            required={true}
            maxLength={50}
            value={name}
            onChange={e => setName(e.target.value)}
            errors={errors?.name}
          />
          <Input
            name={'username'}
            label={'Username'}
            placeholder={'Username or email address'}
            id={'input-username'}
            required={true}
            maxLength={50}
            value={username}
            onChange={e => setUsername(e.target.value)}
            errors={errors?.username}
          />
          <Input
            type={'email'}
            name={'email'}
            label={'Email Address'}
            placeholder={'Email address'}
            id={'input-email'}
            required={true}
            maxLength={50}
            value={email}
            onChange={e => setEmail(e.target.value)}
            errors={errors?.email}
          />
          <Input
            type={'password'}
            name={'password'}
            label={'Password'}
            placeholder={'Password'}
            id={'input-password'}
            required={true}
            maxLength={50}
            value={password}
            onChange={e => setPassword(e.target.value)}
            errors={errors?.password}
          />
          <Input
            type={'password'}
            name={'password_confirmation'}
            label={'Confirm Password'}
            placeholder={'Repeat the password'}
            id={'input-password-confirmation'}
            required={true}
            maxLength={50}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            errors={errors?.passwordConfirmation}
          />
          <Button type={'submit'} className={'width-full'}>Sign Up</Button>
        </fieldset>
      </form>
    </>
  );
}
