"use client"

import styles from "@/app/(manage)/(auth)/page.module.css";
import {Input, InputGroup} from "@/app/components/Form/Input";
import {Checkbox} from "@/app/components/Form/Checkbox";
import Link from "next/link";
import {Button} from "@/app/components/Form/Button";
import {useSearchParams} from "next/navigation";

export const LoginForm = ({referer = ''}: {referer?: string}) => {
  const path = useSearchParams();
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
      <form className={styles.auth__form} method="post">
        <fieldset>
          <Input
            type={'text'}
            name={'username'}
            label={'Username'}
            placeholder={'Username or email address'}
            id={'input-username'}
            required={true}
            maxLength={50}
            defaultValue={path.get('email') || ''}
          />
          <Input
            type={'password'}
            name={'password'}
            label={'Password'}
            placeholder={'Password'}
            id={'input-password'}
            required={true}
            maxLength={50}
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
