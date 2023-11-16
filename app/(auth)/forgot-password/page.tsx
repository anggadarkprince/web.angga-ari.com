import Link from "next/link";
import styles from '../page.module.css';
import {clsx} from "clsx";
import {ForgotPasswordForm} from "@/app/(auth)/forgot-password/components/ForgotPasswordForm";

export default async function ForgotPassword() {
  return (
    <main className={clsx('main', styles.auth__main)}>
      <div className={styles.auth__wrapper}>
        <div className="mb-1">
          <h1 className={styles.auth__title}>Forgot password</h1>
          <h3 className={styles.auth__subtitle}>Don&apos;t worry, we&apos;ll send you reset instructions</h3>
        </div>

        <ForgotPasswordForm />

        <Link href="/login" className="display-block text-center mt-2">
          <i className="uil-arrow-left mr-0-5"></i>Back to login
        </Link>

        <p className="text-center text-fade mt-2">&copy; 2023 All Rights Reserved.</p>
      </div>
    </main>
  )
}
