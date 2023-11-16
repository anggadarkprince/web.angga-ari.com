import Link from "next/link";
import styles from '../page.module.css';
import {clsx} from "clsx";
import {InputGroup} from "@/app/components/Inputs";
import Image from "next/image";
import {LoginForm} from "@/app/(auth)/login/components/LoginForm";
import {headers} from "next/headers";
import {Button} from "@/app/components/Buttons";

export default async function Login() {
  const headersList = headers()
  const referer = headersList.get('referer')

  return (
    <main className={clsx('main', styles.auth__main)}>
      <div className={styles.auth__wrapper}>
        <div className={styles.auth__titleWrapper}>
          <Image src="/assets/img/favicon.png" alt="Logo" width={50} height={50} className={styles.auth__logo}/>
            <div>
              <h1 className={styles.auth__title}>Welcome back!</h1>
              <h3 className={styles.auth__subtitle}>Start managing your landing page</h3>
            </div>
        </div>

        <LoginForm referer={referer || ''} />

        <p className={clsx('mb-1 mt-1', styles.separator__or)}>OR</p>

        <InputGroup className={'grid gap-1 col-lg-2 mb-1'}>
          <Button href={'#'} full={true} className={styles.button__social}>
            <Image src="/assets/img/google.png" alt="Google" width={20} height={20}/>Google
          </Button>
          <Button href={'#'} full={true} className={styles.button__social}>
            <Image src="/assets/img/github.png" alt="Github" width={20} height={20}/>Github
          </Button>
        </InputGroup>
        <p className="text-center">Don&apos;t you have an account? <Link href="/register">Sign Up</Link></p>
        <p className="text-center text-fade mt-2">&copy; 2023 All Rights Reserved.</p>
      </div>
    </main>
  )
}
