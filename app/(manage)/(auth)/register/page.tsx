import Link from "next/link";
import styles from '../page.module.css';
import {clsx} from "clsx";
import {Input, InputGroup} from "@/app/components/Form/Input";
import {Button, ButtonLink} from "@/app/components/Form/Button";
import Image from "next/image";

export default async function Login() {
  return (
    <main className={clsx('main', styles.auth__main)}>
      <div className={styles.auth__wrapper}>
        <div className={styles.auth__titleWrapper}>
          <img src="../assets/img/favicon.png" alt="Logo" className={styles.auth__logo}/>
          <div>
            <h1 className={styles.auth__title}>Sign Up</h1>
            <h3 className={styles.auth__subtitle}>Register your account right now</h3>
          </div>
        </div>

        <div className="alert alert-error" style={{display: 'none'}}>
          Your password do not match
        </div>

        <form className={styles.auth__form} method="post">
          <fieldset>
            <Input type={'text'} name={'name'} label={'Full Name'} placeholder={'Your full name'} id={'input-name'} required={true} maxLength={50} />
            <Input type={'text'} name={'username'} label={'Username'} placeholder={'Username or email address'} id={'input-username'} required={true} maxLength={50} />
            <Input type={'email'} name={'email'} label={'Email Address'} placeholder={'Email address'} id={'input-email'} required={true} maxLength={50} />
            <Input type={'password'} name={'password'} label={'Password'} placeholder={'Password'} id={'input-password'} required={true} maxLength={50} />
            <Input type={'password'} name={'password_confirmation'} label={'Confirm Password'} placeholder={'Repeat the password'} id={'input-password-confirmation'} required={true} maxLength={50} />
            <Button type={'submit'} className={'width-full'}>Sign Up</Button>
          </fieldset>
        </form>

        <p className={clsx('mb-1 mt-1', styles.separator__or)}>OR</p>

        <InputGroup className={'grid gap-1 col-lg-2 mb-1'}>
          <ButtonLink href={'#'} className={clsx('width-full', styles.button__social)}>
            <Image src="/assets/img/google.png" alt="Google" width={20} height={20}/>Google
          </ButtonLink>
          <ButtonLink href={'#'} className={clsx('width-full', styles.button__social)}>
            <Image src="/assets/img/github.png" alt="Github" width={20} height={20}/>Github
          </ButtonLink>
        </InputGroup>
        <p className="text-center">Already have an account? <Link href="/login">Sign In</Link></p>
        <p className="text-center text-fade mt-2">&copy; 2023 All Rights Reserved.</p>
      </div>
    </main>
  )
}
