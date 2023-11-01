import Link from "next/link";
import styles from '../page.module.css';
import {clsx} from "clsx";
import {confirmAccount} from "@/app/actions/profile";

type Props = {
  params: {};
  searchParams: { token: string };
};

export default async function Confirm({searchParams}: Props) {
  let user, errorMessage;
  try {
    user = await confirmAccount(searchParams.token);
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
          <h1 className={styles.auth__title}>Account Confirmation</h1>
          <h3 className={styles.auth__subtitle}>{errorMessage ? 'Ops there is something' : 'Yay your account is active!'}</h3>
        </div>

        {errorMessage ? (
          <p className="alert alert-error">{errorMessage}</p>
        ) : (
          <p className="alert alert-success">
            {user.email} successfully activated, back to login page to access your account
          </p>
        )}

        <Link href={`/login?email=${user?.email || ''}`} className="display-block text-center mt-2">
          <i className="uil-arrow-left mr-0-5"></i>Back to login
        </Link>

        <p className="text-center text-fade mt-2">&copy; 2023 All Rights Reserved.</p>
      </div>
    </main>
  )
}
