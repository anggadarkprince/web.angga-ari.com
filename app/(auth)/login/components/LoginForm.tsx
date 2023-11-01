"use client"

import styles from "@/app/(auth)/page.module.css";
import {Input, InputGroup} from "@/app/components/Form/Input";
import {Checkbox} from "@/app/components/Form/Checkbox";
import Link from "next/link";
import {Button} from "@/app/components/Form/Button";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useState} from "react";
import {ContactType, FormResult} from "@/app/types";
import {clsx} from "clsx";
import {API_URL} from "@/app/utility/constants";

export const LoginForm = ({referer = ''}: {referer?: string}) => {
  const path = useSearchParams();
  const [username, setUsername] = useState(path.get('email') || '');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<FormResult<ContactType> | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitResult(null);
      const response = await fetch(`${API_URL}auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setUsername('');
        setPassword('');
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
          You're successfully register, please open the link that we've sent to activate the account
        </div>
      )}
      {!isSubmitting && submitResult?.message  && (
        <div className={clsx('alert', `alert-${submitResult.type}`)}>
          {submitResult.message}
        </div>
      )}
      <form onSubmit={onSubmit} className={styles.auth__form} method="post">
        <fieldset disabled={isSubmitting}>
          <Input
            type={'text'}
            name={'username'}
            label={'Username'}
            placeholder={'Username or email address'}
            id={'input-username'}
            required={true}
            maxLength={50}
            value={username}
            onChange={e => setUsername(e.target.value)}
            errors={submitResult?.response?.errors}
            errorKey={'username'}
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
            errors={submitResult?.response?.errors}
            errorKey={'password'}
          />
          <InputGroup className={'grid col-3-2 mb-2'}>
            <Checkbox name={'remember'} id={'input-remember'} label={'Remember for 30 days'} />
            <Link href="/forgot-password" className="text-right">Forgot Password?</Link>
          </InputGroup>
          <Button type={'submit'} className={'width-full'}>Sign In</Button>
        </fieldset>
      </form>
    </>
  );
}
