import Link from "next/link";
import styles from '../page.module.css';
import {clsx} from "clsx";
import {Input} from "@/app/components/Form/Input";
import {Button} from "@/app/components/Form/Button";

export default async function Login() {
  return (
    <main className={clsx('main', styles.auth__main)}>
      <div className={styles.auth__wrapper}>
        <div>
          <h1 className={styles.auth__title}>Forgot password</h1>
          <h3 className={styles.auth__subtitle}>Don't worry, we'll send you reset instructions</h3>
        </div>

        <div className="alert alert-error" style={{display: 'none'}}>
          Your password do not match
        </div>

        <form className={styles.auth__form} method="post">
          <fieldset>
            <Input type={'text'} name={'username'} label={'Email Address'} placeholder={'Registered email address'} id={'input-email'} required={true} maxLength={50} />
            <Button type={'submit'} className={'width-full mt-1'}>Reset Password</Button>
          </fieldset>
        </form>

        <Link href="/login" className="display-block text-center mt-2">
          <i className="uil-arrow-left mr-0-5"></i>Back to login
        </Link>

        <p className="text-center text-fade mt-2">&copy; 2023 All Rights Reserved.</p>
      </div>
    </main>
  )
}
