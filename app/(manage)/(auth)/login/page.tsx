import Link from "next/link";
import styles from '../page.module.css';
import {clsx} from "clsx";
import {Input, InputGroup} from "@/app/components/Form/Input";
import {Checkbox} from "@/app/components/Form/Checkbox";
import {Button, ButtonLink} from "@/app/components/Form/Button";
import Image from "next/image";

export default async function Login() {
  return (
    <main className={clsx('main', styles.auth__main)}>
      <div className={styles.auth__wrapper}>
        <div className={styles.auth__titleWrapper}>
          <img src="../assets/img/favicon.png" alt="Logo" className={styles.auth__logo}/>
            <div>
              <h1 className={styles.auth__title}>Welcome back!</h1>
              <h3 className={styles.auth__subtitle}>Start managing your landing page</h3>
            </div>
        </div>

        <div className="alert alert-error" style={{display: 'none'}}>
          Your password do not match
        </div>

        <form className={styles.auth__form} method="post">
          <fieldset>
            <Input type={'text'} name={'username'} label={'Username'} placeholder={'Username or email address'} id={'input-username'} required={true} maxLength={50} />
            <Input type={'password'} name={'password'} label={'Password'} placeholder={'Password'} id={'input-password'} required={true} maxLength={50} />
            <InputGroup className={'grid col-3-2 mb-2'}>
              <Checkbox name={'remember'} id={'input-remember'} label={'Remember for 30 days'} />
              <Link href="/forgot-password" className="text-right">Forgot Password?</Link>
            </InputGroup>
            <Button type={'submit'} className={'width-full'}>Sign In</Button>
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
        <p className="text-center">Don't you have an account? <Link href="/register">Sign Up</Link></p>
        <p className="text-center text-fade mt-2">&copy; 2023 All Rights Reserved.</p>
      </div>
    </main>
  )
}
