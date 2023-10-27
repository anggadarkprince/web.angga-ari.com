import Link from "next/link";
import styles from '../page.module.css';
import {clsx} from "clsx";
import {ResetPasswordForm} from "@/app/(manage)/(auth)/reset-password/components/ResetPasswordForm";
import {decodeResetToken} from "@/app/actions/password";
import React from "react";

type Props = {
  params: {};
  searchParams: { token: string };
};

export default async function ResetPassword({searchParams}: Props) {
  let user, errorMessage;
  try {
    user = await decodeResetToken(searchParams.token);
  } catch (error) {
    if (typeof error === "string") {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
  }
  return (
    <main className={clsx('main', styles.auth__main)}>
      <div className={styles.auth__wrapper}>
        <div className="mb-1">
          <h1 className={styles.auth__title}>Set new password</h1>
          <h3 className={styles.auth__subtitle}>Setup your secure password</h3>
        </div>

        {user ? (
          <ResetPasswordForm email={user?.email} token={searchParams.token} />
        ) : (
          <div className="alert alert-error">
            {errorMessage || 'Invalid or expired token'}
          </div>
        )}

        <Link href="/login" className="display-block text-center mt-2">
          <i className="uil-arrow-left mr-0-5"></i>Back to login
        </Link>

        <p className="text-center text-fade mt-2">&copy; 2023 All Rights Reserved.</p>
      </div>
    </main>
  )
}
