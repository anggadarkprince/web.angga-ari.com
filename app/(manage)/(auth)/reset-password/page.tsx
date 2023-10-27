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
          <h1 className={styles.auth__title}>Set new password</h1>
          <h3 className={styles.auth__subtitle}>Setup your secure password</h3>
        </div>

        <div className="alert alert-error" style={{display: 'none'}}>
          Your password do not match
        </div>

        <form className={styles.auth__form} method="post">
          <fieldset>
            <Input type={'password'} name={'new_password'} label={'New Password'} placeholder={'New Password'} id={'input-new-password'} required={true} maxLength={50} />
            <Input type={'password'} name={'password_confirmation'} label={'Confirm Password'} placeholder={'Confirm Password'} id={'input-confirm-password'} required={true} maxLength={50} />
            <Button type={'submit'} className={'width-full mt-1'}>Change Password</Button>
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
